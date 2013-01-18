var xPos = 20; // 起始横向位置(从左算起，单位象素) 
var yPos = document.body.clientHeight; // 起始纵向位置(从上起,此处设为页面本身高度) 
var step = 1;
var delay = 30; // 速度，值越大速度越慢 
var height = 0;
var Hoffset = 0;
var Woffset = 0;
var yon = 0;
var xon = 0;
var interval;
function changePos() {
  width = document.body.clientWidth; // 判断浏览器窗口的宽度 
  height = document.body.clientHeight; // 判断浏览器窗口的高度 
  Hoffset = document.getElementById('image-box').offsetHeight;
  Woffset = document.getElementById('image-box').offsetWidth;

  $("#image-box").css("left",xPos + document.body.scrollLeft);
  $("#image-box").css("top",yPos + document.body.scrollTop);

  if (yon) {
    yPos = yPos + step;
  }
  else {
    yPos = yPos - step;
  }
  if (yPos < 0) {
    yon = 1;
    yPos = 0;
  }
  if (yPos >= (height - Hoffset)) {
    yon = 0;
    yPos = (height - Hoffset);
  }
  if (xon) {
    xPos = xPos + step;
  }
  else {
    xPos = xPos - step;
  }
  if (xPos < 0) {
    xon = 1;
    xPos = 0;
  }
  if (xPos >= (width - Woffset)) {
    xon = 0;
    xPos = (width - Woffset);
  }
}
function start() {
  interval = setInterval('changePos()', delay);
}
function pause() {
  clearInterval(interval);
}

$("#image-box").css("top",yPos)
start();

$("#image-box").hover(function(){
  pause();
},function(){
  start();
})