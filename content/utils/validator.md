---
title: '策略模式实现 验证器'
tag: ['ts']
type: 'utils'
date: '2022/10/24'
---

# 验证器（Validator）

## 介绍

使用策略模式来实现一个验证器, 主要用于验证表单数据, 方便复用和扩展等.

```typescript
// 创建一个 Validator.ts

/**
 * 检查策略
 * 各项的返回值格式都是 {true | 'string'}
 * @return true 或 失败的原因
 */
const checkStrategies = {
   /**
    * 检查 手机号码 的合法性
    */
   phoneNum: (value: string) => {
      const phoneReg =
         /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/;

      return (value && phoneReg.test(value)) || '手机号不能为空或格式有误！';
   },

   /**
    * 检查 验证码 的合法性
    */
   code: (value: string) => {
      return (value && value.length === 6) || '验证码错误！';
   },

   /**
    * 检查 密码 的合法性
    */
   password: (value: string) => {
      const pwdReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,15}$/;

      return (
         (value && pwdReg.test(value)) ||
         '密码必须包含大小写字母和数字，长度在5-15之间'
      );
   },

   /**
    * 检查 两个密码 是否相同
    */
   samePassword: (pwd1: string, pwd2: string) => {
      return pwd1 === pwd2 || '两次密码不相同';
   },

   /**
    * 根据表单内容进行扩展
    * ...
    */
};

type Method = 'phoneNum' | 'code' | 'password' | 'samePassword' | 'name';

export class Validator {
   /**
    * （私有属性）存储策略事件
    */
   #cache = [];

   /**
    * 添加策略事件
    */
   add = (method: Method, ...value: any) => {
      this.#cache.push(() => checkStrategies[method](...value));
   };

   /**
    * 检查
    * @returns true 或 失败的原因
    */
   check = () => {
      for (let i = 0; i < this.#cache.length; i++) {
         const checkFn = this.#cache[i];
         const result = checkFn(); // * 开始检查
         if (typeof result === 'string') return result;
      }
      return true;
   };
}
```

```typescript
// 你可以在任何有数据验证的地方使用它

const validateForm = (): boolean => {
   const validator = new Validator();
   validator.add('phoneNum', '18888888888');
   validator.add('password', 'Admin123456');
   // 根据表单内容进行扩展
   // validator.add('xxx', 'xxx');
   // ...

   const res = validator.check();
   if (typeof res === 'string') {
      console.log(res);
      return false;
   }
   return true;
};

const login = () => {
   if (!validateForm()) return;

   // call api function
   // ...
};
```

如果我们使用的是组件库（例如: ant、element）, 它们的 Form 组件都有自带的验证功能可以去尝试一下.
