# 前端文件上传进度条显示功能

在做文件上传时，通常都会使用进度条来给用户反馈上传的进度，下面介绍两种方法。

## Axios

如果你的项目中使用 Axios 进行接口请求，可以使用它自带的 onUploadProgress 事件。

```JavaScript
axios.post('/api/testUpload', formData, {
   onUploadProgress: ({ total, loaded }) => {
      uploadProgress.value = (loaded / (total || 0)) * 100
   },
})
```

可以在 Axios [请求配置](https://www.axios-http.cn/docs/req_config)中找到相关内容。

## XMLHttpRequest

原生的 xhr 可以监听 progress 事件。

```JavaScript
const xhr = new XMLHttpRequest()
xhr.upload.addEventListener('progress', (event) => {
   if (event.lengthComputable) uploadProgress.value = (event.loaded / event.total) * 100
})
xhr.open('POST', '/api/testUpload', true)
xhr.send(formData)
```

需要注意的是：需要监听的是 [XMLHttpRequest.upload](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/upload) ，如果你不小心写成 `xhr.addEventListener('progress',...` 那它只会在接口请求完毕后执行一次而已。
