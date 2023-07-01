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
