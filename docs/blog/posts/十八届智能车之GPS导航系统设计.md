---
title: 十八届智能车之GPS导航系统设计
date: 2025-11-23
categories:
  - 备忘
author: Walter
---
十八届全国大学生智能汽车竞赛室外单车组别竞赛规则要求电单车在室外越野场地按照既定路线自动行驶。并要在行进过程中主动躲避锥形桶，坡道等障碍元素。

<!-- more -->

# 十八届智能车之GPS导航系统设计

## 前言

> 十八届全国大学生智能汽车竞赛室外单车组别竞赛规则要求电单车在室外越野场地按照既定路线自动行驶。并要在行进过程中主动躲避锥形桶，坡道等障碍元素。
>
> 由于比赛地点将在露天操场进行，且不会安置电磁线等特殊标记，综合对多种方案的仔细考虑，我们最终选择GPS+IMU的组合作为自主导航的方式。

## 方案设计

越野车是通过GPS模块获取小车的实时位置信息（经纬度），在不同的位置我们可以通过对该位置的信息解析来获取不同的坐标点（经纬度信息），而根据两个不同的坐标点，我们可以得出两个坐标点之间的方位角和距离（注意，这里的角度是关于地球正北方向的角度，也就是0度即为正北方，范围：0~360度且距离的默认单位为m。）。这里我们将跑道的坐标点进行采集并保存起来（如下图，我们采集了8个点，分别为A,B,C,D,E,F,G,H,I,J），接下来我们只需要沿着每个坐标点前进，就可以实现按照跑道进行寻迹了。

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

**通过经纬度计算前视距离、方位角**

已知地球上任意两点的经纬度就可以计算出这两点之间的前视距离和方位角。

前视距离：即两点之间的直线距离。

方位角：指从某一点的真北方向线起，依顺时针方向到另一点方向线之间的夹角。

**通过IMU获得电单车的航向角**

对于GPS来说很容易得到实时位置的经纬度并通过简单的计算获得当前位置与目标位置的方位角，但是这个宏观的位置坐标并不能反映车身的实际姿态，也就是赛车车头朝向(前进方向)，因此需要引入IMU作为辅助获取车身的航向角，实时纠正赛车的航向。

所谓航向角简单来说就是实际航向与真北方向之间的夹角，规定以地理北向为起点，偏东方向为正，定义（-180,180）

显而易见的是，航向角与真北方向有着密切的关系，事实上，对于不具备电子罗盘的六轴IMU我们可以通过将陀螺仪上电时的姿态作为车身的初始位置（设置z轴的0度位置），此时将车头的方向朝向地理北方，这时陀螺仪所返回的偏航角，即为当前车头朝向与真北方向的夹角，称为“对北”操作。

**实际上**，在只使用GPS作为唯一导航方式的情况下，也是可以计算出单车的航向角，方法是计算车身当前位置与上次位置的方位角，在GPS精度允许的情况下这个方位角就是小车当前前进的方向。

```
       if(num%100 == 0)  //设定更新率为500ms
       {
           GPS_Angle  =  get_two_points_azimuth(Measure_Latitude_last,Measure_Longitude_last,Measure_Latitude,Measure_Longitude);    //获取单车当前的前进方向
           Measure_Latitude_last= Measure_Latitude;  //保存当前的经纬度
           Measure_Longitude_last = Measure_Longitude;

       }
```

但是，通过这个方法得到航向角也有着明显的缺点：

- 第一，信息的更新并不及时；航向角的精确度与更新率跟GPS的精度与车的行驶速度有很大的关系。
- 第二，无法测量电单车静止时的姿态角；一旦小车停止运动，航向角的更新也会随之停止。

以上原因，单纯GPS的方法并不是智能车导航的最佳方式。

**控制转向**

当我们记录一个目标点的经纬度后，通过对GPS和IMU的返回的数据处理可以获得单车距目标点的实时位置和方向，以及方位角与航向角的差值，从而得出最后舵机打角的误差值，根据误差值我们可以进行简单的PID处理使单车可以容易的找到该点。当采集的目标点位足够多时只需要沿着每个坐标点前进，赛车就可以按照规定的路线自动循迹。

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

GPS与IMU坐标分析示意图

