// instant-nav-fix.js - 简单版本

console.log('instant-nav-fix.js 加载');

// 监听所有可能的页面变化事件
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - 检查主页');
    
    // 初始检查
    checkHomepage();
    
    // 监听Material主题的instant navigation
    document.addEventListener('md-navigation', function() {
        console.log('md-navigation事件触发，检查主页');
        setTimeout(checkHomepage, 300);
    });
    
    // 监听hash变化
    window.addEventListener('hashchange', function() {
        console.log('hashchange事件触发，检查主页');
        setTimeout(checkHomepage, 100);
    });
});

function checkHomepage() {
    console.log('检查主页状态...');
    
    // 检查是否有主页容器
    const homepageContainer = document.querySelector('.homepage-container');
    if (homepageContainer) {
        console.log('检测到主页容器');
        
        // 确保主页标识已添加
        if (!document.body.classList.contains('is-homepage')) {
            console.log('添加主页标识: is-homepage');
            document.body.classList.add('is-homepage');
        }
        
        // 确保主页容器可见
        homepageContainer.style.display = 'block';
        
        // 如果initHomepage函数存在，调用它
        if (typeof initHomepage === 'function') {
            console.log('调用initHomepage函数');
            setTimeout(initHomepage, 100);
        }
    } else {
        console.log('不是主页，移除主页标识');
        document.body.classList.remove('is-homepage');
    }
}