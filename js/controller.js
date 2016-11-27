//用来做切换的 一个是全局 一个是服务用两种方法
function ctr($scope,$rootScope,$hight){
    $scope.flag = false;
    var arr= $hight._arr || [0,0,1,0,0];
    $scope.changegehight=function(num){
        arr=[0,0,0,0,0];
        arr[num]=1;
        $hight._arr=arr;
    };
    $scope.arr=arr;
};
//foodGI的页面渲染
function foodgi($http,$scope,$rootScope,$state){
  var res= $http({
        method:"post",
        url:"../data/data.json"
    })
      res.success(function(data){
              if(data.error==0){
                  $scope.datalist=data.data;
                /*  $scope.datalei=data.lei;*/
                  localStorage.setItem("datalist",JSON.stringify($scope.datalist))

              }else{
                  alert(data.message)
              }
     /* console.log( $scope.datalist)*/
    });
    //点击搜索页面回到foodGI页面
    $scope.$on('search-result',function(a,data){
        $scope.datalist=[{"some":data}]

    })
    //更换title
 $rootScope.title=$state.current.data.title;

    //渲染导航图片
    $scope.brr=[
        {"src":"images/sh_0503.png",
            "name":"豆制品"
        },
        {"src":"images/sh_0503.png",
            "name":"豆制品"
        },
        {"src":"images/sh_0503.png",
            "name":"豆制品"
        },
        {"src":"images/sh_0503.png",
            "name":"豆制品"
        },
        {"src":"images/sh_0503.png",
            "name":"豆制品"
        },
        {"src":"images/sh_0503.png",
            "name":"豆制品"
        },
        {"src":"images/sh_0503.png",
            "name":"豆制品"
        },
        {"src":"images/sh_0503.png",
            "name":"豆制品"
        },
        {"src":"images/sh_0503.png",
            "name":"豆制品"
        },{"src":"images/sh_0503.png",
            "name":"豆制品"
        },{"src":"images/sh_0503.png",
            "name":"豆制品"
        },{"src":"images/sh_0503.png",
            "name":"豆制品"
        },{"src":"images/sh_0503.png",
            "name":"豆制品"
        },{"src":"images/sh_0503.png",
            "name":"豆制品"
        },
        {"src":"images/sh_0503.png",
            "name":"豆制品"
        }
    ]
};
//cerears古署搜索页面
function cerears($scope,$state,$http){
    //获取数据
    var  _data=null;
    $http({
        method:"get",
        url:"../data/search.json"
    }).success(function(d){
       _data=d.data;
    });
    //返回上一页
    $scope.goFoodGI=function(data){
        console.log(data);
         $state.go('f1');

        $scope.$emit('search-result',data)
    };
    //获取到表单的值

    $scope.searchValue='小麦';
    $scope. $watch('searchValue',function(_new,_old){
        var arr=[];
        console.log(_new)
        if(_data!=null){
            _data.forEach(function(value,index){
                if(value[0].substring(0,_new.length)==_new || value[1].substring(0,_new.length)==_new || value[2].substring(0,_new.length)==_new){
                    arr.push( value[0])
                }

            })
        }
        $scope.searchData=arr;
    })
};
//点击出来底层 常见活动转化
function energy($scope,$state,$rootScope){
    var slider=new slideSelector(".cwrap");
    $scope.activeicties="自行车";
    $scope.activeicties2="洗衣服";
    $scope.select=function(){
        slider.show({
            title:"选择信息",
            data:['自行车','跑步','篮球','足球','瑜伽','跑步'],
            done:function(data){
                $scope.activeicties=data.value;
                /*$scope.digest();*/
               /* document.querySelector('.hit-me').innerHTML = data.value*/
            }
        })

    };

    $scope.select2=function($event){
      /*  console.log($event)*/
      slider.show({
          title:"选择信息",
          data:['男装','女装','儿童','夏装','冬装','秋装'],
          done:function(data){
              $scope.activeicties2=data.value;
          }

    })
}
};
//foodChoose 点击出来底层 常见活动转化
/*function foodChoose($scope,$state,$rootScope){
    var slider1=new slideSelector("#sh_wrap");
    $scope.gushulei="谷薯类";
    $scope.dee="谷薯类";
    $scope.gushulei=function(){
        slider1.show({
            title:"选择信息",
            data:['自行车','跑步','篮球','足球','瑜伽','跑步'],
            done:function(data){
                $scope.gushulei=data.value;
                /!*$scope.digest();*!/
                /!* document.querySelector('.hit-me').innerHTML = data.value*!/
            }
        })

    };

    $scope.dee=function($event){
        slider1.show({
            title:"选择信息",
            data:['自行车','跑步','篮球','足球','瑜伽','跑步'],
            done:function(data){
                $scope.deep=data.value;
                /!*$scope.digest();*!/
                /!* document.querySelector('.hit-me').innerHTML = data.value*!/
            }
        })

    };

};*/
//女孩标尺页面
function girl(){
    var heightUl = document.querySelector('.height ul'),
      weightUl = document.querySelector('.weight ul');
    var str='',
        str2='';
    for(var i=1; i<=120; i++){
        if(i%10==0 || i==1){
            str+='<li meter="'+(36-(12+i/10>>0))/10+'"></li>';
            str2+='<li gram="'+((i+30)/10>>0)*10+'kg"></li>'
        }else{
            str+='<li></li>';
            str2+='<li></li>'
        }
    }
    heightUl.innerHTML = str;
    weightUl.innerHTML = str2;

    var hruler = new IScroll('.height-ruler');
    hruler.on('scrollEnd',function () {
        console.log(this.y/4>>0);
    });

    var wruler = new IScroll('.weight-ruler',{
        scrollX: true,
        scrollY: false
    });
    wruler.on('scrollEnd',function () {
        console.log(this.x/4>>0);
    })

}

var myapp=angular.module('myapp');
myapp.controller('index',ctr);
myapp.controller('foodGI',foodgi);
myapp.controller('cerear',cerears);
myapp.controller('energy',energy);
/*myapp.controller('foodChoose',foodChoose);*/
myapp.controller('girl',girl);