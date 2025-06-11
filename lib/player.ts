import YTPlayer from 'youtube-player'
import { useRafFn } from '@vueuse/core'
import { getNoteExtended, type Notes } from './note'
import { Howl } from 'howler'
import blockLow from '../assets/low.mp3'

type YoutubePlayer = ReturnType<typeof YTPlayer>
type PlayerRef = Ref<YoutubePlayer | null>

export const usePlayer = ({
  noteText
}: {
  noteText: Ref<string>
}) => {
  const playerRef: PlayerRef = ref(null)
  const nowSecond = ref(0)
  const noteObject = computed(() => {
    try {
      return noteText.value ? JSON.parse(noteText.value) as Notes[string] : null
    } catch {
      return null
    }
  })

  const updateVideo = async () => {
    if (!noteObject.value || !noteObject.value.videoId) {
      return
    }

    const youtubeId = noteObject.value.videoId
    if (playerRef.value) {
      await playerRef.value.loadVideoById(youtubeId)
      await playerRef.value.seekTo(0, true)
    } else {
      playerRef.value = YTPlayer('yt-player', {
        videoId: youtubeId,
        width: 896,
        height: 504,
        playerVars: {
          rel: 0,
          enablejsapi: 1,
          controls: 1,
          disablekb: 0
        }
      })
    }
  }

  useRafFn(async () => {
    nowSecond.value = await playerRef.value?.getCurrentTime() || 0
  })

  const restart = () => {
    playerRef.value?.seekTo(0, true)
  }

  const extendedNote = computed(() => getNoteExtended(noteText.value))

  const nowMeasure = ref(-1)
  const nowBpm = computed(() => extendedNote.value[nowMeasure.value]?.[1] || extendedNote.value[0]?.[1])
  const nowBeatN = computed(() => extendedNote.value[nowMeasure.value]?.[2] || extendedNote.value[0]?.[2])
  const nowBeatM = computed(() => extendedNote.value[nowMeasure.value]?.[3] || extendedNote.value[0]?.[3])
  const nowMessage = computed(() => extendedNote.value[nowMeasure.value]?.[4] || '')
  const nowPlayingBeat = computed(() => {
    if (!extendedNote.value[nowMeasure.value]) {
      return 0
    }

    const beatDuration = 60 / extendedNote.value[nowMeasure.value][1]
    return Math.min(Math.floor((nowSecond.value - extendedNote.value[nowMeasure.value][0]) / beatDuration) + 1, nowBeatN.value)
  })

  watch(nowSecond, () => {
    if (extendedNote.value[nowMeasure.value + 1] && extendedNote.value[nowMeasure.value + 1][0] <= nowSecond.value) {
      nowMeasure.value++
    }

    if (extendedNote.value[nowMeasure.value] && extendedNote.value[nowMeasure.value][0] > nowSecond.value) {
      nowMeasure.value = extendedNote.value.findIndex(([second]) => second > nowSecond.value) - 1
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
    nowMessage,
    updateVideo
  }
}