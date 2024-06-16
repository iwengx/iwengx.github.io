# 二次封装组件

在平时的业务开发中，我们通常需要对第三方组件库进行二次封装来满足特殊的业务需求。

## 组件传参

`useAttrs` 可以获取到当前组件 非 `defineProps` 声明 的属性。

::: code-group

```Vue{2} [parent.vue]
<template>
  <child v-model="textInput" :count="10" placeholder="请输入姓名" />
</template>
```

```Vue{3,10} [child.vue]
<template>
  <div class="my-component">
    <van-field v-bind="attrs" />
  </div>
</template>

<script setup>
import { useAttrs } from 'vue'
const props = defineProps(['count'])
const attrs = useAttrs() // => { modelValue, onUpdate:modelValue, placeholder }
</script>
```

:::

## 组件插槽

`useSlots` 可以获取到父组件传入的全部插槽对象，再使用 `v-for` 遍历给子组件即可。

::: code-group

```Vue{3-8} [parent.vue]
<template>
  <child v-model="textInput" :count="10" placeholder="请输入姓名">
    <template #label>
      <span>名称</span>
    </template>
    <template #left-icon>
      <span>icon</span>
    </template>
  </child>
</template>
```

```Vue{4-6,16} [child.vue]
<template>
  <div class="my-component">
    <van-field v-bind="attrs">
      <template v-for="(value, name) in slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </van-field>
  </div>
</template>

<script setup>
import { useAttrs, useSlots } from 'vue'
const props = defineProps(['count'])
const attrs = useAttrs() // => { modelValue, onUpdate:modelValue, placeholder }

const slots = useSlots()
</script>
```

:::

## 组件实例

在父组件中添加 `ref` 属性，但想拿到子组件中的实例时，可以使用 `defineExpose` 将子组件的实例导出给父组件。

::: code-group

```Vue{2} [parent.vue]
<template>
  <child ref="childRef" v-model="textInput" :count="10" placeholder="请输入姓名">
    <template #label>
      <span>名称</span>
    </template>
    <template #left-icon>
      <span>icon</span>
    </template>
  </child>
</template>

<script setup>
import { ref } from 'vue'
const childRef = ref()
</script>
```

```Vue{3,17-20} [child.vue]
<template>
  <div class="my-component">
    <van-field ref="fieldRef" v-bind="attrs">
      <template v-for="(value, name) in slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </van-field>
  </div>
</template>

<script setup>
import { useAttrs, useSlots, ref } from 'vue'
const props = defineProps(['count'])
const attrs = useAttrs() // => { modelValue, onUpdate:modelValue, placeholder }
const slots = useSlots()

const fieldRef = ref()
defineExpose({
  fieldRef
})
</script>
```

:::

在 Vue2 环境下可以将 `fieldRef` 的属性在 `mounted` 生命周期中遍历赋值给 `this` 指向。
