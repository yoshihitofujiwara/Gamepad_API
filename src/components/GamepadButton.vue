<script setup>
import { ref } from 'vue'

defineProps({
  isPressed: { type: Boolean, default: false}
})

const count = ref(0)

</script>

<template>
	<button :class="{press: isPressed}">Button <slot></slot></button>
</template>

<style scoped>
.press{
  background-color: red;
}

</style>
