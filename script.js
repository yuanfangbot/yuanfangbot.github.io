// 确认脚本已加载
console.log('网站脚本已加载');

// 设置当前活动导航菜单项
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 为导航菜单项添加活动状态
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (link.getAttribute('href') === '#' && currentPage === 'index.html')) {
            link.classList.add('active');
            link.style.backgroundColor = '#34495e';
        }
    });

    // 简单的交互效果 - 文章点击效果
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.addEventListener('click', function() {
            this.style.transform = 'scale(0.99)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // 广告集成预留位置
    function loadAds() {
        console.log('广告加载功能预留位置');
        // 这里将是Google AdSense或其他广告网络的集成代码
    }

    // 页面加载完成后执行
    loadAds();
});

// 为SEO优化预留功能
function trackAnalytics() {
    console.log('分析跟踪功能预留位置');
    // 这里将添加Google Analytics或其他分析工具的代码
}