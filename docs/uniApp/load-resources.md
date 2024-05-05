---
title: '实现加载资源等待页面功能'
tag: ['uni-app']
type: 'uni-app'
date: '2023-07-01'
---

# 实现加载资源等待页面功能

## 介绍

当一个页面有多个图片资源需要加载时，在进入页面时有个加载蒙版动画效果可以更好的解决闪屏的问题。

那么该如何实现这个加载蒙版呢？可以尝试一下 `uni.getImageInfo` Api。

#### 第一步，将需要加载的图片资源存放到一个数组变量中。

```javascript
const imageResources = [
   'http://127.0.0.1:8000/1.png',
   'http://127.0.0.1:8000/2.png',
   'http://127.0.0.1:8000/3.png',
   ...
];
```

#### 第二步，`uni.getImageInfo` 结合 `Promise` 获取图片资源并判断是否加载完成。

```javascript
/** 存放加载好的图片资源 */
const loadedImages = ref([]);

const imagePromises = imageResources.map((imagePath) => {
   return new Promise((resolve, reject) => {
      uni.getImageInfo({
         src: imagePath,
         success(res) {
            // * 将加载好的图片信息添加到 loadedImages 数组中
            loadedImages.value.push({ path: res.path });
            resolve();
         },
         fail(err) {
            console.log(err);
            reject(imagePath);
         },
      });
   });
});

// * 等待所有图片加载完成
Promise.all(imagePromises)
   .then(() => {
      console.log('全部加载完毕');
   })
   .catch((error) => {
      console.error('Error:', error);
   });
```

#### 由于图片资源大部分都是网络路径，在下载的时候通常也会遇到网络波动等不确定因素导致失败等问题。

同时，上方的 `Promise.all.catch` 只能返回一个错误的 `Promise` 无法获取到全部下载失败的图片。

可以考虑使用 `Promise.allSettled` 来遍历所有的错误信息，例如：

```javascript
Promise.allSettled(imagePromises).then((results) => {
   results.forEach((result) => {
      if (result.status === 'rejected') {
         console.error(result.reason);
      }
   });
});
```

这样，在重新加载函数里，我们只需要下载失败的资源文件即可，无需从头全部下载完。
