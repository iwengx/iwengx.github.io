# 深度克隆

在平时项目开发中，经常会使用到深度克隆函数，下面介绍一个简单易懂的实现方式。

## 第一步：实现一个浅克隆

::: code-group

```JavaScript [deepClone.js]
function deepClone(value) {
   // 因为 typeof null === 'object' 因此不会进入到第一个判断表达式中，
   // 所以需要单独处理 null 值
   if (typeof value !== 'object' || value === null) {
      return value
   }

   const result = Array.isArray(value) ? [] : {}
   for (const key in value) {
      result[key] = value[key]
   }
   return result
}
```

```JavaScript [test.js]
const obj = {
   a: 1,
   b: 'two'
}
const cloneObj = deepClone(obj)
console.log(cloneObj === obj) // > false
```

:::

## 第二步：嵌套实现深克隆

这一步其实已经满足大部分业务需求了，包括但不限于深拷贝后端返回的 JSON 数据等。

::: code-group

```JavaScript [deepClone.js]
function deepClone(value) {
   if (typeof value !== 'object' || value === null) {
      return value
   }

   const result = Array.isArray(value) ? [] : {}
   for (const key in value) {
      result[key] = value[key] // [!code --]
      result[key] = deepClone(value[key]) // [!code ++]
   }
   return result
}
```

```JavaScript [test.js]
const obj = {
   a: 1,
   b: 'two',
   c: {
      d: 3,
   }
}
const cloneObj = deepClone(obj)
console.log(cloneObj.c === obj.c) // > false
```

:::

## 第三步：处理原型链对象

::: code-group

```JavaScript [deepClone.js]
function deepClone(value) {
   if (typeof value !== 'object' || value === null) {
      return value;
   }

   const result = Array.isArray(value) ? [] : {};
   Object.setPrototypeOf(result, Object.getPrototypeOf(value));  // [!code ++]

   for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {  // [!code ++]
         result[key] = deepClone(value[key]);
      }  // [!code ++]
   }
   return result;
}
```

```JavaScript [test.js]
function Test() {
   this.a = 1;
   this.b = 2;
}
Test.prototype.c = 3;
const obj = new Test();

const clone = deepClone(obj);
console.log('obj :>> ', obj);     // > obj   :>>  Test { a: 1, b: 2 }
console.log('clone :>> ', clone); // > clone :>>  Test { a: 1, b: 2 }
```
