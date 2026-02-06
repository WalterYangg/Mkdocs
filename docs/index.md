---
title: 主页
hide:
  - navigation   # ← 隐藏左侧sidebar
  - toc          # ← 隐藏右侧TOC
---
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SeekThink - 导航页</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Fira+Code:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            /* Material Design 颜色变量 - 与MkDocs默认主题匹配 */
            --md-primary-fg-color: #4051b5;
            --md-primary-fg-color--light: #5d6cc0;
            --md-primary-fg-color--dark: #303fa1;
            --md-accent-fg-color: #ff4081;
            --md-default-bg-color: #ffffff;
            --md-default-fg-color: #000000;
            --md-default-fg-color--light: #666666;
            --md-default-fg-color--lighter: #999999;
            --md-code-bg-color: #f5f5f5;
            --md-code-fg-color: #333333;
            --md-typeset-color: #333333;
            --md-typeset-a-color: var(--md-primary-fg-color);
            --md-footer-bg-color: #f5f5f5;
            --md-footer-fg-color: #666666;
            
            /* 导航页自定义变量 */
            --card-bg: rgba(255, 255, 255, 0.95);
            --border-color: rgba(0, 0, 0, 0.08);
            --shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            --blur-intensity: 8px;
            --background-image: none;
            --background-opacity: 0.03;
            --container-max-width: 1200px;
            --ui-opacity: 0.95;
        }

        [data-md-color-scheme="slate"] {
            --md-default-bg-color: #121212;
            --md-default-fg-color: #ffffff;
            --md-default-fg-color--light: #aaaaaa;
            --md-default-fg-color--lighter: #777777;
            --md-code-bg-color: #1e1e1e;
            --md-code-fg-color: #e0e0e0;
            --md-typeset-color: #e0e0e0;
            --md-footer-bg-color: #1a1a1a;
            --md-footer-fg-color: #aaaaaa;
            
            --card-bg: rgba(30, 30, 30, 0.95);
            --border-color: rgba(255, 255, 255, 0.08);
            --shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Noto Sans SC', sans-serif;
            background-color: var(--md-default-bg-color);
            color: var(--md-typeset-color);
            min-height: 100vh;
            transition: background-color 0.3s, color 0.3s;
            position: relative;
            line-height: 1.5;
        }

        .background-layer {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: var(--background-image);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            z-index: -1;
            transition: background-image 0.5s ease, opacity 0.5s ease;
            opacity: var(--background-opacity);
        }

        /* 设置按钮 - 右上角 */
        .settings-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, var(--ui-opacity));
            border: 1px solid var(--border-color);
            color: var(--md-typeset-color);
            cursor: pointer;
            font-size: 16px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            z-index: 100;
            backdrop-filter: blur(var(--blur-intensity));
        }

        .settings-btn:hover {
            background: var(--md-primary-fg-color);
            color: white;
            transform: scale(1.05);
        }

        /* 统一容器样式 */
        .container {
            max-width: var(--container-max-width);
            margin: 0 auto;
            padding: 0 20px;
        }

        /* 主要内容区域 */
        .main-content {
            padding: 60px 0 30px;
        }

        /* 搜索区域 */
        .search-section {
            margin-bottom: 40px;
            text-align: center;
        }

        .search-title {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--md-typeset-color);
        }

        .search-subtitle {
            font-size: 15px;
            color: var(--md-default-fg-color--light);
            margin-bottom: 25px;
        }

        .search-box {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            position: relative;
        }

        .search-box input {
            width: 100%;
            padding: 14px 20px;
            border-radius: 24px;
            border: 1px solid var(--border-color);
            background-color: rgba(255, 255, 255, var(--ui-opacity));
            color: var(--md-typeset-color);
            font-size: 15px;
            box-shadow: var(--shadow);
            transition: all 0.3s;
            backdrop-filter: blur(var(--blur-intensity));
            font-family: 'Noto Sans SC', sans-serif;
        }

        .search-box input:focus {
            outline: none;
            border-color: var(--md-primary-fg-color);
            box-shadow: 0 0 0 2px rgba(64, 81, 181, 0.1);
        }

        /* 分类区域 */
        .categories-section {
            margin-bottom: 30px;
        }

        .section-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            color: var(--md-typeset-color);
            text-align: center;
        }

        .categories {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .category-btn {
            padding: 8px 16px;
            border-radius: 16px;
            border: 1px solid var(--border-color);
            background-color: rgba(255, 255, 255, var(--ui-opacity));
            color: var(--md-typeset-color);
            cursor: pointer;
            transition: all 0.3s;
            backdrop-filter: blur(var(--blur-intensity));
            font-family: 'Noto Sans SC', sans-serif;
            font-weight: 500;
            font-size: 14px;
        }

        .category-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .category-btn.active {
            background-color: var(--md-primary-fg-color);
            color: white;
            border-color: var(--md-primary-fg-color);
            transform: translateY(-1px);
            box-shadow: 0 2px 6px rgba(64, 81, 181, 0.2);
        }

        /* 链接网格 */
        .links-section {
            margin-bottom: 40px;
            display: none; /* 默认隐藏 */
        }

        .links-section.active {
            display: block; /* 激活时显示 */
        }

        .links-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 16px;
            opacity: 1;
            transition: opacity 0.3s ease;
        }

        .links-grid.fade-out {
            opacity: 0;
        }

        .link-card {
            background-color: rgba(255, 255, 255, var(--ui-opacity));
            border-radius: 10px;
            padding: 20px 16px;
            box-shadow: var(--shadow);
            transition: transform 0.3s, box-shadow 0.3s, opacity 0.3s;
            cursor: pointer;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: inherit;
            backdrop-filter: blur(var(--blur-intensity));
            border: 1px solid var(--border-color);
            opacity: 0;
            transform: translateY(15px);
            animation: card-appear 0.5s ease forwards;
        }

        @keyframes card-appear {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .link-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            background-color: rgba(255, 255, 255, 0.98);
            border-color: var(--md-primary-fg-color);
        }

        [data-md-color-scheme="slate"] .link-card:hover {
            background-color: rgba(40, 40, 40, 0.98);
        }

        .link-icon {
            width: 44px;
            height: 44px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            font-size: 20px;
            background-color: rgba(64, 81, 181, 0.08);
            color: var(--md-primary-fg-color);
            transition: transform 0.3s;
        }

        .link-card:hover .link-icon {
            transform: scale(1.05);
            background-color: rgba(64, 81, 181, 0.12);
        }

        .link-name {
            font-weight: 500;
            font-size: 14px;
        }

        /* 页脚 */
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 13px;
            color: var(--md-default-fg-color--light);
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
        }

        /* 设置面板样式 */
        .settings-panel {
            position: fixed;
            top: 0;
            right: -400px;
            width: 380px;
            height: 100vh;
            background-color: rgba(255, 255, 255, var(--ui-opacity));
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
            padding: 24px;
            overflow-y: auto;
            transition: right 0.3s ease;
            z-index: 1000;
            backdrop-filter: blur(var(--blur-intensity));
        }

        .settings-panel.active {
            right: 0;
        }

        .settings-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--border-color);
        }

        .settings-title {
            font-size: 18px;
            font-weight: 600;
        }

        .close-settings {
            background: none;
            border: none;
            font-size: 20px;
            color: var(--md-typeset-color);
            cursor: pointer;
            transition: transform 0.3s;
        }

        .close-settings:hover {
            transform: rotate(90deg);
        }

        .settings-section {
            margin-bottom: 20px;
        }

        .settings-section h3 {
            margin-bottom: 12px;
            font-size: 15px;
            color: var(--md-primary-fg-color);
        }

        .background-options {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-bottom: 12px;
        }

        .bg-option {
            aspect-ratio: 1;
            border-radius: 6px;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
        }

        .bg-option:hover {
            transform: scale(1.03);
        }

        .bg-option.active {
            border-color: var(--md-primary-fg-color);
            box-shadow: 0 0 0 1px rgba(64, 81, 181, 0.2);
        }

        /* 极简主义背景选项 */
        .bg-option.preset-1 {
            background: #ffffff;
        }

        .bg-option.preset-2 {
            background: #f8f9fa;
        }

        .bg-option.preset-3 {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .bg-option.preset-4 {
            background: linear-gradient(135deg, #e3e9f7 0%, #ffffff 100%);
        }

        .bg-option.preset-5 {
            background: #ffffff;
            background-image: 
                radial-gradient(circle at 25% 25%, rgba(64, 81, 181, 0.03) 10%, transparent 20%),
                radial-gradient(circle at 75% 75%, rgba(64, 81, 181, 0.03) 10%, transparent 20%);
        }

        .bg-option.preset-6 {
            background: #ffffff;
            background-image: 
                linear-gradient(90deg, transparent 24px, rgba(64, 81, 181, 0.02) 24px, rgba(64, 81, 181, 0.02) 25px, transparent 25px),
                linear-gradient(0deg, transparent 24px, rgba(64, 81, 181, 0.02) 24px, rgba(64, 81, 181, 0.02) 25px, transparent 25px);
            background-size: 25px 25px;
        }

        .custom-bg-input {
            display: flex;
            gap: 8px;
            margin-top: 8px;
        }

        .custom-bg-input input {
            flex: 1;
            padding: 8px 12px;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            background-color: rgba(255, 255, 255, var(--ui-opacity));
            color: var(--md-typeset-color);
            transition: all 0.3s;
            font-family: 'Noto Sans SC', sans-serif;
            font-size: 14px;
        }

        .custom-bg-input input:focus {
            outline: none;
            border-color: var(--md-primary-fg-color);
            box-shadow: 0 0 0 2px rgba(64, 81, 181, 0.1);
        }

        .custom-bg-input button {
            padding: 8px 12px;
            border-radius: 6px;
            border: none;
            background-color: var(--md-primary-fg-color);
            color: white;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'Noto Sans SC', sans-serif;
            font-weight: 500;
            font-size: 14px;
        }

        .custom-bg-input button:hover {
            background-color: var(--md-primary-fg-color--dark);
            transform: translateY(-1px);
        }

        .slider-container {
            margin-bottom: 12px;
        }

        .slider-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
            font-size: 14px;
        }

        .slider {
            width: 100%;
            height: 4px;
            border-radius: 4px;
            background: var(--border-color);
            outline: none;
            -webkit-appearance: none;
            transition: background 0.3s;
        }

        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--md-primary-fg-color);
            cursor: pointer;
            transition: all 0.3s;
        }

        .slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 0 0 2px rgba(64, 81, 181, 0.2);
        }

        .reset-btn {
            padding: 10px 12px;
            border-radius: 6px;
            border: none;
            background-color: #ff4757;
            color: white;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'Noto Sans SC', sans-serif;
            font-weight: 500;
            width: 100%;
            font-size: 14px;
        }

        .reset-btn:hover {
            background-color: #ff3742;
            transform: translateY(-1px);
        }

        /* 空状态样式 */
        .empty-state {
            grid-column: 1 / -1;
            text-align: center;
            padding: 50px 20px;
            color: var(--md-default-fg-color--light);
        }

        .empty-state i {
            font-size: 40px;
            margin-bottom: 12px;
            color: var(--md-default-fg-color--lighter);
        }

        .empty-state p {
            font-size: 16px;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .links-grid {
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            }
            
            .settings-panel {
                width: 100%;
                right: -100%;
            }
        }

        @media (max-width: 480px) {
            .search-title {
                font-size: 22px;
            }
            
            .categories {
                justify-content: center;
            }
            
            .links-grid {
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            }
        }
    </style>
