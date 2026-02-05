---
title: 安装Ubuntu操作系统
date: 2025-11-23
categories:
  - 技术
author: Walter
---
<!-- more -->
## 安装Ubuntu操作系统

**磁盘分区** –*以固态硬盘作为系统盘，机械硬盘存储*

| **分区**    | **大小**                          | **挂载点** | **类型** | **硬盘** | **位置**     |
| ----------- | --------------------------------- | ---------- | -------- | -------- | ------------ |
| efi系统分区 | 500M                              | 无         | 主分区   | SSD      | 空间起始位置 |
| swap分区    | 与电脑内存一样大（比如我这里32G） | 交换空间   | 逻辑分区 | SSD      | 空间起始位置 |
| Ext4分区    | SSD剩余所有空间                   | /          | 主分区   | SSD      | 空间起始位置 |
| Ext4分区    | 机械硬盘所有空间                  | /home      | 主分区   | 机械硬盘 | 空间起始位置 |

## Shell命令与脚本

## APT 下载工具

> **apt 是 Debian 系操作系统的包管理工具**

#### 更换apt-get国内镜像源

1、原文件备份

```
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

2、编辑源列表文件

```
sudo vim /etc/apt/sources.list
```

删除原来内容，添加以下新内容([阿里源](https://so.csdn.net/so/search?q=阿里源&spm=1001.2101.3001.7020))

```
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

4、更新

```
sudo apt-get update
sudo apt-get upgrade
```

#### apt 下载软件

```
sudo apt-get install XXX
```

#### apt 卸载软件

```
sudo apt-get remove XXX
```

## Deb软件安装

> deb文件是 Debian 系操作系统的**安装包**格式，将安装包解压到文件夹后，执行命令行安装

1、安装软件

```
sudo dpkg -i xxx.deb
```

2、卸载软件

```
sudo dpkg -r xxxx.deb
```

## Linux文件系统

#### 创建文件

```
touch
```

#### 创建文件夹

```
mkdir
```

#### 删除文件

```
rm 
```

#### 删除文件夹

```
rmdir
```

#### 文件复制

```
cp [参数] [源地址] [目的地址]
```

#### 文件移动和重命名

```
mv [参数] [源地址] [目的地址]
```

#### 文件压缩和解压缩

对于zip格式的文件压缩-与解压缩

```
zip [参数] [压缩文件名.zip] [被压缩的文件]
unzip [参数] [压缩文件名.zip]
```

对于非zip格式的文件压缩与解压缩（通用）

```
tar [参数] [压缩文件名] [被压缩文件名]

tar -cvf 压缩文件名.tar 目录名/
tar -xzvf 压缩文件名.tar
```

#### 创建新用户

## Linux权限管理

```
adduser 用户名
```

#### 设置用户密码

```
passwd 用户名
```

#### 切换为root/用户

```
su / su 用户名
```

#### 文件**权限修改命令**

```
chmod 777 files
```

#### 挂载分区命令

```
mount [参数] -t [类型] [设备名称] [目的文件夹]
```

## FTP与SSH服务

**ubuntu安装 FTP服务**

```
sudo apt-get install vsftpd
```

**检查 /etc/vsftpd.conf 配置文件**

```
sudo vi  /etc/vsftpd.conf
```

检查里面内容是否有被注释掉，如果前面有 “#” 号注释起来的话，就去掉即可。

```
local_enable=YES
write_enable=YES
```

**重启FTP服务，如下命令：**

sudo /etc/init.d/vsftpd restart

**在Ubuntu上启动并运行ssh,可以运行以下命令**

```
sudo apt update
sudo apt install openssh-server
sudo systemctl start ssh
sudo systemctl enable ssh # 如果您想让 SSH 服务在系统启动时自动运行
```

## screen常用命令

安装

```
apt-get install screen
```

新建一个screen会话

```
screen -S <名字>
```

退出当前screen会话

```
键盘点击ctrl+a , 然后按d
```

查看所有screen会话

screen -ls

进入（恢复）某一screen会话

```
screen -r <会话序列号>
```

关闭screen会话

```
screen -X -S <序列号> quit
```

## 其他

### **软连接**

用法`ln -s 源文件 目标文件 `例如：

```
ln -s /usr/local/mysql/bin/mysql /usr/bin
```

注意：路径都为绝对路径

查看所有软连接

```
ls -l
```

删除软连接

和删除普通的文件是一样的，删除都是使用rm来进行操作

```
#推荐使用
unlink test
 
#其次用法
rm test
 
#不推荐用法
rm -rf test
```

**不推荐使用rm -rf，在使用rm -rf删除时，如果链接目标是目录时千万要小心，使用 rm -rf test/ 时你会发现，软连接并没有被删除，而源目录下的文件会被删除！**

### **Docker**

查看本机镜像

```
docker images
```

查看本机容器

```
docker ps -a
```

进入容器

```
docker exec -it baota bash
```

退出

