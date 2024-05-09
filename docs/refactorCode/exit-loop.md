# 退出顶层循环

在某些场景会不可避免的使用到多层嵌套循环，要退出顶层循环普遍的做法基本都是声明一个变量来存储状态，但其实可以使用 [`label 标记语句`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label) 来实现更为简洁。

下面是个简单的例子：

:-1: bad code

```JavaScript
for (let i = 0; i < 10; i++) {
   let flag = false
   for (let j = 0; j < 3; j++) {
      if (i === 5) {
         flag = true
         break
      }
   }
   if (flag) break
}
```

:+1: good code

```JavaScript
rootLoop: for (let i = 0; i < 10; i++) {
   for (let j = 0; j < 3; j++) {
      if (i === 5) {
         break rootLoop
      }
   }
}
```
