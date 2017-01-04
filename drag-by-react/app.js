// 暂时先不管html5的拖拽事件
var Drag = React.createClass({
  getInitialState: function () {
    return {
      startX: 0,
      startY: 0,
      targetSourceX: 0,
      targetSourceY: 0,
      targetCurrentX: 0,
      targetCurrentY: 0,
      isMobile: 'ontouchstart' in document
    }
  },
  movestart: function (e) {
    var startX = this.state.isMobile ? e.nativeEvent.changedTouches[0].pageX : e.nativeEvent.pageX;
    var startY = this.state.isMobile ? e.nativeEvent.changedTouches[0].pageY : e.nativeEvent.pageY;
    this.setState({
      startX: startX,
      startY: startY
    })

    var _this = this;

    if (!this.state.isMobile) {
      var oTarget = this.refs.target;
      document.addEventListener('mousemove', mousemove, false);
      document.addEventListener('mouseup', mouseup, false);

      function mousemove (e) {
        var currentX = e.pageX;
        var currentY = e.pageY;
        var distanceX = currentX - _this.state.startX;
        var distanceY = currentY - _this.state.startY;

        var targetCurrentX = _this.state.targetSourceX + distanceX;
        var targetCurrentY = _this.state.targetSourceY + distanceY;
        _this.setState({
          targetCurrentX: targetCurrentX,
          targetCurrentY: targetCurrentY
        })
      }

      function mouseup (e) {
        _this.setState({
          targetSourceX: _this.state.targetCurrentX,
          targetSourceY: _this.state.targetCurrentY
        })
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
      }
    }
  },
  moveunderway: function (e) {
    var currentX = e.nativeEvent.changedTouches[0].pageX;
    var currentY = e.nativeEvent.changedTouches[0].pageY;
    var distanceX = currentX - this.state.startX;
    var distanceY = currentY - this.state.startY;
    var targetCurrentX = this.state.targetSourceX + distanceX;
    var targetCurrentY = this.state.targetSourceY + distanceY;
    this.setState({
      targetCurrentX: targetCurrentX,
      targetCurrentY: targetCurrentY
    })
  },
  moveend: function (e) {
    this.setState({
      targetSourceX: this.state.targetCurrentX,
      targetSourceY: this.state.targetCurrentY
    })
    if (!this.state.isMobile) {
      var oTarget = this.refs.target;
      oTarget.removeEventListener('mousemove', this.moveunderway.bind(this));
      oTarget.removeEventListener('mouseup', this.moveend.bind(this));
    }
  },
  render: function () {
    var targetStyle = {
      width: '100px',
      height: '100px',
      backgroundColor: 'orange',
      fontSize: '30px',
      color: '#ffffff',
      textAlign: 'center',
      lineHeight: '100px',
      position: 'relative',
      cursor: 'move',
      userSelect: 'none',
      left: `${this.state.targetCurrentX}px`,
      top: `${this.state.targetCurrentY}px`
    }
    return (
      <div className="target" ref="target"
        onMouseDown={this.movestart}
        onTouchStart={this.movestart}
        onTouchMove={this.moveunderway}
        onTouchEnd={this.moveend}
        style={targetStyle}>REACT</div>
    )
  }
})

ReactDOM.render(<Drag />, document.querySelector('#content'))