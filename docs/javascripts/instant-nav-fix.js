// instant-nav-fix.js - 修复 Material for MkDocs instant navigation 问题
(function() {
    'use strict';
    
    console.log('=== Instant Navigation Fix 已加载 ===');
    
    // 检查是否是主页
    function isHomepage() {
        const path = window.location.pathname;
        const isIndexPage = path === '/' || 
                           path.endsWith('/') ||
                           path.includes('index.html') ||
                           path.includes('/index');
        
        // 检查是否有主页特定元素
        const hasHomeContent = document.querySelector('.main-content') !== null;
        
        console.log('主页检测:', { 
            path, 
            isIndexPage, 
            hasHomeContent,
            location: window.location.href 
        });
        
        return isIndexPage || hasHomeContent;
    }
    
    // 更新主页标识类
    function updateHomepageClass() {
        if (isHomepage()) {
            console.log('✓ 当前是主页，添加 is-homepage 类');
            document.body.classList.add('is-homepage');
            document.documentElement.classList.add('is-homepage');
            
            // 确保设置按钮可见
            const settingsBtn = document.getElementById('settingsToggle');
            if (settingsBtn) {
                settingsBtn.style.display = 'flex';
                settingsBtn.style.visibility = 'visible';
                settingsBtn.style.opacity = '1';
            }
        } else {
            console.log('✗ 当前不是主页，移除 is-homepage 类');
            document.body.classList.remove('is-homepage');
            document.documentElement.classList.remove('is-homepage');
        }
    }
    
    // 修复设置元素的事件绑定
    function fixSettingsElements() {
        if (!isHomepage()) return;
        
        console.log('修复设置元素事件绑定...');
        
        const settingsToggle = document.getElementById('settingsToggle');
        const settingsPanel = document.getElementById('settingsPanel');
        const closeSettings = document.getElementById('closeSettings');
        
        // 移除旧的事件监听器
        if (settingsToggle) {
            const newToggle = settingsToggle.cloneNode(true);
            settingsToggle.parentNode.replaceChild(newToggle, settingsToggle);
        }
        
        if (settingsPanel) {
            const newPanel = settingsPanel.cloneNode(true);
            settingsPanel.parentNode.replaceChild(newPanel, settingsPanel);
        }
        
        // 绑定新的事件
        const newToggle = document.getElementById('settingsToggle');
        const newPanel = document.getElementById('settingsPanel');
        const newClose = document.getElementById('closeSettings');
        
        if (newToggle && newPanel) {
            newToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('设置按钮被点击');
                newPanel.classList.toggle('active');
            });
            
            if (newClose) {
                newClose.addEventListener('click', function() {
                    newPanel.classList.remove('active');
                });
            }
            
            // 点击外部关闭
            document.addEventListener('click', function(e) {
                if (!newPanel.contains(e.target) && 
                    !newToggle.contains(e.target) && 
                    newPanel.classList.contains('active')) {
                    newPanel.classList.remove('active');
                }
            });
        }
    }
    
    // 重新初始化主页功能
    function reinitHomepage() {
        if (!isHomepage()) {
            console.log('不在主页，跳过重新初始化');
            return;
        }
        
        console.log('正在重新初始化主页...');
        
        updateHomepageClass();
        fixSettingsElements();
        
        // 如果 homepage.js 已加载，触发其初始化
        if (typeof window.initHomepage === 'function') {
            console.log('调用 homepage.js 的 initHomepage');
            window.initHomepage();
        }
        
        // 触发自定义事件
        const event = new CustomEvent('homepage-reinit');
        document.dispatchEvent(event);
    }
    
    // 设置 Material for MkDocs 事件监听
    function setupMaterialListeners() {
        console.log('设置 Material for MkDocs 事件监听器...');
        
        // 监听 Material 的 navigation 事件
        document.addEventListener('navigation', function() {
            console.log('Material navigation 事件触发');
            setTimeout(reinitHomepage, 100);
        });
        
        // 监听文档内容变化
        if (typeof app !== 'undefined') {
            console.log('Material app 对象存在');
            
            if (app.document$) {
                app.document$.subscribe(function() {
                    console.log('app.document$ 触发');
                    setTimeout(reinitHomepage, 150);
                });
            }
            
            if (app.initialized$) {
                app.initialized$.subscribe(function() {
                    console.log('app.initialized$ 触发');
                    setTimeout(reinitHomepage, 200);
                });
            }
        }
        
        // 监听浏览器历史变化
        window.addEventListener('popstate', function() {
            console.log('popstate 触发');
            setTimeout(reinitHomepage, 50);
        });
        
        // 监听页面可见性变化
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible') {
                console.log('页面变为可见');
                setTimeout(reinitHomepage, 100);
            }
        });
    }
    
    // 主初始化函数
    function initFix() {
        console.log('=== 初始化 Instant Navigation Fix ===');
        
        // 初始检测
        updateHomepageClass();
        
        // 如果当前是主页，立即修复
        if (isHomepage()) {
            console.log('当前是主页，立即修复设置元素');
            fixSettingsElements();
        }
        
        // 设置 Material 事件监听
        setupMaterialListeners();
        
        // 观察 DOM 变化（备用方案）
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.target === document.body) {
                    console.log('DOM 发生变化，检查主页状态');
                    setTimeout(updateHomepageClass, 50);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: false
        });
        
        // 观察 URL 变化
        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                console.log('URL 变化:', url);
                setTimeout(function() {
                    updateHomepageClass();
                    if (isHomepage()) {
                        reinitHomepage();
                    }
                }, 100);
            }
        }).observe(document, {subtree: true, childList: true});
        
        console.log('=== Instant Navigation Fix 初始化完成 ===');
    }
    
    // 页面加载时初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFix);
    } else {
        initFix();
    }
    
    // 窗口加载完成后再次检查
    window.addEventListener('load', function() {
        console.log('页面完全加载，重新检查主页状态');
        setTimeout(function() {
            updateHomepageClass();
            if (isHomepage()) {
                reinitHomepage();
            }
        }, 500);
    });
    
    // 导出函数供其他脚本使用
    window.fixInstantNav = {
        isHomepage: isHomepage,
        updateHomepageClass: updateHomepageClass,
        reinitHomepage: reinitHomepage
    };
})();