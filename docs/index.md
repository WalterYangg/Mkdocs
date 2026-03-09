---
title: 主页
hide:
  - navigation
  - toc
---

<!-- 
============================================================
📌 导航页面维护说明
============================================================

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
============================================================
-->

<!-- 添加FontAwesome图标库 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<div class="homepage-container">
    <!-- 背景层 -->
    <div class="background-layer" id="backgroundLayer"></div>
    
    <!-- 主要内容 -->
    <main class="main-content">
        <div class="container">
            <!-- 搜索区域 -->
            <section class="search-section">
                <h1 class="search-title">  </h1>  <!-- 首页标题-->
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="搜索或输入网址..." autocomplete="off">
                </div>
            </section>
    
            <!-- 分类区域 -->
            <section class="categories-section">
                <div class="categories" id="categories">
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
 * 主页导航数据配置
 * 
 * 修改这里来添加/删除/修改链接和分类
 * ============================================================
 */

// ---------- 分类配置 ----------
const siteData = {
    categories: [
        { id: 'myapps', name: '我的应用' },
        { id: 'tools', name: '在线工具' },
        { id: 'docs', name: '参考文档' },
        { id: 'forums', name: '网站论坛' },
        { id: 'dev', name: '技术开发' },
        { id: 'panels', name: '服务面板' }
    ],

    // ---------- 链接配置 ----------
    // 格式: { id: '唯一标识', name: '显示名称', url: '网址', category: '分类ID' }
    links: [
        /* ---------- 我的应用 ---------- */
        { id: 'openclaw', name: 'Claw', url: 'http://192.168.10.12:18789/', category: 'myapps' },
        { id: 'chat', name: 'Chat', url: 'http://chat.sth.ink/', category: 'myapps' },
        { id: 'oneapi', name: 'OneAPI', url: 'http://api.sth.ink/', category: 'myapps' },
        { id: 'memos', name: 'Memos', url: 'http://memos.sth.ink/', category: 'myapps' },
        { id: 'NAS', name: 'Nas', url: 'http://nas.sth.ink/', category: 'myapps' },
        { id: 'openlist', name: 'OpenList', url: 'http://pan.sth.ink/', category: 'myapps' },
        { id: 'lib', name: 'Lib', url: 'http://lib.sth.ink/', category: 'myapps' },
        { id: 'jellyfin', name: 'Jellyfin', url: 'http://m.sth.ink/web/', category: 'myapps' },
        { id: 'npm', name: 'NPM', url: 'http://npm.sth.ink/', category: 'myapps' },
        { id: 'stirlingpdf', name: 'StirlingPDF', url: 'http://pdf.sth.ink/', category: 'myapps' },
        { id: 'lsky', name: '兰空图床', url: 'http://lsky.sth.ink/', category: 'myapps' },
        { id: 'filebox', name: 'FB文件快递柜', url: 'http://box.sth.ink/', category: 'myapps' },
        { id: 'filebox-admin', name: 'FB管理员', url: 'http://box.sth.ink/#/admin', category: 'myapps' },

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
        { id: 'zlibrary', name: 'Zlibrary', url: 'https://zh.z-lib.gs/', category: 'forums' },
        { id: 'fontawesome', name: 'Fontawesome', url: 'https://fontawesome.com/v4/icons/', category: 'forums' },
        { id: 'zhutix', name: '致美化', url: 'https://zhutix.com/', category: 'forums' },
        { id: 'namemc', name: 'NameMC', url: 'https://namemc.com/minecraft-skins', category: 'forums' },

        /* ---------- 技术开发 ---------- */
        { id: 'oshwhub', name: '立创开源硬件', url: 'https://oshwhub.com/', category: 'dev' },
        { id: 'lceda', name: '立创EDA', url: 'https://pro.lceda.cn/editor', category: 'dev' },

        /* ---------- 服务面板 ---------- */
        { id: 'homepanel', name: 'HomePanel', url: 'http://101.132.126.236:27521/172765d467', category: 'panels' },
        { id: 'servicespanel', name: 'ServicesPanel', url: 'http://47.122.74.70:11045/1d2d0fc2e3', category: 'panels' },
        { id: 'homeboard', name: 'HomeBoard', url: 'https://homebt.sth.ink:11888/walter', category: 'panels' }
    ]
};

// ---------- 图标配置 ----------
// 格式: '链接ID': 'FontAwesome图标类名'
// 默认图标: 'default': 'fas fa-globe'
const iconMap = {
    'default': 'fas fa-globe',
    
    // 我的应用
    'openclaw': 'fas fa-robot',
    'chat': 'fas fa-comments',
    'oneapi': 'fas fa-code',
    'memos': 'fas fa-sticky-note',
    'openlist': 'fas fa-list',
    'NAS': 'fas fa-hdd',
    'lib': 'fas fa-book',
    'jellyfin': 'fas fa-film',
    'npm': 'fab fa-npm',
    'stirlingpdf': 'fas fa-file-pdf',
    'lsky': 'fas fa-image',
    'filebox': 'fas fa-box',
    'filebox-admin': 'fas fa-cog',

    // 在线工具
    'lkssite': 'fas fa-tools',
    'visionon': 'fas fa-eye',
    'helloworld': 'fas fa-code',
    'savetube': 'fab fa-youtube',
    'appicon': 'fas fa-mobile-alt',
    'removebg': 'fas fa-eraser',
    'canva': 'fas fa-palette',
    'chatgpt': 'fas fa-robot',

    // 参考文档
    'embedfire': 'fas fa-book-open',
    'micropython': 'fas fa-microchip',
    'lvgl': 'fas fa-desktop',
    'linuxcool': 'fas fa-terminal',

    // 网站论坛
    'zlibrary': 'fas fa-book',
    'fontawesome': 'fas fa-icons',
    'zhutix': 'fas fa-paint-brush',
    'namemc': 'fas fa-user',

    // 技术开发
    'oshwhub': 'fas fa-microchip',
    'lceda': 'fas fa-project-diagram',

    // 服务面板
    'homepanel': 'fas fa-home',
    'servicespanel': 'fas fa-server',
    'homeboard': 'fas fa-tachometer-alt'
};

