---
title: Github Action静态部署mkdocs远程服务器
date: 2026-02-06
tags:
  - mkdocs
categories:
  - 备忘
author: Walter
---

<!-- more -->

# Github Action静态部署mkdocs远程服务器

## 一、本地开发与环境准备

- **核心操作**：在服务器使用 Docker 运行 `mkdocs serve` 或 `mkdocs build` 进行本地开发和测试。
- **关键认知**：明确区分**开发环境**（服务器/Docker）和**构建/部署环境**（GitHub Actions 云端）。两者环境独立，依赖需分别管理。

## 二、GitHub Actions 工作流及自动化流水线配置

在`mkdocs.yml`的同级目录下创建 `.github/workflows/deploy.yml`：

``` 
name: Deploy MkDocs

on:
  push:
    branches:
      - main        # 主分支推送时触发
      - master      # 或 master 分支
  pull_request:
    branches:
      - main
      - master
  # 手动触发选项
  workflow_dispatch:

# 设置权限
permissions:
  contents: write
  pages: write
  id-token: write

# 只允许一个并发部署
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 获取所有历史，便于版本功能

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'    # 启用 pip 缓存

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install mkdocs mkdocs-material
          # 如果有 requirements.txt
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

      - name: Build documentation
        run: mkdocs build --strict --verbose

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./site  # MkDocs 默认输出目录

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

**创建 `requirements.txt` 文件**：

``` 
cd /你的/宿主机/项目路径
echo "mkdocs
mkdocs-material" > requirements.txt
```

编辑`requirements.txt`文件`vim requirements.txt   `添加构建服务需要用到的依赖或插件

```
mkdocs
mkdocs-awesome-pages-plugin             
mkdocs-get-deps                       
mkdocs-git-committers-plugin-2           
mkdocs-git-revision-date-localized-plugin 
mkdocs-macros-plugin                      
mkdocs-material                           
mkdocs-material-extensions              
mkdocs-minify-plugin                   
mkdocs-redirects                       
mkdocs-rss-plugin                      
```



## 三、GIT代码管理与仓库配置

- **核心操作**：
  1. 在 GitHub 创建仓库（项目站点）。
  2. 在服务器项目目录初始化 Git (`git init`)，正确关联远程仓库 (`git remote add origin ...`)。

- **常见问题**：
  - Git 权限错误（`safe.directory`, 用户身份 `user.email/name` 未设置）。
  - 远程仓库已有内容（如初始化 README）导致推送冲突，需使用 `git pull --allow-unrelated-histories` 或 `git push --force-with-lease`。

### 1、创建仓库

#### 通过 GitHub 网页创建（最常用）

这是最直观的方式，适合绝大多数情况。

1. **登录并进入主页**：访问 [GitHub](https://github.com/) 并登录。点击页面右上角的 **+** 号图标，然后选择 **New repository**。
2. **填写仓库信息**：
   - **Repository name**：必填。为您的仓库起一个名字（例如 `Mkdocs`）。
   - **Description**：选填。简短描述您的项目。
3. **选择仓库类型**：
   - **Public**：公开，任何人都能看到。
   - **Private**：私有，只有您和您授权的人能看到。
4. **初始化设置**（可选但建议）：
   - **☑ Add a README file**：勾选。创建一个 `README.md` 文件，它是项目的门面。
   - **☑ Add .gitignore**：勾选。选择模板（如 `Python`）来忽略不必要的文件。
   - **☑ Choose a license**：选填。为项目选择开源许可证。
5. **完成创建**：点击页面底部的 **Create repository** 按钮。

### 2、设置Github Action

- 需要到仓库 Settings → Pages → Build and deployment
- 选择 Source: GitHub Actions

### 3、安装Git客户端

```
sudo apt update
sudo apt install git -y
```
### 4、配置 Git 用户信息

在你的终端中，执行以下命令来设置全局的用户名和邮箱（请将示例信息替换为你自己的）：

```
git config --global user.email "walter.yangw@google.com"
git config --global user.name "walteryangg"
```

> **提示**：这里的邮箱和用户名会记录在你未来的每一次提交中。通常建议：
>
> - **邮箱**：使用你在 GitHub 上设置的公开邮箱（可以在 GitHub 的 `Settings -> Emails` 中查看）。
> - **用户名**：使用你的 GitHub 用户名或你常用的昵称。

### 5、导航到你的项目目录并初始化

**如果尚未初始化**

回到你的项目文件目录 `./mkdocs-material/mkdocs/data`。

检查并初始化Git仓库：

```
git init
```

### 6、关联你的GitHub远程仓库

#### GitHub 连接仓库的认证密钥

#### **HTTPS 个人访问令牌**(不太推荐，容易出现443端口问题)

创建GitHub个人访问令牌的位置和操作路径非常固定。请登录你的GitHub账户后，按照下图所示的路径操作，并重点关注箭头标识的关键步骤：

1. 登录 GitHub → Settings → Developer settings
2. 选择 **Personal access tokens** → **Tokens (classic)**
3. 点击 **Generate new token** → **Generate new token (classic)**
4. 设置：
   - Note: `Mkdocs Local Access`
   - Expiration: 建议选择 **90 days** 或 **No expiration**
   - 勾选权限：`repo`（全选），`workflow`，`gist`（可选）

#### 创建令牌时的关键细节

在上图第7步选择权限（`Select scopes`）时，为了保证能正常推送代码，我建议你在生成令牌时，**同时勾选以下两个核心权限**：

| 权限范围       | 是否必须     | 作用                                                         |
| :------------- | :----------- | :----------------------------------------------------------- |
| **`repo`**     | **必须**     | 这是推送代码的基础。允许读写仓库代码、提交、分支等。         |
| **`workflow`** | **强烈建议** | 允许你的工作流文件（`.github/workflows/deploy.yml`）在仓库中运行、管理 Actions 作业。 |

如果你的工作流还包含其他操作（如发布到GitHub Packages），可能需要勾选其他权限，但对于你的 MkDocs 部署，上面两项就足够了。

#### 重要安全提示

这是最关键的一步：**令牌只会在生成时显示一次**。生成后请务必立即将其**复制并保存在一个安全的地方**（如密码管理器），关闭页面后将无法再次查看完整令牌。

#### 令牌的使用方法

回到本地环境，**首次推送到GitHub，触发自动化**执行推送，这会触发工作流运行：

```
git push https://github.com/WalterYangg/Mkdocs.git main
# 用户名：WalterYangg
# 密码：粘贴你的token
```

系统会提示你输入GitHub的用户名和**个人访问令牌**（在GitHub的 Settings -> Developer settings -> Personal access tokens 里创建，需要有 `repo` 权限）。

生成令牌后，回到你服务器上的命令行，再次尝试 `git push` 操作。当系统提示输入用户名和密码时：

- **Username**: 输入你的GitHub用户名。
- **Password**: **不要**输入你的GitHub登录密码，而是粘贴你刚才生成的**个人访问令牌**。

之后，你应该就能成功推送代码并触发GitHub Actions自动部署了。

#### 通过SSH协议链接远程仓库（强烈推荐）

如果以上网络排查复杂或无效，**改用SSH协议是绕过443端口问题最快、最有效的方法**。操作步骤如下：

1. **在服务器生成SSH密钥**（如果尚未生成）：

   bash

   ```
   ssh-keygen -t ed25519 -C "walteryangg@gmail.com"
   ```

   一路按回车使用默认路径和空密码即可。

2. **将公钥添加到GitHub**：

   - 打印公钥：`cat ~/.ssh/id_ed25519.pub`
   - 复制输出的全部内容。
   - 登录GitHub → 点击头像 → **Settings** → **SSH and GPG keys** → **New SSH key** → 粘贴并保存。

3. **将本地仓库远程地址切换为SSH格式**：

   ```
   # 查看当前远程地址
   git remote -v
   
   # 如果是 HTTPS，切换到 SSH
   git remote set-url origin git@github.com:walteryangg/MKdocs.git
   ```
   
4. **测试SSH连接并推送**：

   ```
   ssh -T git@github.com  # 测试连接，预期看到成功认证的欢迎语
   ```

### 7、提交工作流文件：

`.github/workflows/deploy.yml`

```
git add .github/workflows/deploy.yml
git commit -m "feat: 添加GitHub Actions自动部署工作流"
```

### 8、首次推送到GitHub，触发自动化

```
git branch -M main  # 确保分支名称为main（如果已是master分支可跳过）
git push -u origin main
```

> 第一次用Git部署时可能会遇到一个常见的错误
>
> 即**远程仓库 (`origin/main`) 已经存在一些你在本地仓库没有的提交**。
>
> 这通常是因为你在GitHub网页上创建 `MKdocs` 仓库时，**勾选了“使用README初始化”选项**。因此，远程仓库一开始就有一个 `README.md` 文件的提交，而你的本地仓库没有这个提交历史，Git为了保护远程仓库的修改不被覆盖，拒绝了你的推送。

**解决方案：先同步，再推送**：你需要在推送前，先将远程仓库的更改“拉取”到本地，与你本地的更改进行合并。根据你是否需要保留远程的初始文件（如 `README.md`）

```
#1. 将远程的更改拉取到本地，并尝试合并
git pull origin main --allow-unrelated-histories

