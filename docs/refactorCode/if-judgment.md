# if 中相同变量的判断

当需要判断一个 变量 是否在数组中时，不妨使用 **includes** 方法试试看。

:-1: bad code

```TypeScript
const validate = (user: string): boolean => {
   if (user == '小明' || user == '小王' || user == '小李' ···) {
      return true;
   }
   return false;
}
```

:+1: good code

```TypeScript
const validate = (user: string): boolean => {
   const effectiveValue: string[] = ['小明', '小王', '小李']
   if (effectiveValue.includes(user)) {
      return true
   }
   return false
}
```