![img](data:image/svg+xml;base64,PCEtLUFyZ29uTG9hZGluZy0tPgo8c3ZnIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjZmZmZmZmMDAiPjxnPjwvZz4KPC9zdmc+)

GPS导航示意图

### GPS

**说明**

我们选择的是华大北斗双频GPS *TAU1201*模块，配合双频天线使用精度可以达到亚米级，能准确的获得当前位置的经纬信息，基本满足我们的需要。同时，GPS 还有一定的测速功能，在调试时可以使用。

**数据解析**

*TAU1201*模块的输出信息有xxGGA ,xxGLL,xxGSA,xxGSV,xxRMC,xxVTG,xxZDA几种类型，其中xx表示的名称并不是固定的。

其中最重要的是xxRMC和xxGGA两个命令语句，我们对这两个语句进行解析可以得到位置，速度，时间，航向角，定位状态，高度，用于定位的卫星数量等重要信息。

***xxRMC\*** 示例语句为

```
$GNRMC,084301.550,A,3110.4706987,N,12123.2653375,E,10.05,243.2,210713,0.0,W,A*3E\r\n
```

详细的说明如下的表格所示：

| 序号 | 描述                   | 对应示例内容  | 说明                                  |
| ---- | ---------------------- | ------------- | ------------------------------------- |
| 1    | 报文头                 | $GNRMC        |                                       |
| 2    | 世界时间（时、分、秒） | 084301.550    | 8 时 43 分 1.55 秒                    |
| 3    | 定位状态               | A             | A 表示定位有效，V 表示无效            |
| 4    | 纬度(度、分)           | 3110.4706987  | 31 度 10.4706987 分，范围-90 至 90    |
| 5    | 纬度方向               | N             | N：北半球 S：南半球                   |
| 6    | 经度(度、分)           | 12123.2653375 | 121 度 23.2653375 分，范围-180 至 180 |
| 7    | 经度方向               | E             | E：东经 W：西经                       |
| 8    | 地面速度               | 10.05         | 10.05 节，一节约为 1.85km/h           |
| 9    | 地面航向角             | 243.2         | 航向角为 243.2°，范围 0-360           |
| 10   | 时间时间（年、月、日） | 210713        | 2021 年 7 月 13 日                    |
| 11   | 磁偏角                 | 0.0           | 0-180°                                |
| 12   | 磁偏角方向             | W             | E=东，W=西                            |
| 13   | 模式指示               | A             | A=自动，V=数据无效                    |
| 14   | 校验值                 | *3E           |                                       |
| 15   | 结束符                 | \r\n          |                                       |

***xxGGA\*** 示例语句为

```
$GNGGA,084301.550,3110.4706987,N,12123.2653375,E,1,18,3.7,55.1,M,-5.4,M,,0000*69\r\n
```

详细的说明如下的表格所示：

| 序号 | 描述                            | 对应示例内容  | 说明                                  |
| ---- | ------------------------------- | ------------- | ------------------------------------- |
| 1    | 报文头                          | $GNGGA        |                                       |
| 2    | 世界时间（时、分、秒）          | 084301.550    | 8 时 43 分 1.55 秒                    |
| 3    | 纬度(度、分)                    | 3110.4706987  | 31 度 10.4706987 分，范围-90 至 90    |
| 4    | 纬度方向                        | N             | N：北半球 S：南半球                   |
| 5    | 经度(度、分)                    | 12123.2653375 | 121 度 23.2653375 分，范围-180 至 180 |
| 6    | 经度方向                        | E             | E：东经 W：西经                       |
| 7    | GPS 状态                        | 1             | 0=未定位，1=非差分定位，2=差分定位    |
| 8    | 用于定位的卫星数量              | 18            | 18 个用于定位的卫星                   |
| 9    | 水平精度因子                    | 3.7           | 3.7 米                                |
| 10   | 海拔高度                        | 55.1          | 55.1 米                               |
| 11   | 海拔高度单位                    | M             | 表示海拔高度的单位为米                |
| 12   | 大地水准面与 WGS 椭球之间的关系 | -5.4          | -5.4 米                               |
| 13   | 椭球单位                        | M             | 表示椭球单位为米                      |
| 14   | 差分延迟                        |               |                                       |
| 15   | 基站号                          | 0000          |                                       |
| 16   | 校验值                          | *69           |                                       |
| 17   | 结束符                          | \r\n          |                                       |

