/**
 * 只关注从pc端chrome浏览器 到 移动端的兼容，不关注IE的兼容
 */

var oTarget = document.getElementById('target');
var startX = 0;          // x 坐标的初始值
var startY = 0;          // y 坐标的初始值
var currentX = 0;        // x 坐标的当前值
var currentY = 0;        // y 坐标的当前值
var distanceX = 0;       // x 坐标移动过程中产生的差值
var distanceY = 0;       // y 坐标移动过程中产生的差值

var targetSourceX = 0;   // 目标元素左上角的初始 x 坐标
var targetSourceY = 0;   // 目标元素左上角的初始 y 坐标

// 原理： 目标元素的移动，与鼠标的移动保持一致
// 因此： 目标元素当前的位置 = 目标元素初始的位置 +  x,y坐标移动过程中的差值
oTarget.addEventListener('mousedown', mousedown, false);

function mousedown (event) {
  // 学会通过打印出事件对象的方式，在浏览器的开发者工具中查看事件对象的具体值
  startX = event.pageX;
  startY = event.pageY;

  // 获取元素的详细位置信息
  var styles = document.defaultView.getComputedStyle(oTarget, false);
  targetSourceX = parseInt(styles.left);
  targetSourceY = parseInt(styles.top);

  // onmousemove 绑定的2个注意事项： 1，必须在onmousedown后绑定，否则会发现还没按下，就会移动的情况，2 mousemove必须绑定在document或者外部容器上，否则移动过快鼠标超出目标元素时，就停下不动了
  document.addEventListener('mousemove', mousemove, false);
  document.addEventListener('mouseup', mouseup, false);
}

function mousemove (event) {
  currentX = event.pageX;
  currentY = event.pageY;
  distanceX = currentX - startX;
  distanceY = currentY - startY;
  oTarget.style.left = targetSourceX + distanceX + 'px';
  oTarget.style.top = targetSourceY + distanceY + 'px';
}

function mouseup (event) {
  document.removeEventListener('mousemove', mousemove);
  document.removeEventListener('mouseup', mouseup);
}
