---
title: " "
hide:
  - navigation
  - toc
  - header
---

<!-- 
============================================================
📌 导航页面维护说明 v2.1
============================================================
最后更新：2026-05-01

【如何添加新链接】
在 siteData.links 数组中添加一行:
{ id: '唯一ID', name: '显示名称', url: '链接地址', category: '所属分类' }

【如何添加新分类】
在 siteData.categories 数组中添加一行:
{ id: '唯一ID', name: '显示名称' }

【如何添加/修改图标】
在 iconMap 对象中添加/修改映射:
'id': 'FontAwesome图标类名'
图标库: https://fontawesome.com/v5/search

【分类ID对应关系】
myapps  - 我的应用
tools   - 在线工具
docs    - 参考文档
forums  - 网站论坛
dev     - 技术开发
panels  - 服务面板

【背景图片】
修改 docs/styles/homepage.css 中的 --background-image 变量

【快捷键】
/        - 聚焦搜索框
Escape   - 清空搜索/关闭面板
←→↑↓    - 卡片网格导航
============================================================
-->

<!-- FontAwesome 图标库 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<div class="homepage-container">
    <!-- 背景层 -->
    <div class="background-layer" id="backgroundLayer"></div>

    <!-- 设置按钮 -->
    <button id="settingsToggle" class="settings-btn" aria-label="设置" title="设置">
        <i class="fas fa-cog"></i>
    </button>

    <!-- 设置面板 -->
    <div id="settingsPanel" class="settings-panel">
        <div class="settings-header">
            <h3 class="settings-title"><i class="fas fa-palette"></i> 外观设置</h3>
            <button id="closeSettings" class="close-settings" aria-label="关闭"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="settings-body">
            <!-- 背景选择 -->
            <div class="settings-section">
                <h4>背景风格</h4>
                <div class="background-options">
                    <div class="bg-option preset-1 active" data-bg="default" title="默认背景"></div>
                    <div class="bg-option preset-2" data-bg="solid" title="纯色背景"></div>
                    <div class="bg-option preset-3" data-bg="gradient" title="渐变背景"></div>
                    <div class="bg-option preset-4" data-bg="dots" title="点阵背景"></div>
                    <div class="bg-option preset-5" data-bg="grid" title="网格背景"></div>
                    <div class="bg-option preset-6" data-bg="none" title="无背景"></div>
                </div>
            </div>

            <!-- 背景透明度 -->
            <div class="settings-section">
                <h4>背景透明度</h4>
                <div class="slider-container">
                    <div class="slider-label">
                        <span>透明</span>
                        <span id="bgOpacityValue">40%</span>
                        <span>清晰</span>
                    </div>
                    <input type="range" id="bgOpacity" class="slider" min="0" max="100" value="40">
                </div>
            </div>

            <!-- 模糊强度 -->
            <div class="settings-section">
                <h4>毛玻璃强度</h4>
                <div class="slider-container">
                    <div class="slider-label">
                        <span>无</span>
                        <span id="blurValueValue">8px</span>
                        <span>强</span>
                    </div>
                    <input type="range" id="blurIntensity" class="slider" min="0" max="20" value="8">
                </div>
            </div>

            <!-- 排序方式 -->
            <div class="settings-section">
                <h4>链接排序</h4>
                <div class="sort-options">
                    <label class="radio-option">
                        <input type="radio" name="sort" value="default" checked>
                        <span>默认顺序</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="sort" value="frequent">
                        <span>按访问频率</span>
                    </label>
                </div>
            </div>

            <!-- 重置按钮 -->
            <div class="settings-section">
                <button id="resetSettings" class="reset-btn">
                    <i class="fas fa-undo"></i> 重置所有设置
                </button>
            </div>
        </div>
    </div>

    <!-- 主要内容 -->
    <main class="main-content">
        <div class="container">
            <!-- 搜索区域 -->
            <section class="search-section">
                <div class="search-box">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="searchInput" placeholder="搜索或输入网址... (按 / 快速聚焦)" autocomplete="off">
                    <div class="search-suggestions" id="searchSuggestions"></div>
                </div>
            </section>
    
            <!-- 分类区域 -->
            <section class="categories-section">
                <div class="categories" id="categories" role="tablist">
                    <!-- 分类按钮将通过JS动态生成 -->
                </div>
            </section>
    
            <!-- 链接网格 -->
            <section class="links-section" id="linksSection">
                <div class="links-grid" id="linksGrid">
                    <!-- 链接由JS动态生成 -->
                </div>
            </section>
        </div>
    </main>
