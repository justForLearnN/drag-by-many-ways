$(function () {
  var $target = $('#target');
  var startX = 0;
  var startY = 0;
  var currentX = 0;
  var currentY = 0;
  var distanceX = 0;
  var distanceY = 0;

  var targetSourceX = 0;
  var targetSourceY = 0;

  var isMobile = 'ontouchstart' in document;

  var $document = $(document);


  // 这里需要注意：jquery的事件对象与原生js事件对象的细微差异

  function movestart (e) {
    startX = isMobile ? e.originalEvent.changedTouches[0].pageX : e.pageX;
    startY = isMobile ? e.originalEvent.changedTouches[0].pageY : e.pageY;

    targetSourceX = $target.offset().left;
    targetSourceY = $target.offset().top;
    
    if (!isMobile) {
      $document.on('mousemove', moveunderway);
      $document.on('mouseup', moveend);
    }
  }

  function moveunderway (e) {
    var currentX = isMobile ? e.originalEvent.changedTouches[0].pageX : e.pageX;
    var currentY = isMobile ? e.originalEvent.changedTouches[0].pageY : e.pageY;
    var distanceX = currentX - startX;
    var distanceY = currentY - startY;
    var targetCurrentX = targetSourceX + distanceX;
    var targetCurrentY = targetSourceY + distanceY;
    $target.css({left: targetCurrentX, top: targetCurrentY})
  }

  function moveend (e) {
    if (!isMobile) {
      $document.off('mousemove', moveunderway);
      $document.off('mouseup', moveend);
    }
  }

  if (isMobile) {
    $target.on('touchstart', movestart).on('touchmove', moveunderway).on('touchend', moveend)
  } else {
    $target.on('mousedown', movestart);
  }
});