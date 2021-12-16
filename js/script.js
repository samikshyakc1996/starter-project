// DOCUMENT ELEMENTS
const playOrPause = document.querySelector(`#playOrPause`)
const playPrev = document.querySelector(`#playPrev`)
const playNext = document.querySelector(`#playNext`)
const playlistEle = document.querySelector(`#playlist`)

// DATA
const playlist = [
  `audio/bensound-sunny.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/13/audio_cb4f1212a9.mp3`
]

// VARIABLES
let playingIndex = 0
const song = new Audio()

window.addEventListener(`load`, function() {

  // Setup the first song to play
  song.src = playlist[playingIndex]

  // Load up the playlist
  playlist.forEach(function(item, index) {
    playlistEle.innerHTML += `<li data-index="${index}">${item}</li>`
  })

})

// If play/pause is clicked
playOrPause.addEventListener(`click`, function(event) {
  if (song.paused) {
    song.play()
    playOrPause.textContent = `⏸`
  } else {
    song.pause()
    playOrPause.textContent = `▶️`
  }
})

// If the "next" song is clicked
playNext.addEventListener(`click`, function(event) {
  // If we're at the end of the playlist, loop to the beginning
  const nextIndex = ((playingIndex + 1) > (playlist.length - 1)) ? 0 : playingIndex + 1
  
  loadSongFromPlaylistByIndex(nextIndex)
})

// If the "prev" song is clicked
playPrev.addEventListener(`click`, function(event) {
  // If we're at the beginning of the playlist, loop to the end
  const prevIndex = ((playingIndex - 1) < 0) ? playingIndex.length - 1 : playingIndex - 1
  
  loadSongFromPlaylistByIndex(prevIndex)
})

const loadSongFromPlaylistByIndex = function(index = 0) {
  // Assign the incoming index to the playlistIndex
  playlistIndex = index

  // Check if the song was already playing (ie, not paused), so we can keep it going after changing the src
  const keepPlaying = !song.paused

  // Change the song source
  song.src = playlist[playingIndex]

  // Loading up the rest of the data for this song would go here

  // Play the new track, if we were already playing (you may not even want to bother checking and just play when a playlist song is clicked)
  if (keepPlaying) {
    song.play()
  }
}


playlistEle.addEventListener(`click`, function(event) {
  // Who was clicked?
  const songToPlay = event.target

  if (songToPlay.matches(`li`)) {
    playingIndex = Number(songToPlay.dataset.index)
    song.src = playlist[playingIndex]
    song.play()
  }

})