</div>

<script>
/**
 * ============================================================
 * 主页导航数据配置 v2.1
 * ============================================================
 */
const siteData = {
    // ---------- 分类配置 ----------
    categories: [
        { id: 'myapps', name: '我的应用' },
        { id: 'tools', name: '在线工具' },
        { id: 'docs', name: '参考文档' },
        { id: 'forums', name: '网站论坛' },
        { id: 'dev', name: '技术开发' },
        { id: 'panels', name: '服务面板' }
    ],

    // ---------- 链接配置 ----------
    links: [
        /* ---------- 我的应用 ---------- */
        { id: 'openclaw', name: 'Claw', url: 'http://192.168.10.12:18789/', category: 'myapps' },
        { id: 'home', name: 'HA', url: 'http://192.168.10.12:8123/', category: 'myapps' },
        { id: 'bitwarden', name: 'Bitwarden', url: 'https://bit.sth.ink/', category: 'myapps' },
        { id: 'oneapi', name: 'OneAPI', url: 'http://api.sth.ink/', category: 'myapps' },
        { id: 'memos', name: 'Memos', url: 'http://memos.sth.ink/', category: 'myapps' },
        { id: 'NAS', name: 'Nas', url: 'http://nas.sth.ink/', category: 'myapps' },
        { id: 'openlist', name: 'OpenList', url: 'http://pan.sth.ink/', category: 'myapps' },
        { id: 'lib', name: 'Lib', url: 'http://lib.sth.ink/', category: 'myapps' },
        { id: 'jellyfin', name: 'Jellyfin', url: 'http://m.sth.ink/web/', category: 'myapps' },
        { id: 'npm', name: 'NPM', url: 'http://npm.sth.ink/', category: 'myapps' },
        { id: 'stirlingpdf', name: 'StirlingPDF', url: 'http://pdf.sth.ink/', category: 'myapps' },
        { id: 'lsky', name: '兰空图床', url: 'http://lsky.sth.ink/', category: 'myapps' },
    
        /* ---------- 在线工具 ---------- */
        { id: 'lkssite', name: 'LKSsite', url: 'https://lkssite.vip/', category: 'tools' },
        { id: 'visionon', name: 'Visionon', url: 'https://pub.visionon.cn/', category: 'tools' },
        { id: 'helloworld', name: 'helloworld', url: 'https://www.helloworld.net/html2md', category: 'tools' },
        { id: 'savetube', name: 'SaveTube', url: 'https://yt.savetube.me/', category: 'tools' },
        { id: 'appicon', name: 'Appicon', url: 'https://zhangyu1818.github.io/appicon-forge/', category: 'tools' },
        { id: 'removebg', name: 'Remove', url: 'https://www.remove.bg/zh', category: 'tools' },
        { id: 'canva', name: 'Canva可画', url: 'https://www.canva.cn/', category: 'tools' },
        { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', category: 'tools' },
    
        /* ---------- 参考文档 ---------- */
        { id: 'embedfire', name: '野火开发指南', url: 'https://doc.embedfire.com/linux/imx6/driver/zh/latest/index.html', category: 'docs' },
        { id: 'micropython', name: 'MpyESP32', url: 'http://docs.micropython.org/en/latest/esp32/quickref.html', category: 'docs' },
        { id: 'lvgl', name: 'Lvgl中文文档', url: 'https://lvgl.100ask.net/master/index.html', category: 'docs' },
        { id: 'linuxcool', name: 'Linux命令大全', url: 'https://www.linuxcool.com/', category: 'docs' },
    
        /* ---------- 网站论坛 ---------- */
        { id: 'zlibrary', name: 'Zlibrary', url: 'https://zh.z-library.sk/', category: 'forums' },
        { id: 'apkmirror', name: 'APKmirror', url: 'https://www.apkmirror.com/', category: 'forums' },
        { id: 'fontawesome', name: 'Fontawesome', url: 'https://fontawesome.com/v4/icons/', category: 'forums' },
        { id: 'zhutix', name: '致美化', url: 'https://zhutix.com/', category: 'forums' },
        { id: 'namemc', name: 'NameMC', url: 'https://namemc.com/minecraft-skins', category: 'forums' },
    
        /* ---------- 技术开发 ---------- */
        { id: 'oshwhub', name: '立创开源硬件', url: 'https://oshwhub.com/', category: 'dev' },
        { id: 'lceda', name: '立创EDA', url: 'https://pro.lceda.cn/editor', category: 'dev' },
    
        /* ---------- 服务面板 ---------- */
        { id: 'homepanel', name: 'HomePanel', url: 'http://101.132.126.236:18274/a79793dccd', category: 'panels' },
        { id: 'frpc', name: 'Frpc', url: 'http://101.132.126.236:7400/', category: 'panels' },
        { id: 'frps', name: 'Frps', url: 'http://101.132.126.236:7500/', category: 'panels' },
        { id: 'wireguard', name: 'WireGuard', url: 'http://192.168.10.12:51821/', category: 'panels' },
        { id: 'mihomo', name: 'Mihomo', url: 'https://metacubex.github.io/metacubexd/', category: 'panels' }
    ]
};

// ---------- 图标配置 ----------
const iconMap = {
    'default': 'fas fa-globe',
    'openclaw': 'fas fa-robot',
    'bitwarden': 'fas fa-key',
    'home': 'fas fa-home',
    'oneapi': 'fas fa-code',
    'memos': 'fas fa-sticky-note',
    'openlist': 'fas fa-list',
    'NAS': 'fas fa-hdd',
    'lib': 'fas fa-book',
    'jellyfin': 'fas fa-film',
    'npm': 'fab fa-npm',
    'stirlingpdf': 'fas fa-file-pdf',
    'lsky': 'fas fa-image',
    'lkssite': 'fas fa-tools',
    'visionon': 'fas fa-eye',
    'helloworld': 'fas fa-code',
    'savetube': 'fab fa-youtube',
    'appicon': 'fas fa-mobile-alt',
    'removebg': 'fas fa-eraser',
    'canva': 'fas fa-palette',
    'chatgpt': 'fas fa-robot',
    'embedfire': 'fas fa-book-open',
    'micropython': 'fas fa-microchip',
    'lvgl': 'fas fa-desktop',
    'linuxcool': 'fas fa-terminal',
    'zlibrary': 'fas fa-book',
    'apkmirror': 'fab fa-app-store',
    'fontawesome': 'fas fa-icons',
    'zhutix': 'fas fa-paint-brush',
    'namemc': 'fas fa-user',
    'oshwhub': 'fas fa-microchip',
    'lceda': 'fas fa-project-diagram',
    'homepanel': 'fas fa-home',
    'frpc': 'fas fa-globe',
    'frps': 'fas fa-globe',
    'wireguard': 'fas fa-shield-alt',
    'mihomo': 'fas fa-network-wired'
};

// ============================================================
// 核心逻辑
// ============================================================
(function() {
    'use strict';
    
    console.log('🚀 主页导航 v2.1 初始化开始...');
    
    // 标记主页
    document.body.classList.add('is-homepage');
    
    // DOM 元素
    const categoriesContainer = document.getElementById('categories');
    const linksGrid = document.getElementById('linksGrid');
    const linksSection = document.getElementById('linksSection');
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const backgroundLayer = document.getElementById('backgroundLayer');
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const closeSettings = document.getElementById('closeSettings');
    const resetSettings = document.getElementById('resetSettings');
    const bgOpacity = document.getElementById('bgOpacity');
    const blurIntensity = document.getElementById('blurIntensity');
    const bgOpacityValue = document.getElementById('bgOpacityValue');
    const blurValueValue = document.getElementById('blurValueValue');
    
    // 状态
    let currentCategory = '';
    let searchKeyword = '';
    let isAnimating = false;
    let currentFocusIndex = -1;
    let visibleCards = [];
    
    // 访问统计 (localStorage)
    const visitCounts = JSON.parse(localStorage.getItem('nav-visit-counts') || '{}');
    let sortOrder = localStorage.getItem('nav-sort-order') || 'default';
    
    // 设置
    const settings = JSON.parse(localStorage.getItem('nav-settings') || '{}');
    
    // 应用设置
    function applySettings() {
        if (settings.bgStyle) {
            applyBackgroundStyle(settings.bgStyle);
        }
        if (settings.bgOpacity !== undefined) {
            bgOpacity.value = settings.bgOpacity;
            bgOpacityValue.textContent = settings.bgOpacity + '%';
            document.documentElement.style.setProperty('--background-opacity', settings.bgOpacity / 100);
        }
        if (settings.blurIntensity !== undefined) {
            blurIntensity.value = settings.blurIntensity;
            blurValueValue.textContent = settings.blurIntensity + 'px';
            document.documentElement.style.setProperty('--blur-intensity', settings.blurIntensity + 'px');
        }
        if (settings.sortOrder) {
            sortOrder = settings.sortOrder;
            document.querySelector(`input[name="sort"][value="${sortOrder}"]`).checked = true;
        }
    }
    
    // 保存设置
    function saveSettings() {
        localStorage.setItem('nav-settings', JSON.stringify(settings));
    }
    
    // 背景样式
    function applyBackgroundStyle(style) {
        const root = document.documentElement;
        const bgMap = {
            'default': 'url(\'/images/backgrounds/bg_1.png\')',
            'solid': '#f8f9fa',
            'gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'dots': 'radial-gradient(circle, #4051b5 1px, transparent 1px)',
            'grid': 'linear-gradient(90deg, transparent 24px, rgba(64, 81, 181, 0.05) 24px, rgba(64, 81, 181, 0.05) 25px, transparent 25px), linear-gradient(0deg, transparent 24px, rgba(64, 81, 181, 0.05) 24px, rgba(64, 81, 181, 0.05) 25px, transparent 25px)',
            'none': 'none'
        };
        
        root.style.setProperty('--background-image', bgMap[style] || bgMap['default']);
        
        if (style === 'dots') {
            root.style.setProperty('--background-size', '20px 20px');
        } else if (style === 'grid') {
            root.style.setProperty('--background-size', '25px 25px');
        } else {
            root.style.setProperty('--background-size', 'cover');
        }
        
        document.querySelectorAll('.bg-option').forEach(el => el.classList.remove('active'));
        document.querySelector(`.bg-option[data-bg="${style}"]`)?.classList.add('active');
        settings.bgStyle = style;
        saveSettings();
    }
    
    // 获取图标
    function getIconHTML(linkId) {
        const iconClass = iconMap[linkId] || iconMap['default'];
        return `<i class="${iconClass}"></i>`;
    }
    
    // 记录访问
    function recordVisit(linkId) {
        visitCounts[linkId] = (visitCounts[linkId] || 0) + 1;
        localStorage.setItem('nav-visit-counts', JSON.stringify(visitCounts));
    }
    
    // 排序链接
    function sortLinks(links) {
        if (sortOrder === 'frequent') {
            return [...links].sort((a, b) => {
                const aCount = visitCounts[a.id] || 0;
                const bCount = visitCounts[b.id] || 0;
                return bCount - aCount;
            });
        }
        return links;
    }
    
    // 渲染分类
    function renderCategories() {
        if (!categoriesContainer) return;
        categoriesContainer.innerHTML = '';
        
        siteData.categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn' + (cat.id === currentCategory ? ' active' : '');
            btn.textContent = cat.name;
            btn.dataset.category = cat.id;
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', cat.id === currentCategory);
            categoriesContainer.appendChild(btn);
        });
    }
    
    // 渲染链接
    function renderLinks(animate = true) {
        if (!linksGrid || isAnimating) return;
        
        let filtered = siteData.links.filter(link => {
            const matchCat = !currentCategory || link.category === currentCategory;
            const matchSearch = !searchKeyword || 
                link.name.toLowerCase().includes(searchKeyword) ||
                link.url.toLowerCase().includes(searchKeyword);
            return matchCat && matchSearch;
        });
        
        filtered = sortLinks(filtered);
        
        // 显示/隐藏
        linksSection.classList.toggle('active', !!(currentCategory || searchKeyword));
        
        // 动画
        if (animate) {
            isAnimating = true;
            linksGrid.classList.add('fade-out');
            setTimeout(() => {
                renderCards(filtered);
                linksGrid.classList.remove('fade-out');
                isAnimating = false;
            }, 200);
        } else {
            renderCards(filtered);
        }
    }
    
    // 渲染卡片
    function renderCards(links) {
        linksGrid.innerHTML = '';
        visibleCards = [];
        
        if (links.length === 0) {
            linksGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>没有找到匹配的网站</p>
                </div>`;
            return;
        }
        
        links.forEach((link, idx) => {
            const card = document.createElement('a');
            card.className = 'link-card';
            card.href = link.url;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.dataset.index = idx;
            card.dataset.id = link.id;
            card.style.animationDelay = `${idx * 0.04}s`;
            
            card.innerHTML = `
                <div class="link-icon">
                    ${getIconHTML(link.id)}
                </div>
                <div class="link-name">${link.name}</div>
                ${visitCounts[link.id] ? `<div class="visit-count" title="访问 ${visitCounts[link.id]} 次">${visitCounts[link.id]}次</div>` : ''}
            `;
            
            card.addEventListener('click', () => recordVisit(link.id));
            linksGrid.appendChild(card);
            visibleCards.push(card);
        });
        
        currentFocusIndex = -1;
    }
    
    // 搜索建议
    function updateSuggestions() {
        const keyword = searchInput.value.trim().toLowerCase();
        if (!keyword || keyword.length < 1) {
            searchSuggestions.innerHTML = '';
            searchSuggestions.style.display = 'none';
            return;
        }
        
        const matches = siteData.links.filter(l => 
            l.name.toLowerCase().includes(keyword) || 
            l.url.toLowerCase().includes(keyword)
        ).slice(0, 5);
        
        if (matches.length === 0) {
            searchSuggestions.innerHTML = '';
            searchSuggestions.style.display = 'none';
            return;
        }
        
        searchSuggestions.innerHTML = matches.map(m => 
            `<div class="suggestion-item" data-url="${m.url}">
                <i class="${iconMap[m.id] || iconMap['default']}"></i>
                <span>${m.name}</span>
                <span class="suggestion-url">${m.url}</span>
            </div>`
        ).join('');
        searchSuggestions.style.display = 'block';
        
        searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                window.open(item.dataset.url, '_blank');
                searchInput.value = '';
                searchSuggestions.style.display = 'none';
                renderLinks();
            });
        });
    }
    
    // 键盘导航
    function handleKeyboardNav(e) {
        // / 聚焦搜索
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
            return;
        }
        
        // Escape 清空
        if (e.key === 'Escape') {
            if (settingsPanel?.classList.contains('active')) {
                settingsPanel.classList.remove('active');
                return;
            }
            if (searchInput.value) {
                searchInput.value = '';
                searchKeyword = '';
                renderLinks();
                searchInput.blur();
                return;
            }
            if (currentCategory) {
                currentCategory = '';
                renderCategories();
                renderLinks();
                return;
            }
        }
        
        // 方向键导航
        if (visibleCards.length === 0) return;
        
        const cols = Math.floor(linksGrid.offsetWidth / 180) || 5;
        
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            currentFocusIndex = Math.min(currentFocusIndex + 1, visibleCards.length - 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            currentFocusIndex = Math.max(currentFocusIndex - 1, 0);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentFocusIndex = Math.min(currentFocusIndex + cols, visibleCards.length - 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentFocusIndex = Math.max(currentFocusIndex - cols, 0);
        } else {
            return;
        }
        
        visibleCards.forEach((card, i) => {
            card.classList.toggle('keyboard-focused', i === currentFocusIndex);
        });
        
        if (currentFocusIndex >= 0 && visibleCards[currentFocusIndex]) {
            visibleCards[currentFocusIndex].focus();
        }
    }
    
    // 事件监听
    function setupEventListeners() {
        // 分类点击
        categoriesContainer.addEventListener('click', e => {
            const btn = e.target.closest('.category-btn');
            if (!btn || isAnimating) return;
            
            const newCat = btn.dataset.category;
            currentCategory = newCat === currentCategory ? '' : newCat;
            renderCategories();
            renderLinks();
        });
        
        // 搜索
        searchInput.addEventListener('input', e => {
            searchKeyword = e.target.value.trim().toLowerCase();
            updateSuggestions();
            renderLinks(true);
        });
        
        searchInput.addEventListener('keydown', e => {
            if (e.key === 'Enter' && searchInput.value.trim()) {
                const val = searchInput.value.trim();
                let url = val;
                if (!/^https?:\/\//i.test(val)) {
                    url = 'https://www.bing.com/search?q=' + encodeURIComponent(val);
                }
                try {
                    new URL(url);
                    window.open(url, '_blank');
                } catch {
                    window.open('https://www.bing.com/search?q=' + encodeURIComponent(val), '_blank');
                }
                searchInput.value = '';
                searchSuggestions.style.display = 'none';
                renderLinks();
            }
        });
        
        // 点击外部关闭建议
        document.addEventListener('click', e => {
            if (!e.target.closest('.search-box')) {
                searchSuggestions.style.display = 'none';
            }
        });
        
        // 设置面板
        settingsToggle?.addEventListener('click', () => {
            settingsPanel.classList.toggle('active');
        });
        
        closeSettings?.addEventListener('click', () => {
            settingsPanel.classList.remove('active');
        });
        
        // 背景选项
        document.querySelectorAll('.bg-option').forEach(opt => {
            opt.addEventListener('click', () => {
                applyBackgroundStyle(opt.dataset.bg);
            });
        });
        
        // 透明度滑块
        bgOpacity?.addEventListener('input', e => {
            const val = e.target.value;
            bgOpacityValue.textContent = val + '%';
            document.documentElement.style.setProperty('--background-opacity', val / 100);
            settings.bgOpacity = parseInt(val);
            saveSettings();
        });
        
        // 模糊滑块
        blurIntensity?.addEventListener('input', e => {
            const val = e.target.value;
            blurValueValue.textContent = val + 'px';
            document.documentElement.style.setProperty('--blur-intensity', val + 'px');
            settings.blurIntensity = parseInt(val);
            saveSettings();
        });
        
        // 排序
        document.querySelectorAll('input[name="sort"]').forEach(radio => {
            radio.addEventListener('change', e => {
                sortOrder = e.target.value;
                localStorage.setItem('nav-sort-order', sortOrder);
                renderLinks();
            });
        });
        
        // 重置
        resetSettings?.addEventListener('click', () => {
            if (confirm('确定要重置所有设置吗？')) {
                localStorage.removeItem('nav-settings');
                localStorage.removeItem('nav-visit-counts');
                localStorage.removeItem('nav-sort-order');
                location.reload();
            }
        });
        
        // 键盘导航
        document.addEventListener('keydown', handleKeyboardNav);
    }
    
    // 自动暗黑模式
    function detectDarkMode() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const apply = (isDark) => {
            document.documentElement.setAttribute('data-md-color-scheme', isDark ? 'slate' : 'default');
        };
        apply(prefersDark.matches);
        prefersDark.addEventListener('change', e => apply(e.matches));
    }
    
    // 初始化
    function initHomepage() {
        console.log('🔧 初始化主页功能...');
        
        detectDarkMode();
        applySettings();
        renderCategories();
        renderLinks(false);
        setupEventListeners();
        
        console.log('✅ 主页导航 v2.1 初始化完成');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHomepage);
    } else {
        initHomepage();
    }
})();
</script>