</head>
<body data-md-color-scheme="default">
    <!-- 背景层 -->
    <div class="background-layer" id="backgroundLayer"></div>

    <!-- 设置按钮 - 右上角 -->
    <button class="settings-btn" id="settingsToggle">
        <i class="fas fa-cog"></i>
    </button>

    <!-- 主要内容 -->
    <main class="main-content">
        <div class="container">
            <!-- 搜索区域 -->
            <section class="search-section">
                <h1 class="search-title"> </h1>
                
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="搜索或输入网址...">
                </div>
            </section>
            
            <!-- 分类区域 -->
            <section class="categories-section">
                
                <div class="categories" id="categories">
                    <!-- 分类按钮将通过JS动态生成 -->
                </div>
            </section>
            
            <!-- 链接网格 - 默认隐藏 -->
            <section class="links-section" id="linksSection">
                
                <div class="links-grid" id="linksGrid">
                    <!-- 默认不显示任何链接 -->
                </div>
            </section>
        </div>
    </main>

   <!-- 页脚 -->



    <!-- 设置面板 -->
    <div class="settings-panel" id="settingsPanel">
        <div class="settings-header">
            <div class="settings-title">个性化设置</div>
            <button class="close-settings" id="closeSettings">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="settings-section">
            <h3>背景设置</h3>
            <div class="background-options" id="backgroundOptions">
                <div class="bg-option preset-1 active" data-bg="none"></div>
                <div class="bg-option preset-2" data-bg="linear-gradient(#f8f9fa, #f8f9fa)"></div>
                <div class="bg-option preset-3" data-bg="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"></div>
                <div class="bg-option preset-4" data-bg="linear-gradient(135deg, #e3e9f7 0%, #ffffff 100%)"></div>
                <div class="bg-option preset-5" data-bg="radial-gradient(circle at 25% 25%, rgba(64, 81, 181, 0.03) 10%, transparent 20%), radial-gradient(circle at 75% 75%, rgba(64, 81, 181, 0.03) 10%, transparent 20%)"></div>
                <div class="bg-option preset-6" data-bg="linear-gradient(90deg, transparent 24px, rgba(64, 81, 181, 0.02) 24px, rgba(64, 81, 181, 0.02) 25px, transparent 25px), linear-gradient(0deg, transparent 24px, rgba(64, 81, 181, 0.02) 24px, rgba(64, 81, 181, 0.02) 25px, transparent 25px)"></div>
            </div>
            <div class="custom-bg-input">
                <input type="text" id="customBgInput" placeholder="输入图片URL...">
                <button id="applyCustomBg">应用</button>
            </div>
            <div class="slider-container">
                <div class="slider-label">
                    <span>背景强度</span>
                    <span id="bgOpacityValue">3%</span>
                </div>
                <input type="range" min="0" max="50" value="3" class="slider" id="bgOpacitySlider">
            </div>
        </div>
        
        <div class="settings-section">
            <h3>视觉效果</h3>
            <div class="slider-container">
                <div class="slider-label">
                    <span>UI透明度</span>
                    <span id="opacityValue">95%</span>
                </div>
                <input type="range" min="10" max="100" value="95" class="slider" id="opacitySlider">
            </div>
            <div class="slider-container">
                <div class="slider-label">
                    <span>毛玻璃效果</span>
                    <span id="blurValue">8px</span>
                </div>
                <input type="range" min="0" max="40" value="8" class="slider" id="blurSlider">
            </div>
        </div>
        
        <div class="settings-section">
            <h3>重置设置</h3>
            <button class="reset-btn" id="resetSettings">
                恢复默认设置
            </button>
        </div>
    </div>

    <!-- 数据配置 - 您可以轻松修改这部分来添加/删除标签 -->
    <script id="siteData">
        // 网站数据配置
        // 您可以轻松修改这部分来添加、删除或修改标签
        const siteData = {
            categories: [
                { id: 'myapps', name: '我的应用' },
                { id: 'tools', name: '在线工具' },
                { id: 'docs', name: '参考文档' },
                { id: 'forums', name: '网站论坛' },
                { id: 'dev', name: '技术开发' },
                { id: 'panels', name: '服务面板' }
            ],
            links: [
                // 我的应用
                { id: 'memos', name: 'Memos', url: 'http://memos.hiquq.com/', category: 'myapps' },
                { id: 'openlist', name: 'OpenList', url: 'http://openlist.hiquq.com/', category: 'myapps' },
                { id: 'lib', name: 'Lib', url: 'http://lib.hiquq.com/', category: 'myapps' },
                { id: 'jellyfin', name: 'Jellyfin', url: 'http://m.hiquq.com/web/', category: 'myapps' },
                { id: 'npm', name: 'NPM', url: 'http://npm.hiquq.com/', category: 'myapps' },
                { id: 'stirlingpdf', name: 'StirlingPDF', url: 'http://pdf.hiquq.com/', category: 'myapps' },
                { id: 'lsky', name: '兰空图床', url: 'http://lsky.sth.ink/', category: 'myapps' },
                { id: 'filebox', name: 'FB文件快递柜', url: 'http://box.hiquq.com/', category: 'myapps' },
                { id: 'filebox-admin', name: 'FB管理员', url: 'http://box.hiquq.com/#/admin', category: 'myapps' },
                
                // 在线工具
                { id: 'lkssite', name: 'LKSsite', url: 'https://lkssite.vip/', category: 'tools' },
                { id: 'visionon', name: 'Visionon', url: 'https://pub.visionon.cn/', category: 'tools' },
                { id: 'helloworld', name: 'helloworld', url: 'https://www.helloworld.net/html2md', category: 'tools' },
                { id: 'savetube', name: 'SaveTube', url: 'https://yt.savetube.me/', category: 'tools' },
                { id: 'appicon', name: 'Appicon', url: 'https://zhangyu1818.github.io/appicon-forge/', category: 'tools' },
                { id: 'removebg', name: 'Remove', url: 'https://www.remove.bg/zh', category: 'tools' },
                { id: 'canva', name: 'Canva可画', url: 'https://www.canva.cn/', category: 'tools' },
                { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', category: 'tools' },
                
                // 参考文档
                { id: 'embedfire', name: '野火开发指南', url: 'https://doc.embedfire.com/linux/imx6/driver/zh/latest/index.html', category: 'docs' },
                { id: 'micropython', name: 'MpyESP32', url: 'http://docs.micropython.org/en/latest/esp32/quickref.html', category: 'docs' },
                { id: 'lvgl', name: 'Lvgl中文文档', url: 'https://lvgl.100ask.net/master/index.html', category: 'docs' },
                { id: 'linuxcool', name: 'Linux命令大全', url: 'https://www.linuxcool.com/', category: 'docs' },
                
                // 网站论坛
                { id: 'zlibrary', name: 'Zlibrary', url: 'https://zh.z-lib.gs/', category: 'forums' },
                { id: 'fontawesome', name: 'Fontawesome', url: 'https://fontawesome.com/v4/icons/', category: 'forums' },
                { id: 'zhutix', name: '致美化', url: 'https://zhutix.com/', category: 'forums' },
                { id: 'namemc', name: 'NameMC', url: 'https://namemc.com/minecraft-skins', category: 'forums' },
                
                // 技术开发
                { id: 'oshwhub', name: '立创开源硬件', url: 'https://oshwhub.com/', category: 'dev' },
                { id: 'lceda', name: '立创EDA', url: 'https://pro.lceda.cn/editor', category: 'dev' },
                
                // 服务面板
                { id: 'homepanel', name: 'HomePanel', url: 'http://47.122.74.70:27521/172765d467', category: 'panels' },
                { id: 'servicespanel', name: 'ServicesPanel', url: 'http://47.122.74.70:11045/1d2d0fc2e3', category: 'panels' },
                { id: 'homeboard', name: 'HomeBoard', url: 'https://homebt.hiquq.com:11888/walter', category: 'panels' }
            ]
        };
    </script>

    <!-- 主应用逻辑 -->
    <script>
        // 图标映射 - 独立管理，便于维护
        const iconMap = {
            // 默认图标
            'default': { type: 'font-awesome', value: 'fas fa-globe' },
            
            // 我的应用
            'memos': { type: 'font-awesome', value: 'fas fa-sticky-note' },
            'openlist': { type: 'font-awesome', value: 'fas fa-list' },
            'lib': { type: 'font-awesome', value: 'fas fa-book' },
            'jellyfin': { type: 'font-awesome', value: 'fas fa-film' },
            'npm': { type: 'font-awesome', value: 'fab fa-npm' },
            'stirlingpdf': { type: 'font-awesome', value: 'fas fa-file-pdf' },
            'lsky': { type: 'font-awesome', value: 'fas fa-image' },
            'filebox': { type: 'font-awesome', value: 'fas fa-box' },
            'filebox-admin': { type: 'font-awesome', value: 'fas fa-cog' },
            
            // 在线工具
            'lkssite': { type: 'font-awesome', value: 'fas fa-tools' },
            'visionon': { type: 'font-awesome', value: 'fas fa-eye' },
            'helloworld': { type: 'font-awesome', value: 'fas fa-code' },
            'savetube': { type: 'font-awesome', value: 'fab fa-youtube' },
            'appicon': { type: 'font-awesome', value: 'fas fa-mobile-alt' },
            'removebg': { type: 'font-awesome', value: 'fas fa-eraser' },
            'canva': { type: 'font-awesome', value: 'fas fa-palette' },
            'chatgpt': { type: 'font-awesome', value: 'fas fa-robot' },
            
            // 参考文档
            'embedfire': { type: 'font-awesome', value: 'fas fa-book-open' },
            'micropython': { type: 'font-awesome', value: 'fas fa-microchip' },
            'lvgl': { type: 'font-awesome', value: 'fas fa-desktop' },
            'linuxcool': { type: 'font-awesome', value: 'fas fa-terminal' },
            
            // 网站论坛
            'zlibrary': { type: 'font-awesome', value: 'fas fa-book' },
            'fontawesome': { type: 'font-awesome', value: 'fas fa-icons' },
            'zhutix': { type: 'font-awesome', value: 'fas fa-paint-brush' },
            'namemc': { type: 'font-awesome', value: 'fas fa-user' },
            
            // 技术开发
            'oshwhub': { type: 'font-awesome', value: 'fas fa-microchip' },
            'lceda': { type: 'font-awesome', value: 'fas fa-project-diagram' },
            
            // 服务面板
            'homepanel': { type: 'font-awesome', value: 'fas fa-home' },
            'servicespanel': { type: 'font-awesome', value: 'fas fa-server' },
            'homeboard': { type: 'font-awesome', value: 'fas fa-tachometer-alt' }
        };

        // DOM元素
        const categoriesContainer = document.getElementById('categories');
        const linksGrid = document.getElementById('linksGrid');
        const linksSection = document.getElementById('linksSection');
        const searchInput = document.getElementById('searchInput');
        const settingsToggle = document.getElementById('settingsToggle');
        const settingsPanel = document.getElementById('settingsPanel');
        const closeSettings = document.getElementById('closeSettings');
        const backgroundOptions = document.getElementById('backgroundOptions');
        const customBgInput = document.getElementById('customBgInput');
        const applyCustomBg = document.getElementById('applyCustomBg');
        const opacitySlider = document.getElementById('opacitySlider');
        const opacityValue = document.getElementById('opacityValue');
        const blurSlider = document.getElementById('blurSlider');
        const blurValue = document.getElementById('blurValue');
        const resetSettings = document.getElementById('resetSettings');
        const bgOpacitySlider = document.getElementById('bgOpacitySlider');
        const bgOpacityValue = document.getElementById('bgOpacityValue');
        const backgroundLayer = document.getElementById('backgroundLayer');

        // 当前选中的分类
        let currentCategory = '';
        // 搜索关键词
        let searchKeyword = '';
        // 动画状态
        let isAnimating = false;

        // 初始化页面
        function initPage() {
            renderCategories();
            renderLinks(false); // 初始渲染不使用动画
            setupEventListeners();
            loadUserPreferences();
            syncWithMaterialTheme();
        }

        // 渲染分类
        function renderCategories() {
            categoriesContainer.innerHTML = '';
            
            siteData.categories.forEach(category => {
                const button = document.createElement('button');
                button.className = `category-btn ${category.id === currentCategory ? 'active' : ''}`;
                button.textContent = category.name;
                button.dataset.category = category.id;
                categoriesContainer.appendChild(button);
            });
        }

        // 获取图标HTML
        function getIconHTML(linkId) {
            const iconData = iconMap[linkId] || iconMap['default'];
            
            if (iconData.type === 'font-awesome') {
                return `<i class="${iconData.value}"></i>`;
            } else if (iconData.type === 'emoji') {
                return iconData.value;
            } else if (iconData.type === 'svg') {
                return iconData.value;
            } else {
                return `<i class="${iconMap['default'].value}"></i>`;
            }
        }

        // 渲染链接
        function renderLinks(animate = true) {
            if (isAnimating) return;
            
            if (animate) {
                isAnimating = true;
                linksGrid.classList.add('fade-out');
                
                setTimeout(() => {
                    renderLinksContent();
                    linksGrid.classList.remove('fade-out');
                    
                    setTimeout(() => {
                        isAnimating = false;
                    }, 300);
                }, 300);
            } else {
                renderLinksContent();
            }
        }

        // 渲染链接内容
        function renderLinksContent() {
            linksGrid.innerHTML = '';
            
            // 过滤链接
            const filteredLinks = siteData.links.filter(link => {
                const matchesCategory = currentCategory === '' || link.category === currentCategory;
                const matchesSearch = searchKeyword === '' || 
                    link.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    link.url.toLowerCase().includes(searchKeyword.toLowerCase());
                return matchesCategory && matchesSearch;
            });
            
            // 显示或隐藏链接区域
            if (currentCategory || searchKeyword) {
                linksSection.classList.add('active');
            } else {
                linksSection.classList.remove('active');
            }
            
            // 渲染链接卡片
            if (filteredLinks.length > 0) {
                filteredLinks.forEach((link, index) => {
                    const card = document.createElement('a');
                    card.className = 'link-card';
                    card.href = link.url;
                    card.target = '_blank';
                    card.style.animationDelay = `${index * 0.05}s`;
                    
                    card.innerHTML = `
                        <div class="link-icon">${getIconHTML(link.id)}</div>
                        <div class="link-name">${link.name}</div>
                    `;
                    
                    linksGrid.appendChild(card);
                });
            } else if (currentCategory || searchKeyword) {
                // 显示空状态
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>没有找到匹配的网站</p>
                `;
                linksGrid.appendChild(emptyState);
            }
        }

        // 设置面板功能
        function openSettingsPanel() {
            settingsPanel.classList.add('active');
        }

        function closeSettingsPanel() {
            settingsPanel.classList.remove('active');
        }

        // 设置事件监听器
        function setupEventListeners() {
            // 分类点击事件
            categoriesContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('category-btn') && !isAnimating) {
                    const newCategory = e.target.dataset.category;
                    
                    // 移除所有active类
                    document.querySelectorAll('.category-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // 如果点击的是当前已选中的分类，则取消选择
                    if (newCategory === currentCategory) {
                        currentCategory = '';
                    } else {
                        currentCategory = newCategory;
                        e.target.classList.add('active');
                    }
                    
                    renderLinks();
                }
            });
            
            // 搜索输入事件
            searchInput.addEventListener('input', (e) => {
                searchKeyword = e.target.value.trim();
                renderLinks();
            });
            
            // 设置面板事件
            settingsToggle.addEventListener('click', openSettingsPanel);
            closeSettings.addEventListener('click', closeSettingsPanel);
            
            // 背景选择事件
            backgroundOptions.addEventListener('click', (e) => {
                if (e.target.classList.contains('bg-option')) {
                    // 移除所有active类
                    document.querySelectorAll('.bg-option').forEach(option => {
                        option.classList.remove('active');
                    });
                    
                    // 添加active类到当前选项
                    e.target.classList.add('active');
                    
                    // 应用背景
                    const bgValue = e.target.dataset.bg;
                    applyBackground(bgValue);
                    
                    // 保存到本地存储
                    saveUserPreference('background', bgValue);
                }
            });
            
            // 自定义背景应用
            applyCustomBg.addEventListener('click', () => {
                const bgUrl = customBgInput.value.trim();
                if (bgUrl) {
                    // 移除所有active类
                    document.querySelectorAll('.bg-option').forEach(option => {
                        option.classList.remove('active');
                    });
                    
                    // 应用自定义背景
                    applyBackground(`url('${bgUrl}')`);
                    
                    // 保存到本地存储
                    saveUserPreference('background', `url('${bgUrl}')`);
                    
                    // 清空输入框
                    customBgInput.value = '';
                }
            });
            
            // 背景透明度滑块
            bgOpacitySlider.addEventListener('input', (e) => {
                const value = e.target.value;
                bgOpacityValue.textContent = `${value}%`;
                
                // 更新CSS变量
                const opacity = value / 100;
                document.documentElement.style.setProperty('--background-opacity', opacity);
                
                // 保存到本地存储
                saveUserPreference('bgOpacity', value);
            });
            
            // UI透明度滑块
            opacitySlider.addEventListener('input', (e) => {
                const value = e.target.value;
                opacityValue.textContent = `${value}%`;
                
                // 更新CSS变量
                const opacity = value / 100;
                updateUIOpacity(opacity);
                
                // 保存到本地存储
                saveUserPreference('opacity', value);
            });
            
            // 模糊效果滑块
            blurSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                blurValue.textContent = `${value}px`;
                
                // 更新CSS变量
                document.documentElement.style.setProperty('--blur-intensity', `${value}px`);
                
                // 保存到本地存储
                saveUserPreference('blur', value);
            });
            
            // 重置设置
            resetSettings.addEventListener('click', resetUserPreferences);
            
            // 搜索框回车事件 - 使用必应搜索
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const value = searchInput.value.trim();
                    if (value) {
                        // 检查是否是有效的URL
                        let url = value;
                        if (!/^https?:\/\//i.test(value)) {
                            // 如果不是URL，使用必应搜索
                            url = `https://www.bing.com/search?q=${encodeURIComponent(value)}`;
                        }
                        
                        // 简单的URL验证
                        try {
                            new URL(url);
                            window.open(url, '_blank');
                            searchInput.value = '';
                        } catch (err) {
                            // 如果不是有效的URL，使用必应搜索
                            url = `https://www.bing.com/search?q=${encodeURIComponent(value)}`;
                            window.open(url, '_blank');
                            searchInput.value = '';
                        }
                    }
                }
            });
            
            // 点击设置面板外部关闭面板
            document.addEventListener('click', (e) => {
                if (settingsPanel.classList.contains('active') && 
                    !settingsPanel.contains(e.target) && 
                    e.target !== settingsToggle) {
                    closeSettingsPanel();
                }
            });
        }

        // 应用背景
        function applyBackground(bgValue) {
            if (bgValue === 'none') {
                backgroundLayer.style.backgroundImage = '';
            } else {
                backgroundLayer.style.backgroundImage = bgValue;
            }
        }

        // 更新UI元素透明度
        function updateUIOpacity(opacity) {
            document.documentElement.style.setProperty('--ui-opacity', opacity);
        }

        // 保存用户偏好设置
        function saveUserPreference(key, value) {
            const preferences = JSON.parse(localStorage.getItem('navPreferences') || '{}');
            preferences[key] = value;
            localStorage.setItem('navPreferences', JSON.stringify(preferences));
        }

        // 加载用户偏好设置
        function loadUserPreferences() {
            const preferences = JSON.parse(localStorage.getItem('navPreferences') || '{}');
            
            // 加载背景设置
            if (preferences.background) {
                applyBackground(preferences.background);
                
                // 找到对应的背景选项并激活
                const bgOptions = document.querySelectorAll('.bg-option');
                for (let option of bgOptions) {
                    if (option.dataset.bg === preferences.background) {
                        option.classList.add('active');
                        break;
                    }
                }
            }
            
            // 加载背景透明度设置
            if (preferences.bgOpacity) {
                bgOpacitySlider.value = preferences.bgOpacity;
                bgOpacityValue.textContent = `${preferences.bgOpacity}%`;
                
                const opacity = preferences.bgOpacity / 100;
                document.documentElement.style.setProperty('--background-opacity', opacity);
            }
            
            // 加载透明度设置
            if (preferences.opacity) {
                opacitySlider.value = preferences.opacity;
                opacityValue.textContent = `${preferences.opacity}%`;
                
                const opacity = preferences.opacity / 100;
                // 设置UI透明度
                updateUIOpacity(opacity);
            }
            
            // 加载模糊效果设置
            if (preferences.blur) {
                blurSlider.value = preferences.blur;
                blurValue.textContent = `${preferences.blur}px`;
                document.documentElement.style.setProperty('--blur-intensity', `${preferences.blur}px`);
            }
        }

        // 重置用户偏好设置
        function resetUserPreferences() {
            localStorage.removeItem('navPreferences');
            location.reload();
        }

        // 与Material主题同步
        function syncWithMaterialTheme() {
            // 监听主题切换
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
                        // 主题已更改，重新加载用户偏好
                        loadUserPreferences();
                    }
                });
            });
            
            // 开始观察
            observer.observe(document.body, {
                attributes: true
            });
        }

        // 初始化页面
        document.addEventListener('DOMContentLoaded', initPage);
    </script>
</body>
</html>




