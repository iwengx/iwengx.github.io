# Axios 请求取消器

该 Axios 请求取消器主要是防止出现正在（pending）请求的相同请求。更多功能可以根据自己的业务需求进行拓展。

## 实现

下面提供了两种实现方式，功能是相同的，可以根据自己项目的风格自行选择。

::: code-group

```TypeScript [axiosCanceler.ts]
import type { AxiosRequestConfig } from 'axios';

/**
 * 用于存储每个请求的标识和取消函数
 */
const pendingMap = new Map<string, AbortController>();

/**
 * 拼接出唯一键
 * @param {AxiosRequestConfig} config 请求配置
 * @returns {string} 唯一键
 */
const makePendingUrl = (config: AxiosRequestConfig): string => {
   return [config.method, config.url].join('&');
};

/**
 * 添加请求
 * @param {AxiosRequestConfig} config 请求配置
 */
function addPending(config: AxiosRequestConfig) {
   this.removePending(config);
   const url = makePendingUrl(config);
   const controller = new AbortController();
   config.signal = config.signal || controller.signal;
   if (!pendingMap.has(url)) {
      // 如果当前请求不在等待中，将其添加到等待中
      pendingMap.set(url, controller);
   }
}

/**
 * 清除所有等待中的请求
 */
function removeAllPending() {
   pendingMap.forEach((abortController) => {
      if (abortController) {
         abortController.abort();
      }
   });
   this.reset();
}

/**
 * 移除请求
 * @param {AxiosRequestConfig} config 请求配置
 */
function removePending(config: AxiosRequestConfig) {
   const url = makePendingUrl(config);
   if (pendingMap.has(url)) {
      // 如果当前请求在等待中，取消它并将其从等待中移除
      const abortController = pendingMap.get(url);
      if (abortController) {
         abortController.abort(url);
      }
      pendingMap.delete(url);
   }
}

/**
 * 获取当前请求的数量
 */
function getPendingLength(): number {
   return pendingMap.size;
}

/**
 * 重置
 */
function reset() {
   pendingMap.clear();
}

export default {
   addPending,
   removeAllPending,
   removePending,
   getPendingLength,
   reset,
};

```

```TypeScript [单例模式]
import type { AxiosRequestConfig } from 'axios';

/**
 * 使用单例模式实现 Axios 请求取消器
 */
class AxiosCanceler {
   /**
    * 用于存储每个请求的标识和取消函数
    */
   pendingMap = new Map<string, AbortController>();

   constructor() {
      // ...
   }

   /**
    * 拼接出唯一键
    * @param {AxiosRequestConfig} config 请求配置
    * @returns {string} 唯一键
    */
   makePendingUrl = (config: AxiosRequestConfig): string => {
      return [config.method, config.url].join('&');
   };

   /**
    * 添加请求
    * @param {AxiosRequestConfig} config 请求配置
    */
   addPending(config: AxiosRequestConfig) {
      this.removePending(config);
      const url = this.makePendingUrl(config);
      const controller = new AbortController();
      config.signal = config.signal || controller.signal;
      if (!this.pendingMap.has(url)) {
         // 如果当前请求不在等待中，将其添加到等待中
         this.pendingMap.set(url, controller);
      }
   }

   /**
    * 清除所有等待中的请求
    */
   removeAllPending() {
      this.pendingMap.forEach((abortController) => {
         if (abortController) {
            abortController.abort();
         }
      });
      this.reset();
   }

   /**
    * 移除请求
    * @param {AxiosRequestConfig} config 请求配置
    */
   removePending(config: AxiosRequestConfig) {
      const url = this.makePendingUrl(config);
      if (this.pendingMap.has(url)) {
         // 如果当前请求在等待中，取消它并将其从等待中移除
         const abortController = this.pendingMap.get(url);
         if (abortController) {
            abortController.abort(url);
         }
         this.pendingMap.delete(url);
      }
   }

   /**
    * 获取当前请求的数量
    */
   getPendingLength(): number {
      return this.pendingMap.size;
   }

   /**
    * 重置
    */
   reset() {
      this.pendingMap.clear();
   }
}

const singletonAxiosCanceler = Object.freeze(new AxiosCanceler());
export default singletonAxiosCanceler;
```

:::

## 使用

1. 在 Axios 请求拦截器中使用取消器

```TypeScript
import AxiosCanceler from './axiosCanceler.ts'

// 请求拦截器
axios.interceptors.request.use(function (config) {
   // ...
   AxiosCanceler.addPending(config) // [!code ++]
   // ...
   return config
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
   // ...
   AxiosCanceler.removePending(response.config) // [!code ++]
   // ...
   return response
})
```

2. 也可以在路由守卫中使用，当切换路由时，取消掉上个路由的全部请求。

```TypeScript
const router = createRouter({ ... })

router.beforeEach((to, from) => {
   // ...
   AxiosCanceler.removeAllPending() // [!code ++]
   // ...
})
```

当然你也可以在切换路由时判断当前是否还存在进行中的请求，如果存在，则弹窗确认是否离开等操作。
