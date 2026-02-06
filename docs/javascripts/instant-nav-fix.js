// instant-nav-fix.js - Material主题instant navigation修复
console.log('instant-nav-fix.js加载');

// 监听所有Material主题的instant navigation事件
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - 开始监听instant navigation');
    
    // 检查是否是主页
    checkHomepageStatus();
    
    // 监听Material主题的instant navigation
    document.addEventListener('DOMContentLoaded', checkHomepageStatus, false);
    window.addEventListener('popstate', checkHomepageStatus, false);
    window.addEventListener('hashchange', checkHomepageStatus, false);
    
    // 监听Material主题的页面加载完成事件
    document.addEventListener('md-navigation', function(e) {
        console.log('Material instant navigation完成');
        setTimeout(checkHomepageStatus, 300);
    });
    
    // 监听MutationObserver来检测DOM变化
    const observer = new MutationObserver(function(mutations) {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                setTimeout(checkHomepageStatus, 100);
                break;
            }
        }
    });
    
    // 开始观察body元素的变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // 初始检查后，1秒后再检查一次确保一切正常
    setTimeout(checkHomepageStatus, 1000);
});

function checkHomepageStatus() {
    console.log('检查主页状态...');
    
    // 检查是否有主页容器
    const homepageContainer = document.querySelector('.homepage-container');
    const hasHomepage = !!homepageContainer;
    
    console.log('主页容器存在?', hasHomepage);
    
    if (hasHomepage) {
        // 添加主页标识
        if (!document.body.classList.contains('is-homepage')) {
            console.log('添加主页标识: is-homepage');
            document.body.classList.add('is-homepage');
        }
        
        // 确保主页元素可见
        ensureHomepageVisibility();
        
        // 触发主页初始化
        if (typeof window.initHomepage === 'function') {
            console.log('触发主页初始化');
            setTimeout(window.initHomepage, 100);
        } else {
            console.warn('window.initHomepage函数未定义');
        }
    } else {
        // 如果不是主页，移除主页标识
        if (document.body.classList.contains('is-homepage')) {
            console.log('移除主页标识: is-homepage');
            document.body.classList.remove('is-homepage');
        }
    }
}

function ensureHomepageVisibility() {
    // 确保主页容器可见
    const homepageContainer = document.querySelector('.homepage-container');
    if (homepageContainer) {
        homepageContainer.style.display = 'block';
    }
    
    // 确保设置按钮可见
    const settingsToggle = document.getElementById('settingsToggle');
    if (settingsToggle) {
        settingsToggle.style.display = 'flex';
        settingsToggle.style.visibility = 'visible';
    }
    
    // 确保设置面板容器可见
    const settingsPanel = document.getElementById('settingsPanel');
    if (settingsPanel) {
        settingsPanel.style.display = 'block';
    }
}