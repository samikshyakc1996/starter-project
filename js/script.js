const playOrPause = document.querySelector(`#playOrPause`)
const playPrev = document.querySelector(`#playPrev`)
const playNext = document.querySelector(`#playNext`)
const playlistEle = document.querySelector(`#playlist`)


const playlist = [
  `audio/bensound-sunny.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/13/audio_cb4f1212a9.mp3`
]
let playingIndex = 0
const song = new Audio()


song.src = playlist[playingIndex]


playlist.forEach(function(item, index) {
  playlistEle.innerHTML += `<li data-index="${index}">${item}</li>`
})


playOrPause.addEventListener(`click`, function(event) {
  if (song.paused) {
    song.play()
    playOrPause.textContent = `⏸`
  } else {
    song.pause()
    playOrPause.textContent = `▶️`
  }
})

playNext.addEventListener(`click`, function(event) {
  playingIndex = ((playingIndex + 1) > (playlist.length - 1)) ? 0 : playingIndex + 1
  
  if (!song.paused) {
    song.src = playlist[playingIndex]
    song.play()
  } else {
    song.src = playlist[playingIndex]
  }

  console.log(playingIndex)
})

playlistEle.addEventListener(`click`, function(event) {
  // Who was clicked?
  const songToPlay = event.target

  if (songToPlay.matches(`li`)) {
    playingIndex = Number(songToPlay.dataset.index)
    song.src = playlist[playingIndex]
    song.play()
  }

})
