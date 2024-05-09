# JavaScript 添加事件的注意事项

我们在给 window 或者 某个元素 添加事件的使用通常会使用以下两种方法：

```JavaScript
// 方法一
window.onresize = () => {
   console.log('resize-1')
}

// 方法二
window.addEventListener('resize', () => {
   console.log('resize-2')
})
```

其中，如果在一个项目中同时出现两次**方法一**：

```JavaScript
// resize-1 则会被最后一次声明的 resize-2 所替代
window.onresize = () => {
   console.log('resize-1')
}

window.onresize = () => {
   console.log('resize-2')
}

// 结果输出:
// > resize-2;
```

那么，我们可以使用**方法二**就可以实现事件的独立：

```JavaScript
window.addEventListener('resize', () => {
   console.log('resize-1')
})

window.addEventListener('resize', () => {
   console.log('resize-2')
})

// 结果输出:
// > resize-1;
// > resize-2;
```

<br />

### 删除事件

```JavaScript
// 方法一
window.onresize = null

// 方法二
const customResize = () => console.log('resize-4')

window.addEventListener('resize', customResize)
window.removeEventListener('resize', customResize)
```
