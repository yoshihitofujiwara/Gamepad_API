<script setup>
defineProps({
	x: { type:Number, default: 0},
	y: { type:Number, default: 0}
})
</script>

<template>
	<div class="axes">
		<h3>Axis <slot></slot></h3>
		<div class="axis_box">
			<div class="pointer"></div>
		</div>
	</div>
</template>

<style scoped>
.axes{
  width: 200px;
  display: inline-block;
}

h3{
	margin: 12px 0;
}

.axis_box{
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  border: 2.5px solid #fff;
}
.pointer{
  position: absolute;
  top: calc( (v-bind(y) + 1) * 50%);
  left: calc( (v-bind(x) + 1) * 50%);
  width: 6px;
  height: 6px;
  transform: translate(-50%, -50%);
  background: #fff;
	border-radius: 100%;
}
</style>