**读取&解析GPS数据**

```
void USART3_IRQHandler(void)
{
    u8 Res;
    if(USART_GetITStatus(USART3, USART_IT_RXNE) != RESET)//接收到数据
    {
        Res =USART_ReceiveData(USART3);
        if(Res == '$')
        {
            Machine_Flag_GPS = 0;
        }
        USART_RX_3[Machine_Flag_GPS++] = Res;
        if(USART_RX_3[0] == '$' && USART_RX_3[4] == 'M' && USART_RX_3[5] == 'C') //确定是否收到"GPRMC/GNRMC"这一帧数据
        {
            if(Res == '\n')
            {
                memset(GPS_Data.GPS_Buffer, 0, GPS_Buffer_Length);                //清空
                memcpy(GPS_Data.GPS_Buffer, USART_RX_3, Machine_Flag_GPS); 	  //保存数据到GPS_Buffer中
                GPS_Data.isGetData = 1;
                Machine_Flag_GPS = 0;
                memset(USART_RX_3, 0, USART_REC_LEN_3);                           //清空

            }
        }
        if(Machine_Flag_GPS >= USART_REC_LEN_3)
        {
            Machine_Flag_GPS = USART_REC_LEN_3;
        }
    }
		USART_ClearITPendingBit(USART3, USART_IT_RXNE);
}
```

**控制指令**

*TAU1201*提供了一些控制指令，通过串口向模块发送这些指令可以帮助我们初始化必要的参数

| 语句          | 指令(16 进制)                    |
| ------------- | -------------------------------- |
| 打开 GGA 语句 | F1 D9 06 01 03 00 F0 00 01 FB 10 |
| 打开 RMC 语句 | F1 D9 06 01 03 00 F0 05 01 00 1A |
| 打开 GLL 语句 | F1 D9 06 01 03 00 F0 01 01 FC 12 |
| 打开 GSA 语句 | F1 D9 06 01 03 00 F0 02 01 FD 14 |
| 打开 GRS 语句 | F1 D9 06 01 03 00 F0 03 01 FE 16 |
| 打开 GSV 语句 | F1 D9 06 01 03 00 F0 04 01 FF 18 |
| 打开 VTG 语句 | F1 D9 06 01 03 00 F0 06 01 01 1C |
| 打开 ZDA 语句 | F1 D9 06 01 03 00 F0 07 01 02 1E |
| 打开 GST 语句 | F1 D9 06 01 03 00 F0 08 01 03 20 |
| 打开 TXT 语句 | F1 D9 06 01 03 00 F0 40 01 3B 90 |
| 打开 ANT 语句 | F1 D9 06 01 03 00 F0 20 01 1B 50 |
| 关闭 GGA 语句 | F1 D9 06 01 03 00 F0 00 00 FA 0F |
| 关闭 RMC 语句 | F1 D9 06 01 03 00 F0 05 00 FF 19 |
| 关闭 GRS 语句 | F1 D9 06 01 03 00 F0 03 00 FD 15 |
| 关闭 GLL 语句 | F1 D9 06 01 03 00 F0 01 00 FB 11 |
| 关闭 GSV 语句 | F1 D9 06 01 03 00 F0 04 00 FE 17 |
| 关闭 VTG 语句 | F1 D9 06 01 03 00 F0 06 00 00 1B |
| 关闭 ZDA 语句 | F1 D9 06 01 03 00 F0 07 00 01 1D |
| 关闭 GST 语句 | F1 D9 06 01 03 00 F0 08 00 02 1F |
| 关闭 TXT 语句 | F1 D9 06 01 03 00 F0 40 00 3A 8F |
| 关闭 ANT 语句 | F1 D9 06 01 03 00 F0 20 00 1A 4F |

