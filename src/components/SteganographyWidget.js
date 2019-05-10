import React from 'react'
import greeksImgUrl from '../img/ancient_greeks_bold.png'
import hairImgUrl from '../img/ancient_greeks_hair.png'
import './SteganographyWidget.css'

const IMG_SIZE = {
  width: 915,
  height: 338,
}


function redraw(context, img, width, height) {
  context.drawImage(img, 0, 0, width, height)
  context.globalCompositeOperation = 'destination-out'

  context.strokeStyle = 'green'
  context.lineJoin = "round";
  context.lineWidth = 12;
}


function getCoordinates(event) {
  let x, y
  if (event.touches) {
    x = event.touches[0].clientX
    y = event.touches[0].clientY
  } else {
    x = event.clientX
    y = event.clientY
  }
  return {x: x, y: y}
}


export default class SteganographyWidget extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.hairImgRef = React.createRef()

    this.paintOn = false
    this.width = this.props.width
    this.height = this.width / IMG_SIZE.width * IMG_SIZE.height

    this.startDrawing = this.startDrawing.bind(this)
    this.stopDrawing = this.stopDrawing.bind(this)
    this.continueDrawing = this.continueDrawing.bind(this)
    this.loadCanvas = this.loadCanvas.bind(this)
  }

  loadCanvas() {
    const canvas = this.canvasRef.current
    this.context = canvas.getContext('2d')
    redraw(
      this.context, this.hairImgRef.current, this.width, this.height
    )
  }

  startDrawing(e) {
    const bbox = e.target.getBoundingClientRect()
    const coords = getCoordinates(e)
    const mouseX = coords.x - bbox.x
    const mouseY = coords.y - bbox.y

    this.paintOn = true;
    this.context.moveTo(mouseX, mouseY)
  }

  stopDrawing(e) {
    this.paintOn = false
  }

  continueDrawing(e) {
    if (this.paintOn) {
      const bbox = e.target.getBoundingClientRect()
      const coords = getCoordinates(e)
      const mouseX = coords.x - bbox.x
      const mouseY = coords.y - bbox.y
      this.context.lineTo(mouseX, mouseY)
      this.context.closePath()
      this.context.stroke()
      this.context.moveTo(mouseX, mouseY)
    }
  }
  render() {
    return (
      <div className="staganography-widget"
        style={{width: this.width, height: this.height}}>
       <img
         className="steganography-widget__background-img"
         width={this.width} height={this.height}
         src={greeksImgUrl}
         alt="два греки, яким можна стерти волосся, щоб побачити надписи «бунтуй» і «слухаюсь» на їхніх головах" />
       <img
         className="steganography-widget__hidden_img"
         src={hairImgUrl} ref={this.hairImgRef}
         width={this.width} height={this.height}
         onLoad={e=>this.loadCanvas()} alt=""/>
       <canvas
         className="steganography-widget__canvas"
         ref={this.canvasRef} width={this.width}
         height={this.height}
         onMouseDown={this.startDrawing}
         onTouchStart={this.startDrawing}
         onMouseUp={this.stopDrawing}
         onTouchEnd={this.stopDrawing}
         onMouseLeave={this.stopDrawing}
         onMouseMove={this.continueDrawing}
         onTouchMove={this.continueDrawing}
       />
    </div>
    )
  }
}