import React from 'react'
import greeksImgUrl from '../img/ancient_greeks_bold.png'
import hairImgUrl from '../img/ancient_greeks_hair.png'


function redraw(context, clicks) {
  console.log(clicks)
  context.clearRect(0, 0, 800, 400)
  context.fillStyle = 'red'
  context.fillRect(10, 10, 780, 380)
  context.globalCompositeOperation = 'destination-out'

  context.strokeStyle = 'green'
  context.lineJoin = "round";
  context.lineWidth = 5;
  for ( let i=0; i<clicks.length; i++ ) {
    if (i && clicks[i].dragging) {
      context.moveTo(clicks[i-1].x, clicks[i-1].y)
    } else {
      context.moveTo(clicks[i].x - 1, clicks[i].y)
    }
    context.lineTo(clicks[i].x, clicks[i].y)
    context.closePath()
    context.stroke()
  }
  context.globalCompositeOperation = 'source-over'
}

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()

    this.clicks = []
    this.paintOn = false

    this.startDrawing = this.startDrawing.bind(this)
    this.stopDrawing = this.stopDrawing.bind(this)
    this.continueDrawing = this.continueDrawing.bind(this)
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    this.context = canvas.getContext('2d')
    const clicks = [
      {x: 50, y: 50},
      {x: 60, y: 60},
      {x: 70, y: 70}
    ]
    redraw(this.context, clicks)
  }

  startDrawing(e) {
    //debugger
    const bbox = e.target.getBoundingClientRect()
    const mouseX = e.clientX - bbox.x;
    const mouseY = e.clientY - bbox.y;
    this.paintOn = true;
    this.clicks.push({x: mouseX, y: mouseY})
    redraw(this.context, this.clicks);
  }

  stopDrawing(e) {
    this.paintOn = false
  }

  continueDrawing(e) {
    if (this.paintOn) {
      const bbox = e.target.getBoundingClientRect()
      const mouseX = e.clientX - bbox.x;
      const mouseY = e.clientY - bbox.y;
      this.clicks.push({x: mouseX, y: mouseY, dragging: true})
      redraw(this.context, this.clicks)
    }
  }
  render() {
    console.log('rendiring')
    return <div style={{position: "relative"}}>
       <img style={{position: "absolute", zIndex: "-1"}}
         src={greeksImgUrl} />
      <canvas ref={this.canvasRef} width="800px" height="400px"
        onMouseDown={this.startDrawing}
        onMouseUp={this.stopDrawing}
        onMouseLeave={this.stopDrawing}
        onMouseMove={this.continueDrawing}
      />
    </div>
  }
}