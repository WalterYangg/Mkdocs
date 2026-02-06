// 网站数据配置 - 原 <script id="siteData"> 内容
// 全局主页初始化函数
window.initHomepage = function() {
    console.log('调用全局主页初始化');
    
    // 检查是否是主页
    if (!document.body.classList.contains('is-homepage')) {
        console.log('不是主页，跳过初始化');
        return;
    }
    
    // 重置状态
    currentCategory = '';
    searchKeyword = '';
    isAnimating = false;
    
    // 清空搜索框
    if (searchInput) {
        searchInput.value = '';
    }
    
    // 移除所有分类的active类
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 原有的初始化逻辑
    if (typeof initPage === 'function') {
        // 先移除之前的事件监听器，避免重复绑定
        removeEventListeners();
        // 重新初始化
        initPage();
    }
};

// 添加移除事件监听器的函数
function removeEventListeners() {
    // 由于我们使用的是事件委托，所以这里主要是重置内部状态
    // 分类按钮的事件委托不需要移除
    console.log('移除旧的事件监听器');
}

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

// 主应用逻辑 - 原第二个 <script> 内容
// DOM元素（这些会在 initPage 中重新获取）
let categoriesContainer, linksGrid, linksSection, searchInput, settingsToggle, settingsPanel, closeSettings;
let backgroundOptions, customBgInput, applyCustomBg, opacitySlider, opacityValue, blurSlider, blurValue, resetSettings;
let bgOpacitySlider, bgOpacityValue, backgroundLayer;

// 当前选中的分类
let currentCategory = '';
// 搜索关键词
let searchKeyword = '';
// 动画状态
let isAnimating = false;

// 初始化页面
function initPage() {
    // 重新获取DOM元素引用（instant navigation后DOM会重新创建）
    categoriesContainer = document.getElementById('categories');
    linksGrid = document.getElementById('linksGrid');
    linksSection = document.getElementById('linksSection');
    searchInput = document.getElementById('searchInput');
    settingsToggle = document.getElementById('settingsToggle');
    settingsPanel = document.getElementById('settingsPanel');
    closeSettings = document.getElementById('closeSettings');
    backgroundOptions = document.getElementById('backgroundOptions');
    customBgInput = document.getElementById('customBgInput');
    applyCustomBg = document.getElementById('applyCustomBg');
    opacitySlider = document.getElementById('opacitySlider');
    opacityValue = document.getElementById('opacityValue');
    blurSlider = document.getElementById('blurSlider');
    blurValue = document.getElementById('blurValue');
    resetSettings = document.getElementById('resetSettings');
    bgOpacitySlider = document.getElementById('bgOpacitySlider');
    bgOpacityValue = document.getElementById('bgOpacityValue');
    backgroundLayer = document.getElementById('backgroundLayer');
    
    console.log('重新获取DOM元素引用');
    
    // 渲染UI
    renderCategories();
    renderLinks(false); // 初始渲染不使用动画
    setupEventListeners();
    loadUserPreferences();
    syncWithMaterialTheme();
    
    // 确保主页元素可见
    if (categoriesContainer && linksSection) {
        categoriesContainer.style.display = 'flex';
        linksSection.style.display = 'block';
    }
}

// 渲染分类
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

