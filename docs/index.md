---
title: 主页
hide:
  - navigation   # 隐藏左侧sidebar
  - toc          # 隐藏右侧TOC
---

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
        
        <!-- 链接网格 - 默认隐藏 -->
        <section class="links-section" id="linksSection">
            <h2 class="section-title">网站链接</h2>
            <div class="links-grid" id="linksGrid">
                <!-- 默认不显示任何链接，由JS动态生成 -->
            </div>
        </section>
    </div>
</main>

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