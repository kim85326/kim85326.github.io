---
layout: post
title: "Margin、Padding"
date: 2017-03-16 00:00:00 +0800
categories: CSS
tags: CSS
excerpt: .
mathjax: true
---
### Box Model
* border 外框
* content 內文
* margin 是調整 border 外的邊界
* padding 是調整 border 內到內文之間的距離

![](https://i.imgur.com/N6j1hKM.png)

### border
* 會佔空間喔！
* 如果我們在元素上設定背景色時， IE 是作用在 padding + content ，而 Firefox 則是作用在 border + padding + content 上

### margin
* 元素與相鄰元素的距離 or 元素與父元素間的距離

### padding
* 如果我們已經設了 width、height，加 padding 後，會把width和height變多
    * 其實設 width、height 是設 content 的寬、高
    * 解決方法：可以設 box-model: border-box
        * 就是把 width、height 是設為 content+padding 的寬、高，這樣就不用一直計算了

### 為什麼要有 padding、margin？用top、left 不就可以解決了？

* 個人想法：如果只用 top/bottom/left/right 的話，計算起來太麻煩了，用 padding、margin 比較直覺

### padding、margin 的差別

##### 不能只有padding、沒有margin
* 假如我有一個大div裡面有兩個小div，現在要把兩個div對大的div要不一樣的距離，此時只用padding做不到 
```html
<div style="background-color:gray;width:420px;height:120px;padding:10px">
    <div style="background-color:yellow;width:200px;height:80px;float:left;margin-top:30px;">
    </div>
    <div style="background-color:blue;width:200px;height:80px;float:right">
    </div>
</div>
```
![](https://i.imgur.com/8AuFFTO.png)

### 語法
* 有1個值
    * margin: 四個邊同樣値;
* 有2個值
    * margin: 上下 左右;
* 有3個值
    * margin: 上 左右 下;
* 有4個值
    * margin: 上 右 下 左;

* margin: auto;　
    * 代表讓瀏覽器自己去設定
* margin: 長度單位;　
    * 就是給數字跟單位，單位可以是 em、px、pt 等値
* margin: %;　
    * 讓瀏覽器自己去設定，跟邊界元素有關


P.S.padding 也是一樣


參考資料<br>
[CSS∥排版觀念-BoxModel>Margin、Padding](http://pinkyvivi.pixnet.net/blog/post/1131260-css%E2%88%A5%E6%8E%92%E7%89%88%E8%A7%80%E5%BF%B5-boxmodel%3Emargin%E3%80%81padding)<br>
[CSS margin 屬性與用法範例](http://www.wibibi.com/info.php?tid=110)
