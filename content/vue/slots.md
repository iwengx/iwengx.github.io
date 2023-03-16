---
title: '判断 slots 是否传入'
tag: ['vue']
type: 'vue'
date: '2023-03-16'
---

# 判断 slots 是否传入

## 介绍:

有的时候，我们会在 slot 上级包装一层 div.className 元素，如果不传入 slot 时也不显示其 div ，下面有两种方法：

```javascript
// 方法一 直接在元素上进行 v-if 的判断
<div v-if="$slots.icon" class="icon-box">
   <slot name="icon"></slot>
</div>;

// 方法二 在 setup 中
import { useSlots } from 'vue';

const slotDefault = !!useSlots().default; // 判断 <slot /> 是否有传入
const slotTest = !!useSlots().icon; // 判断 <slot name="icon"/> 是否有传入

// end
```

<br />

#### 其他:

-  [Vue.js 插槽 Slots](https://cn.vuejs.org/guide/components/slots.html)
