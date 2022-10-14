---
title: '盒子模型'
tag: ['css']
type: 'css'
date: '2022-4-2'
---

## 盒子模型

`最后编辑：2022-4-2`
<br/>

在 css 中，盒子模型分为：**W3C 标准盒模型** 和 **IE 模型**

<br/>

---

<br/>

> W3C 标准盒模型

设置属性 box-sizing: content-box;

给 content 盒子设置边框和内边距之后盒子会被扩大，导致整个元素的宽高都发生变化（320px）

<br/>

<div class="w3c-box box">
   <p style="top: -30px;">border 30px<p>
   <p style="top: 0; color: black;">padding 30px<p>
   <p style="z-index: 2;">content 200px<p>
</div>

<style>
   
.box {
   border: 30px solid black;
   padding: 30px;
   width: 200px;
   height: 200px;
   border-radius: 5px;
   position: relative;
   background: #f44336;
   background-clip: content-box;
   color: white;
}

.box p {
   position: absolute;
}

.w3c-box {
   box-sizing: content-box;
}

.ie-box {
   box-sizing: border-box;
}


</style>

<br/>

> IE 盒模型

设置属性 box-sizing: border-box;

盒子宽高不会发生变化，将边框和内边距都塞入盒子内

<br/>

<div class="ie-box box">
   <p style="top: -30px;">border 30px<p>
   <p style="top: 0; color: black;">padding 30px<p>
   <p style="color: black;">content 200px<p>
</div>

<br/>

> ### 注意事项：

-  外边距 margin 不参与宽高的计算，但是也属于盒子模型里的一个元素

<br/>

> ### 其他：

-  [动画解释 CSS 盒子模型、布局方式、box-sizing、替换元素和边距塌陷](https://www.bilibili.com/video/BV13V411z7do)
