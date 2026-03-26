---
title: I.MX6U移植Ubuntu18.04根文件系统
date: 2025-11-23
categories:
  - 备忘
author: Walter
links:
  - LVGL官方教程:  https://docs.lvgl.io/8.3/
  - Openedv: http://www.openedv.com/forum.php?mod=viewthread&tid=327567&page=1&authorid=393186
---
<!-- more -->

# I.MX6U移植Ubuntu18.04根文件系统

> 所谓Ubuntu可以简单的理解为一个根文件系统，是作为Linux三座大山之一：BootLoader、Linux内核以及根文件系统。I.MX6U同样可以运行Ubuntu，并启用Ubuntu的服务。只是由于I.MX6ULL 孱弱的性能，并不能胜任过多的工作，需要根据自己的需求对系统进行裁剪。

## 根文件系统移植

### **创建解压根文件系统的目录**

1、新建一个目录，用于存放根文件

```
mkdir /home/walter/linux/nfs/ubuntu_rootfs
```

2、进入该目录

```
cd /home/walter/linux/nfs/ubuntu_rootfs
```

3、将从官网上下载的 Ubuntu18.04.5 -base 文件存放在该目录

### **解压根文件系统**

```
sudo tar -vzxfubuntu-base-18.04.5-base-armhf.tar.gz
```

### **安装qemu**

> QEMU 是一个非常强大的虚拟机，它可以模拟不同架构的 CPU。我们通过qemu将移植到开发板上的Ubuntu根文件系统挂载到PC上，对其进行配置打包成形成可烧录的rootf文件。

1、安装

```
sudo apt-get install qemu-user-static
```

2、将刚刚安装的qemu-user-static拷贝到刚刚解压出来的ubuntu base目录中，也就是ubuntu_rootfs/usr/bin目录下，命令如下：

```
cd /home/walter/linux/nfs/ubuntu_rootfs
sudo cp /usr/bin/qemu-arm-static ./usr/bin/
```

### 设置软件源（沿用旧软件源没有问题）

> 在设置软件源之前先将Ubuntu主机下的DNS配置文件/etc/resolv.conf拷贝到根文件系统中，可以不换源，但必须复制resolv.conf，否则不能update！命令如下：

```
cd /home/walter/linux/nfs/ubuntu_rootfs
sudo cp /etc/resolv.conf ./etc/resolv.conf
```

**附**：**中科大 Ubuntu for arm 软件源**

```
#中科大源
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ xenial main multiverse restricted universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ xenial-backports main multiverse restricted universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ xenial-proposed main multiverse restricted universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ xenial-security main multiverse restricted universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ xenial-updates main multiverse restricted universe
deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ xenial main multiverse restricted universe
deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ xenial-backports main multiverse restricted universe
deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ xenial-proposed main multiverse restricted universe
deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ xenial-security main multiverse restricted universe
deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ xenial-updates main multiverse restricted universe
```

**中科大 Debian for ARM 软件源**

```
deb http://mirrors.ustc.edu.cn/debian buster main contrib non-free
deb http://mirrors.ustc.edu.cn/debian buster-updates main contrib non-free
deb http://mirrors.ustc.edu.cn/debian buster-backports main contrib non-free
deb http://mirrors.ustc.edu.cn/debian-security/ buster/updates main contrib non-free
```

### 创建挂载和卸载shell脚本

创建挂载脚本，复制以下代码保存为mount.sh，**注意：请将路径换成你自己的**

```
#!/bin/bash
ROOTFS="/opt/1panel/apps/imx6ull/projects/ubuntu_rootfs"
echo "Mounting filesystems..."
sudo mount -t proc /proc $ROOTFS/proc
sudo mount -t sysfs /sys $ROOTFS/sys
sudo mount -o bind /dev $ROOTFS/dev
sudo mount -o bind /dev/pts $ROOTFS/dev/pts
echo "Entering chroot (type 'exit' to leave)..."
sudo chroot $ROOTFS /bin/bash
```

创建卸载脚本，复制以下代码保存为unmount.sh，**注意：请将路径换成你自己的**

