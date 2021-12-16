// UTILITY FUNCTIONS
// Just a bonus, code for thought
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// DATA
const playlist = [
  `audio/bensound-sunny.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/13/audio_cb4f1212a9.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/24/audio_82498b22da.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/23/audio_035a943c87.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/01/audio_00fa5593f3.mp3`,
  `https://cdn.pixabay.com/audio/2021/08/08/audio_dc39bde808.mp3`,
]

// DOCUMENT ELEMENTS
const playOrPause = $(`#playOrPause`)
const playPrev = $(`#playPrev`)
const playNext = $(`#playNext`)
const playlistEle = $(`#playlist`)

// VARIABLES
let playingIndex = 0
const song = new Audio()

// FUNCTIONS
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

// START THE APP
window.addEventListener(`load`, function() {

  // Setup the first song to play
  song.src = playlist[playingIndex]

  // Load up the playlist
  playlist.forEach(function(item, index) {
    playlistEle.innerHTML += `<li data-index="${index}">${item}</li>`
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

  playlistEle.addEventListener(`click`, function(event) {
    // Who was clicked?
    const songToPlay = event.target

    if (songToPlay.matches(`li`)) {
      playingIndex = Number(songToPlay.dataset.index)
      song.src = playlist[playingIndex]
      song.play()
    }
  })
})

