import YTPlayer from 'youtube-player'
import { useRafFn } from '@vueuse/core'
import { getFanfareNoteExtended } from './note'
import { Howl } from 'howler'
import blockLow from '../assets/low.mp3'

type YoutubePlayer = ReturnType<typeof YTPlayer>
type PlayerRef = Ref<YoutubePlayer | null>

export const usePlayer = () => {
  const playerRef: PlayerRef = ref(null)
  const nowSecond = ref(0)

  onMounted(() => {
    playerRef.value = YTPlayer('yt-player', {
      videoId: 'fq2KGJm8kp8',
      width: 896,
      height: 504,
      playerVars: {
        rel: 0,
        enablejsapi: 1,
        controls: 1,
        disablekb: 0
      }
    })
  })

  useRafFn(async () => {
    nowSecond.value = await playerRef.value?.getCurrentTime() || 0
  })

  const restart = () => {
    playerRef.value?.seekTo(0, true)
  }

  const extendedNote = getFanfareNoteExtended()

  const nowMeasure = ref(-1)
  const nowBpm = computed(() => extendedNote[nowMeasure.value]?.[1] || extendedNote[0]?.[1])
  const nowBeatN = computed(() => extendedNote[nowMeasure.value]?.[2] || extendedNote[0]?.[2])
  const nowBeatM = computed(() => extendedNote[nowMeasure.value]?.[3] || extendedNote[0]?.[3])
  const nowMessage = computed(() => extendedNote[nowMeasure.value]?.[4] || '')
  const nowPlayingBeat = computed(() => {
    if (!extendedNote[nowMeasure.value]) {
      return 0
    }

    const beatDuration = 60 / extendedNote[nowMeasure.value][1]
    return Math.min(Math.floor((nowSecond.value - extendedNote[nowMeasure.value][0]) / beatDuration) + 1, nowBeatN.value)
  })

  watch(nowSecond, () => {
    if (extendedNote[nowMeasure.value + 1] && extendedNote[nowMeasure.value + 1][0] <= nowSecond.value) {
      nowMeasure.value++
    }

    if (extendedNote[nowMeasure.value] && extendedNote[nowMeasure.value][0] > nowSecond.value) {
      nowMeasure.value = extendedNote.findIndex(([second]) => second > nowSecond.value) - 1
    }
  })

  const lowAudio = new Howl({
    src: blockLow,
    html5: true
  })

  watch(nowPlayingBeat, () => {
    lowAudio.play()
  })

  return {
    nowSecond,
    nowMeasure,
    nowPlayingBeat,
    nowBpm,
    nowBeatN,
    nowBeatM,
    restart,
    nowMessage
  }
}