---
title: '退出顶层循环'
tag: ['Label']
type: 'bad/good'
date: '2023-08-13'
---

# 退出顶层循环

## 介绍

在某些场景会不可避免的使用到多层嵌套循环，要退出顶层循环普遍的做法基本都是声明一个变量来存储状态，但其实可以使用 `label 标记语句` 来实现更为简洁。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label)

下面是个简单的例子：

:hankey: bad code

```javascript
for (let i = 0; i < 10; i++) {
   let flag = false;
   for (let j = 0; j < 3; j++) {
      if (i === 5) {
         flag = true;
         break;
      }
   }
   if (flag) break;
}
```

:+1: good code

```javascript
rootLoop: for (let i = 0; i < 10; i++) {
   for (let j = 0; j < 3; j++) {
      if (i === 5) {
         break rootLoop;
      }
   }
}
```
