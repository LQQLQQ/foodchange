var  myapp=angular.module('myapp',['ui.router']);//设置跳转页面
myapp.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state('index',{
            url:'/',
            templateUrl:'../html/home.html',
            data:{
                title:'食物查询工具'
            }

        })  .state('f1',{
        url:'/foodGI',
        templateUrl:'../html/foodGI.html',
        data:{
            title:'食物查'
        }

    }) .state('f1.gushu',{
        url:'/gushu',
        templateUrl:'../html/gushu.html',
        data:{
            title:'食物'
        }

    })
       .state('f2',{
        url:'/foodChoose',
        templateUrl:'../html/foodChoose.html',
           data:{
               title:'物'
           }

    }) .state('f3',{
        url:'/foodchengfen',
        templateUrl:'../html/foodchengfen.html',
        data:{
            title:'食物成分'
        }

    }) .state('f4',{
        url:'/energy',
        templateUrl:'../html/energy.html',
        data:{
            title:'成分'
        }

    }) .state('f5',{
        url:'/girl',
        templateUrl:'../html/girl.html',
        data:{
            title:'女孩页面'
        }

    }) .state('f5.boy',{
        url:'/boy',
        templateUrl:'../html/boy.html',
        data:{
            title:'男孩页面'
        }

    })
    $urlRouterProvider.when("",'/')

})