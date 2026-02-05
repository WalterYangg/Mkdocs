---
title: GIT基础
date: 2025-11-23
categories:
  - 备忘
author: Walter
links:
  - Git教程 – 廖雪峰的官方网站: https://www.liaoxuefeng.com/wiki/896043488029600
---

<!-- more -->

# GIT基础

## Git安装

### Windows

软件下载[Git](https://git-scm.com/downloads)

安装完成后命令行输入

```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

如果你使用Windows系统，为了避免遇到各种莫名其妙的问题，请确保目录名（包括父目录）不包含中文。

### Linux

```
sudo apt-get install git
```

## Git上传文件到Github

#### 1.登录GitHub，创建新的远程仓库

#### 2.创建本地工作区

点进去空文件夹，鼠标右键，使用Git Bash Here 打开

![在这里插入图片描述](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

进入命令行

#### 3.Git初始化，在把本地目录变成Git可以管理的仓库

```
git init
```

此时当前目录下会自动生成一个 `.git` 的目录

`.git`目录默认是隐藏的，用`ls -ah`命令就可以看见

#### 4.将要上传的文件复制到这个文件夹下

![在这里插入图片描述](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

#### 5.将项目添加到暂存区

- 注意： **.** 前面有空格，代表添加所有文件。
- 若添加单个文件输入：`git add xxxx.xx`（xxxx.xx为文件名

```
git add .
```

####  **6.将文件**提交到Git仓库

```
git commit -m "注释内容"
```

简单解释一下`git commit`命令，`-m`后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。

#### 7.上传到 main 分支

```
 git branch -M main 
```

#### 8.和远程仓库连接

把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

```
git remote add origin https://github.com/用户名/仓库名.git
```

#### 9.将本地仓库内容推送到远程仓库

> 把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支 `main` 推送到远程。
>
> 由于远程库是空的，我们第一次推送 `main` 分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的 `main` 分支，还会把本地的 `main` 分支和远程的 main 分支关联起来，在以后的推送或者拉取时就可以简化命令。

```
 git push -u origin main
```

从现在起，只要本地作了提交，就可以通过命令：

```
git push origin main
```

把本地 main 分支的最新修改推送至GitHub

#### 10.刷新 GitHub 的远程仓库页面，上传成功

## 常见错误

**error: failed to push some refs to ‘https://github.com/…**

> 问题原因：远程库与本地库不一致造成的(通常为远程仓库自动生成的 README.md 与本地库不一致)，在hint中也有提示把远程库同步到本地库就可以了
> 解决办法：使用命令行：

```
git pull --rebase origin main
```

该命令的意思是把远程库中的更新合并到（pull=fetch+merge）本地库中，–-[rebase](https://so.csdn.net/so/search?q=rebase&spm=1001.2101.3001.7020)的作用是取消掉本地库中刚刚的commit，并把他们接到更新后的版本库之中。出现如下图执行pull执行成功后，可以成功执行git push origin main操作。

最后使用以下命令将将更新的代码push到远程仓库下

```
git push origin main
```
