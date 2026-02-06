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
        <!-- 设置面板内容保持不变 -->
    </div>
</div>

<script>
// 添加主页标识
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('is-homepage');
    console.log('主页标识已添加');
});
</script>