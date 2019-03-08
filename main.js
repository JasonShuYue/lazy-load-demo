document.addEventListener('DOMContentLoaded', function() {
    var lazyLoadTimeOut = null;

    function lazyLoad() {
        var lazyLoadImages = document.querySelectorAll('img.lazy');
        // 运用了函数防抖
        if(lazyLoadTimeOut) {
            clearTimeout(lazyLoadTimeOut);
        }

        lazyLoadTimeOut = setTimeout(function() {
            var scrollTop = window.scrollY;
            lazyLoadImages.forEach(function(img) {
                if(img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
            console.log('lazyLoadImages.length', lazyLoadImages.length)
            if(lazyLoadImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationChange", lazyLoad);
            }
        }, 20);
    }
    document.addEventListener('scroll', lazyLoad)
    // 当页面伸缩时
    window.addEventListener('resize', lazyLoad);
    // 当屏幕横屏时
    window.addEventListener('orientationChange', lazyLoad);
})