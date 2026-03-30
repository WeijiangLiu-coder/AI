"""A minimal OpenAI-compatible LLM API client for week 1 demos."""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any
from typing import Dict
from typing import List
from typing import Optional
from urllib import error
from urllib import request


Message = Dict[str, str]


class LLMClientError(Exception):
    """Raised when the remote LLM service returns an invalid response."""


@dataclass
class LLMConfig:
    base_url: str
    api_key: str
    model: str
    timeout: int = 60
    mock_mode: bool = False

    @classmethod
    def from_env(cls) -> "LLMConfig":
        """Build config from environment variables for local demos."""
        return cls(
            base_url=os.getenv("LLM_BASE_URL", "https://api.openai.com/v1"),
            api_key=os.getenv("LLM_API_KEY", ""),
            model=os.getenv("LLM_MODEL", "gpt-4o-mini"),
            timeout=int(os.getenv("LLM_TIMEOUT", "60")),
            mock_mode=os.getenv("LLM_MOCK", "0") == "1",
        )


class LLMClient:
    """A tiny wrapper around an OpenAI-compatible chat completions API."""

    def __init__(self, config: LLMConfig) -> None:
        self.config = config

    def chat(
        self,
        messages: List[Message],
        temperature: float = 0.2,
        top_p: float = 1.0,
        max_tokens: Optional[int] = None,
    ) -> Dict[str, Any]:
        """Send chat messages and return normalized output."""
        if self.config.mock_mode:
            return self._mock_response(messages, temperature, top_p, max_tokens)

        if not self.config.api_key:
            raise LLMClientError(
                "Missing API key. Set LLM_API_KEY or enable mock mode with LLM_MOCK=1."
            )

        payload: Dict[str, Any] = {
            "model": self.config.model,
            "messages": messages,
            "temperature": temperature,
            "top_p": top_p,
        }
        if max_tokens is not None:
            payload["max_tokens"] = max_tokens

        url = f"{self.config.base_url.rstrip('/')}/chat/completions"
        body = json.dumps(payload).encode("utf-8")
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.config.api_key}",
        }
        http_request = request.Request(url=url, data=body, headers=headers, method="POST")

        try:
            with request.urlopen(http_request, timeout=self.config.timeout) as response:
                raw_data = response.read().decode("utf-8")
        except error.HTTPError as exc:
            message = exc.read().decode("utf-8", errors="replace")
            raise LLMClientError(f"HTTP {exc.code}: {message}") from exc
        except error.URLError as exc:
            raise LLMClientError(f"Network error: {exc.reason}") from exc

        try:
            parsed = json.loads(raw_data)
        except json.JSONDecodeError as exc:
            raise LLMClientError(f"Invalid JSON response: {raw_data}") from exc

        content = self._extract_text(parsed)
        return {
            "model": parsed.get("model", self.config.model),
            "content": content,
            "usage": parsed.get("usage", {}),
            "raw": parsed,
        }

    def _extract_text(self, payload: Dict[str, Any]) -> str:
        choices = payload.get("choices")
        if not choices:
            raise LLMClientError("Missing choices in response payload.")

        first_choice = choices[0]
        message = first_choice.get("message", {})
        content = message.get("content")
        if isinstance(content, str):
            return content

        if isinstance(content, list):
            # Some compatible providers return content blocks.
            text_parts = [
                block.get("text", "")
                for block in content
                if isinstance(block, dict) and block.get("type") == "text"
            ]
            if text_parts:
                return "".join(text_parts)

        raise LLMClientError("Could not extract text content from response.")

    def _mock_response(
        self,
        messages: List[Message],
        temperature: float,
        top_p: float,
        max_tokens: Optional[int],
    ) -> Dict[str, Any]:
        user_messages = [item["content"] for item in messages if item.get("role") == "user"]
        latest_prompt = user_messages[-1] if user_messages else ""
        return {
            "model": f"{self.config.model}-mock",
            "content": (
                "This is a mock response for prompt: "
                f"{latest_prompt!r} (temperature={temperature}, top_p={top_p}, "
                f"max_tokens={max_tokens})"
            ),
            "usage": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0},
            "raw": {"mock": True},
        }


def build_messages(user_prompt: str, system_prompt: str = "") -> List[Message]:
    """Convenience helper for simple demos."""
    messages: List[Message] = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": user_prompt})
    return messages

