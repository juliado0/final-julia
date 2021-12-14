var mouseIconNumber = 1;
var mouse_normal;
var targetX;
var gameText = "";
var sceneObjs = [];
var items = [];
var menuBtns = [];
var player;
var playerFeet;
var ground;
var vidNumber = -2;
var img_pic;

let video = []
let bgm
let isPlayEnd = false
let back
let next
let replay

function Button(X, Y, W, H, isBackground, TEXT) {
  this.x = X;
  this.y = Y;
  this.w = W;
  this.h = H;
  this.hasBackground = isBackground;
  this.btnText = TEXT || "";
}

Button.prototype.display = function () {
  if (this.hasBackground) {
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 5);
  }
  text(this.btnText, this.x, this.y + 5);
}

Button.prototype.isMouseIn = function () {
  if (mouseX >= this.x - this.w / 2 && mouseX <= this.x + this.w / 2 &&
    mouseY >= this.y - this.h / 2 && mouseY <= this.y + this.h / 2) {
    return true;
  } else {
    return false;
  }
}

function preload() {
  mouse_normal = loadImage("img/Cursor/Mouse-Normal.png");
  img_pic = loadImage("img/pic.png");
  video[0] = createVideo('video/1.MOV')
  video[1] = createVideo('video/2.MOV')
  video[2] = createVideo('video/3.MOV')
  video[3] = createVideo('video/4.MOV')
  video[4] = createVideo('video/5-1.MOV')
  video[5] = createVideo('video/5-2.MOV')
  bgm = loadSound('video/bgm.mp3')
}

function setup() {
  noCursor();
  createCanvas(800, 800);

  //Menu
  menuBtns.push(new Button(width / 2, height / 2 + 100, 200, 80, false, "START"));

  textAlign(CENTER);
  textSize(100);
  fill(0, 204, 0);
  ground = createSprite(width / 2, height, width, height / 3 * 2);
  player = createSprite(275, height / 3 * 2 - 50, 50, 80);
  targetX = player.position.x;
  video.forEach(item => {
    item.size(800, 400)
    item.hide()
    // item.attribute('controls', true)
  })
  back = new Button(30, height - 100, 200, 80, false, "Back")
  next = new Button(800 - 30, height - 100, 200, 80, false, "Next")
  replay = new Button(width / 2, height / 2, 200, 80, false, "Replay")
}

function draw() {
  //内容
  if (vidNumber == -3) {
    background(0);
    textFont("Futura");
    textAlign(CENTER);
    textSize(30);

  } else if (vidNumber == -2) {

    background(0);

    textFont("Futura");
    textAlign(CENTER);
    textSize(70);
    text("alternative future", width / 2, height / 2 - 100);
    textSize(20);
    text("julia gong", width / 2, height - 100);
    textSize(70);
    imageMode(CENTER);
    //image(img_pic, width / 2, height / 2 - 30);
    ground.visible = false;
    player.visible = false;

    //
    if (menuBtns.length != null && menuBtns.length > 0) {
      for (var btni = 0; btni < menuBtns.length; btni++) {
        menuBtns[btni].display();
      }
    }

  } else if (vidNumber == -1) {
    background(0);
    textFont("Futura");
    textAlign(CENTER);
    textSize(30);
    text("introduction\ndescription\n~~~~~~\n\n\nClick", width / 2, height / 2 - 100);
  } else if (vidNumber == 0) {
    background(0);
    textFont("Futura");
    textAlign(CENTER);
    textSize(30);
    text("background\ndescription\n~~~~~~~\n\n\nClick", width / 2, height / 2 - 100);

  } else if (vidNumber > 0) {
    background(0);
    textSize(20)
    if (vidNumber < 5) {
      next.display()
    }
    if (!isPlayEnd) {
      back.display()
    } else {
      replay.display()
    }
    // console.log(video[vidNumber].elt.ended)
  }
  
  //鼠标跟随
  var mouseFlag = false;
  if (mouseY >= height / 3 * 2 - 20 && mouseY <= height / 3 * 2 + 50) {
    mouseIconNumber = 1;
  } else {
    for (var objsi = 0; objsi < sceneObjs.length; objsi++) {
      if (sceneObjs[objsi].roomNumber == vidNumber) {
        mouseIconNumber = 1;
        mouseFlag = true;
      }
    }
  }
  if (mouseFlag) {
    mouseIconNumber = 2;
  } else {
    mouseIconNumber = 1;
  }

  imageMode(CENTER);
  //  if (mouseIconNumber == 1) {
  image(mouse_normal, mouseX, mouseY);
  //  } else if (mouseIconNumber == 2) {

  if (vidNumber <= 0) {
    square0423(mouseX, mouseY, 300, 20);
  } else {
    if (isPlayEnd) {
      square0423(mouseX, mouseY, 300, 20);
    }
  }

}

