---
title: 'uni-app 踩坑集'
tag: ['uni-app']
type: 'uni-app'
date: ''
---

# uni-app 踩坑集：

## 介绍

记录在写小程序时踩的坑

> 无法使用部分原生 API（报错： xxx is not defined），如：

FormData、EventSource(SSE)、

WebSocket：需要使用 [uni.connectSocket](https://uniapp.dcloud.io/api/request/websocket.html#connectsocket) ；

cookies、local-storage，需要使用它自带的 [storage](https://uniapp.dcloud.io/api/storage/storage.html) ；

> 不能直接在标签上使用 ref 属性来获取 dom 元素，需要使用它自带的 [uni.createSelectorQuery](https://uniapp.dcloud.io/api/ui/nodes-info.html#createselectorquery) ；

但是 createSelectorQuery 也有缺点，它只能获取元素的位置和宽高，无法直接获取元素本身。

> axios 拦截到的响应体与网页端有所不同

例如没有 config 对象。

## uni-app 踩坑之 Slot

### 介绍

这个 Bug 就很奇怪，测试的版本为**3.0.0-alpha-3080420230602001**

在子组件插槽中传入变量的话，父组件则必须将其暴露出来才可以正常显示，例如：

```HTML
// * child-component.vue
<template>
   <view>
      <text style="display: block">I'am child-component</text>
      <slot name="WengX"></slot>
   </view>
</template>

// * parent-component.vue
<template>
   <view>
      <text>I'am parent-component</text>
      <child-component>
         <template #default="{ name }">
            <text>hi {{ name }}<text>
         </template>
      </child-component>
   </view>
</template>
```

#### 重点来了：

通过上面的代码我们可以看到，在子组件中我向 `slot` 传入了一个变量 `name`，它的值为 `WengX`。

如果父组件不将其暴露出来（`<template #default="{ name }">`），子组件是无法显示插槽传入的内容的。

即便按照方面的方式显示出了内容，但是在子组件中会将 `<template #default="{ name }">` 转换为一层 `<view>`。

我们无法给这一层 `<view>` 设置任何的样式，这就意味着，假设我们传入的内容最外层包含了百分比的宽高，则无法继承到父标签的宽高。