#2. 如果上一步成功，没有冲突，则直接推送
git push -u origin main
```

## 四、部署和验证

- **核心操作**：通过 `git add`, `git commit`, `git push` 推送代码到 `main` 分支，自动触发工作流。
- **验证方法**：
  1. 立即查看仓库的 **Actions** 标签页，监控工作流运行状态（成功/失败）。
  2. 工作流成功后，进入仓库 **Settings -> Pages**，确认源为 `gh-pages` 分支。
  3. 访问 `https://<用户名>.github.io/<仓库名>` 查看线上站点。
- **调试关键**：工作流失败时，**仔细阅读Actions日志中的错误信息**，它是解决问题的直接依据。常见错误包括：依赖未安装、配置文件错误、插件缺失、路径不正确等。

### 推送全部项目文件到 `main` 分支

```
git add .
git commit -m "静态部署mkdocs全部文件"
git push origin main
```

### 验证

推送成功后，请立即去你的GitHub仓库页面查看：

- **Code 标签页**：确认文件已更新。
- **Actions 标签页**：这是关键！几秒钟后，一个名为 “Deploy MkDocs” 的工作流应该会被自动触发并开始运行。等待它变成绿色的 **✅**，你的网站就部署成功了。

## 五、自定义域名

1. **配置DNS解析**
   你需要**在你的域名服务商（如阿里云、Cloudflare等）的管理后台添加一条CNAME记录**。
   - **主机记录/名称**：填写你想要的子域名，例如 `home`。
   - **记录类型**：选择 `CNAME`。
   - **记录值/目标**：填写 `walteryangg.github.io`（**注意：结尾的`.`通常不需要加**）。
