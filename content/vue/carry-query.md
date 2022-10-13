---
title: '跳转时携带上一个页面的 query'
tag: ['vue']
date: ''
---

# 跳转时携带上一个页面的 query

## 介绍

故名思意：当跳转到 下一个页面 时携带 上一个页面 的 query 参数。下文中将 下一个页面 简称为 **to**， 上一个页面 简称为 **from**

<br />

> 初步逻辑：

-  通过 router 提供的 [beforeEach](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB) 全局前置守卫拿到 to.query
-  将 query 以参数的形式传入 next() 函数中

router / index.js

```javascript
function hasQuery(route) {
   return !!Object.keys(route.query).length;
}

router.beforeEach((to, from, next) => {
   if (!hasQuery(to) && hasQuery(from)) {
      next({ path: to.path, query: from.query });
   } else {
      next();
   }
});
```

> 代码逻辑：

当第一次 push 的时候 to.query 的值为空，而 from.query 有值的话就执行 if 中的 next 带参数过去

```
to.query = {
   path: "/item",
   query: {}
}

from.query = {
path: "/home",
query: {t: '学生'}
}

```

之后再次回到 beforeEach 中的时候 to.query 已经是有值的了就 else 执行 next() 结束本次的 beforeEach，有效避免了事件循环

```

to.query = {
path: "/item",
query: {t: '学生'}
}

from.query = {
path: "/home",
query: {t: '学生'}
}

```

> 注意事项：

-  如果使用 `history.pushState(history.state, '', '')` 来修改 url 参数的话，from.query 是拿不到值的

> 缺陷：

-  当 to 也携带有 query 时，会替换掉 from.query 的值

如果有此需求可以将 query 存到 localStorage 中来保持参数的持久性
