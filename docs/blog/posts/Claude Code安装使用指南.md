---
title:  Claude Code安装使用指南
date: 2026-02-24
categories:
  - 备忘
author: Walter
---
<!-- more -->

# Claude Code安装使用指南

## 一、前置准备

1. 账号准备：
   - 注册 [接口 AI](https://jiekou.ai) 账号，确保账号有余额或代金券在有效期内；
2. 工具准备：
   - 全程使用 **PowerShell**（拒绝 CMD，避免语法错误）。

###  第一步：基础准备 —— 安装 Claude Code 并获取国内中转 API（核心凭证）

#### 1. 安装 Claude Code CLI（国内镜像加速，1 分钟完成）

Claude Code 基于 **Node.js** 运行，先确认本地 Node.js 版本≥v24，再用国内 npm 镜像安装，避免下载失败：

```
# 检查Node.js版本（无则先安装Node.js）
node -v
# 国内镜像源安装Claude Code
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

#### 2. 获取国内合规中转 API（免海外代理 / 国际信用卡）

选择国内成熟的 Claude Code 中转 API 服务（以接口ai为例），按以下步骤获取核心凭证：

1. 访问中转平台官网；
2. 进入控制台「账户管理 -> 设置 -> API秘钥管理」，添加并复制**以 sk - 开头的 API Key**和**中转 Base URL**（如接口ai API：https://api.jiekou.ai/anthropic）；
3. 保存凭证（密钥仅显示一次，丢失需重新生成）。

### 第二步：核心工具 —— 安装 cc-switch 并实现「官方 / 中转 API 一键切换」

cc-switch 是跨平台配置管理工具，核心解决**手动修改配置繁琐、单一接口故障**问题，支持毫秒级切换、自动故障转移，安装 + 配置全程 1 分钟：

#### 1. 安装 cc-switch（分系统，推荐官方安装包）

|     系统      |              安装命令 / 操作（直接复制 / 执行）              |
| :-----------: | :----------------------------------------------------------: |
|    Windows    | 下载 MSI 安装包（[cc-switch官网](https://github.com/farion1231/cc-switch)），双击下一步完成安装，支持便携版（解压即用） |
|     macOS     | brew tap farion1231/ccswitch  brew install --cask cc-switch  |
| Linux(Ubuntu) |           sudo dpkg -i CC-Switch-v3.9.1-Linux.deb            |

#### 2. cc-switch 配置中转 / 官方 API（一键添加，永久生效）

1. 管理员权限运行 **cc-switch**，点击主界面右上角**Add Provider**（添加提供商）；

2. 选择「Custom」（自定义），按以下格式填写（严格匹配接口 AI 要求）：

   |  配置项  |             填写内容              |         备注         |
   | :------: | :-------------------------------: | :------------------: |
   |   Name   |     接口 AI-Claude（自定义）      |     方便识别即可     |
   | API Key  |   接口 AI 生成的 `sk-xxxx` 密钥   |  无空格、无多余字符  |
   | Base URL | `https://api.jiekou.ai/anthropic` |   核心：不加 `/v1`   |
   |  Model   |    `claude-opus-4-1-20250805`     | 接口 AI 支持的模型名 |

   点击「Enable」（右上角显示绿色 Enable 状态），关闭 cc-switch 后**以管理员身份重启**（确保配置生效）。


####  3. 验证 cc-switch 环境变量是否生效

1. 关闭所有旧终端，新开 PowerShell，执行以下命令验证：

   ```
   # 验证核心配置是否生效
   echo $env:ANTHROPIC_AUTH_TOKEN  # 应输出接口AI的sk-密钥
   echo $env:ANTHROPIC_BASE_URL    # 应输出https://api.jiekou.ai/anthropic
   echo $env:ANTHROPIC_MODEL       # 应输出claude-opus-4-1-20250805
   ```

2. 若输出为空 / 错误：

   - 重启 cc-switch（管理员权限），重新 Enable 配置；
   - 手动补充环境变量（见**兜底方案**）。

### 第三步：测试接口 AI 连通性（关键前置）

在 PowerShell 执行以下命令，验证接口是否可用：

```
# 替换为你的API Key，测试接口AI的Claude接口
Invoke-RestMethod -Uri "https://api.jiekou.ai/anthropic/v1/messages" -Headers @{
  "x-api-key" = "你的sk-开头API Key"
  "Content-Type" = "application/json"
  "anthropic-version" = "2023-06-01"
} -Method Post -Body (@{
  model = "claude-opus-4-1-20250805"
  max_tokens = 100
  messages = @(@{
    role = "user"
    content = "say hello"
  })
} | ConvertTo-Json)
```

✅ 成功：返回包含`Hello`的响应；

❌ 失败：检查实名认证 / API Key 有效性 / Base URL 是否正确。

### 第四步：启动 Claude Code（核心）

#### 方式 1：直接启动（cc-switch 配置生效时）

```
# 直接启动，自动读取cc-switch配置的环境变量
claude
```

#### 方式 2：强制绑定环境变量启动（兜底方案）

若方式 1 仍直连官方域名，执行以下命令：

```
# 清空旧配置+强制绑定接口AI配置
Remove-Item Env:ANTHROPIC_API_KEY -ErrorAction SilentlyContinue
$env:ANTHROPIC_AUTH_TOKEN="你的sk-密钥"
$env:ANTHROPIC_BASE_URL="https://api.jiekou.ai/anthropic"
$env:ANTHROPIC_MODEL="claude-opus-4-1-20250805"

# 强制启动
cmd /c "set ANTHROPIC_AUTH_TOKEN=%ANTHROPIC_AUTH_TOKEN%&& set ANTHROPIC_BASE_URL=%ANTHROPIC_BASE_URL%&& set ANTHROPIC_MODEL=%ANTHROPIC_MODEL%&& claude"
```

### 第四步：切换可用模型（解决权限问题）

1. 进入 Claude Code 交互界面后，输入：

   ```
   /model
   ```

2. 用方向键选中「3. Opus」（Opus 4.6），按回车确认；

3. 测试调用：输入`say hello`，能正常返回响应即配置完成。

### 关键避坑 & 优化技巧

1. 若出现**401 认证失败**：核对 API Key 是否正确、是否完成实名认证，避免手动输入大小写 / 空格错误；
2. 若出现**504 网络超时**：在中转平台切换国内就近加速节点（华东 / 华南优先），关闭本地防火墙；
3. 多项目管理：用 cc-switch 为不同项目创建独立配置卡片，一键切换，避免配置冲突；
4. 自动故障转移：cc-switch 自带断路器机制，某一中转接口故障时，自动切换到备用接口，无需手动干预。