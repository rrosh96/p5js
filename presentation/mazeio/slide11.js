let video;
let poseNet;
let poses = [];
let color1 = 0;
let color2 = 0;
let videoShowing = false;
let x = 0;
let slowdown = false;
let thickness = 10;


_slide11Setup = () => {
  createCanvas(window.innerWidth, window.innerHeight);
  video = createCapture(VIDEO);
  video.size(width, height);

  options = {
    imageScaleFactor: 0.3,
    outputStride: 16,
    flipHorizontal: false,
    minConfidence: 0.5,
    maxPoseDetections: 2,
    scoreThreshold: 0.5,
    nmsRadius: 10,
    detectionType: "single",
    multiplier: 0.5
  };

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, options, modelReady);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function(results) {
    poses = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();

  // button to hide the video
  button = createButton("Show Video");
  button.mousePressed(toggleVideo);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  // Patch the input to an volume analyzer
  analyzer.setInput(song);

  // no fill in the circles
  noFill();
};

// Remove "Loading..."
modelReady = () => {
  document.getElementById("status").setAttribute("style", "display:none;");
};

_slide11Draw = () => {
  // Get audio amplitude
  rms = analyzer.getLevel();

  // Change background color based on the audio amplitude
  bkg = map(rms, 0, 1, 255, 0);
  background(bkg, bkg, 255);

  // Display the video behind the sketch (if the button has been toggled)
  if (videoShowing) {
    image(video, 0, 0, width, height);
  }

  // Draw figure
  // Make the lines change color based on wrist position
  stroke(color1, 24, color2);
  drawKeypoints();

  // Slow down the speed of the song if no one is in the frame
  slowDown();
};

