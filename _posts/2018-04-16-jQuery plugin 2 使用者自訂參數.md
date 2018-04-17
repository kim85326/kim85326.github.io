---
layout: post
title: "jQuery plugin 2 使用者自訂參數"
date: 2018-04-16 00:00:00 +0800
categories: jQuery
tags: jQuery
excerpt: .
mathjax: true
---	
### 使用者自訂參數或函數
* 若需要參數擴展可以使用 $.extend
* extend(obj1 , obj2)：把obj2合併到obj1
![](https://i.imgur.com/xGN7dvO.png)
### 雛形
```js
;(function( $ ){
    $.fn.plugin_name = function(settings) {
        var _defaultSettings = {
            obj1: obj1_default_value,
            obj2: function(){...}
        };
        var _settings = $.extend(_defaultSettings, settings);
        return this.each(function() {...});
    };
})(jQuery);
```
* 使用者可以自訂帶參數或函數
```
$('element').plugin_name({
    obj1: myobj1_value,
    obj2: myobj2_function()
});
```
#### 舉例
```js
;(function( $ ){
    $.fn.mytoolbox = function(settings) {
        var _defaultSettings = {
            callback: function () {
                alert(this.id);
            }
        };
        var _settings = $.extend(_defaultSettings, settings);
        return this.each(function() {
            $(this).click(_settings.callback);
        });
    };
})(jQuery);
```
* 首先我們為 Plugin 加入 settings 參數，也就是一般 Plugin 常見的設定值。然後則是 _defaultSettings ，它能幫我們在使用者沒有指定任何設定值給 settings 時，還能夠提供預設的設定值。
* 接著我用 jQuery 提供的 extend 方法，將 settings 中有設定的值覆蓋掉 _defaultSettings 所設定的預設值，再把結果存放在 _settings 這個變數中；後面我們就會用新的 _settings 變數當做我們的設定值。
* 現在我們在 _settings 中指定了一個 callback 項目 (預設是用 alert ) ，然後將它指定給 div 元素的 click 觸發器。現在我要在 HTML 頁面中更改這個事件處理器，使它不再使用 alert ，而是把結果顯示在 div#debug 裡。程式如下：
```js
var debug = $('#debug');
$('.test').mytoolbox({
    callback: function () {
        debug.html(debug.html() + this.id + '<br />');
    }
});
```
#### 修改觸發事件
* 假設現在我們不想用 click ，而是想讓滑鼠移過就觸發 callback 呢？這時就要借重 jQuery 的 bind 方法了：
```js
;(function( $ ){
    $.fn.mytoolbox = function(settings) {
        var _defaultSettings = {
            bind: 'click',
            callback: function () {
                alert(this.id);
            }
        };
        var _settings = $.extend(_defaultSettings, settings);
        return this.each(function() {
            $(this).bind(_settings.bind, _settings.callback);
        });
    };
})(jQuery);
```
* 這裡我加入一個 bind 設定項目，預設是用 click 事件觸發。回到 HTML 頁面，我們改用 mouseover 來觸發 callback ：
```js
var debug = $('#debug');
$('.test').mytoolbox({
    bind: 'mouseover',
    callback: function () {
        debug.html(debug.html() + this.id + '<br />');
    }
});
```

參考資料<br>
[[程式][JQuery] 自己的第一個JQuery Plugin! Hello World。(Part_02)](http://expect7.pixnet.net/blog/post/38219670)<br>
[[jQuery] 自製 jQuery Plugin - Part 1](http://jaceju.net/2008-05-13-build-your-own-jquery-plugin-1/)