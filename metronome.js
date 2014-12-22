// Web Audio Metronome v1.0
// By Joe Giancaspro

var Metronome = function(tempo, audioFile){
  this.isPlaying = false;
  this.tempo = tempo || 120;

  var audioFile = audioFile || 'tick.mp3';
  var tickBuffer = null;
  var audioContext = new AudioContext();
  var isAudioLoaded = false;
  var isLoadedTimerID = null;
  var nextTickTime = 0.0;
  var timerID = null;
  var context = this;

  var loadAudio = function(url) {   
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      audioContext.decodeAudioData(request.response, function(buffer) {
        tickBuffer = buffer;
        isAudioLoaded = true;
      });
    }
    request.send();
  };
  
  var scheduleTicks = function(){
    // every 25ms, schedule ticks for the next 100ms
    while (nextTickTime < audioContext.currentTime + 0.1){
      playTick(nextTickTime);
      nextTickTime += (60 / context.tempo);
    }
    timerID = window.setTimeout(scheduleTicks, 25);
  };

  var playTick = function(time){    
    var source = audioContext.createBufferSource();
    source.buffer = tickBuffer;
    source.connect(audioContext.destination);
    source.start(time);
  };

  this.start = function(){
    // check if audio is loaded, since it is done asynchronously
    if(!isAudioLoaded){
      isLoadedTimerID = window.setTimeout(context.start, 200);
    }
    else if (!context.isPlaying && isAudioLoaded){
      window.clearTimeout(isLoadedTimerID);
      context.isPlaying = true;
      nextTickTime = audioContext.currentTime;
      scheduleTicks();
    }
  };

  this.stop = function(){
    if (this.isPlaying){
      window.clearTimeout(timerID);
      this.isPlaying = false;
    }
  };

  loadAudio(audioFile);

}