// ============================================================
// 以下为代码逻辑，请勿随意修改
// ============================================================

(function() {
    console.log('主页功能初始化开始...');

    // 添加主页标识
    document.body.classList.add('is-homepage');
    
    // 获取DOM元素
    const categoriesContainer = document.getElementById('categories');
    const linksGrid = document.getElementById('linksGrid');
    const linksSection = document.getElementById('linksSection');
    const searchInput = document.getElementById('searchInput');
    const backgroundLayer = document.getElementById('backgroundLayer');
    
    // 状态变量
    let currentCategory = '';
    let searchKeyword = '';
    let isAnimating = false;
    
    // 渲染分类
    function renderCategories() {
        if (!categoriesContainer) return;
        
        categoriesContainer.innerHTML = '';
        
        siteData.categories.forEach(function(category) {
            const button = document.createElement('button');
            button.className = 'category-btn ' + (category.id === currentCategory ? 'active' : '');
            button.textContent = category.name;
            button.dataset.category = category.id;
            categoriesContainer.appendChild(button);
        });
    }
    
    // 获取图标
    function getIconHTML(linkId) {
        const iconClass = iconMap[linkId] || iconMap['default'];
        return '<i class="' + iconClass + '"></i>';
    }
    
    // 渲染链接
    function renderLinks(animate) {
        if (!linksGrid) return;
        if (isAnimating) return;
        
        animate = animate !== false;
        
        if (animate) {
            isAnimating = true;
            linksGrid.classList.add('fade-out');
            
            setTimeout(function() {
                renderLinksContent();
                linksGrid.classList.remove('fade-out');
                
                setTimeout(function() {
                    isAnimating = false;
                }, 300);
            }, 300);
        } else {
            renderLinksContent();
        }
    }
    
    // 渲染链接内容
    function renderLinksContent() {
        if (!linksGrid) return;
        
        linksGrid.innerHTML = '';
        
        // 过滤链接
        const filteredLinks = siteData.links.filter(function(link) {
            const matchesCategory = !currentCategory || link.category === currentCategory;
            const matchesSearch = !searchKeyword || 
                link.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                link.url.toLowerCase().includes(searchKeyword.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        
        // 显示/隐藏链接区域
        if (linksSection) {
            linksSection.classList.toggle('active', !!(currentCategory || searchKeyword));
        }
        
        // 渲染卡片
        filteredLinks.forEach(function(link, index) {
            const card = document.createElement('a');
            card.className = 'link-card';
            card.href = link.url;
            card.target = '_blank';
            card.style.animationDelay = (index * 0.05) + 's';
            
            card.innerHTML = 
                '<div class="link-icon">' + getIconHTML(link.id) + '</div>' +
                '<div class="link-name">' + link.name + '</div>';
            
            linksGrid.appendChild(card);
        });
        
        // 空状态
        if (filteredLinks.length === 0 && (currentCategory || searchKeyword)) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = '<i class="fas fa-search"></i><p>没有找到匹配的网站</p>';
            linksGrid.appendChild(emptyState);
        }
    }
    
    // 事件监听
    function setupEventListeners() {
        // 分类点击
        if (categoriesContainer) {
            categoriesContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('category-btn') && !isAnimating) {
                    const newCategory = e.target.dataset.category;
                    
                    document.querySelectorAll('.category-btn').forEach(function(btn) {
                        btn.classList.remove('active');
                    });
                    
                    if (newCategory === currentCategory) {
                        currentCategory = '';
                    } else {
                        currentCategory = newCategory;
                        e.target.classList.add('active');
                    }
                    
                    renderLinks();
                }
            });
        }
        
        // 搜索
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                searchKeyword = e.target.value.trim();
                renderLinks();
            });
            
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const value = searchInput.value.trim();
                    if (value) {
                        let url = value;
                        if (!/^https?:\/\//i.test(value)) {
                            url = 'https://www.bing.com/search?q=' + encodeURIComponent(value);
                        }
                        
                        try {
                            new URL(url);
                            window.open(url, '_blank');
                        } catch (err) {
                            window.open('https://www.bing.com/search?q=' + encodeURIComponent(value), '_blank');
                        }
                        searchInput.value = '';
                    }
                }
            });
        }
    }
    
    // 初始化
    function initHomepage() {
        console.log('初始化主页功能');
        renderCategories();
        renderLinks(false);
        setupEventListeners();
        console.log('主页功能初始化完成');
    }
    
    // 执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHomepage);
    } else {
        initHomepage();
    }
})();
</script>
