"""Demo script for the week 1 LLM API wrapper."""

from llm_api_client import LLMClient
from llm_api_client import LLMConfig
from llm_api_client import LLMClientError
from llm_api_client import build_messages


def main() -> None:
    config = LLMConfig.from_env()
    client = LLMClient(config)

    messages = build_messages(
        user_prompt="请用中文解释什么是 RAG，并给一个客服知识库场景示例。",
        system_prompt="你是一名讲解清晰的 AI 学习助手，请先给定义，再给例子。",
    )

    try:
        result = client.chat(messages=messages, temperature=0.2, top_p=0.9, max_tokens=300)
    except LLMClientError as exc:
        print(f"[ERROR] {exc}")
        print("Tip: set LLM_MOCK=1 to run the demo without a real API key.")
        return

    print("Model:", result["model"])
    print("Usage:", result["usage"])
    print("Content:")
    print(result["content"])


if __name__ == "__main__":
    main()

