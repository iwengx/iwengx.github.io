---
title: 'Provide / Inject 的使用'
tag: ['vue']
date: ''
---

# Provide / Inject 的使用

## 介绍:

通常，当我们需要从父组件向子组件传递数据时，我们使用 **props**。想象一下这样的结构：有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。

在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。

<br>

对于这种情况，我们可以使用一对 **provide** 和 **inject**。无论组件层次结构有多深，父组件都可以作为其所有子组件的依赖提供者。

这个特性有两个部分：父组件有一个 provide 选项来提供数据，子组件有一个 inject 选项来开始使用这些数据。

[来自文档原话](https://v3.cn.vuejs.org/guide/component-provide-inject.html)

<br>

> function provide`<T>` ( key: InjectionKey`<T>` | string | number, value: T ): void

-  provide 方法需要传递两个参数，即：key、value

> function inject`<T>` ( key: InjectionKey`<T>` | string ): T | undefined (+2 overloads)

-  inject 方法只需要一个 provide 的 key 参数

<br>

parent-component.vue

```javascript

import { provide } from 'vue';

setup() {
   provide('userInfo', {
      name: 'wengx-unx',
      money: 8888,
      token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
   })
}

```

<br>

child-component.vue

```javascript

import { inject } from 'vue';

setup() {
   const userInfo = inject('userInfo')
   console.log(userInfo)
}

```

<br>

> 除此之外，还可以在 main.ts 中使用 provide

```javascript
app.provide('main.ts', 'I am main.ts file');
```

<br>

> 上面部分基本介绍了 provide 中 key 参数的 string 类型的使用

> 下面就简单介绍一下 Vue 提供的 [`InjectionKey<T>`](https://v3.cn.vuejs.org/api/composition-api.html#provide-inject) 类型工具来在不同的上下文中共享类型

context.ts

```javascript
import { InjectionKey } from 'vue';

interface UserInfo {
   id: number;
   name: string;
   tag: string[];
   isLoginState: boolean;
}

export const injecKeyUser: InjectionKey<UserInfo> = Symbol();
```

<br>

parent-component.vue

```javascript
import { provide } from 'vue';
import { injecKeyUser } from './content';

provide(injecKeyUser, {
   id: 666,
   name: 'wengx-unx',
   tag: ['vue', 'TypeScript', 'pinia'],
   isLoginState: true,
});
```

<br>

在 child-component.vue 中也是要引入

```javascript

import { inject } from 'vue';
import { injecKeyUser } from './content';

setup() {
   const userInfo = inject(injecKeyUser)
   console.log(userInfo)
}

```

<br>

> #### 注意事项

-  provide / inject 只能在 **setup()** 中使用，即便是在 setup 的某个函数体内也无法使用，这样会导致系统报错
