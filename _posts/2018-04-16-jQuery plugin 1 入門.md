---
layout: post
title: "jQuery plugin 1 入門"
date: 2018-04-16 00:00:00 +0800
categories: jQuery
tags: jQuery
excerpt: .
mathjax: true
---	
### jQuery.fn
* 利用 jQuery.fn 宣告你的 jQuery plugin
* jQuery.fn 包含了所有 jQuery 內建的方法
* jQuery.fn. 後面接 plugin名稱 => jQuery.fn.plugin_name 

#### 雛形

```js
jQuery.fn.plugin_name = function (){
    //plugin內容
};
```

* 要使用此plugin的工程師，只要選到jQuery物件後，接上plugin的名稱()就可以使用了

```js
$('element').plugin_name();
```

#### 舉例

```js
jQuery.fn.setColor = function() {
    this.css( "color", "green" );
};
 
$( "a" ).setColor(); // Makes all the links green.
```

### this
* 匿名函式裡的 this 關鍵字，它會指向一個 jQuery 物件；而這個 jQuery 物件則是我們要指定的

#### 雛形

```js
jQuery.fn.plugin_name = function () {
    //plugin內容
    return this.each(function(){

    });
};
```

#### 舉例

```js
jQuery.fn.myplugin = function(){
    return this.each(function() {
        alert(this.id);
    });
};
```

```html
<div id="myid1" class="myclass">123</div>
<div id="myid2" class="myclass">456</div>
<script>
    $(".myclass").myplugin(); // alert("myid1") 和 alert("myid2")
</script>
```

### 立即函數
* 一直寫 "jQuery" 這幾個字實在是很累人的一件事；而且 jQuery 不是可以簡寫成 $ 號嗎？不能直接用嗎？當然可以，只是這樣可能會和其他 JavaScript Library 發生衝突
* 為了避免 $ 受到影響（全域變數污染），我們建立了立即函數（Immediately Invoked Function Expression）的作用域（scope），並將 jQuery 當作參數傳進去：

#### 雛形

```js
;(function( $ ){
    $.fn.plugin_name = function (){
        //plugin 內容
        return this.each(function() {
            
        });
    };
})(jQuery);
```

* 定義完function，閉包起來之後接 (jQuery)，就是定義且執行function，稱為IIFE(立即函數)
* 前面的 ";"，是因為怕和其他的plugin一起載入的時候，前面的人忘記寫 ";"，導致程式錯誤
    * 事實上多寫 ";" 並不會有問題，少寫 ";" 才會有問題




參考資料<br>
[如何打造自己的 jQuery Plugin 入門教學](https://blog.kdchang.cc/2016/04/01/how-to-create-your-own-jquery-plugin/)<br>
[[程式][JQuery] 自己的第一個JQuery Plugin! Hello World。(Part_01)](http://expect7.pixnet.net/blog/post/38085270)<br>
[[jQuery] 自製 jQuery Plugin - Part 1](http://jaceju.net/2008-05-13-build-your-own-jquery-plugin-1/)