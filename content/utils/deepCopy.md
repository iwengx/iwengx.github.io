---
title: '深拷贝（deepCopy）'
tag: ['ts']
type: 'utils'
date: '2022/10/24'
---

# 深拷贝（deepCopy）

## 介绍

深拷贝是开发过程中常用到的一项技术, 其实现的方式用很多种, 这里就列出一个递归的写法来实现深拷贝. 如果是简单的对象可以直接使用 **JSON.parse(JSON.stringify(obj))** 来实现.

```typescript
/**
 * 深拷贝
 */
export const deepCopy = <T = any>(obj: any): T => {
   const result: any = Array.isArray(obj) ? [] : {};
   for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
         result[key] = deepCopy(obj[key]);
      } else {
         result[key] = obj[key];
      }
   }
   return result;
};
```