2. **在GitHub仓库中设置自定义域名**
   - 进入你的GitHub仓库，点击 **Settings > Pages**。
   - 在 **Custom domain** 输入框中，填入你的完整域名（例如 `home.sth.ink`），然后点击 **Save**。
   - **重要**：保存后，务必勾选下方的 **Enforce HTTPS** 选项，让GitHub为你的域名提供免费的SSL证书，启用HTTPS加密访问。
3. **在MkDocs项目中固化域名配置（关键）**
   为防止GitHub Pages设置被重置，你需要在项目 `docs` 目录下手动创建一个名为 **`CNAME`** 的文件（无扩展名），内容就是你的一行域名。例如：

```CNAME
home.sth.ink
```

同时，建议将 `site_url` 配置更新到 `mkdocs.yml` 中，确保网站内的链接正确生成：

``` 
site_url: https://home.sth.ink
```



### 六、项目结构

``` 
├── docs        # Markdown文档源文件目录
│   ├── blog
│   │   ├── img
│   │   │   └── imgtest
│   │   │       └── 图片1.jpg
│   │   ├── index.md
│   │   ├── posts
│   │   │   ├── 博客文章.md
│   │   └── tag.md
│   ├── CNAME      # 自定义域名
│   ├── doc
│   │   └── 项目文章.md
│   ├── index.md
│   └── styles
│       ├── extra.css
│       └── homepage.css
├── mkdocs.yml    # MkDocs站点配置文件
├──.github
│  └────workflows
│       └── deploy.yml    # 自动化工作流配置文件
│
└── requirements.txt      # Python依赖插件列表

```
