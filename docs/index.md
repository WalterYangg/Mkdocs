---
title: 主页
hide:
  - navigation
  - toc
---

<!-- 添加FontAwesome图标库 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<div style="display: contents;">
    <!-- 背景层 - 只保留一个 -->
    <div class="background-layer" id="backgroundLayer"></div>

    <!-- 设置按钮 - 只保留一个 -->
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
</div>

<!-- 确保CSS和JS加载 -->
<style>
/* 基础样式确保按钮可见 */
.settings-btn {
    position: fixed !important;
    top: 20px !important;
    right: 20px !important;
    z-index: 9999 !important;
    background: #448aff !important;
    color: white !important;
    padding: 12px !important;
    border-radius: 50% !important;
    border: none !important;
    cursor: pointer !important;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2) !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
}

.settings-panel {
    z-index: 10000 !important;
    position: fixed !important;
    top: 0 !important;
    right: -400px !important;
    width: 350px !important;
    height: 100vh !important;
    background: white !important;
    box-shadow: -2px 0 10px rgba(0,0,0,0.1) !important;
    transition: right 0.3s ease !important;
    padding: 20px !important;
    overflow-y: auto !important;
}

.settings-panel.active {
    right: 0 !important;
}
</style>

<script>
// 简单初始化代码，确保按钮点击功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const closeSettings = document.getElementById('closeSettings');
    
    if (settingsToggle && settingsPanel) {
        console.log('Elements found');
        
        settingsToggle.addEventListener('click', function() {
            console.log('Settings toggle clicked');
            settingsPanel.classList.toggle('active');
        });
        
        if (closeSettings) {
            closeSettings.addEventListener('click', function() {
                settingsPanel.classList.remove('active');
            });
        }
        
        // 点击面板外部关闭
        document.addEventListener('click', function(event) {
            if (!settingsPanel.contains(event.target) && 
                !settingsToggle.contains(event.target) && 
                settingsPanel.classList.contains('active')) {
                settingsPanel.classList.remove('active');
            }
        });
    } else {
        console.error('Missing elements:', {
            settingsToggle: !!settingsToggle,
            settingsPanel: !!settingsPanel
        });
    }
});
</script>