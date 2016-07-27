// AUDIO ELEMENT VARIABLES

var audioElement = document.getElementsByTagName("audio")[0]
var videoElement = document.getElementsByTagName("video")[0]
var playBtn = document.getElementById("play")
var pauseBtn = document.getElementById("pause")
var playlist = document.getElementById("playlist");

// JUKEBOX CONSTRUCTOR

function Jukebox() {
  this.songs = []
  // this.shuffle = false
  var i = 0

  // Store 'this' in variable to pass to anon functions
  var _this = this

  this.setSong = function() {
    // updates src in audio tag
    audioElement.setAttribute("src", this.songs[i].url)
  }

  // this.skipTo = function(trackNum) {
  //   i = trackNum
  //   // updates src in audio tag
  //   this.setSong()
  //   this.play()
  // }

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

  this.shuffle = function() {
    i = Math.floor( Math.random() * (this.songs.length - 1) )
    // stops audio if at start of playlist
      this.setSong()
      this.play()
  }

  this.listSongs = function() {
      for (var i = 0; i < this.songs.length; i++) { 
        var trackNum = i + 1
        if (trackNum.toString().length < 2) {
          trackNum = "0" + trackNum.toString()
        }
        // Appends track to playlist div
        playlist.innerHTML = playlist.innerHTML + "<p id='song-" + i + "'>" + trackNum + ". " + this.songs[i].artist + " - " + this.songs[i].title + "</p>"
      }
  }

  window.onload = function() {
    _this.setSong()
    _this.listSongs()
  }

}

Jukebox.prototype.play = function() {
  audioElement.play()
  videoElement.play()

  // hides play/show pause button
  playBtn.style.display = "none"
  pauseBtn.style.display = "inline-block"

  // Auto advance to next song at end of song
  audioElement.addEventListener("ended", function() {
    _this.next()
    console.log("Auto advance to next song")
  })
}

Jukebox.prototype.pause = function() {
  audioElement.pause()
  videoElement.pause()

  // hides pause/show play button
  pauseBtn.style.display = "none"
  playBtn.style.display = "inline-block"
}

Jukebox.prototype.stop = function() {
  this.pause()
  audioElement.currentTime = 0
}

Jukebox.prototype.add = function() {
    for (var i = 0; i < arguments.length; i++) { 
      this.songs.push(arguments[i])    
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
var bearbot1 = new Song("Bearbot", "Easily, Busily", "audio/Evocation/01 Easily, Busily.mp3")
var bearbot2 = new Song("Bearbot", "Kick, Push, Drugs", "audio/Evocation/02 Kick, Push, Drugs.mp3")
var bearbot3 = new Song("Bearbot", "Intergalactic Inc.", "audio/Evocation/03 Intergalactic Inc..mp3")
var bearbot4 = new Song("Bearbot", "Black", "audio/Evocation/04 Black.mp3")
var bearbot5 = new Song("Bearbot", "Hustle & Destroy", "audio/Evocation/05 Hustle & Destroy.mp3")
var bearbot6 = new Song("Bearbot", "Bassman", "audio/Evocation/06 Bassman.mp3")
var bearbot7 = new Song("Bearbot", "Make Money", "audio/Evocation/07 Make Money.mp3")
var bearbot8 = new Song("Bearbot", "Nts Nts Nts (Part I)", "audio/Evocation/08 Nts Nts Nts (Part I).mp3")
var bearbot9 = new Song("Bearbot", "Nts Nts Nts (Part 2)", "audio/Evocation/09 Nts Nts Nts (Part 2).mp3")
var bearbot10 = new Song("Bearbot", "We Are the Creator", "audio/Evocation/10 We Are the Creator.mp3")

// ADD SONGS TO JUKEBOX
jukebox.add(bearbot1, bearbot2, bearbot3, bearbot4, bearbot5, bearbot6, bearbot7, bearbot8, bearbot9, bearbot10)


// BUTTONS CLICK EVENTS

// document.getElementById("stop").addEventListener("click", function() {
//   jukebox.stop()
//   console.log("Stop button")
// })

document.getElementById("previous").addEventListener("click", function() {
  jukebox.previous()
  console.log("Previous button")
})

document.getElementById("play").addEventListener("click", function() {
  jukebox.play()
  console.log("Play button")
})

document.getElementById("pause").addEventListener("click", function() {
  jukebox.pause()
  console.log("Pause button")
})

document.getElementById("next").addEventListener("click", function() {
  jukebox.next()
  console.log("Next button")
})

document.getElementById("shuffle").addEventListener("click", function() {
  jukebox.shuffle()
  console.log("Random button")
})
