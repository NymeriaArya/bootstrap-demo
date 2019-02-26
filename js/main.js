$(function () {
      function reSize() {
          //获取屏幕宽度
          var windowWidth = $(window).width();
          //判断
          //根据大小决定加载哪张图片
          var isSmallScreen = windowWidth < 768;
          $('#main-id > .carousel-inner > .item ').each(function (i, item) {
              var $item = $(item);//因为拿到的时dom对象 需要准换
              var imgSrc = $item.data(isSmallScreen ? "image-xs" : "image-lg");
              $item.css("backgroundImage", 'url("'+imgSrc+'")');
              //小图时尺寸等比例变化
              //大图时使用背景图
              if(isSmallScreen){
                  $item.html('<img src="'+imgSrc+'" alt=""/>')
              }else{
                  $item.html('');
              }
          })
      }
      $(window).on('resize',reSize).trigger('resize');
    $('[data-toggle="tooltip"]').tooltip();

//    控制标签页的标签宽度
    var $ulContainer=$(".nav-tabs");
    //获取所有子元素的宽度和
    var width=0;
    $ulContainer.children().each(function (i,item) {
        // console.log(item.clientWidth);
        width+=item.clientWidth;
    });
    //判断当前ul宽度是否超出屏幕 如果超出 显示横向滚动条
    if(width>$(window).width()){
        $ulContainer.css("width",width+30).parent().css("overflow-x","scroll");//有一个内边距20 多加一点
    }

    //给每个a注册点击时间
    var $newsTitle=$('.news-title');
    $('#news .nav-pills a').on('click',function () {
        //获取当前点击的元素
        //获取自定义值
        //赋值
        var $this=$(this);
        var title=$this.data('title');
        $newsTitle.text(title)
    });
    //获取手指在轮播图元素上的滑动方向
    var $carousels=$('.carousel');
    //注册滑动事件
    var startX=0;
    var endX=0;
    $carousels.on('touchstart',function (e) {
        startX=e.originalEvent.touches[0].clientX;
        // console.log(startX);
    });
    //用变量覆盖获取到最后一瞬间x坐标
    $carousels.on('touchmove',function (e) {
        endX=e.originalEvent.touches[0].clientX;
        // console.log(endX);
    });
    $carousels.on('touchend',function (e) {
        console.log(startX);
        console.log(endX);
        //控制精度
        //获取每次的运动距离
        var distance=Math.abs(startX-endX);
        console.log(startX>endX?'左':'右')
        if(distance>30&&startX>endX){
            $(this).carousel('next');
        }else{
            $(this).carousel('prev');
        }
    })

    //根据或得到的方向选择上一张或许下一张
});