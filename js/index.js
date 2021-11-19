window.onload = function() {
    // 轮播图功能
    // 获取元素
    var banner = document.querySelector('.banner');
    var bannerList = document.querySelector('.banner-list');
    var pointList = document.querySelector('.point-list');
    var prevBtn = document.querySelector('.btn .prev');
    var nextBtn = document.querySelector('.btn .next');
    var bannerItems = bannerList.getElementsByTagName('li');
    var pointItems = pointList.getElementsByTagName('li');
    var flag = true;
    var num = 0;

    // 让轮播图一行显示
    bannerList.style.width = bannerItems.length * 1180 + 'px';
    // 轮播图上一张
    prevBtn.onclick = function() {
        // 让bannerList往右移一张图的距离
        if (flag) {
            num--;
            flag = !flag;
            if (bannerList.offsetLeft >= 0) {
                bannerList.style.left = -(bannerItems.length - 1) * 1180 + 'px';
            };
            if (num < 0) {
                num = pointItems.length - 1;
            }
            var props = { "left": bannerList.offsetLeft + 1180 };
            zhy.bufferMove(bannerList, props, 3, function() {
                flag = !flag;
            });
            for (var i = 0; i < pointItems.length; i++) {
                pointItems[i].className = "";
            }
            pointItems[num].className = "active";
        }

    };
    // 轮播图下一张
    nextBtn.onclick = function() {
        // 让bannerList往右移一张图的距离
        if (flag) {
            num++;
            flag = !flag;
            if (bannerList.offsetLeft <= -(bannerItems.length - 1) * 1180) {
                bannerList.style.left = 0 + 'px';
            };
            if (num >= pointItems.length) {
                num = 0;
            };
            var props = { "left": bannerList.offsetLeft - 1180 };
            zhy.bufferMove(bannerList, props, 3, function() {
                flag = !flag;
            });
            for (var i = 0; i < pointItems.length; i++) {
                pointItems[i].className = "";
            }

            pointItems[num].className = "active";
        }
    };

    // 点击小圆点切换轮播图
    pointList.onclick = function(e) {
        flag = !flag;
        var eve = e || window.event;
        var target = eve.target || eve.src.Element;
        if (target.nodeName == 'LI') {
            for (var i = 0; i < pointItems.length; i++) {
                if (target == pointItems[i]) {
                    pointItems[i].className = 'active';
                    var props = { "left": -i * 1180 };
                    zhy.bufferMove(bannerList, props, 3, function() {
                        flag = !flag;
                    });
                    num = i;
                } else {
                    pointItems[i].className = "";
                }
            }
        }
    }

    // 自动轮播
    var timer = setInterval(function() {
        nextBtn.click();
    }, 2000);
    // 鼠标移入停止自动轮播
    banner.onmouseover = function() {
        clearInterval(timer);
    };
    // 鼠标移出开启自动轮播
    banner.onmouseout = function() {
        timer = setInterval(function() {
            nextBtn.click();
        }, 2000);
    }
}