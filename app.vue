<template>
  <div>
    <div class="container">
      <div style="display: flex; align-items: stretch;">
        <div id="yt-player" style="width: 896px; height: 504px;" />
        <div style="width: calc(1200px - 896px); display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
          <div class="balloon-wrapper" v-html="nowMessage[0] === '@' ? nowMessage.indexOf('\n') === -1 ? '' : nowMessage.slice(nowMessage.indexOf('\n')) : nowMessage">
          </div>
          <img :src="himeImage" width="200" class="hime-image" :class="himeFilter" />
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 64px; height: calc(675px - 504px)">
        <div class="counter" style="display: flex; align-items: center;">
          <template
            v-for="i in nowBeatN"
          >
            <div
              class="circle"
              :class="{ active: nowPlayingBeat === i, big: isBig(i) }"
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
    <div style="color: white;">
      <button @click="restart">Restart</button>
      <div>
        プリセット：
        <select v-model="selectedNoteKey">
          <option value="">選択してください</option>
          <option v-for="(note, title) in notes" :key="title" :value="title">{{ note.title }}</option>
        </select>
      </div>
      <div>
        譜面：<br>
        <textarea
          v-model="noteTextForm"
          style="width: 600px; height: 200px;"
        />
      </div>
      <div>
        <button @click="applyNoteText">読み込み</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computedWithControl } from '@vueuse/core'
import { usePlayer } from './lib/player'
import { notes } from './lib/note'
import himeImage from './assets/hime.png'
import ogpImage from './assets/ogp.png'

useHead({
  title: 'あにょじメトロノーム',
  meta: [
    { property: 'og:title', content: 'あにょじメトロノーム' },
    { property: 'og:type', content: 'website' },
    { property: 'twitter:title', content: 'あにょじメトロノーム' },
    { name: 'twitter:image', content: ogpImage },
    { name: 'twitter:card', content: 'summary' }
  ]
})

const noteTextForm = ref('')
const noteText = computedWithControl(() => null, () => noteTextForm.value)

const selectedNoteKey = ref('')
watch(selectedNoteKey, (newKey) => {
  if (newKey && newKey in notes) {
    noteTextForm.value = JSON.stringify(notes[newKey as keyof typeof notes], null, 2)
    applyNoteText()
  }
})

const { nowMessage, nowBeatM, nowBeatN, nowPlayingBeat, nowBpm, restart, updateVideo } = usePlayer({
  noteText
})

const applyNoteText = () => {
  noteText.trigger()
  updateVideo()
}

const himeFilter = computed(() => {
  switch (nowMessage.value.match(/@(\w+)/)?.[1]) {
    case 'grey':
      return 'grey-filter'
    case 'filterout':
      return 'filter-out'
    case 'rainbow':
      return 'rainbow-filter'
    default:
      return ''
  }
})

const isBig = (n: number) => {
  const matches = nowMessage.value.match(/@big(\d+)/)
  return matches && matches[1].includes(n.toString())
}
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
  position: relative;
  z-index: 1;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #252631;
  border: 2px solid var(--circle-color);
}

/deep/ .circle.big {
  width: 60px;
  height: 60px;
  margin: -14px;
}

/deep/ .circle.active {
  background: var(--circle-color);
}

.counter :nth-child(9n + 1 of .circle), /deep/ .meg {
  --circle-color: #BCBCBC;
}

.counter :nth-child(9n + 2 of .circle), /deep/ .ruri {
  --circle-color: #FE76CE;
}

.counter :nth-child(9n + 3 of .circle), /deep/ .hime {
  --circle-color: #D353FF;
}

.counter :nth-child(9n + 4 of .circle), /deep/ .kaho {
  --circle-color: orange;
}

.counter :nth-child(9n + 5 of .circle), /deep/ .ginko {
  --circle-color: #7ec8e1;
}

.counter :nth-child(9n + 6 of .circle), /deep/ .kozue {
  --circle-color: #47ad86;
}

.counter :nth-child(9n + 7 of .circle), /deep/ .kosuzu {
  --circle-color: #eada00;
}

.counter :nth-child(9n + 8 of .circle), /deep/ .sayaka {
  --circle-color: #3634b9;
}