// A function to draw ellipses over the detected keypoints
drawKeypoints = () => {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only do the following if the pose probability is bigger than 0.2, in this case it slows down the music
      if (keypoint.score < 0.2) {
        slowdown = true;
        x = 0;
      } else {
        slowdown = false;
      }

      // Body keypoints
      let nose = poses[i].pose.keypoints[0];
      let leftEye = poses[i].pose.keypoints[1];
      let rightEye = poses[i].pose.keypoints[2];
      let leftEar = poses[i].pose.keypoints[3];
      let rightEar = poses[i].pose.keypoints[4];
      let leftShoulder = poses[i].pose.keypoints[5];
      let rightShoulder = poses[i].pose.keypoints[6];
      let leftElbow = poses[i].pose.keypoints[7];
      let rightElbow = poses[i].pose.keypoints[8];
      let leftWrist = poses[i].pose.keypoints[9];
      let rightWrist = poses[i].pose.keypoints[10];
      let leftHip = poses[i].pose.keypoints[11];
      let rightHip = poses[i].pose.keypoints[12];
      let leftKnee = poses[i].pose.keypoints[13];
      let rightKnee = poses[i].pose.keypoints[14];
      let leftAnkle = poses[i].pose.keypoints[15];
      let rightAnkle = poses[i].pose.keypoints[16];

      // Average point between the ears
      let earAvgX = (leftEar.position.x + rightEar.position.x) / 2;
      let earAvgY = (leftEar.position.y + rightEar.position.y) / 2;

      // Average point between the hips
      let hipAvgX = (leftHip.position.x + rightHip.position.x) / 2;
      let hipAvgY = (leftHip.position.y + rightHip.position.y) / 2;

      // shoulders
      line(
        leftShoulder.position.x + random(-thickness, thickness),
        leftShoulder.position.y + random(-thickness, thickness),
        rightShoulder.position.x + random(-thickness, thickness),
        rightShoulder.position.y + random(-thickness, thickness)
      );

      // left arm
      line(
        leftElbow.position.x + random(-thickness, thickness),
        leftElbow.position.y + random(-thickness, thickness),
        leftShoulder.position.x + random(-thickness, thickness),
        leftShoulder.position.y + random(-thickness, thickness)
      );

      //right arm
      line(
        rightElbow.position.x + random(-thickness, thickness),
        rightElbow.position.y + random(-thickness, thickness),
        rightShoulder.position.x + random(-thickness, thickness),
        rightShoulder.position.y + random(-thickness, thickness)
      );

      // left wrist
      line(
        leftWrist.position.x + random(-thickness, thickness),
        leftWrist.position.y + random(-thickness, thickness),
        leftElbow.position.x + random(-thickness, thickness),
        leftElbow.position.y + random(-thickness, thickness)
      );

      // right wrist
      line(
        rightWrist.position.x + random(-thickness, thickness),
        rightWrist.position.y + random(-thickness, thickness),
        rightElbow.position.x + random(-thickness, thickness),
        rightElbow.position.y + random(-thickness, thickness)
      );

      // head
      ellipse(
        earAvgX,
        earAvgY,
        rightEar.position.x - leftEar.position.x,
        rightEar.position.x - leftEar.position.x
      );
      // triangle(leftEar.position.x+random(-30, 30), leftEar.position.y+100, rightEar.position.x+random(-30, 30), rightEar.position.y+100, earAvgX+random(-30, 30), earAvgY-200);
      //eye

      fill(168, 200, 200, 100);
      ellipse(leftEye.position.x, leftEye.position.y, 30, 30);
      fill("#000");
      ellipse(leftEye.position.x, leftEye.position.y, 10, 10);
      fill(168, 200, 200, 100);
      ellipse(rightEye.position.x, rightEye.position.y, 30, 30);
      fill("#000");
      ellipse(rightEye.position.x, rightEye.position.y, 10, 10);
      // Nose
      fill("#000");
      ellipse(nose.position.x, nose.position.y, 20, 20);
      noFill();
      // body
      line(
        hipAvgX + random(-thickness, thickness),
        hipAvgY + random(-thickness, thickness),
        leftShoulder.position.x + random(-thickness, thickness),
        leftShoulder.position.y + random(-thickness, thickness)
      );
      line(
        hipAvgX + random(-thickness, thickness),
        hipAvgY + random(-thickness, thickness),
        rightShoulder.position.x + random(-thickness, thickness),
        rightShoulder.position.y + random(-thickness, thickness)
      );

      // knees
      line(
        hipAvgX + random(-thickness, thickness),
        hipAvgY + random(-thickness, thickness),
        leftKnee.position.x + random(-thickness, thickness),
        leftKnee.position.y + random(-thickness, thickness)
      );
      line(
        hipAvgX + random(-thickness, thickness),
        hipAvgY + random(-thickness, thickness),
        rightKnee.position.x + random(-thickness, thickness),
        rightKnee.position.y + random(-thickness, thickness)
      );

      // ankles
      line(
        leftAnkle.position.x + random(-thickness, thickness),
        leftAnkle.position.y + random(-thickness, thickness),
        leftKnee.position.x + random(-thickness, thickness),
        leftKnee.position.y + random(-thickness, thickness)
      );
      line(
        rightAnkle.position.x + random(-thickness, thickness),
        rightAnkle.position.y + random(-thickness, thickness),
        rightKnee.position.x + random(-thickness, thickness),
        rightKnee.position.y + random(-thickness, thickness)
      );

      // change stroke based on user's wrist position
      color1 = map(rightWrist.position.y, 0, height, 255, 0);
      color2 = map(leftWrist.position.y, 0, height, 255, 0);
    }
  }
};

// Slow down the music if no one is in the frame
slowDown = () => {
  song.rate(1 - x);
  if (slowdown && x < 1) {
    x += 0.01;
  } else if (slowdown && x >= 1) {
    x = 1;
  } else {
    x = 0;
  }
};

// Toggle video on and off using button
toggleVideo = () => {
  videoShowing = !videoShowing;
};

// Click to start playing music
mousePressed = () => {
  if (song.isPlaying()) {
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
};