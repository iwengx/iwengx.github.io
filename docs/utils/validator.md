# 验证器（Validator）

使用策略模式来实现一个验证器，主要用于验证表单数据，方便复用和扩展等。

::: code-group

```TypeScript:line-numbers [Validator.ts]
// * 这里使用 ant design 的 message 显示检测错误的信息
import { message } from 'ant-design-vue'

/**
 * 检查策略
 * @return {boolean}
 */
const checkStrategies = {
   /**
    * 检查 密码 的合法性
    */
   password: (value: string) => {
      const pwdReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,15}$/
      return (value && pwdReg.test(value)) || '密码必须包含大小写字母和数字，长度在5-15之间'
   },

   /**
    * 检查 两个密码 是否相同
    */
   samePassword: (pwd1: string, pwd2: string) => {
      return pwd1 === pwd2 || '两次密码不相同'
   },

   /**
    * 检查 字符串是否为 ''、null、undefined
    * @param str 字符串
    * @param errMsg 错误时提示的内容
    */
   stringNotNull: (str: string, errMsg: string) => {
      return !!str || errMsg
   },

   /**
    * 根据表单内容进行扩展
    * ...
    */
}

export class Validator {
   /**
    * （私有属性）存储策略事件
    */
   #cache: (() => boolean)[] = []

   /**
    * 添加策略事件
    */
   add = (method: keyof typeof checkStrategies, ...value: any[]) => {
      // @ts-ignore
      this.#cache.push(() => checkStrategies[method](...value))
   }

   /**
    * 检查
    * @returns {boolean} 返回 通过(true) 或 失败(false)
    */
   check = () => {
      for (let i = 0; i < this.#cache.length; i += 1) {
         const checkFn = this.#cache[i]
         const result = checkFn() // * 开始检查
         if (typeof result === 'string') {
            message.warning(result)
            return false
         }
      }
      return true
   }
}
```

```TypeScript [Form.vue]
// 你可以在任何有数据验证的地方使用它

const validateForm = (): boolean => {
   const validator = new Validator()
   validator.add('phoneNum', '18888888888')
   validator.add('password', 'Admin123456')
   // 根据表单内容进行扩展
   // validator.add('xxx', 'xxx');
   // ...

   return validator.check()
}

const login = () => {
   if (!validateForm()) return

   // call api function
   // ...
}
```

:::

如果我们使用的是组件库（例如: ant、element）, 它们的 Form 组件都有自带的验证功能可以去尝试一下.