```
Ctrl+P+Q
```

**迁移容器**

1·将容器打包成镜像

命令：`docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]`
options选项：-a :提交的镜像作者；
-c :使用Dockerfile指令来创建镜像；
-m :提交时的说明文字；
-p :在[commit](https://so.csdn.net/so/search?q=commit&spm=1001.2101.3001.7020)时，将容器暂停。例如：

```
docker commit 135a0d19f757 baota:1.0
```

完成后，使用`docker images`可以看见该镜像

2·压缩该镜像

命令：`docker save [OPTIONS] IMAGE [IMAGE...]` 例如：

```
docker save -o my_baota.tar baota:1.0
```

完成后，会在当前目录生成一个tar文件

3·载入镜像

命令：`docker load [OPTIONS]`
-option选项：–input,-i 指定导入的文件
–quiet,-q 精简输出信息 例如：

```
docker load --input my_baota.tar
```

4·完成后run容器即可

```
docker run -d -p 5672:5672 -p 15672:15672 --name baota 80bd4b95a49d
```

- 参数说明：

- -p [主机端口 : 容器端口] 将虚拟机与容器端口组成映射，当需要多个端口映射时就重复多少次

- –name 创建的容器名

- [80bd4b95a49d]: 镜像ID

5·启动创建的容器

```
docker start baota(也可以是相应的容器ID)
```

### NPM

***-Nginx Proxy Manager***

服务器部署多个web服务时，会出现80、443端口占用的情况,。使用NPM反向代理可以将其他端口映射到80、443，从而实现优雅的访问不同网站服务。此外，NPM提供免费SSL证书以及自动续费。

**1、安装docker和docker-compose**

**2、新建一个名为ngingx_proxy_manager的文件夹用来存放文件和数据（最好建一个统一存放各种docker容器应用的目录，例如本人命名为docker文件夹**

```
cd ~/docker/
mkdir ngingx_proxy_manager && cd ngingx_proxy_manager
```

新建docker-compose.yml文件并复制以下内容

```
# 编辑文件
vim docker-compose.yml

# 复制以下内容
version: "3"
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      # These ports are in format <host-port>:<container-port>
      - '80:80' # Public HTTP Port
      - '443:443' # Public HTTPS Port
      - '81:81' # Admin Web Port
      # Add any other Stream port you want to expose
      # - '21:21' # FTP
    environment:
      DB_MYSQL_HOST: "db"
      DB_MYSQL_PORT: 3306
      DB_MYSQL_USER: "npm"
      DB_MYSQL_PASSWORD: "npm"
      DB_MYSQL_NAME: "npm"
      # Uncomment this if IPv6 is not enabled on your host
      # DISABLE_IPV6: 'true'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    depends_on:
      - db

  db:
    image: 'jc21/mariadb-aria:latest'
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: 'npm'
      MYSQL_DATABASE: 'npm'
      MYSQL_USER: 'npm'
      MYSQL_PASSWORD: 'npm'
    volumes:
      - ./data/mysql:/var/lib/mysql
```

注意打开防火墙端口80、443、81

启动服务

```
docker-compose up -d
```

**3、在确保云服务器防火墙已经放行80、81和443端口后即可访问服务器`ip:81` 进入ngingx_proxy_manager的web管理界面。默认密码为：**

```
Email:    admin@example.com
Password: changeme
```

输入密码，进入后台后会强制要求更改用户名和密码。

**4、设置后台管理界面的反向代理**

点击右边`Add Proxy Host` ，在弹出的界面`Details`选项中填写相应的字段。

> 到这里反向代理已经映射成功，如果需要HTTPS的话,继续配置

**1、申请泛域名ssl证书**

(1)首先需要从DNS解析一条泛域名

(2)从域名服务商获得DNS API – *以阿里云为例*

[阿里云添加DNS API 的accesskey_dns_aliyun_access_key](https://blog.csdn.net/chen249191508/article/details/98088553)

(3)在Nginx Proxy Manager管理后台，选择`Access Lists`->`Add SSL Certificate`->`Let's Encrypt`选项。填入：

- DNS Provider ->Aliyun
- Credentials File Content -> 从DNS API获得的key
- OK

**2、修改反向代理并添加泛域名ssl证书,启动https**

- 遇到的一些错误：
- [nginx-proxy-manager初次登录bad gateway](https://blog.csdn.net/heroguo007/article/details/135225592?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-135225592-blog-124678814.235^v43^control&spm=1001.2101.3001.4242.1&utm_relevant_index=3)

### **配置电源键直接关机**

```
/etc/systemd/logind.conf
HandlePowerKey=poweroff
PowerKeyIgnoreInhibited=yes
```

**请记住，按下电源按钮将在没有任何警告的情况下关闭系统。**

### Ubuntu 释放内存，缓存

释放内存

- 进入 root 模式： sudo -i
- 清楚所有缓存：echo 3 > /proc/sys/vm/drop_caches
- 回到用户：su <username>