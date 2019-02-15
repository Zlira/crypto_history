import React from 'react'
import greeksImgUrl from '../img/ancient_greeks_bold.png'
import hairImgUrl from '../img/ancient_greeks_hair.png'

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


export default class Canvas extends React.Component {
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
    const mouseX = e.clientX - bbox.x;
    const mouseY = e.clientY - bbox.y;
    this.paintOn = true;
    this.context.moveTo(mouseX, mouseY)
  }

  stopDrawing(e) {
    this.paintOn = false
  }

  continueDrawing(e) {
    if (this.paintOn) {
      const bbox = e.target.getBoundingClientRect()
      const mouseX = e.clientX - bbox.x;
      const mouseY = e.clientY - bbox.y;
      this.context.lineTo(mouseX, mouseY)
      this.context.closePath()
      this.context.stroke()
      this.context.moveTo(mouseX, mouseY)
    }
  }
  render() {
    return (
      <div className="staganography-widget"
        style={{position: "relative", width: this.width, height: this.height}}>
       <img style={{position: "absolute"}}
         width={this.width} height={this.height}
         src={greeksImgUrl}
         alt="два греки, яким можна стерти волосся, щоб побачити надписи «бунтуй» і «слухаюсь» на їхніх головах" />
       <img style={{position: "absolute", zIndex: -2}}
         src={hairImgUrl} ref={this.hairImgRef}
         width={this.width} height={this.height}
         onLoad={e=>this.loadCanvas()} alt=""/>
       <canvas
         style={{position: 'absolute'}}
         ref={this.canvasRef} width={this.width}
         height={this.height}
         onMouseDown={this.startDrawing}
         onMouseUp={this.stopDrawing}
         onMouseLeave={this.stopDrawing}
         onMouseMove={this.continueDrawing}
       />
    </div>
    )
  }
}