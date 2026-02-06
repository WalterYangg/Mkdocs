// instant-nav-fix.js - 修复 Material for MkDocs instant navigation 问题
(function() {
    console.log('Instant navigation fix loaded');
    
    // 检查是否是主页
    function isHomepage() {
        const path = window.location.pathname;
        return path === '/' || 
               path === '/index.html' || 
               path.endsWith('/') ||
               path.includes('index') ||
               document.querySelector('main.main-content') !== null;
    }
    
    // 更新主页标识类
    function updateHomepageClass() {
        const body = document.body;
        if (isHomepage()) {
            console.log('当前是主页，添加 is-homepage 类');
            body.classList.add('is-homepage');
            
            // 确保设置按钮可见
            const settingsBtn = document.querySelector('.settings-btn');
            if (settingsBtn) {
                settingsBtn.style.display = 'flex';
                settingsBtn.style.visibility = 'visible';
                settingsBtn.style.opacity = '1';
            }
            
            // 确保背景层存在
            const bgLayer = document.querySelector('.background-layer');
            if (!bgLayer && document.querySelector('main.main-content')) {
                const newBgLayer = document.createElement('div');
                newBgLayer.className = 'background-layer';
                newBgLayer.id = 'backgroundLayer';
                document.body.appendChild(newBgLayer);
            }
        } else {
            console.log('当前不是主页，移除 is-homepage 类');
            body.classList.remove('is-homepage');
        }
    }
    
    // 修复设置按钮和面板
    function fixSettingsElements() {
        if (!isHomepage()) return;
        
        // 克隆并替换设置按钮以刷新事件监听器
        const settingsToggle = document.getElementById('settingsToggle');
        const settingsPanel = document.getElementById('settingsPanel');
        
        if (settingsToggle) {
            const newToggle = settingsToggle.cloneNode(true);
            settingsToggle.parentNode.replaceChild(newToggle, settingsToggle);
        }
        
        if (settingsPanel) {
            const newPanel = settingsPanel.cloneNode(true);
            settingsPanel.parentNode.replaceChild(newPanel, settingsPanel);
        }
        
        console.log('设置元素已修复');
    }
    
    // 初始化主页
    function initHomepage() {
        updateHomepageClass();
        
        if (!isHomepage()) {
            console.log('不在主页，跳过主页初始化');
            return;
        }
        
        console.log('初始化主页功能');
        fixSettingsElements();
        
        // 触发 homepage.js 重新初始化
        if (typeof window.initHomepage === 'function') {
            window.initHomepage();
        }
        
        // 触发自定义事件
        document.dispatchEvent(new CustomEvent('homepage-init'));
    }
    
    // Material for MkDocs 事件处理
    function setupMaterialEvents() {
        // 监听 navigation 事件
        document.addEventListener('navigation', function() {
            console.log('navigation 事件触发');
            setTimeout(initHomepage, 50);
        });
        
        // 监听内容更新
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.target === document.body) {
                    setTimeout(updateHomepageClass, 50);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: false
        });
        
        // 监听 popstate (浏览器前进/后退)
        window.addEventListener('popstate', function() {
            setTimeout(initHomepage, 50);
        });
        
        // Material for MkDocs 7.x+ 事件
        if (typeof app !== 'undefined') {
            if (app.document$) {
                app.document$.subscribe(function() {
                    setTimeout(initHomepage, 100);
                });
            }
            
            if (app.initialized$) {
                app.initialized$.subscribe(function() {
                    setTimeout(initHomepage, 100);
                });
            }
        }
    }
    
    // 初始化
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded - 初始化修复');
        initHomepage();
        setupMaterialEvents();
    });
    
    // 延迟初始化，确保 MkDocs 完全加载
    window.addEventListener('load', function() {
        setTimeout(initHomepage, 500);
    });
    
    // 导出函数供其他脚本使用
    window.fixInstantNavigation = {
        isHomepage: isHomepage,
        updateHomepageClass: updateHomepageClass,
        initHomepage: initHomepage
    };
})();