.counter :nth-child(9n + 9 of .circle), /deep/ .tsuzuri {
  --circle-color: #9e2626;
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

.grey-filter {
  filter: grayscale(100%) contrast(200%);
  transition: filter 2.5s ease-in-out;
}

.filter-out {
  transition: filter 2.5s ease-in-out;
}

.rainbow-filter {
  animation: rainbow 2s infinite;
}

@keyframes rainbow {
0%   { filter: drop-shadow(0 0 10px hsl(0deg, 100%, 50%)); }
2%   { filter: drop-shadow(0 0 10px hsl(7.2deg, 100%, 50%)); }
4%   { filter: drop-shadow(0 0 10px hsl(14.4deg, 100%, 50%)); }
6%   { filter: drop-shadow(0 0 10px hsl(21.6deg, 100%, 50%)); }
8%   { filter: drop-shadow(0 0 10px hsl(28.8deg, 100%, 50%)); }
10%  { filter: drop-shadow(0 0 10px hsl(36deg, 100%, 50%)); }
12%  { filter: drop-shadow(0 0 10px hsl(43.2deg, 100%, 50%)); }
14%  { filter: drop-shadow(0 0 10px hsl(50.4deg, 100%, 50%)); }
16%  { filter: drop-shadow(0 0 10px hsl(57.6deg, 100%, 50%)); }
18%  { filter: drop-shadow(0 0 10px hsl(64.8deg, 100%, 50%)); }
20%  { filter: drop-shadow(0 0 10px hsl(72deg, 100%, 50%)); }
22%  { filter: drop-shadow(0 0 10px hsl(79.2deg, 100%, 50%)); }
24%  { filter: drop-shadow(0 0 10px hsl(86.4deg, 100%, 50%)); }
26%  { filter: drop-shadow(0 0 10px hsl(93.6deg, 100%, 50%)); }
28%  { filter: drop-shadow(0 0 10px hsl(100.8deg, 100%, 50%)); }
30%  { filter: drop-shadow(0 0 10px hsl(108deg, 100%, 50%)); }
32%  { filter: drop-shadow(0 0 10px hsl(115.2deg, 100%, 50%)); }
34%  { filter: drop-shadow(0 0 10px hsl(122.4deg, 100%, 50%)); }
36%  { filter: drop-shadow(0 0 10px hsl(129.6deg, 100%, 50%)); }
38%  { filter: drop-shadow(0 0 10px hsl(136.8deg, 100%, 50%)); }
40%  { filter: drop-shadow(0 0 10px hsl(144deg, 100%, 50%)); }
42%  { filter: drop-shadow(0 0 10px hsl(151.2deg, 100%, 50%)); }
44%  { filter: drop-shadow(0 0 10px hsl(158.4deg, 100%, 50%)); }
46%  { filter: drop-shadow(0 0 10px hsl(165.6deg, 100%, 50%)); }
48%  { filter: drop-shadow(0 0 10px hsl(172.8deg, 100%, 50%)); }
50%  { filter: drop-shadow(0 0 10px hsl(180deg, 100%, 50%)); }
52%  { filter: drop-shadow(0 0 10px hsl(187.2deg, 100%, 50%)); }
54%  { filter: drop-shadow(0 0 10px hsl(194.4deg, 100%, 50%)); }
56%  { filter: drop-shadow(0 0 10px hsl(201.6deg, 100%, 50%)); }
58%  { filter: drop-shadow(0 0 10px hsl(208.8deg, 100%, 50%)); }
60%  { filter: drop-shadow(0 0 10px hsl(216deg, 100%, 50%)); }
62%  { filter: drop-shadow(0 0 10px hsl(223.2deg, 100%, 50%)); }
64%  { filter: drop-shadow(0 0 10px hsl(230.4deg, 100%, 50%)); }
66%  { filter: drop-shadow(0 0 10px hsl(237.6deg, 100%, 50%)); }
68%  { filter: drop-shadow(0 0 10px hsl(244.8deg, 100%, 50%)); }
70%  { filter: drop-shadow(0 0 10px hsl(252deg, 100%, 50%)); }
72%  { filter: drop-shadow(0 0 10px hsl(259.2deg, 100%, 50%)); }
74%  { filter: drop-shadow(0 0 10px hsl(266.4deg, 100%, 50%)); }
76%  { filter: drop-shadow(0 0 10px hsl(273.6deg, 100%, 50%)); }
78%  { filter: drop-shadow(0 0 10px hsl(280.8deg, 100%, 50%)); }
80%  { filter: drop-shadow(0 0 10px hsl(288deg, 100%, 50%)); }
82%  { filter: drop-shadow(0 0 10px hsl(295.2deg, 100%, 50%)); }
84%  { filter: drop-shadow(0 0 10px hsl(302.4deg, 100%, 50%)); }
86%  { filter: drop-shadow(0 0 10px hsl(309.6deg, 100%, 50%)); }
88%  { filter: drop-shadow(0 0 10px hsl(316.8deg, 100%, 50%)); }
90%  { filter: drop-shadow(0 0 10px hsl(324deg, 100%, 50%)); }
92%  { filter: drop-shadow(0 0 10px hsl(331.2deg, 100%, 50%)); }
94%  { filter: drop-shadow(0 0 10px hsl(338.4deg, 100%, 50%)); }
96%  { filter: drop-shadow(0 0 10px hsl(345.6deg, 100%, 50%)); }
98%  { filter: drop-shadow(0 0 10px hsl(352.8deg, 100%, 50%)); }
100% { filter: drop-shadow(0 0 10px hsl(360deg, 100%, 50%)); }
}
</style>