// 渲染链接内容
function renderLinksContent() {
    if (!linksGrid) return;
    
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
    if (linksSection) {
        if (currentCategory || searchKeyword) {
            linksSection.classList.add('active');
        } else {
            linksSection.classList.remove('active');
        }
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
    if (settingsPanel) {
        settingsPanel.classList.add('active');
    }
}

function closeSettingsPanel() {
    if (settingsPanel) {
        settingsPanel.classList.remove('active');
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 分类点击事件 - 使用事件委托，避免重复绑定
    if (categoriesContainer) {
        categoriesContainer.addEventListener('click', handleCategoryClick);
    }
    
    // 搜索输入事件
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
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
        backgroundOptions.addEventListener('click', handleBackgroundSelect);
    }
    
    // 自定义背景应用
    if (applyCustomBg) {
        applyCustomBg.addEventListener('click', handleCustomBgApply);
    }
    
    // 背景透明度滑块
    if (bgOpacitySlider) {
        bgOpacitySlider.addEventListener('input', handleBgOpacityChange);
    }
    
    // UI透明度滑块
    if (opacitySlider) {
        opacitySlider.addEventListener('input', handleOpacityChange);
    }
    
    // 模糊效果滑块
    if (blurSlider) {
        blurSlider.addEventListener('input', handleBlurChange);
    }
    
    // 重置设置
    if (resetSettings) {
        resetSettings.addEventListener('click', resetUserPreferences);
    }
    
    // 搜索框回车事件 - 使用必应搜索
    if (searchInput) {
        searchInput.addEventListener('keydown', handleSearchKeydown);
    }
    
    // 点击设置面板外部关闭面板
    document.addEventListener('click', handleDocumentClick);
}

// 事件处理函数（避免匿名函数，便于移除）
function handleCategoryClick(e) {
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
}

function handleSearchInput(e) {
    searchKeyword = e.target.value.trim();
    renderLinks();
}

function handleBackgroundSelect(e) {
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
}

function handleCustomBgApply() {
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
}

function handleBgOpacityChange(e) {
    const value = e.target.value;
    bgOpacityValue.textContent = `${value}%`;
    
    // 更新CSS变量
    const opacity = value / 100;
    document.documentElement.style.setProperty('--background-opacity', opacity);
    
    // 保存到本地存储
    saveUserPreference('bgOpacity', value);
}

function handleOpacityChange(e) {
    const value = e.target.value;
    opacityValue.textContent = `${value}%`;
    
    // 更新CSS变量
    const opacity = value / 100;
    updateUIOpacity(opacity);
    
    // 保存到本地存储
    saveUserPreference('opacity', value);
}

function handleBlurChange(e) {
    const value = e.target.value;
    blurValue.textContent = `${value}px`;
    
    // 更新CSS变量
    document.documentElement.style.setProperty('--blur-intensity', `${value}px`);
    
    // 保存到本地存储
    saveUserPreference('blur', value);
}

function handleSearchKeydown(e) {
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
}

function handleDocumentClick(e) {
    if (settingsPanel && settingsPanel.classList.contains('active') && 
        !settingsPanel.contains(e.target) && 
        e.target !== settingsToggle) {
        closeSettingsPanel();
    }
}

// 应用背景
function applyBackground(bgValue) {
    if (!backgroundLayer) return;
    
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
    if (preferences.background && backgroundLayer) {
        applyBackground(preferences.background);
        
        // 找到对应的背景选项并激活
        if (backgroundOptions) {
            const bgOptions = backgroundOptions.querySelectorAll('.bg-option');
            for (let option of bgOptions) {
                if (option.dataset.bg === preferences.background) {
                    option.classList.add('active');
                    break;
                }
            }
        }
    }
    
    // 加载背景透明度设置
    if (preferences.bgOpacity && bgOpacitySlider && bgOpacityValue) {
        bgOpacitySlider.value = preferences.bgOpacity;
        bgOpacityValue.textContent = `${preferences.bgOpacity}%`;
        
        const opacity = preferences.bgOpacity / 100;
        document.documentElement.style.setProperty('--background-opacity', opacity);
    }
    
    // 加载透明度设置
    if (preferences.opacity && opacitySlider && opacityValue) {
        opacitySlider.value = preferences.opacity;
        opacityValue.textContent = `${preferences.opacity}%`;
        
        const opacity = preferences.opacity / 100;
        // 设置UI透明度
        updateUIOpacity(opacity);
    }
    
    // 加载模糊效果设置
    if (preferences.blur && blurSlider && blurValue) {
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

// 原来的DOMContentLoaded事件监听器保持不变
document.addEventListener('DOMContentLoaded', function() {
    console.log('homepage.js: DOMContentLoaded');
    window.initHomepage();
});

// 监听自定义事件
document.addEventListener('homepage-init', function() {
    console.log('homepage.js: homepage-init 事件触发');
    window.initHomepage();
});

// 监听 navigation 事件
document.addEventListener('navigation', function() {
    console.log('homepage.js: navigation 事件触发');
    setTimeout(window.initHomepage, 100);
});