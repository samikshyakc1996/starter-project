import { $, $$, secsToMins } from './utils.js'
import { playlist } from './data.js'

// DOCUMENT ELEMENTS
const playOrPause = $(`#playOrPause`)
const playPrev = $(`#playPrev`)
const playNext = $(`#playNext`)
const playlistEle = $(`#playlist`)
const trackVolume = $(`#trackVolume`)
const trackTime = $(`#trackTime`)
const trackDuration = $(`#trackDuration`)
const trackProgress = $(`#trackProgress`)



// VARIABLES
let playingIndex = 0
const song = new Audio()

// FUNCTIONS
const loadSongFromPlaylistByIndex = function(index = 0, start = false) {
  // Assign the incoming index to the playlistIndex
  playingIndex = index

  // Check if the song was already playing (ie, not paused), so we can keep it going after changing the src
  const keepPlaying = !song.paused

  // Change the song source
  song.src = playlist[playingIndex]

  // Loading up the rest of the data for this song would go here

  // Add .loading to the playing song
  $$(`.playing`).forEach(li => li.classList.remove(`playing`))
  $(`[data-index="${playingIndex}"]`).classList.add(`playing`)

  // Play the new track, if we were already playing (you may not even want to bother checking and just play when a playlist song is clicked)
  if (keepPlaying || start) {
    song.play().then(() => {
      //console.log(song.currentTime, song.duration)
    })
  }
}

const loadPlaylistFromArray = function(pl) {
  pl.innerHTML = ``
  // Load up the playlist
  pl.forEach(function(item, index) {
    playlistEle.innerHTML += `<li data-index="${index}">${item}</li>`
  })
}

const setVolumeTo = function(vol) {
  song.volume = vol
}

const playNextSong = function() {
  // If we're at the end of the playlist, loop to the beginning
  const nextIndex = ((playingIndex + 1) > (playlist.length - 1)) ? 0 : playingIndex + 1
  
  loadSongFromPlaylistByIndex(nextIndex, true)
}


// START THE APP
window.addEventListener(`load`, function() {


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
  playNext.addEventListener(`click`, playNextSong)

  // If the "prev" song is clicked
  playPrev.addEventListener(`click`, function(event) {
    // If we're at the beginning of the playlist, loop to the end
    const prevIndex = ((playingIndex - 1) < 0) ? playlist.length - 1 : playingIndex - 1
  
    loadSongFromPlaylistByIndex(prevIndex)
  })

  // Add a listener to the entire playlist
  playlistEle.addEventListener(`click`, function(event) {
    // Who was clicked?
    const songToPlay = event.target

    if (songToPlay.matches(`li`)) {
      playingIndex = Number(songToPlay.dataset.index)
      loadSongFromPlaylistByIndex(playingIndex, true)
    }
  })

  song.addEventListener(`durationchange`, function(event) {
    trackDuration.textContent = secsToMins(song.duration)
  })

  song.addEventListener(`ended`, playNextSong)

  song.addEventListener(`timeupdate`, function(event) {
    trackTime.textContent = secsToMins(song.currentTime)

    // Don't update while you're dragging
    if (amDragProgress) return
    trackProgress.value = song.currentTime / song.duration
  })

  let amDragProgress = false
  trackProgress.addEventListener(`input`, function(event) {
    amDragProgress = true
  })
  trackProgress.addEventListener(`change`, function(event) {
    amDragProgress = false
    song.currentTime = trackProgress.value * song.duration
  })


  trackVolume.addEventListener(`input`, function(event) {
    setVolumeTo(trackVolume.value)
  })
  // Set it once to start
  setVolumeTo(trackVolume.value)


  // Load up the playlist with songs
  loadPlaylistFromArray(playlist)

  // Setup the first song to play
  loadSongFromPlaylistByIndex(playingIndex)

})

// Interact with progress bar
// Load from a file




// BREAK UNTIL 10:45
// - Any questions about logic?
// - Anything you want me to demo?
// - Anything you want to show?
// - Wrapup:
//    - Submission
//    - Quiz