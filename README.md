# AI 学习项目

这是一个我用来系统学习 AI、大模型应用开发与 AI 测试工程化的个人学习项目。

项目目标不是只停留在“看懂概念”，而是按周把知识点沉淀成：
- 学习笔记
- 术语手册
- 可运行代码
- 小工具
- 阶段性交付物

---

## 项目目标

这个项目主要用于：

- 系统学习大模型基础概念与应用开发
- 练习大模型 API 调用、Prompt 设计、RAG、Agent 等核心能力
- 把学习内容整理成可复习、可展示、可复用的文档和代码
- 为后续转向 AI 测试、AI 应用开发、AI 工程化相关岗位做准备

---

## 当前内容

目前项目已包含第 1 周的学习与交付物，重点围绕：

- 大模型核心术语理解
- 采样参数与幻觉
- Python 封装大模型 API
- 接口测试用例生成工具
- LangChain 核心框架理解

---

## 目录说明

### `study—plan.md`

8 周 56 天的 AI 学习总计划，按天拆分学习内容、实操任务和验收标准。

### `week1/`

第 1 周的学习成果目录，目前包括：

- `大模型核心术语手册.md`
- `采样参数说明.md`
- `LangChain核心框架介绍.md`
- `llm_api_client.py`
- `demo.py`
- `testcase_generator.py`
- `sample_api_doc.json`
- `sample_test_cases.md`
- `README.md`
- `self_check.md`

---

## 第 1 周交付物

### 1. 《大模型核心术语手册》

整理了第 1 周最核心、最容易混淆的概念，例如：
- `temperature`
- `top_p`
- `top_k`
- 幻觉
- `Prompt`
- `System Prompt`
- `Embedding`
- 向量数据库
- `RAG`
- `Function Call`
- `Agent`
- `SFT`

### 2. 大模型 API 封装 Python 库

提供一个最小可运行版本的 OpenAI 兼容接口封装，支持：
- 读取环境变量
- 发起聊天请求
- 传入 `temperature`、`top_p` 等参数
- 模拟调用模式
- 基础异常处理

### 3. 接口测试用例生成工具

可以基于结构化接口文档生成基础测试用例，当前支持：
- 输入：`.json`、`.csv`
- 可选输入：`.xlsx`
- 输出：`.md`、`.csv`

默认覆盖的测试点：
- 正常用例
- 必填项缺失
- 参数类型错误
- 边界值 / 空值

---

## 如何使用

### 1. 查看学习计划

直接阅读：

```bash
study—plan.md
```

### 2. 运行第 1 周 API Demo

如果你已经有大模型 API Key，可先配置环境变量：

```bash
export LLM_BASE_URL="https://api.openai.com/v1"
export LLM_API_KEY="your_api_key"
export LLM_MODEL="gpt-4o-mini"
```

运行示例：

```bash
python3 week1/demo.py
```

如果只是本地演示，不连真实模型，可以使用 mock 模式：

```bash
LLM_MOCK=1 python3 week1/demo.py
```

### 3. 运行测试用例生成工具

```bash
python3 week1/testcase_generator.py \
  --input week1/sample_api_doc.json \
  --output week1/sample_test_cases.md
```

---

## 学习方式

这个项目采用“计划驱动 + 每日实操 + 每周交付物”的方式推进：

- 先理解概念
- 再跑通最小示例
- 再做简单封装
- 最后沉淀成文档和工具

这样可以避免只停留在理论层面，也能逐步形成自己的作品集。

---

## 后续方向

后续会继续补充更多内容，例如：

- LangChain 深入实践
- JSON Schema 结构化输出
- Rule / Skill / MCP
- RAG 全流程落地
- LangGraph 与 Agent 开发
- AI 测试评测与工程化实践

---

## 项目定位

这是一个以“学习、实践、沉淀”为核心的 AI 学习仓库。

它既是学习笔记仓库，也是代码练习仓库，同时也是后续求职和项目展示的基础素材库。

