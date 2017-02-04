var song;
var sliderVolume;
var sliderRate;
var sliderPan;
var button;
var jumpButton;
var amp;

var volhistory = [];

//function preload(){	song = loadSound("Faded.mp3",loaded);}

function setup() {
  createCanvas(400, 400);
  song = loadSound("st.mp3", loaded);
  angleMode(DEGREES);
  sliderVolume = createSlider(0,1,0.5,0,01);
  sliderRate = createSlider(0,5,1,0.01);
  sliderPan = createSlider(-1,1,0,0.01);
  amp = new p5.Amplitude();
  loadJSON =('https://openexchangerates.org/api/latest.json?app_id=80eb8dfbbeda4922a623be944cc1de0c');
  
}

function jumpSong(){
	var len = song.duration();
	var timeJump = random(len);
	console.log(timeJump);
	song.jump(timeJump);  
}

function togglePlaying(){
	if(!song.isPlaying()){
		song.play();
		button.html("pause");
	}else{
		song.pause();
		button.html("play");
	}
	
}

function loaded(){
  song.setVolume(0.5);  
  button = createButton("play");
  button.mousePressed(togglePlaying);
  jumpButton = createButton("jump");
  jumpButton.mousePressed(jumpSong);

}

function draw() {
	background(255,100,50);
    //background(random(song.currentTime()*.2,song.currentTime()*2,song.currentTime()*.9));
    song.setVolume(sliderVolume.value());
    song.pan(sliderPan.value());
    song.rate(sliderRate.value());
    var vol = amp.getLevel();
    volhistory.push(vol);
    stroke(255);
    fill(110,85,160);
  
    translate(width / 2, height / 2);
    push();
    beginShape();
      for (var i = 0; i < 360; i++) {
      var r = map(volhistory[i], 0, 0.5, 0, 399);
	  var x = r * cos(i);
      var y = r * sin(i);
      vertex(x, y);
   }
    endShape();
    pop();

    if (volhistory.length > 360) {
      volhistory.splice(0, 1);
  }
  //var diam = map(vol, 0, 0.5,0,width);
  //push();
  //fill(102,255,255);
  //beginShape();
  //ellipse(width/2,height/2, diam, diam);
  //endShape();
  //pop();
  
}




