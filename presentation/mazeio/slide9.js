let song;
let analyzer;
let rms;
let volhistory = [];

_slide9Setup = () => {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  // Patch the input to an volume analyzer
  analyzer.setInput(song);
};
_slide9Draw= () => {
  // Get audio amplitude
  rms = analyzer.getLevel();

  // Change background color based on the audio amplitude
  bkg = map(rms, 0, 1, 0, 255);
  background(bkg * 3, bkg / 2, bkg);

  // Draw radial amplitude of the music
  var vol = analyzer.getLevel();
  volhistory.push(vol);
  stroke("#ccc");
  noFill();

  translate(width / 2, height / 2);
  beginShape();
  for (var i = 0; i < 360; i++) {
    var r = map(volhistory[i], 0, 5, 100, 3000);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }
};

// Click to start playing music
mousePressed = () => {
  if (slideCount === 8) {
    
    if (song.isPlaying()) {
      song.stop();
      background(255, 0, 0);
    } else {
      song.play();
      background(0, 255, 0);
    }
  }
};