```
#!/bin/bash
ROOTFS="/opt/1panel/apps/imx6ull/projects/ubuntu_rootfs"
echo "Unmounting filesystems..."
sudo umount $ROOTFS/dev/pts
sudo umount $ROOTFS/dev
sudo umount $ROOTFS/sys
sudo umount $ROOTFS/proc
echo "Done."
```

### 在主机挂载根文件系统

```
sudo chmod 777 mount.sh unmount.sh
./mount.sh   //启动
```

### **安装软件**

```
apt update
apt install sudo
apt install vim
apt install kmod
apt install net-tools
apt install ethtool
apt install ifupdown
apt install language-pack-en-base
apt install rsyslog
apt install htop
apt install iputils-ping
apt install systemd            # ubuntu18必须安装systemd，不然没有串口文件
apt install openssh-server     # SSH 服务
apt install dhcpcd5            # DHCP 客户端（自动获取 IP）
apt install curl wget          # 常用网络工具 
apt install python3 python3-pip  # Python3（脚本/快速开发）
```

### 设置root用户密码

- 密码设置为root

```
passwd root
```

### 允许 root 登录（学习用方便）

``` 
sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
```

### 设置本机名称和IP地址

```
echo "imx6ul" > /etc/hostname
echo "127.0.0.1 localhost" >> /etc/hosts
echo "127.0.0.1 imx6ul" >> /etc/hosts
```

### **设置串口终端**

```
ln -s /lib/systemd/system/getty@.service /etc/systemd/system/getty.target.wants/getty@ttymxc0.service
```

### **取消挂载**

设置好以后就可以退出根文件系统了，输入如下命令退出：

```
exit
```

退出以后务必再执行一下unmount.sh脚本取消挂载，命令如下：

```
./unmount.sh
```

### 打包ubuntu根文件系统

1、进入到ubuntu根文件系统

```
cd /home/walter/linux/nfs/ubuntu_rootfs
```

2、打包根文件系统

```
sudo tar -vcjf ubuntu_rootfs.tar.bz2 *
```

### ubuntu 根文件系统烧写

根文件系统打包成功，接下来就可以使用 MfgTool 将 ubuntu 根文件系统烧写到开发板上的 EMMC

### 安装桌面

> 由于 I.MX6ULL 孱弱的性能，安装桌面可能并不稳定

```
apt install xubuntu-desktop
```

安装桌面可能会遇到错误：Errors were encountered while processing:bluemanE: Sub-process /usr/bin/dpkg returned an error code (1)，解决方法：

```
mkdir var/lib/dpkg/info/
apt-get -f install
mv /var/lib/dpkg/info/* /var/lib/dpkg/info_old/
rm -rf /var/lib/dpkg/info
mv /var/lib/dpkg/info_old/ /var/lib/dpkg/info/
```

提示：如果以上方法仍然有报错，建议使用命令apt update，一般情况下都能解决！

## 遇到的问题

### 串口终端不可用

**arm移植ubuntu系统启动终端出现A start job is running for dev-ttymxc0.device** 

**1.在/etc/init/ 增加 ttymxc0.conf文件**

```
# console - getty#
# This service maintains a getty on console from the point the system is
# started until it is shut down again.


start on stopped rc RUNLEVEL=[2345] and container CONTAINER=lxc

stop on runlevel [!2345]

respawn
exec /sbin/getty -L 115200 ttymxc0 vt100
```

保存

**2.建立一个软连接**

```
ln -s /lib/systemd/system/getty@.service /etc/systemd/system/getty.target.wants/getty@ttymxc0.service
```

### 创建用户

> 创建用户，在Ubuntu系统上创建新用户使用[sudo useradd 用户名]命令，但只能创建用户，不能在/home/中创建用户目录，也无法设置用户权限。以下为创建新用户并且分配权限的正确方法。

**添加一个用户**

```
sudo useradd username -m
```

切换用户时su username出现了“$”问题

输入 exit 退出“$”

修改 /etc/passwd 文件，将sh改为bash