| 输出频率1HZ  | F1 D9 06 42 14 00 00 01 05 00 E8 03 00 00 60 EA 00 00 D0 07 00 00 C8 00 00 00 36 AF |
| ------------ | ------------------------------------------------------------ |
| 输出频率2HZ  | F1 D9 06 42 14 00 00 02 05 00 F4 01 00 00 60 EA 00 00 D0 07 00 00 C8 00 00 00 41 64 |
| 输出频率5HZ  | F1 D9 06 42 14 00 00 05 05 00 C8 00 00 00 60 EA 00 00 D0 07 00 00 C8 00 00 00 17 CE |
| 输出频率10HZ | F1 D9 06 42 14 00 00 0A 05 00 64 00 00 00 60 EA 00 00 D0 07 00 00 C8 00 00 00 B8 ED |
| 冷启动       | F1 D9 06 40 01 00 01 48 22                                   |
| 温启动       | F1 D9 06 40 01 00 02 49 23                                   |
| 热启动       | F1 D9 06 40 01 00 03 4A 24                                   |
| 复位         | F1 D9 06 40 01 00 00 47 21                                   |

初始化控制指令示例

```
void gps_init (void)
{
    const uint8 set_rate[]      = {0xF1, 0xD9, 0x06, 0x42, 0x14, 0x00, 0x00, 0x0A, 0x05, 0x00, 0x64, 0x00, 0x00, 0x00, 0x60, 0xEA, 0x00, 0x00, 0xD0, 0x07, 0x00, 0x00, 0xC8, 0x00, 0x00, 0x00, 0xB8, 0xED};
    const uint8 open_gga[]      = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x00, 0x01, 0xFB, 0x10};
    const uint8 open_rmc[]      = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x05, 0x01, 0x00, 0x1A};

    const uint8 close_gll[]     = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x01, 0x00, 0xFB, 0x11};
    const uint8 close_gsa[]     = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x02, 0x00, 0xFC, 0x13};
    const uint8 close_grs[]     = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x03, 0x00, 0xFD, 0x15};
    const uint8 close_gsv[]     = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x04, 0x00, 0xFE, 0x17};
    const uint8 close_vtg[]     = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x06, 0x00, 0x00, 0x1B};
    const uint8 close_zda[]     = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x07, 0x00, 0x01, 0x1D};
    const uint8 close_gst[]     = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x08, 0x00, 0x02, 0x1F};
    const uint8 close_txt[]     = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x40, 0x00, 0x3A, 0x8F};
    const uint8 close_txt_ant[] = {0xF1, 0xD9, 0x06, 0x01, 0x03, 0x00, 0xF0, 0x20, 0x00, 0x1A, 0x4F};

    fifo_init(&gps_tau1201_receiver_fifo, FIFO_DATA_8BIT, gps_tau1201_receiver_buffer, GPS_TAU1201_BUFFER_SIZE);
    system_delay_ms(500);                                                           // 等待GPS启动后开始初始化
    uart_init(GPS_TAU1201_UART, 115200, GPS_TAU1201_RX, GPS_TAU1201_TX);

    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)set_rate, sizeof(set_rate));       // 设置GPS更新速率为10hz 如果不调用此语句则默认为1hz
    system_delay_ms(200);

    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)open_rmc, sizeof(open_rmc));       // 开启rmc语句
    system_delay_ms(50);
    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)open_gga, sizeof(open_gga));       // 开启gga语句
    system_delay_ms(50);
    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)close_gll, sizeof(close_gll));
    system_delay_ms(50);
    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)close_gsa, sizeof(close_gsa));
    system_delay_ms(50);
    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)close_grs, sizeof(close_grs));
    system_delay_ms(50);
    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)close_gsv, sizeof(close_gsv));
    system_delay_ms(50);
    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)close_vtg, sizeof(close_vtg));
    system_delay_ms(50);
    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)close_zda, sizeof(close_zda));
    system_delay_ms(50);
    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)close_gst, sizeof(close_gst));
    system_delay_ms(50);
    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)close_txt, sizeof(close_txt));
    system_delay_ms(50);
    uart_write_buffer(GPS_TAU1201_UART, (uint8 *)close_txt_ant, sizeof(close_txt_ant));
    system_delay_ms(50);

    gps_tau1201_state = 1;
    uart_rx_interrupt(GPS_TAU1201_UART, 1);
}
```

**坐标系**

GPS 模块输出的坐标信息，是 WGS-84 坐标系的，因此如果地图软件不是 WGS-84 坐标系的则会导致较大的偏差，例如百度地图用的就是 BD-09 坐标系，高德地图用的是 GCJ-02 坐标系。如果想将采集的到的坐标信息在地图上标注出来查看，这里推荐使用一个手机软件，叫做“GPS”工具箱。可以在应用商店内搜索到。

