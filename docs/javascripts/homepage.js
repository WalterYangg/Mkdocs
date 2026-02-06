// homepage.js - 简化版本，专注于基本功能

console.log('homepage.js 加载');

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
        { id: 'memos', name: 'Memos', url: 'http://memos.hiquq.com/', category: 'myapps', icon: 'fas fa-sticky-note' },
        { id: 'openlist', name: 'OpenList', url: 'http://openlist.hiquq.com/', category: 'myapps', icon: 'fas fa-list' },
        { id: 'lib', name: 'Lib', url: 'http://lib.hiquq.com/', category: 'myapps', icon: 'fas fa-book' },
        { id: 'jellyfin', name: 'Jellyfin', url: 'http://m.hiquq.com/web/', category: 'myapps', icon: 'fas fa-film' },
        { id: 'npm', name: 'NPM', url: 'http://npm.hiquq.com/', category: 'myapps', icon: 'fab fa-npm' },
        { id: 'stirlingpdf', name: 'StirlingPDF', url: 'http://pdf.hiquq.com/', category: 'myapps', icon: 'fas fa-file-pdf' },
        { id: 'lsky', name: '兰空图床', url: 'http://lsky.sth.ink/', category: 'myapps', icon: 'fas fa-image' },
        { id: 'filebox', name: 'FB文件快递柜', url: 'http://box.hiquq.com/', category: 'myapps', icon: 'fas fa-box' },
        { id: 'filebox-admin', name: 'FB管理员', url: 'http://box.hiquq.com/#/admin', category: 'myapps', icon: 'fas fa-cog' },
        
        // 在线工具
        { id: 'lkssite', name: 'LKSsite', url: 'https://lkssite.vip/', category: 'tools', icon: 'fas fa-tools' },
        { id: 'visionon', name: 'Visionon', url: 'https://pub.visionon.cn/', category: 'tools', icon: 'fas fa-eye' },
        { id: 'helloworld', name: 'helloworld', url: 'https://www.helloworld.net/html2md', category: 'tools', icon: 'fas fa-code' },
        { id: 'savetube', name: 'SaveTube', url: 'https://yt.savetube.me/', category: 'tools', icon: 'fab fa-youtube' },
        { id: 'appicon', name: 'Appicon', url: 'https://zhangyu1818.github.io/appicon-forge/', category: 'tools', icon: 'fas fa-mobile-alt' },
        { id: 'removebg', name: 'Remove', url: 'https://www.remove.bg/zh', category: 'tools', icon: 'fas fa-eraser' },
        { id: 'canva', name: 'Canva可画', url: 'https://www.canva.cn/', category: 'tools', icon: 'fas fa-palette' },
        { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', category: 'tools', icon: 'fas fa-robot' },
        
        // 参考文档
        { id: 'embedfire', name: '野火开发指南', url: 'https://doc.embedfire.com/linux/imx6/driver/zh/latest/index.html', category: 'docs', icon: 'fas fa-book-open' },
        { id: 'micropython', name: 'MpyESP32', url: 'http://docs.micropython.org/en/latest/esp32/quickref.html', category: 'docs', icon: 'fas fa-microchip' },
        { id: 'lvgl', name: 'Lvgl中文文档', url: 'https://lvgl.100ask.net/master/index.html', category: 'docs', icon: 'fas fa-desktop' },
        { id: 'linuxcool', name: 'Linux命令大全', url: 'https://www.linuxcool.com/', category: 'docs', icon: 'fas fa-terminal' },
        
        // 网站论坛
        { id: 'zlibrary', name: 'Zlibrary', url: 'https://zh.z-lib.gs/', category: 'forums', icon: 'fas fa-book' },
        { id: 'fontawesome', name: 'Fontawesome', url: 'https://fontawesome.com/v4/icons/', category: 'forums', icon: 'fas fa-icons' },
        { id: 'zhutix', name: '致美化', url: 'https://zhutix.com/', category: 'forums', icon: 'fas fa-paint-brush' },
        { id: 'namemc', name: 'NameMC', url: 'https://namemc.com/minecraft-skins', category: 'forums', icon: 'fas fa-user' },
        
        // 技术开发
        { id: 'oshwhub', name: '立创开源硬件', url: 'https://oshwhub.com/', category: 'dev', icon: 'fas fa-microchip' },
        { id: 'lceda', name: '立创EDA', url: 'https://pro.lceda.cn/editor', category: 'dev', icon: 'fas fa-project-diagram' },
        
        // 服务面板
        { id: 'homepanel', name: 'HomePanel', url: 'http://47.122.74.70:27521/172765d467', category: 'panels', icon: 'fas fa-home' },
        { id: 'servicespanel', name: 'ServicesPanel', url: 'http://47.122.74.70:11045/1d2d0fc2e3', category: 'panels', icon: 'fas fa-server' },
        { id: 'homeboard', name: 'HomeBoard', url: 'https://homebt.hiquq.com:11888/walter', category: 'panels', icon: 'fas fa-tachometer-alt' }
    ]
};

