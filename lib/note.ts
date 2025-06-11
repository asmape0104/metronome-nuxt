export type Notes = Record<string, {
  title: string;
  offset: number;
  videoId: string;
  /** [秒数, bpm, n, m, メッセージ] n/m拍子 */
  note: Array<[number, number, number, number, string?]>;
}>;

export const notes = {
  fanfare: {
    title: 'ファンファーレ！！！',
    offset: 1.257848,
    videoId: 'fq2KGJm8kp8',
    note: [
      [255, 4, 4, 1, '最初はブレードは<br>振らずに、<br>アタシの気合い入れに<br>合わせるのが<br>オススメ〜。'],
      [255, 3, 4, 4, '最初はブレードは<br>振らずに、<br>アタシの気合い入れに<br>合わせるのが<br>オススメ〜。'],
      [220, 4, 4, 2, '最初はブレードは<br>振らずに、<br>アタシの気合い入れに<br>合わせるのが<br>オススメ〜。'],
      [220, 4, 4, 2, 'うおおぉぉーーーーー'],
      [220, 4, 4, 8, 'るりめぐの<br>いっせーの、はい！<br>でリズムを取ろう。'],
      [110, 4, 4, 1, 'ここ三連符で<br>リズムが<br>取りづらいけど<br>ブレード振る速さを<br>半分（110）にすると<br>ズレにくいよ〜。'],
      [220, 4, 4, 2, 'ここ三連符で<br>リズムが<br>取りづらいけど<br>ブレード振る速さを<br>半分（110）にすると<br>ズレにくいよ〜。'],
      [220, 4, 4, 22],
      [220, 4, 4, 2, '「はいし『ん』」から<br>一呼吸おいて<br>「いいね！」。<br><br><div style="display: inline-block;" class="circle active kaho"></div>の<br>タイミング。'],
      [220, 4, 4, 1, '「ライ『ブ』」から<br>一呼吸おいて<br>「最高！」。<br><br><div style="display: inline-block;" class="circle active hime"></div>のタイミング。'],
      [220, 3, 4, 1, '間髪入れず<br>リズム難。<br>ここ3/4でやばい。'],
      [220, 4, 4, 2, '間髪入れず<br>リズム難。<br>ここ3/4でやばい。'],
      [220, 5, 4, 1, 'ここは5/4。<br>「君 君 君」のあとに<br>心のなかで<br>2カウントとると<br>ぴったり〜。'],
      [220, 4, 4, 3, 'ここは5/4。<br>「君 君 君」のあとに<br>心のなかで<br>2カウントとると<br>ぴったり〜。'],
      [220, 4, 4, 4, 'この歌詞<br>アタシのことだ……'],
      [220, 4, 4, 15, '@rainbow'],
      [220, 4, 4, 1, '@rainbow\n優勝〜'],
      [220, 4, 4, 6,],
      [110, 4, 4, 1, '1番ぶりの三連符。<br>ブレード振る速さを<br>半分にしよう。'],
      [220, 4, 4, 14],
      [220, 4, 4, 2, '「ともだ『ち』」から<br>一呼吸おいて<br>「うんうん！」。<br><br><div style="display: inline-block;" class="circle active kaho"></div>の<br>タイミング。'],
      [220, 4, 4, 1, '「がっこ『う』」から<br>一呼吸おいて<br>「そりゃもう！」。<br><br><div style="display: inline-block;" class="circle active hime"></div>のタイミング。'],
      [220, 3, 4, 1, 'また3/4。'],
      [220, 4, 4, 2],
      [220, 5, 4, 1, '5/4再び。<br>「君 君 君」のあとに<br>2カウントで<br>ぴったり〜。'],
      [220, 4, 4, 3, '5/4再び。<br>「君 君 君」のあとに<br>2カウントで<br>ぴったり〜。'],
      // るりちゃんせんぱい
      [100, 4, 4, 2, 'ここから加速パート。<br>ブレード振るのは<br>休憩して<br>一緒にるりめぐを<br>眺めよう〜。'],
      [120, 4, 4, 2, 'ここから加速パート。<br>ブレード振るのは<br>休憩して<br>一緒にるりめぐを<br>眺めよう〜。'],
      [140, 4, 4, 2, '@grey'],
      [160, 4, 4, 2, '@grey'],
      
      [180, 4, 4, 1, '@grey'],
      [200, 4, 4, 1, '@grey'],
      [220, 4, 4, 1, '@grey'],
      [240, 4, 4, 1, '@grey'],
      [260, 2, 4, 1, '@grey'],
      [280, 2, 4, 1, '@grey'],
      [300, 2, 4, 1, '@grey'],
      [320, 2, 4, 1, '@grey'],
      [220, 4, 4, 1, '@grey'],
      [220, 4, 4, 1, '@filterout'],
      [220, 4, 4, 2, '@filterout\nここで心を<br>落ち着けよう。'],
      [220, 4, 4, 8, 'あとは<br>ウィニングラン〜！'],
      [220, 4, 4, 40, '@rainbow\nあとは<br>ウィニングラン〜！'],
      [220, 4, 4, 4, '対戦ありがとう<br>ございました！'],
    ]
  },
  tenshi: {
    title: 'やっぱ天使！',
    offset: 0.895,
    videoId: 'j1Ry7MC6g2E',
    note: [
      [190, 4, 4, 8, ''],
      [190, 4, 4, 104, ''],
      [190, 4, 4, 19, '<div style="display: inline-block;" class="circle active meg"></div>で一拍<br><div style="display: inline-block;" class="circle active ruri"></div>＝「アン」<br><div style="display: inline-block;" class="circle active hime"></div>＝「コール！」'],
      [190, 4, 4, 1, '@big23\n<div style="display: inline-block;" class="circle active meg"></div>で一拍<br><div style="display: inline-block;" class="circle active ruri"></div>＝「アン」<br><div style="display: inline-block;" class="circle active hime"></div>＝「コール！」'],
      [190, 4, 4, 38, '@rainbow'],
    ],
  }
} satisfies Notes;

export const getNoteExtended = (noteText: string) => {
  const note: Array<[number, number, number, number, string]> = []

  if (!noteText) {
    return note
  }

  const noteObject = JSON.parse(noteText) as Notes[string];

  let offset = noteObject.offset
  noteObject.note.forEach(([bpm, n, m, count, message]: Notes[string]['note'][0]) => {
    for (let i = 0; i < count; i++) {
      note.push([offset, bpm, n, m, message || ''])
      const duration = 240 / bpm * n / m
      offset += duration
    }
  })

  return note
}