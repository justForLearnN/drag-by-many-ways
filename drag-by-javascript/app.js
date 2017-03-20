var oElem = document.getElementById('target');

var startX = 0;
var startY = 0;

var sourceX = 0;
var sourceY = 0;

oElem.addEventListener('mousedown', start, false);

function start(event) {
    startX = event.pageX;
    startY = event.pageY;

    var pos = getTargetPos(oElem);

    sourceX = pos.x;
    sourceY = pos.y;

    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', end, false);
}

function move(event) {
    var currentX = event.pageX;
    var currentY = event.pageY;

    var distanceX = currentX - startX;
    var distanceY = currentY - startY;

    setTargetPos(oElem, {
        x: (sourceX + distanceX).toFixed(),
        y: (sourceY + distanceY).toFixed()
    })
}

function end(event) {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
    // do other things
}


function getStyle(elem, property) {
    // 低版本ie通过currentStyle来获取元素的样式，其他浏览器通过getComputedStyle来获取
    return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem, false)[property] : elem.currentStyle[property];
}

function getTransform() {
    var transform = '',
        divStyle = document.createElement('div').style,
        transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],

        i = 0,
        len = transformArr.length;

    for(; i < len; i++)  {
        if(transformArr[i] in divStyle) {
            return transform = transformArr[i];
        }
    }

    return transform;
}


function getTargetPos(elem) {
    var pos = {x: 0, y: 0};
    var transform = getTransform();
    // transform = false;
    if(transform) {
        var transformValue = getStyle(elem, transform);
        if(transformValue == 'none') {
            elem.style[transform] = 'translate(0, 0)';
            return pos;
        } else {
            var temp = transformValue.match(/[0-9,\s\.]+/)[0].split(',');
            return pos = {
                x: parseInt(temp[4].trim()),
                y: parseInt(temp[5].trim())
            }
        }
    } else {
        if(getStyle(elem, 'position') == 'static') {
            elem.style.position = 'relative';
            return pos;
        } else {
            var x = parseInt(getStyle(elem, 'left') ? getStyle(elem, 'left') : 0);
            var y = parseInt(getStyle(elem, 'top') ? getStyle(elem, 'top') : 0);
            return pos = {
                x: x,
                y: y
            }
        }
    }
}

// pos = { x: 200, y: 100 }
function setTargetPos(elem, pos) {
    var transform = getTransform();
    if(transform) {
        elem.style[transform] = 'translate('+ pos.x +'px, '+ pos.y +'px)';
    } else {
        elem.style.left = pos.x + 'px';
        elem.style.top = pos.y + 'px';
    }
    return elem;
}
