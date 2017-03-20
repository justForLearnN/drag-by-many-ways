;
(function () {
  var isMobile = 'ontouchstart' in document;
  var _moveunderway = null;
  var _moveend = null;

  // 声明构造函数
  function Drag (selector) {

    this.oTarget = null;
    if (typeof selector == 'object') {
      this.oTarget = selector;
    } else {
      this.oTarget = document.querySelector(selector);
    }

    this.startX = 0;
    this.startY = 0;
    this.targetSourceX = 0;
    this.targetSourceY = 0;

    if (isMobile) {
      this.oTarget.addEventListener('touchstart', this.movestart.bind(this), false);
      this.oTarget.addEventListener('touchmove', this.moveunderway.bind(this), false);
      this.oTarget.addEventListener('touchend', this.moveend.bind(this), false);
    } else {
      this.oTarget.addEventListener('mousedown', this.movestart.bind(this), false);
    }
  }

  // 添加原型方法
  Drag.prototype.movestart = function (event) {
    this.startX = isMobile ? event.changedTouches[0].pageX : event.pageX;
    this.startY = isMobile ? event.changedTouches[0].pageY : event.pageY;

    var styles = document.defaultView.getComputedStyle(this.oTarget, false);
    this.targetSourceX = parseInt(styles.left);
    this.targetSourceY = parseInt(styles.top);

    if (!isMobile) {
      _moveunderway = this.moveunderway.bind(this);
      _moveend = this.moveend.bind(this);
      document.addEventListener('mousemove', _moveunderway, false);
      document.addEventListener('mouseup', _moveend, false);
    }
  }

  Drag.prototype.moveunderway = function (event) {
    var currentX = isMobile ? event.changedTouches[0].pageX : event.pageX;
    var currentY = isMobile ? event.changedTouches[0].pageY : event.pageY;
    var distanceX = currentX - this.startX;
    var distanceY = currentY - this.startY;
    var targetCurrentX = this.targetSourceX + distanceX;
    var targetCurrentY = this.targetSourceY + distanceY;
    this.oTarget.style.left = targetCurrentX + 'px';
    this.oTarget.style.top = targetCurrentY + 'px';
  }

  Drag.prototype.moveend = function (event) {
    if (!isMobile) {
      document.removeEventListener('mousemove', _moveunderway);
      document.removeEventListener('mouseup', _moveend);
    }
  }

  window.Drag = Drag;
})();


(function ($) {
  $.fn.extend({
    becomeDrag: function () {
      new Drag(this[0]);
      return this;
    }
  })
})(jQuery);

$('#target').becomeDrag();


$.fn.extend({
    add: function(a, b) {
        return a + b;
    }
})

$(document.body).add(10, 20);
