#Web Audio Metronome

A simple, bare bones javascript metronome that utilizes the [Web Audio API](http://webaudio.github.io/web-audio-api/).

Web Audio is essential in creating a true metronome that always stays on beat. It does this by accessing the hardware clock through the AudioContext object. This is recommended instead of using `setTimeout()`, where the stabilty and precision of the beat will vary during times of heavy rendering, garbage collection, and anything else in the main javascript thread.

##Setup

Include `metronome.js` in your page and place `tick.mp3` in the same directory.

##Usage

Initialization is as simple as:

```var metronome = new Metronome(120);```

This will create a metronome with a tempo of 120 beats per minute and will utilize `tick.mp3` as the tick sound.

Use your own tick sound with:

```var metronome = new Metronome(120, 'path_to_your_audio_file.mp3');```

Call `metronome.start()` to start and `metronome.stop()` to stop. Feel free to change the tempo while the metronome is running with `metronome.tempo = 180`.

Issues, forks, and pull requests are all welcome!