**算法处理**

### IMU

**说明**

九轴IMU包括三轴陀螺仪计，三轴加速度计和三轴磁力计。虽然九轴IMU在z轴上的陀螺仪计配合磁力计解算的结果组成电子罗盘能完美解决IMU的偏航角零点漂移问题，但对于电单车来说，双电机运行产生的强大的电磁场对磁力计的干扰几乎不可避免，并且九轴复杂的姿态解算也让人望而却步，因此我们最终选择的是六轴IMU ***MPU6050***。

通过对六轴陀螺仪传感器的解算最终可以得到反映车身实际姿态的欧拉角，其分别为：

绕x轴旋转的横滚角roll，绕y轴旋转的俯仰角pitch，和绕z轴旋转的偏航角yaw。

**姿态解算**

**零点漂移**

由于偏航角是通过对角速度直接积分得来的，积分环节中存在的积分漂移会随着时间的推移越来越大，就会出现偏航角漂移的问题，这个误差在不使用电子罗盘纠正的情况下也是不可避免的。但是我们仍然可以通过一些方法来分析漂移，尽量减小误差。

[如何处理电子陀螺仪MPU6050的零点漂移问题 – 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/543064519?utm_id=0)

## 控制系统的程序设计

**获得GPS的实时数据**

```
        if(gps_tau1201_flag)
        {
           gps_tau1201_flag = 0;
           if(!gps_data_parse())          //开始解析数据
           {
            Measure_Latitude = gps_tau1201.latitude;
            Measure_Longitude = gps_tau1201.longitude;
           }
        }
```

**采集目标的坐标点**

按键中断记录目标点并保存在数组中

```
Store_Latitude[Index_Capture]=Measure_Latitude;
Store_Longitude[Index_Capture]=Measure_Longitude;
Index_Capture++;
```

**计算实时坐标\**与目标点之间\**的前视距离**

```
//-------------------------------------------------------------------------------------------------------------------
// 函数简介 计算从第一个点到第二个点的距离
// 参数说明 latitude1 第一个点的纬度
// 参数说明 longitude1 第一个点的经度
// 参数说明 latitude2 第二个点的纬度
// 参数说明 longitude2 第二个点的经度
// 返回参数 double 返回两点距离
// 使用示例 get_two_points_distance(latitude1_1, longitude1, latitude2, longitude2);
// 备注信息
//-------------------------------------------------------------------------------------------------------------------
double get_two_points_distance (double latitude1, double longitude1, double latitude2, double longitude2)
{
const double EARTH_RADIUS = 6378137; // 地球半径(单位：m)
double rad_latitude1;
double rad_latitude2;
double rad_longitude1;
double rad_longitude2;
double distance;
double a;
double b;
rad_latitude1 = ANGLE_TO_RAD(latitude1);                                    // 根据角度计算弧度
rad_latitude2 = ANGLE_TO_RAD(latitude2);
rad_longitude1 = ANGLE_TO_RAD(longitude1);
rad_longitude2 = ANGLE_TO_RAD(longitude2);

a = rad_latitude1 - rad_latitude2;
b = rad_longitude1 - rad_longitude2;

distance = 2 * asin(sqrt(pow(sin(a / 2), 2) + cos(rad_latitude1) * cos(rad_latitude2) * pow(sin(b / 2), 2)));   // google maps 里面实现的算法
distance = distance * EARTH_RADIUS;

return distance;
} 
```

***\*计算实时坐标与目标点之间\**的方位角**

```
//-------------------------------------------------------------------------------------------------------------------
// 函数简介     计算从第一个点到第二个点的方位角
// 参数说明     latitude1       第一个点的纬度
// 参数说明     longitude1      第一个点的经度
// 参数说明     latitude2       第二个点的纬度
// 参数说明     longitude2      第二个点的经度
// 返回参数     double          返回方位角（0至360）
// 使用示例     get_two_points_azimuth(latitude1_1, longitude1, latitude2, longitude2);
// 备注信息
//-------------------------------------------------------------------------------------------------------------------
double get_two_points_azimuth (double latitude1, double longitude1, double latitude2, double longitude2)
{
    latitude1 = ANGLE_TO_RAD(latitude1);
    latitude2 = ANGLE_TO_RAD(latitude2);
    longitude1 = ANGLE_TO_RAD(longitude1);
    longitude2 = ANGLE_TO_RAD(longitude2);

    double x = sin(longitude2 - longitude1) * cos(latitude2);
    double y = cos(latitude1) * sin(latitude2) - sin(latitude1) * cos(latitude2) * cos(longitude2 - longitude1);
    double angle = RAD_TO_ANGLE(atan2(x, y));
    return angle;  //((angle > 0) ? angle : (angle + 360));将GPS的的方位角限制在[0,360]之间
}
```

