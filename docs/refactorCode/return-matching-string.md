# 返回匹配的字符串

在平时开发中经常使用到的后端返回一个 number 类型 的 **key** 值，然后对应其某个状态，可以通过以下写法提升编码质量。

:-1: bad code

```TypeScript
const findString = (key: number): string => {
   switch(key) {
      case 1: return 'this is one'
      case 2: return 'this is two'
      case 3: return 'this is three'
      ....
      default: return 'undefined'
   }
}

```

:+1: good code

```TypeScript
const findString = (key: number): string => ({
   1: 'this is one',
   2: 'this is two',
   3: 'this is three',
   ...
}[key] || '')

```
