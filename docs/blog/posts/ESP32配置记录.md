---
title:  ESP32配置记录
date: 2025-11-23
categories:
  - 备忘
author: Walter
---
<!-- more -->
# ESP32配置记录

> 本文记于23年五一期间，在配置ESP32常见库时遇到一些问题，防止遗忘，在这做一个简单的总结

- 框架 ：Arduino
- 平台 ：Platformio

## TFT_eSPI

> TFT_eSPI 是通过SPI方式驱动LCD屏幕的一个 Arduino 库，支持数十种驱动芯片，同时为LVGL等基于屏幕开发的驱动开放底层接口

### 配置驱动

驱动的配置主要在用户配置文件 `User_Setup.h `中

1、选择要驱动的屏幕

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

2、设置屏幕大小

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

3、设置引脚

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

**常用API**

设置屏幕方向

```
tft.serRotation(3);
```

参数为：0, 1, 2, 3 分别代表 0°、90°、180°、270°，可设置4为镜像反转。

Demo

```
#include <TFT_eSPI.h>
#include <SPI.h>
    #ifndef TFT_DISPOFF
    #define TFT_DISPOFF 0x28
    #endif

    #ifndef TFT_SLPIN
    #define TFT_SLPIN   0x10
    #endif

    TFT_eSPI tft = TFT_eSPI();

    //全局变量
    int sWidth  = TFT_WIDTH;   //屏幕宽度
    int sHeight = TFT_HEIGHT;  //屏幕高度
    int bgColor = TFT_BLACK;   //背景颜色
    int fgColor = TFT_MAGENTA;  //标题颜色
    int lightPin     = TFT_BL; //屏幕背光控制
void setup() {
    /*-------初始化LCD-------*/
    tft.init();
    //缺少这个位图颜色会反转
    tft.setSwapBytes(true);
    tft.fillScreen(TFT_BLACK);
    tft.print("Hello World!\r\n");
}
void loop()
{
}
```

**重点关注测试屏幕出现的问题**

调用清屏函数点亮屏幕，重点测试红色，蓝色，黑色和白色

```
tft.fillScreen(TFT_BLACK);
```

如果红色和蓝色显示相反，则为BGR屏，在 `User_Setup.h `中关注这两个宏

```
// For ST7735, ST7789 and ILI9341 ONLY, define the colour order IF the blue and red are swapped on your display
// Try ONE option at a time to find the correct colour order for your display

76//  #define TFT_RGB_ORDER TFT_RGB  // Colour order Red-Green-Blue
77 #define TFT_RGB_ORDER TFT_BGR  // Colour order Blue-Green-Red
```

如果黑色和白色显示相反，则为反色，通过取消 `#define TFT_INVERSION_OFF `的注释关闭反色

```
// If colours are inverted (white shows as black) then uncomment one of the next
// 2 lines try both options, one of the options should correct the inversion.

114// #define TFT_INVERSION_ON
115// #define TFT_INVERSION_OFF
```

### 显示图片

**tft_espi中不能直接显示图片，需要添加一个驱动函数**

