# TS 获取函数类型

在平时开发中我们会给一个函数的参数和返回值都设置类型，当我们想使用该函数对应的一些类型时，可能会去 `import` 进行类型引入然后使用，在某些场景下或许可以考虑使用 `Parameters` 和 `ReturnType` 类型工具调整写法，这样只需要引入函数即可。

```TypeScript
interface T {
    a: number;
    b: number;
}

interface R {
    ...
}

const func = (option: T): R => {

}
```

## 类型引用

```TypeScript
import { func } from './utils'
import type { T, R } from './utils'

const options: T = {
    a: 1,
    b: 2
}

let result: R | null = null

// todo

result = func(options)
```

## 类型工具

- `Parameters` 获取函数的参数，下标表示第几个参数。

- `ReturnType` 获取函数的返回值。

```TypeScript
import { func } from './utils'

const options: Parameters<typeof func>[0] = {
    a: 1,
    b: 2
}

let result: ReturnType<typeof func> | null = null

// todo

result = func(options)

```

::: warning 提示
当然，这也因人而异，或许有的人认为类型引入这种写法看上去更简洁，便于阅读和理解。具体根据实际开发场景和团队的代码风格决定，因此，此处不给予 bed/good 字样。
:::
