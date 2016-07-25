// BUTTONS CLICK EVENTS
document.getElementById("play").addEventListener("click", function() {
  jukebox.play()
  console.log("Play button")
})

document.getElementById("pause").addEventListener("click", function() {
  jukebox.pause()
  console.log("Pause button")
})

// document.getElementById("stop").addEventListener("click", function() {
//   jukebox.stop()
//   console.log("Stop button")
// })

document.getElementById("next").addEventListener("click", function() {
  jukebox.next()
  console.log("Next button")
})

document.getElementById("previous").addEventListener("click", function() {
  jukebox.previous()
  console.log("Previous button")
})

// AUDIO ELEMENT VARIABLES

var audioElement = document.getElementsByTagName("audio")[0]
var playBtn = document.getElementById("play")
var pauseBtn = document.getElementById("pause")

// JUKEBOX CONSTRUCTOR

function Jukebox() {
  this.songs = []
  this.shuffle = false
  var i = 0

  // Store 'this' in variable to pass to anon functions
  var _this = this

  this.play = function() {
    audioElement.play()

    // hides play/show pause button
    playBtn.style.display = "none"
    pauseBtn.style.display = "inline-block"

    // Auto advance to next song at end of song
    audioElement.addEventListener("ended", function() {
      _this.next()
      console.log("Auto advance to next song")
    })
  }

  this.pause = function() {
    audioElement.pause()

    // hides pause/show play button
    pauseBtn.style.display = "none"
    playBtn.style.display = "inline-block"
  }

  this.stop = function() {
    this.pause()
    audioElement.currentTime = 0
  }

  this.setSong = function() {
    // updates src in audio tag
    audioElement.setAttribute("src", this.songs[i].url)
  }

  this.next = function() {
    i++
    // stops audio if at end of playlist
    if (i == this.songs.length) {
      i--
      this.stop()
    } else {
      this.setSong()
      this.play()
    }
  }

  this.previous = function() {
    i--
    // stops audio if at start of playlist
    if (i < 0) {
      i++
      this.stop()
    } else {
      this.setSong()
      this.play()
    }
  }

  this.add = function(song) {
    this.songs.push(song)
  }

  window.onload = function() {
    _this.setSong()
  }
}

// SONG CONSTRUCTOR

function Song(artist, title, url) {
  this.artist = artist
  this.title = title
  this.url = url
}

// JUKEBOX OBJECT

var jukebox = new Jukebox()

// SONG OBJECTS
var song1 = new Song("Pizzicato Five", "Overture", "audio/01 Overture.mp3")
var song2 = new Song("Miguel", "Do You... (Cashmere Cat Remix)", "audio/Do You (Cashmere Cat Remix).mp3")
var song3 = new Song("Nujabes", "Feather", "audio/01 Feather.mp3")

// ADD SONGS TO JUKEBOX
jukebox.add(song1)
jukebox.add(song2)
jukebox.add(song3)

// POPULATE PLAYLIST ON LOAD
// window.onload = function() {

//   for (i = 0; i < jukebox.songs.length; i++) { 
//       console.log(this.songs[i].url);
//       document.getElementById("demo")
//   }
// }