```
/*-----------------------------图片显示函数-------------------------------*/
#define PI_BUF_SIZE 128
void showImage(int32_t x, int32_t y, int32_t w, int32_t h,  const uint16_t *data){
  int32_t dx = 0;
  int32_t dy = 0;
  int32_t dw = w;
  int32_t dh = h*2;

  if (x < 0) { dw += x; dx = -x; x = 0; }
  if (y < 0) { dh += y; dy = -y; y = 0; }

  if (dw < 1 || dh < 1) return;

  CS_L;

  data += dx + dy * w;

  uint16_t  buffer[PI_BUF_SIZE];
  uint16_t* pix_buffer = buffer;
  uint16_t  high,low;

  tft.setWindow(x, y, x + dw - 1, y + dh - 1);

  // Work out the number whole buffers to send
  uint16_t nb = (dw * dh) / (2 * PI_BUF_SIZE);

  // Fill and send "nb" buffers to TFT
  for (int32_t i = 0; i < nb; i++) {
    for (int32_t j = 0; j < PI_BUF_SIZE; j++) {
      high = pgm_read_word(&data[(i * 2 * PI_BUF_SIZE) + 2 * j + 1]);
      low = pgm_read_word(&data[(i * 2 * PI_BUF_SIZE) + 2 * j ]);
      pix_buffer[j] = (high<<8)+low;
    }
    tft.pushPixels(pix_buffer, PI_BUF_SIZE);
  }

  // Work out number of pixels not yet sent
  uint16_t np = (dw * dh) % (2 * PI_BUF_SIZE);

  // Send any partial buffer left over
  if (np) {
    for (int32_t i = 0; i < np; i++)
    {
      high = pgm_read_word(&data[(nb * 2 * PI_BUF_SIZE) + 2 * i + 1]);
      low = pgm_read_word(&data[(nb * 2 * PI_BUF_SIZE) + 2 * i ]);
      pix_buffer[i] = (high<<8)+low;
    }
    tft.pushPixels(pix_buffer, np);
  }

  CS_H;
}
```

- 1.需要注意的是，如果从Image2Lcd取模图片的话，默认生成的C语言数组类型为 uint8_t ，而本函数的传入的参数 *date 类型为 uint16_t ，会引起冲突而报错，需要做出更改；
- 2.如果图片显示色彩混乱，需要关注main.cpp中的函数，把这个函数注释掉就好了

```
    //缺少这个位图颜色会反转
    // tft.setSwapBytes(true);
```

### 自定义字体

