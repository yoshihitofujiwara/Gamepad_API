<script setup>
import { onMounted } from '@vue/runtime-core'
import { ref, reactive } from 'vue'
import {Gamepad} from './utils/Gamepad'
import GamepadButton from './components/GamepadButton.vue'
import GamepadAxis from './components/GamepadAxis.vue'

const gamepad = new Gamepad();

onMounted(()=>{
  gamepad.setup();
})


gamepad.on("connected", (e)=>{
  // console.log(e.gamepad.id);

  gamepad.on("update:"+e.gamepad.id, (e)=>{
    e.buttons.forEach((btn, i) => {
      buttons[i] = btn;
    });

    if(e.axes){
      axes[0] = {
        x: e.axes[0],
        y: e.axes[1]
      }
      axes[1] = {
        x: e.axes[2],
        y: e.axes[3]
      }
    }
  })
})

gamepad.on("disconnected", (e)=>{
  // console.log(e.gamepad.id);
  gamepad.off("update:"+e.gamepad.id)
})


// gamepad data
const buttons = reactive([
  // {pressed: false, touched: false, value: 0}
])

const axes = reactive([
  {x: 0, y: 0}, // axis1
  {x: 0, y: 0} // axis2
])
</script>

<template>
  <div>
    <h1>Gamepad API</h1>
    <div v-if="buttons.length">
      <div class="btn_wrap">
        <h2>Buttons</h2>
        <div class="btn_list">
          <GamepadButton class="btn" v-for="(btn, i) in buttons" :key="'btn_'+i" :isPressed="btn.pressed">{{ i }}</GamepadButton>
        </div>
      </div>
      <div class="axes_wrap">
        <h2>Axes</h2>
        <GamepadAxis class="axis" v-for="(axis, i) in axes" :key="'axes_'+i" :x="axis.x" :y="axis.y">{{ i }}</GamepadAxis>
      </div>

    </div>
    <p v-else>ゲームコントローラを接続して、ボタンを入力してください。</p>

  </div>
</template>

<style scoped>
h1{
  margin: 12px 0 18px;
  font-size: 2.4em;
}
h2{
  margin: 60px 0 18px;
}
.btn_list{
  text-align: left;
}
.btn{
  margin: 8px 4px 0;
  width: calc(100% / 6 - 8px);
}
.axis{
  margin: 0 24px;
}
</style>
