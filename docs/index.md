---
title: 主页
hide:
  - navigation
  - toc
---

<!-- 添加FontAwesome图标库 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<div class="homepage-container">
    <!-- 背景层 -->
    <div class="background-layer" id="backgroundLayer"></div>

    <!-- 设置按钮 -->
    <button class="settings-btn" id="settingsToggle">
        <i class="fas fa-cog"></i>
    </button>

    <!-- 主要内容 -->
    <main class="main-content">
        <div class="container">
            <!-- 搜索区域 -->
            <section class="search-section">
                <h1 class="search-title">SeekThink - 导航页</h1>
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="搜索或输入网址...">
                </div>
            </section>
            
            <!-- 分类区域 -->
            <section class="categories-section">
                <h2 class="section-title">快速分类</h2>
                <div class="categories" id="categories">
                    <!-- 分类按钮将通过JS动态生成 -->
                </div>
            </section>
            
            <!-- 链接网格 -->
            <section class="links-section" id="linksSection">
                <h2 class="section-title">网站链接</h2>
                <div class="links-grid" id="linksGrid">
                    <!-- 链接由JS动态生成 -->
                </div>
            </section>
        </div>
    </main>

    <!-- 设置面板 -->
    <div class="settings-panel" id="settingsPanel">
        <div class="settings-header">
            <h3 class="settings-title">设置</h3>
            <button class="close-settings" id="closeSettings">×</button>
        </div>
        
        <div class="settings-section">
            <h3>背景设置</h3>
            <div class="background-options" id="backgroundOptions">
                <div class="bg-option preset-1 active" data-bg="none"></div>
                <div class="bg-option preset-2" data-bg="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"></div>
                <div class="bg-option preset-3" data-bg="linear-gradient(135deg, #e3e9f7 0%, #ffffff 100%)"></div>
                <div class="bg-option preset-4" data-bg="#f8f9fa"></div>
            </div>
            
            <div class="custom-bg-input">
                <input type="text" id="customBgInput" placeholder="输入图片URL...">
                <button id="applyCustomBg">应用</button>
            </div>
        </div>
        
        <div class="settings-section">
            <h3>透明度设置</h3>
            <div class="slider-container">
                <div class="slider-label">
                    <span>背景透明度</span>
                    <span id="bgOpacityValue">30%</span>
                </div>
                <input type="range" min="0" max="100" value="30" class="slider" id="bgOpacitySlider">
            </div>
            
            <div class="slider-container">
                <div class="slider-label">
                    <span>UI透明度</span>
                    <span id="opacityValue">95%</span>
                </div>
                <input type="range" min="50" max="100" value="95" class="slider" id="opacitySlider">
            </div>
            
            <div class="slider-container">
                <div class="slider-label">
                    <span>模糊效果</span>
                    <span id="blurValue">8px</span>
                </div>
                <input type="range" min="0" max="20" value="8" class="slider" id="blurSlider">
            </div>
        </div>
        
        <button class="reset-btn" id="resetSettings">重置设置</button>
    </div>
</div>