function mouseClicked() {
  //继续
  // if (vidNumber <= 0) {
  //   if (menuBtns.length > 0) {
  //     for (var i2 = 0; i2 < menuBtns.length; i2++) {
  //       if (menuBtns[i2].isMouseIn()) {
  //         console.log(vidNumber)
  //         if (vidNumber >= -2) {
  //           vidNumber += 1;
  //         } else if (vidNumber >= -3) {
  //         }
  //       }
  //     }
  //   }
  // }
  if (menuBtns.length > 0) {
    for (var i2 = 0; i2 < menuBtns.length; i2++) {
      if (menuBtns[i2].isMouseIn()) {
        if (vidNumber == -2) {
          bgm.loop()
        }
        if (vidNumber >= -2) {
          vidNumber += 1;
        } else if (vidNumber >= -3) {
        }
        if (vidNumber > 0) {
          play(vidNumber)
        }
      }
    }
  }
  if (back.isMouseIn()) {
    if (vidNumber >= 0) {
      pause(vidNumber - 1)
    }
    if (vidNumber >= 1) {
      play(vidNumber - 1)
    }
    vidNumber--
    // video[vidNumber].pause()
    // video[vidNumber].style('zIndex', 0)
    // video[vidNumber].hide()
  }
  if (next.isMouseIn()) {
    video[vidNumber - 1].pause()
    video[vidNumber - 1].style('zIndex', 0)
    video[vidNumber - 1].hide()
    vidNumber++
    if (vidNumber == 5) {
      let nub = Math.floor(random(0, 2))
      play(vidNumber + nub, true)
    } else {
      play(vidNumber)
    }
  }
  if (replay.isMouseIn()) {
    vidNumber = 0
    isPlayEnd = false
  }
}

function play($index, isEnd) {
  video.forEach((item, index) => {
    if (index == $index - 1) {
      item.style('zIndex', 10)
      item.show()
      if (isEnd) {
        item._onended = function() {
          isPlayEnd = true
          item.hide()
          pause(index)
        }
        item.play()
      } else {
        item.loop()
      }
    } else {
      pause(index)
    }
  })
}
function pause(index) {
  video[index].pause()
  video[index].style('zIndex', 0)
  video[index].hide()
}

function square0423(cx, cy, radius, pieces) {
  var c = map(radius, 0, 300, 100, 255);
  var d = map(radius, 0, 300, 1, 3);
  var f = map(radius, 0, 300, 10, 255);
  for (var i = 0; i < pieces; i++) {
    var x = cos(i / pieces * TWO_PI) * radius + cx;
    var y = sin(i / pieces * TWO_PI) * radius + cy;
    stroke(random(255), random(255), random(255));
    strokeWeight(d);
    fill(random(50, 50));
    noFill();
    translate(x, y);
    ellipse(x, y, radius * radius / 100, radius * radius / 100);
    rotate(200 / radius * frameCount / 300 + x + y);
    rectMode(CENTER);
    rect(0, 0, radius * radius / 20, radius * radius / 20);
  }
}