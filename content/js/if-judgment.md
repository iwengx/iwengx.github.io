---
title: '中相同变量的判断'
tag: ['js']
date: ''
---

# if 中相同变量的判断

## 介绍

当需要判断一个 变量 是否在数组中时，不妨使用 **includes** 方法试试看。

<br>
> :hankey: bad code

```javascript
const validate = (user: string): boolean => {
   if (user == 'wengx' || user == '-unx' || user == 'github' || user == '.io' ···) {
      return true;
   }
   return false;
}
```

<br>
> :+1: good code

```javascript
const validate = (user: string): boolean => {
   const effectiveValue: string[] = ['wengx', '-unx', 'github', ',io'];
   if (effectiveValue.includes(user)) {
      return true;
   }
   return false;
};
```
