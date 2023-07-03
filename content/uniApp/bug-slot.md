---
title: '踩坑之 Slot'
tag: ['uni-app', 'slot']
type: 'uni-app'
date: '2023-07-03'
---

# uni-app 踩坑之 Slot

## 介绍

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
