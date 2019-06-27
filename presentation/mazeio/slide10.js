var cnv,img;
var resdiv;
var options = [' ','`','.',',-',"':",';_~','"','*|','!l',
'+=','>','<L','\\i','/^','1?','Jv','r','()cx','7}','sz',
'3u','2Ckty{','jn','4FVY','5P[]af','qw','Sde','Eo',
'NOZ','9HXgh','GTU','$AIm','QW','KM','%8','#06@','bp',
'D','&','R',' '];
var gui,btn,livebtn;
var live = false;
var capture;
var pg;

function _slide10Setup() {
  //paragraph for display of ascii result
  resdiv = createP('');
  
  //video capture elements
  pg = createGraphics(window.innerWidth,window.innerHeight);
  capture = createCapture(VIDEO);
  capture.size(200, 100);
  capture.hide();
  
  //gui elements
  btn = createButton('UPDATE');
  btn.mousePressed(calcCapture);
  gui = createDiv('');
  btn.parent(gui);
  livebtn = createButton('LIVE');
  livebtn.mousePressed(function(){live=!live;});
  livebtn.parent(gui);
  
  cnv = createCanvas(800,600);
  background(0);

  img = loadImage('assets/ascii.jpeg', function(pic){
    calcImg(pic);
  });
}

function _slide10Draw() {
  image(capture, 0, 0, 800, 600);
  if (live) calcCapture();
    // calcImg();
}

function calcImg(pic) {
  var res = '<pre>';
  for (var i=0; i<60; i++) {
    var line = '';
    for (var j=0; j<140; j++) {
      var x = pic.get(2+round(j*5.714),5+i*10);
      var v = round((1-x[0]/255.0)*40);
      var index = floor(random(options[v].length));
      var chr = options[v][index];
      if (chr==' ') chr='&nbsp;';
      if (chr=='<') chr='&lt;';
      if (chr=='>') chr='&gt;';
      if (chr=='"') chr='&quot;';
      line += chr;
    }
    res += line+'<br>';
  }
  res += '</pre>'
  resdiv.html(res);
}

function calcCapture() {
  pg.image(capture,0,0,200,100);
  var res = '<pre>';
  for (var i=0; i<100; i++) { 
    var line = '';
    for (var j=0; j<200; j++) {
      var x = pg.get(round(j*1.143),i*2);
      var f = (1-x[0]/255.0);
      f = f*f; //square factor to lighten up, because less bright characters
      var v = round(f*40);
      var index = floor(random(options[v].length));
      var chr = options[v][index];
      if (chr==' ') chr='&nbsp;';
      if (chr=='<') chr='&lt;';
      if (chr=='>') chr='&gt;';
      if (chr=='"') chr='&quot;';
      line += chr;
    }

    res += line+'<br>';
  }
  res += '</pre>'
  resdiv.html(res);
}