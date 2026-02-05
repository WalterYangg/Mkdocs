---
title: 嵌入式Linux入门及开发环境搭建
date: 2025-11-23
categories:
  - 技术
author: Walter
---
<!-- more -->

# 嵌入式Linux入门及开发环境搭建

> 嵌入式Linux运行在ARM架构的开发板上，并不能兼容为X86架构定制的Linux软件程序，我们需要搭建X86架构的Linux平台，通过交叉编译的方式为ARM平台重新编译程序源码，再将编译的程序或镜像文件移植到开发板上。
>
> 程序源码的编辑与编译都将在X86架构的Linux平台(在此为Ubuntu)上完成

## Linux-C语言编程

### **编辑器**

#### Vim

Ubuntu下安装：

```
sudo apt-get install vim
```

### 编译器

#### **GCC**编译器

Ubuntu下安装

```
sudo apt-get install gcc
```

**GCC常用命令**

**将test.c预处理、汇编、编译并链接形成可执行文件test。-o选项用来指定输出文件的文件名。**

```
gcc test.c -o test
```

**运行可执行文件**

```
./test
```

**C语言的编译过程：**

**预处理：去掉注释，进行宏替换（#define相关），头文件（#include）包含等工作。**

```
gcc–E test.c –o test.i
```

**编译：不同平台用的汇编语言是不一样的。编译将高级语言编译成汇编语言**

```
gcc–Stest.c –o test.s
```

**汇编：将汇编语言翻译成二进制的目标代码**

```
gcc–c test.c –o test.o
```

**链接：包含各函数库的入口，得到可执行代码**

```
gcc –o test test.c
```

### Makefile

Makefile规则

-  1.如果这个工程没有编译过，那么我们的所有C文件都要编译并被链接。
-  2.如果这个工程的某几个C文件被修改，那么我们只编译被修改的C文件，并链接目标程序。
- 3.如果这个工程的头文件改变，那么只需要编译引用了这几个头文件的C文件，并链接目标程序。

Makefile语法

Makefile函数

## 软件工具

### 交叉编译工具链

> **通过X86架构的PC为ARM架构的平台编译代码的GCC**，使用方法与GCC相同，只是需要加上一个前缀

```
arm-linux-gnueabihf-gcc hello.c -o hello
```

### MobaXterm

> 终端控制台，支持串口、SSH登录、文件传输，功能强大，免费

### VScode

> 用于在Linux中编辑源码，阅读Linux内核等

## 嵌入式Linux开发分类

### 裸机开发

- 与底层寄存器打交道，并不常用

### 驱动开发

- 字符设备驱动
- 块设备驱动
- 网络设备驱动

### 应用编程

### 嵌入式Qt

## 正点原子I.MX6ULL出厂系统上手试玩

#### 设置LCD作为终端控制台

**1、修改 /etc/inittab 文件**

进入开发板根文件系统中的 /etc/inittab 文件，官方教程中只需要加入一行：

```
tty1::askfirst:-/bin/sh
```

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

但是yocto系统要改三行：

```
console::askfirst:-/bin/sh
tty1::askfirst:-/bin/sh
::restart:/sbin/init
```

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

**2、关闭出厂系统Qt界面**

- **在/usr/bin 删除psplash 和 psplash-write 文件**

```
rm /usr/bin psplash
rm /usr/bin psplash-write
```

- **在/etc/rc.local 那里屏蔽出厂Qt桌面**

> 在出厂文件系统/etc/rc.local 文件里，如下图。不需要启动 Qt 界面，可以在/opt/QDesktop >
>
> /dev/null 2>&1 &行首前面加“#”注释掉这个指令即可。想要开启时再去除“#”即可。

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

保存，重启开发板，按任意按键进入uboot

**3、设置 uboot 中的 bootargs**

进入uboot命令行，输入以下内容：

在LCD和串口同时显示终端

```
setenv bootargs 'console=tty1 console=ttymxc0,115200 root=/dev/mmcblk1p2 rootwait rw'
saveenv
```

uboot命令行中输入boot，启动Linux内核，LCD已经设置为终端控制台

#### Nginx轻量级Web服务器

> 出厂系统自带的轻量Web服务器，软件版本1.8.1

Nginx默认目录，输入命令：

```
whereis nginx
```

即可看到类似于如下的内容：

```
nginx: /usr/sbin/nginx /etc/nginx
```

- Nginx配置路径：/etc/nginx/
- 只需知道Nginx配置路径，其他路径均可在/etc/nginx/nginx.conf 以及/etc/nginx/conf.d/default.conf 中查询到。

**常用命令**

启动：

```
nginx
```

测试Nginx配置是否正确：

```
nginx -t
```

优雅重启：

```
nginx -s reload
```

查看nginx的进程号：

```
ps -ef |grep nginx
```

nginx服务停止

```
nginx -s stop
kill -9 pid 杀死进程
```

**静态网页搭建**

从配置文件 nginx.conf 中找到静态HTML文件的路径 ，文件名为：index.html

编辑 index.html文件

```
vim index.html
```

重启

```
nginx -s reload
```

#### 连接WIFI

为测试 USB WIFI 正点原子已经编写了一个脚本“alientek_usb_wifi_setup.sh”脚本内容仅

供参考，默认把它放在/home/root/shell/wifi 目录下。如下图。

```
cd /home/root/shell/wifi
```

查看 USB WIFI 的网卡信息，使用 ifconfig 指令，如下图示，wlan0 是 USB WIFI 的节点。

```
ifconfig wlan0 up // 若默认没打开 wlan0 则需要执行此项。
ifconfig
```

使用 USB WIFI 连接无线网络并测试网络是否能上网。

```
iwlist wlan0 scan  //或者
wpa_cli -i wlan0 scan_result
source ./alientek_usb_wifi_setup.sh -m station -i ALIENTEK-YF -p 1590202**** -d wlan0
```

参数解释：
-m station ：设置成 station 模式
-i ALIENTEK-YF ：无线网络名称(ssid)。
-p 1590202**** ：无线网络密码(psk)。
-d wlan0 ：USB WIFI 节点