[(231条消息) ESP8266之TFT_eSPI库的自定义字体_esp8266中文字库_I_Still_love_you的博客-CSDN博客](https://blog.csdn.net/guguda1111/article/details/124181168)

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

## SD Card

**初始化**

```
#include <SD.h>                   // 引用SD库
#include <SPI.h>
//MicroSD
    #define MISO     2
    #define SCK      14  //SCL
    #define MOSI     15  //SDA
    #define SD_CS    13

  SPI.begin(SCK, MISO, MOSI, SD_CS);
  if( !SD.begin(SD_CS) ){
    Serial.println("SD card initialization failed!");
    return;
  }
    else{
    Serial.println("SD card ready!");
    }
```

**文件操作示例**

```
   File vFile  //实例化
// if the file opened okay, write to it:
   vFile = SD.open("/test.txt", FILE_WRITE);
  if (vFile) {
    Serial.print("Writing to test.txt...");
    vFile.println("this is just test the SD Card!");
	// close the file:
    vFile.close();
    Serial.println("done.");
  } else {
    // if the file didn't open, print an error:
    Serial.println("error opening test.txt");
  }

    // re-open the file for reading:
  vFile = SD.open("/test.txt");

  if (vFile) {
    Serial.println("test.txt:");

    // read from the file until there's nothing else in it:
    while (vFile.available()) {
    	Serial.write(vFile.read());
      // int *mjpeg_buf = vFile.read();
    }
    vFile.close();// close the file:
  }
  else {
  	// if the file didn't open, print an error:
    Serial.println("error opening test.txt");
  }
```

[Guide to Arduino & Secure Digital (SD) Storage. | Arduino Documentation](https://docs.arduino.cc/learn/programming/sd-guide#hardware--software-required)

注意：SD卡同时只能 读取/写入 一个文件，只有关闭一个文件后才能打开另一个

## Mjpeg

> 这是一个以TFT_eSPI作为驱动的支持MJPEG格式的播放器，可以将格式压缩后的视频存储在SD内，移植前确保TFTLCD和SD初始化正常

移植 Mjpeg 需要添加的解析库

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

Demo

```
#include "MjpegClass.h"
TFT_eSPI *gfx = new TFT_eSPI(240,240);  /*务必添加*/
void setup(){
/******播放视频需要*******/
    #define MJPEG_FILENAME "/example.mjpeg"
    #define MJPEG_BUFFER_SIZE (220 * 176 * 2 / 4)
    static MjpegClass mjpeg;

 gfx->begin();//初始化LCD
 gfx->fillScreen(TFT_BLACK);
}
void loop(){
/*********************播放视频*****************************/
    File vFile = SD.open(MJPEG_FILENAME);
  if (!vFile || vFile.isDirectory()) Serial.println(F("ERROR: Failed to open " MJPEG_FILENAME " file for reading"));
  else{
    uint8_t *mjpeg_buf = (uint8_t *)malloc(MJPEG_BUFFER_SIZE);
    if (!mjpeg_buf) Serial.println(F("mjpeg_buf malloc failed!"));
    else{
      Serial.println(F("MJPEG video start"));
      mjpeg.setup(vFile, mjpeg_buf,gfx, true);
      // Read video
      while(mjpeg.readMjpegBuf()) mjpeg.drawJpg();// Play video
      Serial.println(F("MJPEG video end"));
      vFile.close();
      // esp_restart();
    }
  }
}
```

[esp32 使用TFTe_SPI库在TFTlcd播放视频 – 菜芽caiya – 博客园 (cnblogs.com)](https://www.cnblogs.com/caiya/p/16032966.html)

## LVGL

### 配置驱动文件并运行一个examples

[Arduino — LVGL documentation](https://docs.lvgl.io/latest/en/html/get-started/arduino.html#configure-lvgl)

[ESP32使用LVGL GUI库 – 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/497964133)

这里有非常重要的一点，widgets消耗的内存比较大，需要我们再lv_conf.h文件中的空间开辟大一点，不然程序直接跑飞

```
/*Size of the memory available for `lv_mem_alloc()` in bytes (>= 2kB)*/
#  define LV_MEM_SIZE (64U * 1024U)          /*[bytes]*/
```

### 设计自己的GUI

- **图形化设计界面**

LVGL官方可视化图形设计软件[SquareLine Studio](https://squareline.io/)

恩智浦提供的图形用户开发工具[GUI Guider](https://www.nxp.com/design/software)

[(239条消息) 快速入门GUI-guider_gui guider_mucherry的博客-CSDN博客](https://blog.csdn.net/mucherry/article/details/126830883?spm=1001.2014.3001.5501)

- **WIndowsLVGL模拟器**[Visual_studio: LVGL for Windows](https://github.com/lvgl/lv_port_win_visual_studio)

### 文件系统

>  LVGL开发中经常用到图片显示，LVGL官方有提供PNG,GIF,JPG等解码库，配合LVGL的虚拟文件系统可以实现控件直接加载调用解码库解码并显示，非常的方便。

[(233条消息) LVGL V8.3 使用lvgl文件系统读取SD卡内容基于Arduino_lvgl sd卡_年纪青青的博客-CSDN博客](https://blog.csdn.net/z961968549/article/details/127647638)

[(233条消息) 基于arduino的ESP32 学习笔记（六）LVGL文件系统移植，中文字库和图片显示_esp32中文字库_张竞豪的博客-CSDN博客](https://blog.csdn.net/weixin_42487906/article/details/122081322?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-4-122081322-blog-127647638.235^v32^pc_relevant_default_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-4-122081322-blog-127647638.235^v32^pc_relevant_default_base3&utm_relevant_index=9)

[(233条消息) LittleVGL (LVGL)干货入门教程三之LVGL的文件系统（fs）API对接。_lvgl文件系统_Trisuborn的博客-CSDN博客](https://blog.csdn.net/qq_26106317/article/details/111224350?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-1-111224350-blog-127647638.235^v32^pc_relevant_default_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-1-111224350-blog-127647638.235^v32^pc_relevant_default_base3&utm_relevant_index=2)