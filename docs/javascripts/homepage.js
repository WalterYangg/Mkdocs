// 主页功能 - 兼容 Material for MkDocs instant navigation
(function() {
    'use strict';
    
    // 网站数据
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
    
    // 图标映射
    const iconMap = {
        'default': { type: 'font-awesome', value: 'fas fa-globe' },
        'memos': { type: 'font-awesome', value: 'fas fa-sticky-note' },
        'openlist': { type: 'font-awesome', value: 'fas fa-list' },
        'lib': { type: 'font-awesome', value: 'fas fa-book' },
        'jellyfin': { type: 'font-awesome', value: 'fas fa-film' },
        'npm': { type: 'font-awesome', value: 'fab fa-npm' },
        'stirlingpdf': { type: 'font-awesome', value: 'fas fa-file-pdf' },
        'lsky': { type: 'font-awesome', value: 'fas fa-image' },
        'filebox': { type: 'font-awesome', value: 'fas fa-box' },
        'filebox-admin': { type: 'font-awesome', value: 'fas fa-cog' },
        'lkssite': { type: 'font-awesome', value: 'fas fa-tools' },
        'visionon': { type: 'font-awesome', value: 'fas fa-eye' },
        'helloworld': { type: 'font-awesome', value: 'fas fa-code' },
        'savetube': { type: 'font-awesome', value: 'fab fa-youtube' },
        'appicon': { type: 'font-awesome', value: 'fas fa-mobile-alt' },
        'removebg': { type: 'font-awesome', value: 'fas fa-eraser' },
        'canva': { type: 'font-awesome', value: 'fas fa-palette' },
        'chatgpt': { type: 'font-awesome', value: 'fas fa-robot' },
        'embedfire': { type: 'font-awesome', value: 'fas fa-book-open' },
        'micropython': { type: 'font-awesome', value: 'fas fa-microchip' },
        'lvgl': { type: 'font-awesome', value: 'fas fa-desktop' },
        'linuxcool': { type: 'font-awesome', value: 'fas fa-terminal' },
        'zlibrary': { type: 'font-awesome', value: 'fas fa-book' },
        'fontawesome': { type: 'font-awesome', value: 'fas fa-icons' },
        'zhutix': { type: 'font-awesome', value: 'fas fa-paint-brush' },
        'namemc': { type: 'font-awesome', value: 'fas fa-user' },
        'oshwhub': { type: 'font-awesome', value: 'fas fa-microchip' },
        'lceda': { type: 'font-awesome', value: 'fas fa-project-diagram' },
        'homepanel': { type: 'font-awesome', value: 'fas fa-home' },
        'servicespanel': { type: 'font-awesome', value: 'fas fa-server' },
        'homeboard': { type: 'font-awesome', value: 'fas fa-tachometer-alt' }
    };
    
    let currentCategory = '';
    let searchKeyword = '';
    let isAnimating = false;
    let isInitialized = false;
    
    // 检查是否为主页
    function isHomepage() {
        return document.body.classList.contains('is-homepage');
    }
    
    // 加载FontAwesome
    function loadFontAwesome() {
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(link);
        }
    }
    
    // 初始化主页
    function initHomepage() {
        if (!isHomepage() || isInitialized) return;
        
        console.log('初始化主页功能...');
        loadFontAwesome();
        
        // 渲染内容
        renderCategories();
        renderLinks(false);
        
        // 绑定事件
        setupEventListeners();
        
        // 加载用户设置
        loadUserPreferences();
        
        isInitialized = true;
    }
    
    // 渲染分类
    function renderCategories() {
        const container = document.getElementById('categories');
        if (!container) return;
        
        container.innerHTML = '';
        
        siteData.categories.forEach(category => {
            const button = document.createElement('button');
            button.className = `category-btn ${category.id === currentCategory ? 'active' : ''}`;
            button.textContent = category.name;
            button.dataset.category = category.id;
            container.appendChild(button);
        });
    }
    
    // 获取图标HTML
    function getIconHTML(linkId) {
        const iconData = iconMap[linkId] || iconMap['default'];
        return `<i class="${iconData.value}"></i>`;
    }
    
    // 渲染链接
    function renderLinks(animate = true) {
        const grid = document.getElementById('linksGrid');
        const section = document.getElementById('linksSection');
        
        if (!grid || !section || isAnimating) return;
        
        if (animate) {
            isAnimating = true;
            grid.classList.add('fade-out');
            
            setTimeout(() => {
                renderLinksContent();
                grid.classList.remove('fade-out');
                setTimeout(() => isAnimating = false, 300);
            }, 300);
        } else {
            renderLinksContent();
        }
    }
    
    // 渲染链接内容
    function renderLinksContent() {
        const grid = document.getElementById('linksGrid');
        const section = document.getElementById('linksSection');
        if (!grid || !section) return;
        
        grid.innerHTML = '';
        
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
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
        
        // 渲染链接卡片
        if (filterledLinks.length > 0) {
            filteredLinks.forEach((link, index) => {
                const card = document.createElement('a');
                card.className = 'link-card';
                card.href = link.url;
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
                card.style.animationDelay = `${index * 0.05}s`;
                
                card.innerHTML = `
                    <div class="link-icon">${getIconHTML(link.id)}</div>
                    <div class="link-name">${link.name}</div>
                `;
                
                grid.appendChild(card);
            });
        } else if (currentCategory || searchKeyword) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i class="fas fa-search"></i>
                <p>没有找到匹配的网站</p>
            `;
            grid.appendChild(emptyState);
        }
    }
    
    // 绑定事件
    function setupEventListeners() {
        // 分类点击
        const categoriesContainer = document.getElementById('categories');
        if (categoriesContainer) {
            categoriesContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('category-btn') && !isAnimating) {
                    const newCategory = e.target.dataset.category;
                    
                    document.querySelectorAll('.category-btn').forEach(btn => {
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
        
        // 搜索输入
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchKeyword = e.target.value.trim();
                renderLinks();
            });
            
            // 回车搜索
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
        
        // 设置面板
        const settingsToggle = document.getElementById('settingsToggle');
        const settingsPanel = document.getElementById('settingsPanel');
        const closeSettings = document.getElementById('closeSettings');
        
        if (settingsToggle && settingsPanel) {
            settingsToggle.addEventListener('click', () => {
                settingsPanel.classList.add('active');
            });
        }
        
        if (closeSettings && settingsPanel) {
            closeSettings.addEventListener('click', () => {
                settingsPanel.classList.remove('active');
            });
        }
        
        // 点击外部关闭设置面板
        document.addEventListener('click', (e) => {
            const settingsPanel = document.getElementById('settingsPanel');
            const settingsToggle = document.getElementById('settingsToggle');
            
            if (settingsPanel && settingsPanel.classList.contains('active') && 
                !settingsPanel.contains(e.target) && 
                e.target !== settingsToggle) {
                settingsPanel.classList.remove('active');
            }
        });
        
        // 背景选择
        const backgroundOptions = document.getElementById('backgroundOptions');
        if (backgroundOptions) {
            backgroundOptions.addEventListener('click', (e) => {
                if (e.target.classList.contains('bg-option')) {
                    document.querySelectorAll('.bg-option').forEach(option => {
                        option.classList.remove('active');
                    });
                    
                    e.target.classList.add('active');
                    
                    const bgValue = e.target.dataset.bg;
                    applyBackground(bgValue);
                    saveUserPreference('background', bgValue);
                }
            });
        }
        
        // 自定义背景
        const applyCustomBg = document.getElementById('applyCustomBg');
        const customBgInput = document.getElementById('customBgInput');
        if (applyCustomBg && customBgInput) {
            applyCustomBg.addEventListener('click', () => {
                const bgUrl = customBgInput.value.trim();
                if (bgUrl) {
                    document.querySelectorAll('.bg-option').forEach(option => {
                        option.classList.remove('active');
                    });
                    
                    applyBackground(`url('${bgUrl}')`);
                    saveUserPreference('background', `url('${bgUrl}')`);
                    customBgInput.value = '';
                }
            });
        }
        
        // 滑块事件
        setupSliderEvents();
        
        // 重置设置
        const resetSettings = document.getElementById('resetSettings');
        if (resetSettings) {
            resetSettings.addEventListener('click', resetUserPreferences);
        }
    }
    
    // 设置滑块事件
    function setupSliderEvents() {
        // 背景透明度
        const bgOpacitySlider = document.getElementById('bgOpacitySlider');
        const bgOpacityValue = document.getElementById('bgOpacityValue');
        if (bgOpacitySlider && bgOpacityValue) {
            bgOpacitySlider.addEventListener('input', (e) => {
                const value = e.target.value;
                bgOpacityValue.textContent = `${value}%`;
                document.documentElement.style.setProperty('--background-opacity', value / 100);
                saveUserPreference('bgOpacity', value);
            });
        }
        
        // UI透明度
        const opacitySlider = document.getElementById('opacitySlider');
        const opacityValue = document.getElementById('opacityValue');
        if (opacitySlider && opacityValue) {
            opacitySlider.addEventListener('input', (e) => {
                const value = e.target.value;
                opacityValue.textContent = `${value}%`;
                document.documentElement.style.setProperty('--ui-opacity', value / 100);
                saveUserPreference('opacity', value);
            });
        }
        
        // 模糊效果
        const blurSlider = document.getElementById('blurSlider');
        const blurValue = document.getElementById('blurValue');
        if (blurSlider && blurValue) {
            blurSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                blurValue.textContent = `${value}px`;
                document.documentElement.style.setProperty('--blur-intensity', `${value}px`);
                saveUserPreference('blur', value);
            });
        }
    }
    
    // 应用背景
    function applyBackground(bgValue) {
        const backgroundLayer = document.getElementById('backgroundLayer');
        if (backgroundLayer) {
            backgroundLayer.style.backgroundImage = bgValue === 'none' ? '' : bgValue;
        }
    }
    
    // 保存用户偏好
    function saveUserPreference(key, value) {
        const preferences = JSON.parse(localStorage.getItem('navPreferences') || '{}');
        preferences[key] = value;
        localStorage.setItem('navPreferences', JSON.stringify(preferences));
    }
    
    // 加载用户偏好
    function loadUserPreferences() {
        const preferences = JSON.parse(localStorage.getItem('navPreferences') || '{}');
        
        if (preferences.background) {
            applyBackground(preferences.background);
            const bgOptions = document.querySelectorAll('.bg-option');
            for (let option of bgOptions) {
                if (option.dataset.bg === preferences.background) {
                    option.classList.add('active');
                    break;
                }
            }
        }
        
        if (preferences.bgOpacity) {
            const slider = document.getElementById('bgOpacitySlider');
            const value = document.getElementById('bgOpacityValue');
            if (slider && value) {
                slider.value = preferences.bgOpacity;
                value.textContent = `${preferences.bgOpacity}%`;
                document.documentElement.style.setProperty('--background-opacity', preferences.bgOpacity / 100);
            }
        }
        
        if (preferences.opacity) {
            const slider = document.getElementById('opacitySlider');
            const value = document.getElementById('opacityValue');
            if (slider && value) {
                slider.value = preferences.opacity;
                value.textContent = `${preferences.opacity}%`;
                document.documentElement.style.setProperty('--ui-opacity', preferences.opacity / 100);
            }
        }
        
        if (preferences.blur) {
            const slider = document.getElementById('blurSlider');
            const value = document.getElementById('blurValue');
            if (slider && value) {
                slider.value = preferences.blur;
                value.textContent = `${preferences.blur}px`;
                document.documentElement.style.setProperty('--blur-intensity', `${preferences.blur}px`);
            }
        }
    }
    
    // 重置用户偏好
    function resetUserPreferences() {
        localStorage.removeItem('navPreferences');
        location.reload();
    }
    
    // 处理页面变化
    function handlePageChange() {
        const wasInitialized = isInitialized;
        const isCurrentlyHomepage = isHomepage();
        
        if (isCurrentlyHomepage && !isInitialized) {
            initHomepage();
        } else if (!isCurrentlyHomepage && wasInitialized) {
            isInitialized = false;
        }
    }
    
    // 设置观察器
    function setupObservers() {
        // 监听body类变化
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    handlePageChange();
                }
            });
        });
        
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // 监听Material for MkDocs的instant navigation
        if (typeof app !== 'undefined' && app.document$) {
            app.document$.subscribe(() => {
                setTimeout(handlePageChange, 100);
            });
        }
        
        // 监听浏览器历史变化
        window.addEventListener('popstate', handlePageChange);
    }
    
    // 主初始化
    function init() {
        handlePageChange();
        setupObservers();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', handlePageChange);
        }
    }
    
    // 启动
    init();
})();