**IMU偏航角零点漂移的纠正**

在定时器为100ms中断的中加入补偿算法

```
if(++mpu_count == 6000)mpu_count = 0;       //偏航角补偿算法
GyroZ = IMU_Angle_Z - 0.0004*mpu_count-0.49;
GyroZ = anglechange(GyroZ);
```

至此，我们获得了GPS与IMU解析的全部关键数据，接下来，对航向角和方位角在统一坐标系下融合分析，得到关于舵机打角的差值。

```
    if((GyroZ + Angle_GPS)>180)                                             //Z轴临界值判断  偏航角加上GPS两点坐标角度计算才是真实要转的角度
        Serve_Angle = (int16)((GyroZ + Angle_GPS-360)/180*100);
    else if((GyroZ + Angle_GPS)<-180)
        Serve_Angle = (int16)((GyroZ + Angle_GPS+360)/180*100);
    else
        Serve_Angle = (int16)((GyroZ + Angle_GPS)/180*100);

    Serve_Angle=Serve_PID(0,Serve_Angle);    //舵机的差值带入位置式PID控制器中计算
```

将舵机的差值带入位置式PID控制器中计算，得到最终控制舵机打角的PWM值

```
double Serve_PID(double setpoint,double nextpoint)
{
    double x;
    double y;
    duoji_Error=setpoint-nextpoint;
    duoji_SumError+=0*duoji_Error;

    if (duoji_SumError >= 0)            //如果误差积分的值大于等于0
    {
        duoji_SumError =0;              //PID[KT]为0  PID[KI]为0
    }
    else if (duoji_SumError<= 0)
    {
        duoji_SumError = 0;
    }
        /*舵机PD控制*/
    x=4*duoji_Error
    +duoji_SumError
    +8*(duoji_Error-duoji_LastError);
    duoji_PrevError=duoji_LastError;
    duoji_LastError=duoji_Error;
        /*舵机PID控制*/
   //duoji_error=nextpoint-setpoint;
   //erroe_cha+=duoji_error;
   //duoji_lasterror=duoji_error;
   //x=floor(duoji_K*duoji_error+duoji_I*erroe_cha);
    y=Serve_mid+x;
    if(y>Serve_max)   //舵机限幅
    {
        y=Serve_max;
    }
    if(y<Serve_min)
    {
        y=Serve_min;
    }
   return  y;
}
```

通过采集多个坐标点，并限定每个点位的有效范围(如2.5m)，当赛车与第一个目标点的距离在2.5之内，即GPS_Distance < 2.5时，认为电单车已经找到第一个目标并同时将下一个采集点作为新的目标点，依次反复，直到单车驶完全程

```
                    if(GPS_Distance > 2.5)
                    {
                          //继续前进
                        pwm_set_duty(TIM2_PWM_MAP1_CH1_A15, Serve_Angle); //舵机打角

                    }
                    else
                    {
                        GPS_Position_Index++;  //目标点后移
                        if(GPS_Position_Index==Index_Capture)//当目标点与采集点相等，说明单车驶完全程
                        {
                           GPS_Position_Index=0;
                            pit_disable(TIM1_PIT);//关闭定时器，运行停止

                        }
                    }
```

## 注意事项及环节优化

1.如果GPS与IMU的坐标数据都统一在[0，360]，当车头朝向真北方向行驶时，此时陀螺仪会在0-360中发生突变，这同时会造成舵机的突变，单车出现不停转圈的现象。

2、为保证双频GPS的精度优势，启动采点前，先观察用于GPS定位的卫星数量，这个搜星数越高，GPS的精度也会更高。

3、陀螺仪启动后，应当保持静置，等偏航角稳定才可使用。