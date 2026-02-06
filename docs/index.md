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
                    <input type="text" id="searchInput" placeholder="搜索或输入网址..." autocomplete="off">
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
                <div class="bg-option preset-1 active" data-bg="none" title="无背景"></div>
                <div class="bg-option preset-2" data-bg="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" title="渐变背景1"></div>
                <div class="bg-option preset-3" data-bg="linear-gradient(135deg, #e3e9f7 0%, #ffffff 100%)" title="渐变背景2"></div>
                <div class="bg-option preset-4" data-bg="#f8f9fa" title="浅灰背景"></div>
                <div class="bg-option preset-5" data-bg="#ffffff" title="纯白背景"></div>
                <div class="bg-option preset-6" data-bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" title="渐变背景3"></div>
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

<!-- 将整个JavaScript功能内联到页面中 -->
<script>
// 立即执行的主页初始化函数
(function() {
    console.log('主页功能初始化开始...');
    
    // 1. 添加主页标识
    document.body.classList.add('is-homepage');
    
    // 2. 网站数据配置
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

    // 3. 图标映射
    const iconMap = {
        'default': 'fas fa-globe',
        'memos': 'fas fa-sticky-note',
        'openlist': 'fas fa-list',
        'lib': 'fas fa-book',
        'jellyfin': 'fas fa-film',
        'npm': 'fab fa-npm',
        'stirlingpdf': 'fas fa-file-pdf',
        'lsky': 'fas fa-image',
        'filebox': 'fas fa-box',
        'filebox-admin': 'fas fa-cog',
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
        'fontawesome': 'fas fa-icons',
        'zhutix': 'fas fa-paint-brush',
        'namemc': 'fas fa-user',
        'oshwhub': 'fas fa-microchip',
        'lceda': 'fas fa-project-diagram',
        'homepanel': 'fas fa-home',
        'servicespanel': 'fas fa-server',
        'homeboard': 'fas fa-tachometer-alt'
    };

    // 4. 获取DOM元素
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

    // 5. 状态变量
    let currentCategory = '';
    let searchKeyword = '';
    let isAnimating = false;

    // 6. 渲染分类函数
    function renderCategories() {
        if (!categoriesContainer) return;
        
        categoriesContainer.innerHTML = '';
        
        siteData.categories.forEach(category => {
            const button = document.createElement('button');
            button.className = `category-btn ${category.id === currentCategory ? 'active' : ''}`;
            button.textContent = category.name;
            button.dataset.category = category.id;
            categoriesContainer.appendChild(button);
        });
    }

    // 7. 获取图标HTML
    function getIconHTML(linkId) {
        const iconClass = iconMap[linkId] || iconMap['default'];
        return `<i class="${iconClass}"></i>`;
    }

    // 8. 渲染链接
    function renderLinks(animate = true) {
        if (!linksGrid) return;
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

    // 9. 渲染链接内容
    function renderLinksContent() {
        if (!linksGrid) return;
        
        linksGrid.innerHTML = '';
        
        // 过滤链接
        const filteredLinks = siteData.links.filter(link => {
            const matchesCategory = !currentCategory || link.category === currentCategory;
            const matchesSearch = !searchKeyword || 
                link.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                link.url.toLowerCase().includes(searchKeyword.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        
        // 显示或隐藏链接区域
        if (linksSection) {
            if (currentCategory || searchKeyword) {
                linksSection.classList.add('active');
            } else {
                linksSection.classList.remove('active');
            }
        }
        
        // 渲染链接卡片
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
        
        // 如果没有匹配的链接
        if (filteredLinks.length === 0 && (currentCategory || searchKeyword)) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i class="fas fa-search"></i>
                <p>没有找到匹配的网站</p>
            `;
            linksGrid.appendChild(emptyState);
        }
    }

    // 10. 设置面板功能
    function openSettingsPanel() {
        if (settingsPanel) {
            settingsPanel.classList.add('active');
        }
    }

    function closeSettingsPanel() {
        if (settingsPanel) {
            settingsPanel.classList.remove('active');
        }
    }

    // 11. 设置事件监听器
    function setupEventListeners() {
        // 分类点击事件
        if (categoriesContainer) {
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
        }
        
        // 搜索输入事件
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchKeyword = e.target.value.trim();
                renderLinks();
            });
            
            // 搜索框回车事件
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const value = searchInput.value.trim();
                    if (value) {
                        let url = value;
                        if (!/^https?:\/\//i.test(value)) {
                            url = `https://www.bing.com/search?q=${encodeURIComponent(value)}`;
                        }
                        
                        try {
                            new URL(url);
                            window.open(url, '_blank');
                            searchInput.value = '';
                        } catch (err) {
                            url = `https://www.bing.com/search?q=${encodeURIComponent(value)}`;
                            window.open(url, '_blank');
                            searchInput.value = '';
                        }
                    }
                }
            });
        }
        
        // 设置面板事件
        if (settingsToggle) {
            settingsToggle.addEventListener('click', openSettingsPanel);
        }
        
        if (closeSettings) {
            closeSettings.addEventListener('click', closeSettingsPanel);
        }
        
        // 背景选择事件
        if (backgroundOptions) {
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
                    if (backgroundLayer) {
                        if (bgValue === 'none') {
                            backgroundLayer.style.backgroundImage = '';
                        } else {
                            backgroundLayer.style.backgroundImage = bgValue;
                        }
                    }
                }
            });
        }
        
        // 自定义背景应用
        if (applyCustomBg && customBgInput) {
            applyCustomBg.addEventListener('click', () => {
                const bgUrl = customBgInput.value.trim();
                if (bgUrl) {
                    // 移除所有active类
                    document.querySelectorAll('.bg-option').forEach(option => {
                        option.classList.remove('active');
                    });
                    
                    // 应用自定义背景
                    if (backgroundLayer) {
                        backgroundLayer.style.backgroundImage = `url('${bgUrl}')`;
                    }
                    
                    // 清空输入框
                    customBgInput.value = '';
                }
            });
        }
        
        // 点击设置面板外部关闭面板
        document.addEventListener('click', (e) => {
            if (settingsPanel && settingsPanel.classList.contains('active') && 
                !settingsPanel.contains(e.target) && 
                e.target !== settingsToggle) {
                closeSettingsPanel();
            }
        });
    }

    // 12. 页面加载后执行
    function initHomepage() {
        console.log('初始化主页功能');
        
        // 渲染分类和链接
        renderCategories();
        renderLinks(false);
        
        // 设置事件监听器
        setupEventListeners();
        
        console.log('主页功能初始化完成');
    }

    // 13. 执行初始化
    // 等待页面完全加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHomepage);
    } else {
        initHomepage();
    }
})();
</script>