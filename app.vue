<template>
  <div>
    <div class="container">
      <div style="display: flex; align-items: stretch;">
        <div id="yt-player" />
        <div style="width: calc(1200px - 896px); display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
          <div class="balloon-wrapper" v-html="nowMessage[0] === '@' ? '' : nowMessage">
          </div>
          <img :src="himeImage" width="200" class="hime-image" :class="{ 'grey-filter': nowMessage === '@grey' }" />
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 64px; height: calc(675px - 504px)">
        <div class="counter" style="display: flex; align-items: center;">
          <template
            v-for="i in nowBeatN"
          >
            <div
              class="circle"
              :class="{ active: nowPlayingBeat === i }"
            />
            <div
              class="line"
              v-if="i !== nowBeatN"
            />
          </template>
        </div>
        <div style="
          display: flex;
          justify-content: flex-end;
          padding-top: 8px;
        ">
          <div style="text-align: end;">
            <div style="line-height: 1;">BPM</div>
            <div style="font-size: 2.4em; font-weight: bold;">♩= {{ nowBpm }}</div>
          </div>
          <div style="margin-left: 64px; text-align: end;">
            <div style="line-height: 1;">拍子</div>
            <div style="font-size: 2.4em; font-weight: bold;">{{ nowBeatN }}/{{ nowBeatM }}</div>
          </div>
        </div>
      </div>
    </div>
    <button @click="restart">Restart</button>
  </div>
</template>

<script lang="ts" setup>
import { usePlayer } from './lib/player'
import himeImage from './assets/hime.png'

const { nowMessage, nowBeatM, nowBeatN, nowPlayingBeat, nowBpm, restart } = usePlayer()
</script>

<style>
body {
  background: #252631;
}
</style>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  width: 1200px;
  height: 675px;
  background: #252631;
  color: white;
  font-size: 24px;
}

/deep/ .circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--circle-color);
}

/deep/ .circle.active {
  background: var(--circle-color);
}

.counter :nth-child(3n + 1 of .circle), /deep/ .meg {
  --circle-color: #BCBCBC;
}

.counter :nth-child(3n + 2 of .circle), /deep/ .ruri {
  --circle-color: #FE76CE;
}

.counter :nth-child(3n + 3 of .circle), /deep/ .hime {
  --circle-color: #D353FF;
}

.line {
  width: 96px;
  height: 2px;
  background: white;
}

.balloon-wrapper {
  border: 4px solid white;
  position: relative;
  width: 90%;
  flex-grow: 1;
  margin-top: 8px;
  padding: 8px;
}

.balloon-wrapper:after {
  content: '';
  position: absolute;
  top: calc(100% - 9px);
  left: calc(50% - 10px);
  width: 20px;
  height: 20px;
  background: #252631;
  border-bottom: white 4px solid;
  border-right: white 4px solid;
  transform: rotate(45deg);
}

.hime-image {
  transition: filter 2.5s ease-in-out;
}

.grey-filter {
  filter: grayscale(100%) contrast(200%);
}
</style>