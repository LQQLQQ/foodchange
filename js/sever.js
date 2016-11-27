;var myapp=angular.module('myapp');
myapp.factory('$hight',function(){
    return {
        _arr:[1,0,0,0,0]//做首页的背景的点击添加高亮显示的
    }
});
/*myapp.factory('$slider',function(){
    'use strict';
    var Swiper = function(targetEle,callback,initIndex){
        this.wrap = document.querySelector(targetEle);
        if(!this.wrap)return;
        this.startIndex = initIndex || 0;
        this.items = this.wrap.querySelectorAll("p");
        this.len = this.items.length;
        this.itemHeight = this.items[0].offsetHeight;
        this.bindEvent();
        if(callback)this.callback = callback;
        this.moveTo(initIndex);
    };
    Swiper.prototype={
        transitionEnd:function(){
            var el = document.createElement('element');

            var transitions = {
                'WebkitTransform': 'webkitTransitionEnd',
                'OTransform': 'oTransitionEnd',
                'MozTransform': 'TransitionEnd',
                'MsTransform': 'msTransitionEnd',
                'transform': 'transitionEnd'
            };
            for (var t in transitions) {
                if (el.style[t] !== undefined) {
                    this.transform = t;
                    return transitions[t];
                }
            }
        },
        moveTo:function(idx){
            this.wrap.style.top =  -idx*this.itemHeight +"px";
        },
        stopDefault:function (e) {
            e = e || window.event;
            if (e && e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            } else  {
                window.event.returnValue = false;
                e.cancelBubble = true;
                window.event.cancelBubble = true;
            }
            return false;
        },
        bindEvent:function(){
            this.currentSpan = 0;
            this.index = this.startIndex || 0;
            this.timeSpan = 0;
            this.isTouched = false;
            var l = this.len -5;
            var startTime,endTime;
            var that =this;

            function _touchstart(e){
                that.stopDefault(e);
                that.isTouched = !0;
                var computedStyle = getComputedStyle(that.wrap),
                    top = computedStyle.getPropertyValue("top");
                this.style.top = top;
                that.removeTransition();
                clearInterval(that.timer);
                startTime = new Date().getTime();
                that.startPoint = e.touches?e.touches[0].pageY:e.y;
                that.startPointX = e.touches?e.touches[0].pageX:e.x;
                that.currentSpan = parseFloat(top);
            }
            function _touchmove(e) {
                if(!that.isTouched) return;
                that.stopDefault(e);
                that.movePoint = e.touches?e.touches[0].pageY:e.y;
                that.movePointX = e.touches?e.touches[0].pageX:e.x;

                that._span = that.movePoint-that.startPoint;
                that._spanX = that.movePointX-that.startPointX;
                if(Math.abs(that._spanX)-Math.abs(that._span) > 0){
                    return;//上下滑动幅度比左右滑动幅度大，阻止页面切换
                }
                this.style.top = that._span + that.currentSpan + "px";
            }
            function _touchend(e){

                if(that._span == 0) return;
                that.isTouched = !1;
                endTime = new Date().getTime();
                that.timeSpan = endTime- startTime;
                var idx = that.index;
                that.wrap.style.webkitTransition = "top .15s ease-out";
                var count = 1;
                function getIndex(c){
                    //down
                    if(that._span>0){
                        idx-=c;
                        if(idx<0)idx=0;
                    }
                    //up
                    if(that._span<0){
                        idx+=c;
                        if(idx>l)idx=l;
                    }
                }

                if(that.timeSpan<260 && that.timeSpan>50){
                    count = Math.ceil(Math.abs(that._span*that.timeSpan/2000));
                } else
                if(Math.abs(that._span)>=that.itemHeight*0.5){
                    count = Math.ceil(Math.abs(that._span/that.itemHeight));
                }


                getIndex(count);

                that.index = idx;
                that._span = 0; //重置移动距离
               /!* console.log(idx);*!/
                that.moveTo(idx);

                that.callback && that.callback(idx);
            }

            var doc = document.documentElement;
            this.wrap.addEventListener("touchstart",_touchstart,false);
            this.wrap.addEventListener("mousedown",_touchstart,false);
            this.wrap.addEventListener("touchmove",_touchmove,false);
            this.wrap.addEventListener("mousemove",_touchmove,false);
            doc.addEventListener("mouseup",_touchend,false);
            doc.addEventListener("touchend",_touchend,false);
            this.wrap.addEventListener(this.transitionEnd(),function(){
                that.removeTransition();
                that.currentSpan = parseFloat(this.style.top);
            },false);
        },
        removeTransition:function(){
            this.wrap.style.webkitTransition =  "";
        }
    };

    var SlideSelector = function(parentDom){
        this.selectedIndex = -1;
        if(!parentDom){
            parentDom =  document.querySelector('.container') || document.body;
        }else{
            parentDom =  document.querySelector(parentDom)
        }


        if(!document.querySelector('.slide-selector')){
            var _div = document.createElement('div');
            _div.className = 'slide-selector';
            this.wrapper = _div;
            parentDom.appendChild(_div);
        }else{
            this.wrapper = parentDom.querySelector('.slide-selector');
        }
        this.mask = document.querySelector('.mask-layer');
        this.mask.onclick = function () {

            this.hide();
        }.bind(this)
    };
    SlideSelector.prototype = {
        init:function(){
            if(this.selectedIndex==-1) this.selectedIndex = this.data.startIndex || 0;
        },
        tpl: '<header class="slide-header"><div class="slide-title">{title}</div><span class="slide-cancel">取消</span><span class="slide-sure">确定</span></header>'+
        '<div class="slide-wrapper"><div class="slide-mask"></div><div class="slide-options">{content}</div></div>',
        bindEvent:function(){
            var that = this;

            this.wrapper.onclick = function(e){
                e.stopPropagation();
                var ev = e || window.event, target = ev.target || ev.srcElement;
                if(target.className == 'slide-cancel'){
                    that.hide()
                }
                if(target.className == 'slide-sure'){
                    that.hide();
                    that.data.done({
                        index: that.selectedIndex,
                        value: that.data.data[that.selectedIndex]
                    });
                }
            };


        },
        show:function(data){
            this.data = data;
            this.init();

            this.render();
            document.querySelector('.mask-layer').className +=' show';
            setTimeout(function(){
                this.wrapper.className = this.wrapper.className+' slide-active';
            }.bind(this),30);


            this.bindEvent();
        },
        render:function(){
            var _data = this.data, str='<p class="slide-option">&nbsp;</p><p class="slide-option">&nbsp;</p>';
            _data.data.forEach(function(v,i){
                str += '<p class="slide-option" data="'+i+'">'+v+'</p>';
            });
            str += '<p class="slide-option">&nbsp;</p><p class="slide-option">&nbsp;</p>';
            var template = this.tpl;
            template = template.replace('{title}',_data.title).replace('{content}',str);
            this.wrapper.innerHTML = template;

            //绑定swipe组件
            this.combineSwipe();
        },
        combineSwipe:function(){
            var that = this;
            var swiper = new Swiper('.slide-options',function(idx){
                that.selectedIndex = idx;
                that.data.afterSwipe(idx);
            },this.selectedIndex);

            //绑定隐藏事件，destroy dom
            if(swiper.transitionEnd()){
                this.wrapper.addEventListener(swiper.transitionEnd(),function(){
                    if(that.wrapper.className.indexOf('slide-active') == -1) that.destroy();
                },false)

            }else{
                setTimeout(function(){
                    if(that.wrapper.className.indexOf('slide-active') == -1) that.destroy();
                },300)
            }

        },
        hide:function(){
            this.wrapper.className = this.wrapper.className.replace('slide-active','');
            this.mask.className=this.mask.className.replace('show','');
        },
        destroy:function(){
            this.wrapper.innerHTML = "";
            this.wrapper.onclick = null;
        }
    };
    return new SlideSelector();



})*/
