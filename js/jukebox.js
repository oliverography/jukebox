// ============================================================
// ELEMENT VARIABLES
// ============================================================

var audioElement = document.getElementsByTagName("audio")[0];
var videoElement = document.getElementsByTagName("video")[0];
var playBtn = document.getElementById("play");
var pauseBtn = document.getElementById("pause");
var playlist = document.getElementById("playlist");
var bg = document.getElementById("overlay");

// ============================================================
// JUKEBOX CONSTRUCTOR
// ============================================================

function Jukebox() {
  this.songs = []; // playlist
  this.i = 0; // playlist index
  this.bg = 0; // bg color index
}

// ============================================================
// JUKEBOX METHODS
// ============================================================

Jukebox.prototype.initialize = function() {
  // set first song in audio element and lists songs in playlist div
  this.setSong();
  this.listSongs();
}

Jukebox.prototype.setSong = function() {
  // updates src in audio element
  audioElement.setAttribute("src", this.songs[this.i].url);
}

Jukebox.prototype.play = function() {
  audioElement.play();
  videoElement.play();

  // swaps play/pause button
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";

  // start background color changing
  this.colorInterval = setInterval(this.colorChange, 18000);
}

Jukebox.prototype.pause = function() {
  audioElement.pause();
  videoElement.pause();

  // swaps play/pause button
  pauseBtn.style.display = "none";
  playBtn.style.display = "inline-block";

  // stop background color changing
  clearInterval(this.colorInterval);
}

Jukebox.prototype.stop = function() {
  this.pause();
  audioElement.currentTime = 0;
}

Jukebox.prototype.next = function() {
  this.i++;
  // stops audio if at end of playlist
  if (this.i == this.songs.length) {
    this.i--;
    this.stop();
  } else {
    this.setSong();
    this.play();
  }
}

Jukebox.prototype.previous = function() {
  this.i--;
  // stops audio if at start of playlist
  if (this.i < 0) {
    this.i++;
    this.stop();
  } else {
    this.setSong();
    this.play();
  }
}

Jukebox.prototype.shuffle = function() {
  this.i = Math.floor(Math.random() * this.songs.length);
  this.setSong();
  this.play();
}

Jukebox.prototype.skipTo = function(trackIdx) {
  this.i = trackIdx;
  this.setSong();
  this.play();
}

Jukebox.prototype.loadSongs = function() {
  for (var i = 0; i < arguments.length; i++) { 
    this.songs.push(arguments[i]);
  }
}

Jukebox.prototype.listSongs = function() {
  for (var i = 0; i < this.songs.length; i++) { 
    var trackNum = i + 1;
    if (trackNum.toString().length < 2) {
      trackNum = "0" + trackNum.toString();
    }
    // appends track to playlist div
    playlist.innerHTML =  playlist.innerHTML + 
                          "<a id='song-" + i + "'>" +
                          trackNum +
                          ". " + 
                          this.songs[i].artist + 
                          " - " + 
                          this.songs[i].title + 
                          "</a>";
  }

  // Store 'this' in variable to use in anonymous function
  var _this = this;
  // Event listeners on playlist (TO DO: CONVERT TO FOR LOOP)
  document.getElementById("song-0").addEventListener("click", function() {
    _this.skipTo(0);
  })
  document.getElementById("song-1").addEventListener("click", function() {
    _this.skipTo(1);
  })
  document.getElementById("song-2").addEventListener("click", function() {
    _this.skipTo(2);
  })
  document.getElementById("song-3").addEventListener("click", function() {
    _this.skipTo(3);
  })
  document.getElementById("song-4").addEventListener("click", function() {
    _this.skipTo(4);
  })
  document.getElementById("song-5").addEventListener("click", function() {
    _this.skipTo(5);
  })
  document.getElementById("song-6").addEventListener("click", function() {
    _this.skipTo(6);
  })
  document.getElementById("song-7").addEventListener("click", function() {
    _this.skipTo(7);
  })
  document.getElementById("song-8").addEventListener("click", function() {
    _this.skipTo(8);
  })
  document.getElementById("song-9").addEventListener("click", function() {
    _this.skipTo(9);
  })
}

// background color changing
Jukebox.prototype.colorChange = function() {
  var colors = ["rgba(128, 0, 255, 0.7)", "rgba(0, 128, 255, 0.7)", "rgba(128, 255, 0, 0.7)", "rgba(0, 255, 128, 0.7)", "rgba(255, 0, 128, 0.6)", "rgba(255, 128, 0, 0.6)"];
  var randomIdx = Math.floor(Math.random() * colors.length);
  bg.style.backgroundColor = colors[randomIdx];
}

// ============================================================
// SONG CONSTRUCTOR
// ============================================================

function Song(artist, title, url) {
  this.artist = artist;
  this.title = title;
  this.url = url;
}

// ============================================================
// JUKEBOX OBJECT INSTANCE
// ============================================================

var jukebox = new Jukebox();

// ============================================================
// SONG OBJECT INSTANCES
// ============================================================

var bearbot1 = new Song("Bearbot", "Easily, Busily", "audio/Evocation/01 Easily, Busily.mp3");
var bearbot2 = new Song("Bearbot", "Kick, Push, Drugs", "audio/Evocation/02 Kick, Push, Drugs.mp3");
var bearbot3 = new Song("Bearbot", "Intergalactic Inc.", "audio/Evocation/03 Intergalactic Inc..mp3");
var bearbot4 = new Song("Bearbot", "Black", "audio/Evocation/04 Black.mp3");
var bearbot5 = new Song("Bearbot", "Hustle & Destroy", "audio/Evocation/05 Hustle & Destroy.mp3");
var bearbot6 = new Song("Bearbot", "Bassman", "audio/Evocation/06 Bassman.mp3");
var bearbot7 = new Song("Bearbot", "Make Money", "audio/Evocation/07 Make Money.mp3");
var bearbot8 = new Song("Bearbot", "Nts Nts Nts (Part I)", "audio/Evocation/08 Nts Nts Nts (Part I).mp3");
var bearbot9 = new Song("Bearbot", "Nts Nts Nts (Part 2)", "audio/Evocation/09 Nts Nts Nts (Part 2).mp3");
var bearbot10 = new Song("Bearbot", "We Are the Creator", "audio/Evocation/10 We Are the Creator.mp3");

// short song for testing
var song1 = new Song("Pizzicato Five", "Overture", "audio/01 Overture.mp3");

// ============================================================
// LOAD SONGS INTO JUKEBOX
// ============================================================

jukebox.loadSongs(bearbot1, bearbot2, bearbot3, bearbot4, bearbot5, bearbot6, bearbot7, bearbot8, bearbot9, bearbot10);

// ============================================================
// EVENTS
// ============================================================

// initialize jukebox on page load
window.onload = function() {
  jukebox.initialize();
}

// button controls
document.getElementById("play").addEventListener("click", function() {
  jukebox.play();
})

document.getElementById("pause").addEventListener("click", function() {
  jukebox.pause();
})

document.getElementById("next").addEventListener("click", function() {
  jukebox.next();
})

document.getElementById("previous").addEventListener("click", function() {
  jukebox.previous();
})

document.getElementById("shuffle").addEventListener("click", function() {
  jukebox.shuffle();
})

// auto advance to next song at end of song
audioElement.addEventListener("ended", function() {
  jukebox.next();
})