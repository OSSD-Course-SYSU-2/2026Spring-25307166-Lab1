import { GamePage } from '../model/GameTypes'
import { componentSnapshot } from '@kit.ArkUI'

@Component
export struct DrawingPage {
  @State paths: Path[] = []
  @State currentPath: Path | null = null
  @State isDrawing: boolean = false
  @State startTime: number = 0
  @State canCapture: boolean = false
  @Link currentPage: GamePage
  @Link avatarImage: string
  
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private canvasContext: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private lastX: number = 0
  private lastY: number = 0
  
  build() {
    Column() {
      Text('绘制您的身份符印')
        .fontSize(24)
        .fontColor(Color.White)
        .margin({ top: 40, bottom: 20 })
      
      Stack() {
        Canvas(this.canvasContext)
          .width('80%')
          .height('50%')
          .backgroundColor('#1a1a1a')
          .border({ width: 2, color: '#333333' })
          .onReady(() => {
            this.canvasContext.fillStyle = '#1a1a1a'
            this.canvasContext.fillRect(0, 0, 400, 400)
          })
          .onTouch((event: TouchEvent) => {
            this.handleTouch(event)
          })
      }
      .width('100%')
      .height('60%')
      .alignContent(Alignment.Center)
      
      if (this.canCapture) {
        Button('确认头像')
          .width('60%')
          .height(50)
          .backgroundColor('#4a90e2')
          .onClick(() => {
            this.captureAvatar()
          })
          .margin({ top: 20 })
      }
      
      Button('清空重画')
        .width('60%')
        .height(50)
        .backgroundColor('#666666')
        .onClick(() => {
          this.clearCanvas()
        })
        .margin({ top: 20 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor(Color.Black)
  }
  
  handleTouch(event: TouchEvent) {
    const touch = event.touches[0]
    
    if (!this.isDrawing) {
      this.isDrawing = true
      this.startTime = Date.now()
      this.startDrawingCountdown()
    }
    
    if (event.type === TouchType.Down) {
      this.lastX = touch.x
      this.lastY = touch.y
    } else if (event.type === TouchType.Move) {
      this.canvasContext.strokeStyle = '#FFFFFF'
      this.canvasContext.lineWidth = 3
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(this.lastX, this.lastY)
      this.canvasContext.lineTo(touch.x, touch.y)
      this.canvasContext.stroke()
      
      this.lastX = touch.x
      this.lastY = touch.y
    } else if (event.type === TouchType.Up) {
      this.isDrawing = false
    }
  }
  
  startDrawingCountdown() {
    setTimeout(() => {
      if (this.isDrawing || this.paths.length > 0) {
        this.canCapture = true
      }
    }, 2000)
  }
  
  clearCanvas() {
    this.canvasContext.fillStyle = '#1a1a1a'
    this.canvasContext.fillRect(0, 0, 400, 400)
    this.canCapture = false
    this.isDrawing = false
  }
  
  async captureAvatar() {
    try {
      this.currentPage = GamePage.NAME_INPUT
    } catch (error) {
      console.error('截图失败:', error)
      this.currentPage = GamePage.NAME_INPUT
    }
  }
}

class Path {
  points: Point[] = []
}

class Point {
  x: number = 0
  y: number = 0
}