// 初始化函数
function initHomepage() {
    console.log('初始化主页');
    
    // 检查是否是主页
    const homepageContainer = document.querySelector('.homepage-container');
    if (!homepageContainer) {
        console.log('不是主页，跳过初始化');
        return;
    }
    
    // 确保主页标识已添加
    document.body.classList.add('is-homepage');
    
    // 获取DOM元素
    const categoriesContainer = document.getElementById('categories');
    const linksGrid = document.getElementById('linksGrid');
    const linksSection = document.getElementById('linksSection');
    const searchInput = document.getElementById('searchInput');
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    
    // 状态变量
    let currentCategory = '';
    let searchKeyword = '';
    
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
    
    // 渲染链接
    function renderLinks() {
        if (!linksGrid) return;
        
        // 过滤链接
        const filteredLinks = siteData.links.filter(link => {
            const matchesCategory = !currentCategory || link.category === currentCategory;
            const matchesSearch = !searchKeyword || 
                link.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                link.url.toLowerCase().includes(searchKeyword.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        
        // 显示/隐藏链接区域
        if (linksSection) {
            if (currentCategory || searchKeyword) {
                linksSection.classList.add('active');
            } else {
                linksSection.classList.remove('active');
            }
        }
        
        // 清空并重新渲染
        linksGrid.innerHTML = '';
        
        filteredLinks.forEach((link, index) => {
            const card = document.createElement('a');
            card.className = 'link-card';
            card.href = link.url;
            card.target = '_blank';
            card.style.animationDelay = `${index * 0.05}s`;
            
            card.innerHTML = `
                <div class="link-icon"><i class="${link.icon || 'fas fa-globe'}"></i></div>
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
    
    // 设置事件监听器
    function setupEventListeners() {
        // 分类按钮点击
        if (categoriesContainer) {
            categoriesContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('category-btn')) {
                    const category = e.target.dataset.category;
                    
                    // 如果点击的是当前已选中的分类，则取消选择
                    if (category === currentCategory) {
                        currentCategory = '';
                        e.target.classList.remove('active');
                    } else {
                        currentCategory = category;
                        // 移除所有active类
                        document.querySelectorAll('.category-btn').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        // 添加active类到当前按钮
                        e.target.classList.add('active');
                    }
                    
                    renderLinks();
                }
            });
        }
        
        // 搜索框输入
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchKeyword = e.target.value.trim();
                renderLinks();
            });
            
            // 搜索框回车
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
                        } catch {
                            url = `https://www.bing.com/search?q=${encodeURIComponent(value)}`;
                            window.open(url, '_blank');
                        }
                    }
                }
            });
        }
        
        // 设置按钮
        if (settingsToggle && settingsPanel) {
            settingsToggle.addEventListener('click', () => {
                settingsPanel.classList.add('active');
            });
            
            // 关闭设置按钮
            const closeBtn = document.getElementById('closeSettings');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    settingsPanel.classList.remove('active');
                });
            }
            
            // 点击外部关闭
            document.addEventListener('click', (e) => {
                if (settingsPanel.classList.contains('active') && 
                    !settingsPanel.contains(e.target) && 
                    e.target !== settingsToggle) {
                    settingsPanel.classList.remove('active');
                }
            });
        }
    }
    
    // 执行初始化
    renderCategories();
    renderLinks();
    setupEventListeners();
    
    console.log('主页初始化完成');
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - 初始化主页');
    initHomepage();
});

// 监听instant navigation事件
document.addEventListener('md-navigation', function() {
    console.log('md-navigation事件触发，重新初始化主页');
    setTimeout(initHomepage, 300);
});

// 监听页面可见性变化
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && document.querySelector('.homepage-container')) {
        setTimeout(initHomepage, 100);
    }
});