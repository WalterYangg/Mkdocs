---
title: L V G L
date: 2025-11-23
categories:
  - 备忘
author: Walter
links:
  - LVGL官方教程: https://docs.lvgl.io/8.3/
  - 百问网LVGL中文教程: http://lvgl.100ask.net/8.2/
---

<!-- more -->

# LVGL

## 目录简介

LVGL目录文件众多，理清这些文件的功能和作用是我们移植的第一步

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

[LVGL8.1笔记1–显示移植](https://blog.csdn.net/qq_38685043/article/details/124786944)

## 基础对象

> LVGL是以对象为概念的，而其最核心的基础对象是lv_obj控件，其他所有专用控件（如按钮，标签，列表）都是在lv_obj对象的基础上衍生出来的。所有对象都使用`lv_obj_t`指针作为句柄来引用。这个指针可以用来设置或获取对象的属性。所有的控件对象都具备一些共同属性，例如：
> \1. 位置
> \2. 大小
> \3. 父类
> \4. 是否可拖拽
> \5. 是否可点击
>
> 共同属性都是通过一套共同的API接口来设置的。
> 除了共同属性外,不同的控件都会有自己的专有属性。

### 创建对象

创建一个基础对象 `obj `，*这是没有父对象的特殊对象。所以它们可以像这样创建*

```
lv_obj_t * obj = lv_obj_create(lv_scr_act()); //这里参数是作为创建对象的父类
```

### 大小

设置宽度：

```
lv_obj_set_width(obj, new_width);
```

设置高度：

```
lv_obj_set_height(obj, new_height);
```

同时设置宽度、高度：

```
lv_obj_set_size(obj, new_width, new_height);
```

### 位置

> 位置设置遵循以左上角为原点的LCD坐标系

设置x轴方向的坐标位置：

```
lv_obj_set_x(obj, new_x);
```

设置y轴方向的坐标位置：

```
lv_obj_set_y(obj, new_y);
```

同时设置x、y坐标位置：

```
lv_obj_set_pos(obj, new_x, new_y); // position
```

**对齐**

参照父对象对齐：

```
lv_obj_set_align(obj, LV_ALIGN_...);
```

参照父对象对齐后再设置偏移：

```
lv_obj_align(obj, LV_ALIGN_..., x, y);
```

参照另一个对象(无父子关系)对齐后设置偏移：

```
lv_obj_align_to(obj_to_align, //选中的对象
                obj_referece, //被参照的对象
                LV_ALIGN_..., //对齐类型
                x, y          //偏移坐标
);
```

**对齐类型**

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

### 盒子模型

### 样式

> Styles 用于设置对象的外观。
> `样式是一个 lv_style_t 变量 `，它可以保存边框宽度、文本颜色等属性。
> 将样式(变量)分配给对象就可以改变其外观。在赋值过程中，可以指定 `目标部分 `和 `目标状态 `。
> 一个样式可以给多个对象使用（正常样式）。
> 样式可以级联，也就是可以将多个样式分配给一个对象。所以，我们不用将所有属性都在一个样式中指定，可以通过多个样式组合的形式指定。 LVGL 会优先使用我们定义的样式，如果没有就会使用默认值。
> 后来添加的样式具有更高的优先级。也就是说如果在两种样式中指定了同一个属性，则将使用最后添加的样式。
> 如果对象中未指定某些属性（例如文本颜色），就会从父级继承。
> 上面说的是 “正常” 样式，对象还有本地样式，它比 “正常” 样式具有更高的优先级。
> 可以定义有过渡效果的样式。
> 默认有一个样式主题，我们也可以自己定义样式主题，作为默认的样式主题使用。

样式存储在 lv_style_t 变量中。样式变量应该是 静态 、全局或动态分配 的。 也就是它们不能是函数中的局部变量，因为当函数结束时它们会被销毁

```
// 创建对象
lv_obj_t * obj = lv_obj_create(lv_scr_act());
//定义样式变量
static lv_style_t style_obj;
//初始化样式
lv_style_init(&style_obj);
//设置样式属性
lv_style_set_bg_color(&style_obj, lv_color_hex(0x000000)); // 设置属性:背景色
// 添加样式到对象
lv_obj_add_style(obj,       //应用对象
                 &style_obj,//设置的样式
                 0          //这里第三个参数决定对象的触发状态和部分样式
); 
```

状态(States)

- 对象可以处于以下状态的组合：
- LV_STATE_DEFAULT (0x0000) 正常，释放状态
- LV_STATE_CHECKED (0x0001) 切换或检查状态
- LV_STATE_FOCUSED (0x0002) 通过键盘或编码器聚焦或通过触摸板/鼠标点击
- LV_STATE_FOCUS_KEY (0x0004) 通过键盘或编码器聚焦，但不通过触摸板/鼠标聚焦
- LV_STATE_EDITED (0x0008) 由编码器编辑
- LV_STATE_HOVERED (0x0010) 鼠标悬停（现在不支持）
- LV_STATE_PRESSED (0x0020) 被按下
- LV_STATE_SCROLLED (0x0040) 正在滚动
- LV_STATE_DISABLED (0x0080) 禁用状态
- LV_STATE_USER_1 (0x1000) 自定义状态
- LV_STATE_USER_2 (0x2000) 自定义状态
- LV_STATE_USER_3 (0x4000) 自定义状态
- LV_STATE_USER_4 (0x8000) 自定义状态
- 这些可能会随着lvgl的更新而不断增加，同学们可以阅读最新版本的文档获取最新资料。

部分(Part)

- 对象可以有 部分(parts) ，它们也可以有自己的样式。LVGL 中存在以下预定义部分：
- LV_PART_MAIN 类似矩形的背景
- LV_PART_SCROLLBAR 滚动条
- LV_PART_INDICATOR 指标，例如用于滑块、条、开关或复选框的勾选框
- LV_PART_KNOB 像手柄一样可以抓取调整值
- LV_PART_SELECTED 表示当前选择的选项或部分
- LV_PART_ITEMS 如果小部件具有多个相似元素（例如表格单元格）
- LV_PART_TICKS 刻度上的刻度，例如对于图表或仪表
- LV_PART_CURSOR 标记一个特定的地方，例如文本区域或图表的光标
- LV_PART_CUSTOM_FIRST 可以从这里添加自定义部件。
- 这些可能会随着lvgl的更新而不断增加，同学们可以阅读最新版本的文档获取最新资料。

样式属性[Style properties — LVGL documentation](https://docs.lvgl.io/8.1/overview/style-props.html)

**过渡特效**

> 默认情况下，当一个对象改变状态（例如它被按下）时，新状态的新属性会立即设置。但是，通过转换，可以在状态更改时播放动画。 例如，按下按钮时，其背景颜色可以在 300 毫秒内动画显示为按下的颜色。

### 事件

> 当用户的触发被对象响应时将会跳转到对应的回调函数中执行事件的触发任务，这也是用户操作逻辑的基本之一

**添加事件**

```
lv_obj_add_event_cb(obj,       //触发对象
                    event_cb,  //回调函数
                    event_code,//事件类型
                    user_data  //用户数据:可以是其他对象的句柄
);
```

事件类型（Event_D-code）

- 输入设备事件(Input device )
- 绘图事件(Drawing events)
- 其他事件(Special events)
- 特殊事件(Other events)
- 自定义事件(Custom events)

**发送事件**：*通过间接的方式将事件传给另一个对象*

```
lv_event_send(obj, event_cb, event_code, user_data);
```

**删除事件**

```
v_obj_remove_event_cb(obj,    //要删除的对象
                      event_cb//事件的回调函数
);
lv_obj_remove_event_dsc(obj,
                        event_dsc //event_dsc 是 lv_obj_add_event_cb 返回的指针
);
```

**回调函数的参数**：回调函数被允许传入一些参数，事件回调函数只有一个参数，这个参数对我们的作用非常大，现在的版本提供这些功能：

- 获取触发的事件代码：
- 获取触发事件的对象：
- 获取事件传递的用户数据：
- 获取最初触发事件的对象(事件冒泡)：

```
static void my_event_cb(lv_event_t * e)  //回调函数
{
    lv_obj_t * obj = lv_event_get_target(e);        // 获取触发事件的部件(对象)
    lv_event_code_t code = lv_event_get_code(e);    // 获取当前部件(对象)触发的事件代码
    lv_obj_t * label = lv_event_get_user_data(e);   // 获取添加事件时传递的用户数据

    switch(code){
        case LV_EVENT_PRESSED:
            lv_label_set_text(label, "LV_EVENT_PRESSED");
            lv_obj_set_style_bg_color(obj, lv_color_hex(0xc43e1c), 0);  // 通过本地样式(私有样式)设置背景色
            printf("LV_EVENT_PRESSED\n");
            break;
        case LV_EVENT_LONG_PRESSED:
            lv_label_set_text(label, "LV_EVENT_LONG_PRESSED");
            lv_obj_set_style_bg_color(obj, lv_color_hex(0x4cbe37), 0);  // 通过本地样式(私有样式)设置背景色
            printf("LV_EVENT_LONG_PRESSED\n");
            break;
        default:
            //printf("NONE\n");
            break;
    }
}

void lv_100ask_demo_course_2_2_6(void)
{
    /* 创建基础部件(对象) */
    lv_obj_t * obj = lv_obj_create(lv_scr_act());

    /* 创建label部件(对象) */
    lv_obj_t * label = lv_label_create(lv_scr_act());
    lv_label_set_text(label, "test");   // 设置label展示的文字
    lv_obj_center(label);               // 将对象与其父对象的中心对齐，这里的父对象是屏幕：lv_scr_act()

    // 为obj1添加事件回调函数，所有的事件类型都能触发该回调函数
    lv_obj_add_event_cb(obj, my_event_cb, LV_EVENT_ALL, label);
}
```

### 属性

显示与隐藏

```
//要显示哪一个图标，就消除hidden flag
lv_obj_add_flag(guider_ui.screen_1_img_0, LV_OBJ_FLAG_HIDDEN); //隐藏
lv_obj_clear_flag(guider_ui.screen_1_img_0, LV_OBJ_FLAG_HIDDEN);//显示
```

### 动画

[ESP32 LVGL8.1 ——anim 动画](https://blog.csdn.net/believe666/article/details/122006827?ydreferer=aHR0cHM6Ly93d3cuYmluZy5jb20v)

[LVGL库入门教程 – 动画 – 冰封残烛 – 博客园 (cnblogs.com)](https://www.cnblogs.com/frozencandles/p/16422019.html)

## 标签

> 标签是用来显示文本的基本对象类型。
>
> 在盒子模型里面，标签的组成包括：
>
> - LV_PART_MAIN 矩形部分(盒子区域)。填充值可用于在文本和背景之间添加空间。
> - LV_PART_SCROLLBAR 当要展示的文本大于部件的大小时，显示的滚动条部分，
> - LV_PART_SELECTED 选中文本时，突出显示的部分。label只能使用 text_color 和 bg_color 样式属性

**创建标签：**

```
lv_obj_t * label = lv_label_create(parent);
//直接设置要显示的文本：
lv_label_set_text(label, "New text");
//格式化给定要显示的文本：
lv_label_set_text_fmt(label, “%s: %d”, “Value”, 15);
//要在label换行非常简单，像printf函数那样使用 \n 即可：
lv_label_set_text(label, " line1\nline2\n\nline4 ");
//文本不存储在动态内存中，而是直接使用给定的缓冲区：
lv_label_set_text_static(label, "New text");
```

**文本大小**

**文本着色**

**显示图标**

LVGL内置了一些图标，它们是全局变量我们可以直接使用：

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

用法也很简单

```
lv_label_set_text(my_label, LV_SYMBOL_OK);             // 直接显示图标
lv_label_set_text(my_label, LV_SYMBOL_OK “Apply”);   // 图标与字符串一起使用
lv_label_set_text(my_label, LV_SYMBOL_OK LV_SYMBOL_WIFI LV_SYMBOL_PLAY);     // 多个图标一起使用
```

**事件处理**

Label默认不接收输入事件，如果我们想设置输入类型的样式或者事件会无法生效，就需要打开 LV_OBJ_FLAG_CLICKABLE，示例：

```
lv_obj_add_flag(label, LV_OBJ_FLAG_CLICKABLE);  // 使输入设备可点击对象
```

**显示中文**

LVGL内置有一个中文字库 CJK字库 ，这个字库在 lv_conf.h中定义为：LV_FONT_SIMSUN_16_CJK。

但这个字库的中文数量并不全只有大约1000个汉字。

```
#define LV_FONT_SIMSUN_16_CJK            0  /*1000 most common CJK radicals*/
```

使用内置字库字体

```
lv_obj_set_style_text_font(label, &lv_font_simsun_16_cjk, 0); //字库声明的全小写
lv_label_set_text(label, "你好中国");
```

如果要用其他的中文字体就需要使用字体转换器

**字体转换器与字体使用**

字体文件我们可以使用开源的字体或者自己制作出来，准备好了字体文件之后使用字体转换器即可转换成可以在lvgl上使用的字体格式。开源字体获取页面：

http://lvgl.100ask.net/8.1/tools/fonts-zh-source.html

准备好字体文件之后就可以通过lvgl官方提供的字体转换器，提取转换你想要的字体，LVGL官方在线字体转换器页面：

https://lvgl.io/tools/fontconverter

- 为要输出字体命名。例如“font_source_han_sans_bold_20”
- 以 px为单位指定高度（字体大小）
- 设置bpp (bit-per-piel)。值越高，字体越平滑（抗锯齿）
- 选择TTF 或 WOFF 格式字体文件
- 设置要包含在字体中的 Unicode 字符范围或在符号字段中列出字符
- 可以同时选择多个字体文件转换，并为其指定范围和/或符号。这些字符将被合并转换到同一个文件中。
- 单击转换按钮以下载转换出来的 font_source_han_sans_bold_20.c 文件。

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

如何在 LVGL 中使用生成的字体？ 将结果 C 文件复制到你的 LVGL 项目中，并包含到项目； 在你的项目应用程序的 C 文件中，将字体声明为：

```
 extern lv_font_t my_font_name;   //或                               
 # define LV_FONT_DECLARE(my_font_name); 
//在样式中设置字体：
lv_style_set_text_font(&style_obj, &my_font_name);  // 普通(共享)样式
lv_obj_set_style_text_font(label, &my_font_name, 0);  // 私有(本地)样式                                                                                                                                                                            
```

unicode 是统一所有语言的一套编码。 utf-8是基于unicode编码的一种节约字节的编码。

`**务必使用utf-8编码的字体** `否则不能正常显示，设置好字体后，就可以直接显示文本:

```
lv_label_set_text(label, "New text");
```

## 按钮

## LVGL输入设备

LVGL支持多种**输入设备**：`鼠标、触摸屏、 键盘、编码器、按键等`

在LVGL中，输入设备是通过 `组`(Group) 来连接各个部件的*,下面以按键为例添加完整的输入设备过程*

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

配置输入

在 LVGL – >example 文件夹中找到内置的`lv_port_indev_template.c`重命名为`v_port_indev_.c`并移动到 included 文件夹中

在 `lv_port_indev.c `文件中配置输入，包含头文件按键驱动函数 `include "./BSP/KEY/key.h"`

使能按键的相关函数

```
/* 键盘 */
static void keypad_init(void);
static void keypad_read(lv_indev_drv_t * indev_drv, lv_indev_data_t * data);
static uint32_t keypad_get_key(void);

/**********************
 *  STATIC VARIABLES
 **********************/
//lv_indev_t * indev_touchpad;    // 触摸屏
//lv_indev_t * indev_mouse;       // 鼠标
lv_indev_t * indev_keypad;      // 键盘
//lv_indev_t * indev_encoder;     // 编码器
//lv_indev_t * indev_button;      // 按钮

void lv_port_indev_init(void)
{
      static lv_indev_drv_t indev_drv;
    /*------------------
     * 键盘
     * -----------------*/

    /* 初始化键盘(如果有) */
    keypad_init();

    /* 注册键盘输入设备 */
    lv_indev_drv_init(&indev_drv);
    indev_drv.type = LV_INDEV_TYPE_KEYPAD;
    indev_drv.read_cb = keypad_read;
    indev_keypad = lv_indev_drv_register(&indev_drv);
}
/**
 * @brief       初始化键盘
 * @param       无
 * @retval      无
 */
static void keypad_init(void)
{
    /*Your code comes here*/
    key_init();
}
/**
 * @brief       图形库的键盘读取回调函数
 * @param       indev_drv : 键盘设备
 *   @arg       data      : 输入设备数据结构体
 * @retval      无
 */
static void keypad_read(lv_indev_drv_t * indev_drv, lv_indev_data_t * data)
{
    static uint32_t last_key = 0;

//    /* 这段代码是 LVGL 给出的例子，这里获取坐标好像是多余的 */
//    /*Get the current x and y coordinates*/
//    mouse_get_xy(&data->point.x, &data->point.y);

    /* 获取按键是否被按下，并保存键值 */
    uint32_t act_key = keypad_get_key();
    if(act_key != 0) {
        data->state = LV_INDEV_STATE_PR;

        /* 将键值转换成 LVGL 的控制字符 */
        switch(act_key) {
        case KEY0_PRES:
            act_key = LV_KEY_NEXT;
            break;
        case KEY1_PRES:
            act_key = LV_KEY_PREV;
            break;
        case WKUP_PRES:
            act_key = LV_KEY_ENTER;
            break;
        }

        last_key = act_key;
    } else {
        data->state = LV_INDEV_STATE_REL;
    }

    data->key = last_key;
}
/**
 * @brief       获取当前正在按下的按键
 * @param       无
 * @retval      0 : 按键没有被按下
 */
static uint32_t keypad_get_key(void)
{
    /*Your code comes here*/

    return key_scan(0);
}
```

配置组(group)

主函数中声明输入设备

```
extern lv_indev_t * indev_keypad;      // 键盘
```

初始化输入设备

```
lv_port_indev_init();
```

创建组：

```
lv_group_t *g = lv_group_create();
```

设置默认组：*如果部件已加入默认组，使用这种配置*

```
lv_group_set_default(g);
```

添加部件到组：*如果部件未加入默认组，使用这种配置*

```
lv_group_add_obj(g, obj);
```

关联按键和组：

```
lv_indev_set_group(indev_keypad, g);
```

其他参考

- [触摸移植](https://blog.csdn.net/qq_38685043/article/details/125122977)

## LVGL文件系统

移植

[LVGL的文件系统（fs）API对接。](https://blog.csdn.net/qq_26106317/article/details/111224350)

读取文件

读取目录

显示图片

对于显示外部存储的图片有两种办法，第一种是直接使用的原始文件格式，如：png，但需要配合LVGL的图片解码器，较为复杂。这里使用第二方法：将图片转化为二进制bin文件，然后将处理后的文件存放在外部存储(SD)卡的目录下。

[LVGL文件系统移植，中文字库和图片显示_lvgl 文件系统](https://blog.csdn.net/weixin_42487906/article/details/122081322)

**图片制作**

1、使用LVGL官方图片转化在线工具：https://lvgl.io/tools/imageconverter ，需要选择 `Indexed 4 colors` 格式。

2、使用稚晖君制作的批量转化离线工具：https://pan.baidu.com/s/11cPOVYnKkxmd88o-Ouwb5g 提取码：xlju

3、加载一个图片

```
lv_obj_t *img2 = lv_img_create(lv_scr_act());
lv_img_set_src(img2, "S:/Sunny_100.bin");
lv_obj_align(img2, LV_ALIGN_CENTER, 0, 0);
```

加载外部SD卡字体

[ESP32开发学习 LVGL Littlevgl 加载外部SD卡字库显示](https://hellobug.blog.csdn.net/article/details/119411924)

## 页面生命管理周期

[【LVGL】页面管理框架](https://blog.csdn.net/weixin_48896613/article/details/129244716?spm=1001.2101.3001.6650.9&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-9-129244716-blog-126642410.235^v35^pc_relevant_yljh&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-9-129244716-blog-126642410.235^v35^pc_relevant_yljh&utm_relevant_index=15)

[LVGL V8通过按键切换页面](https://blog.csdn.net/m0_37187962/article/details/125526292)

## 消息框架

## 其他

**触摸屏手势识别**

```
//添加事件
lv_obj_add_event_cb(lv_scr_act(), albumpage_gesture_cb, LV_EVENT_GESTURE);
//回调函数
static void albumpage_gesture_cb(lv_event_t * e)
{
    lv_event_code_t event = lv_event_get_code(e);
    if(event == LV_EVENT_GESTURE) {
    	//	等待触屏释放
        lv_indev_wait_release(lv_indev_get_act());
        //	获取方向
        lv_dir_t dir = lv_indev_get_gesture_dir(lv_indev_get_act());
        switch(dir){
        case LV_DIR_LEFT:
                    printf("to left\n");
            break;
        case LV_DIR_RIGHT:
                    printf("to right\n");
            break;
        case LV_DIR_TOP:
                    printf("to top\n");
            break;
        case LV_DIR_BOTTOM:
                    printf("to bottom\n");
            break;
        }
    }
}
```