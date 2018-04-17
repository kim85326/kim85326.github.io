---
layout: post
title: "jQuery plugin 3 template"
date: 2018-04-17 00:00:00 +0800
categories: jQuery
tags: jQuery
excerpt: .
mathjax: true
--- 

### template

```js
;(function(){
    var methods = {
        init: function(settiongs){
            //option初始化設定
            var _defaultSettings = {
                obj1: obj1_default_value,
                obj2: function(){...},
            };

            //覆寫option
            var _settings = $.extend(_defaultSettings, settings);

            //針對每一個選定的DOM物件做事
            return this.each(function() {
            
            });
        }
        //其他 public function 放這裡
    }
    // 其他 private function 放這裡
    
    //註冊plugin_name
    $.fn.plugin_name = function(method){
        if ( methods[method] ) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.plugin_name' );
        }
    };
    
})(jQuery);
```

### 進入點

* 進入點從以下程式碼開始 trace

```js
$.fn.plugin_name = function(method){
    if ( methods[method] ) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply(this, arguments);
    } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.plugin_name' );
    }
};
```

#### 你要先懂

* methods[method] 
    * 其實等同於 methods.method，只是當我們想要以變數型態傳入的時候，無法使用後者
* arguments 
    * 所有參數都會存到這個 array 裡面，arguments[0]...
* apply() 和 call() 
    * 用法可以參考 [bind()、call()、apply() 差別](https://hackmd.io/s/rkM3GVmhf)
* Array.prototype.slice.call( arguments , 1 )
    * 這句話的意思就是把調用方法的參數截取出來

```js
function test(a,b,c,d) { 
  var arg = Array.prototype.slice.call(arguments,1); 
  alert(arg); 
} 
test("a","b","c","d"); 
```

![](https://i.imgur.com/bYvQ7ch.png)

#### 就可以理解邏輯了

1. 先判斷 methods 是否有 method 這個方法
    * true: 執行符合 method 的所有function
        * apply 的意思是：把 method 的 this 綁定為現在這個 this，並且把參數傳入，並且執行
    * false: 跳到2
2. 再判斷 method 的型態是不是物件 或者 不存在
    * true: 執行init()
        * apply 的意思是：把 init 的 this 綁定為現在這個 this，並且把參數傳入，並且執行 init
    * false: 跳到3
3. 其他
    * 顯示 'Method ' +  method + ' does not exist on jQuery.plugin_name' 


### 參考資料

[Array.prototype.slice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)<br>