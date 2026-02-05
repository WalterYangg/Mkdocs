---
title: FRP内网穿透
date: 2025-11-23
categories:
  - 备忘
author: Walter
links:
  - 参考资料: https://www.cnblogs.com/ioufev/p/16610942.html
  - Frp中文文档: https://gofrp.org/zh-cn/
---

<!-- more -->
# FRP内网穿透

> 利用FRP可以将本地的服务通过一个公网ip转发到公网上

## 常用命令

### 服务端(frps)

#### Linux

```
cd /opt/frp/                        进入frp目录
vi frps.ini                         编辑配置文件
netstat -tulpn | grep 7000          解决7000端口被占用
kill -9 7000                        关闭7000端口进程
./frps -c ./frps.ini                启动服务
```

#### Windows

### 客户端(frpc)

#### Linux

#### Windows

进入frpc文件夹内，路径栏输入cmd，命令行启动服务

```
frpc.exe -c frpc.ini               
```

使用FRP实现不同服务主要对frps.ini(服务端)和frpc.ini(客户端)内配置文件进行修改

## ESP32CAM内网穿透

### frps.ini

```
#frp服务端配置文件
[common]
#服务器公网ip。注：阿里云ECS需要绑定阿里云分配的内网ip
bind_addr = XXXXXXXXXX
#绑定端口号
bind_port = 7000
#映射的端口号
vhost_http_port = 8088
#安全验证令牌
token = XXXXXXXXXXX
#指向该公网ip的域名或(ip)地址
subdomain_host = XXX.com
```

### frpc.ini

```
#frp客户端配置文件
[common]
#你的frps服务器公网ip地址
server_addr = XXXXXXXXXX
#frps端口号
server_port = 7000
#安全验证令牌,同frps安全验证令牌
token = XXXXXXXXXXX
user = XXXXXX

#esp32cam 提供了两个端口：80端口用于web服务，81端口用于访问视频流
#camera服务的首页映射配置
[esp]
#ESP32的ip
local_ip = XXXXXXXXXX
type = http
local_port = 80
#浏览器访问地址 http://esp32.XXXX.com:8088
subdomain = esp32
#添加网页端访问密码，身份验证：用户名
http_user = XXXXX
http_pwd = XXXXXXX

#stream映射配置
[stream]
local_ip = XXXXXXXXXX
type = http
local_port = 81
#浏览器访问地址 http://stream.XXXX.com:8088
subdomain = stream
http_user = XXXXX
http_pwd = XXXXXXX
```

开机自启创建一个新的服务文件，比如 `/etc/systemd/system/frp.service`，可以使用以下命令：

```
sudo vim /etc/systemd/system/frp.service
```

在打开的文件中，输入以下内容：

```
[Unit]
Description=FRP Client
After=network.target

[Service]
Restart=on-failure
RestartSec=5s
ExecStart=/root/frp/frpc -c /root/frp/frpc.ini
ExecReload=/root/frp/frpc reload -c /root/frp/frpc/frpc.ini

[Install]
WantedBy=multi-user.target
```

请确保将 `/path/to/frp` 替换为你实际的 FRP 安装路径和配置文件路径。

1. 保存并关闭文件。
2. 启用并启动 FRP 服务：

```
#开机自启服务
sudo systemctl enable frp
#启动
sudo systemctl start frp
#关闭
sudo systemctl stop frp
#重启
sudo systemctl restart frp
#查看状态
sudo systemctl status frp
```
