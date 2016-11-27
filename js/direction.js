var myapp=angular.module('myapp');
myapp.directive('iSwiper',function(){
    return {
        resrict:'E',
        template:'<div class="variety swiper-container"> <ul class="swiper-wrapper"> <li class="swiper-slide" ng-repeat="x in brr"><div class="aa"><img ng-src="../{{ x.src}}" alt="" ><span>{{ x.name}}</span></div></li> </ul></div>',
       controller:function(){
           var slides=null;
           setTimeout(function(){
               var mySwiper= new Swiper(".variety",{
                   freeMode:true,
                   slidesPerView:'auto',
                   onTap:function(s,e){
                       if(!slides) slides = document.querySelector('.variety').querySelectorAll('.swiper-slide');
                       for(var i=0; i<slides.length; i++){
                           slides[i].className = slides[i].className.replace(' active','')
                       }
                       var str = s.clickedSlide && s.clickedSlide.className;
                       if(str && str.indexOf(' active')==-1){
                           s.clickedSlide.className = str + ' active';
                       }
                       //调用实例化的swiper组件的slideTo方法，控制swipe组件滑动到点击的图片
                       mySwiper.slideTo(s.clickedIndex,300,function () {
                       });

                   }
               })
           },100)

       }
    }

})