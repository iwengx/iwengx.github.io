---
title: 'uni-app + Vue3 踩坑集'
tag: ['uni-app']
type: 'uni-app'
date: ''
---

# uni-app + Vue3 踩坑集：

## 介绍

记录在写小程序时踩的坑

<br>
- 无法使用原生API（报错： xxx is not defined），如：
  
  FormData、EventSource(SSE)、
  
  WebSocket：需要使用 [uni.connectSocket](https://uniapp.dcloud.io/api/request/websocket.html#connectsocket) ；
  
  cookies、local-storage，需要使用它自带的 [storage](https://uniapp.dcloud.io/api/storage/storage.html) ；
  
- div 等容器标签改为 view；
  
- v-show 在自定义组件上使用无效，可以使用 三元表达式+class 实现 v-show 的效果，或 v-if；
  
- 不能直接在标签上使用 ref 属性来获取dom元素，需要使用它自带的 [uni.createSelectorQuery](https://uniapp.dcloud.io/api/ui/nodes-info.html#createselectorquery) ；
  
- get 请求没有 body 请求体（**待确定**）；
  
- axios 拦截到的响应体与网页端有所不同（没有 config）
