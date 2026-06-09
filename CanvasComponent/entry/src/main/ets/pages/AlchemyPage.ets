import { GamePage } from '../model/GameTypes'
import { GameManager } from '../model/GameManager'
import { AllMaterials, MaterialData, getMaterialsByColor } from '../model/Material'
import { MaterialColorType, MaterialColors, ColorRGB } from '../model/GameTypes'
import { ScreenAdapter, DeviceType } from '../common/utils/ScreenAdapter'
import { MaterialPatternDrawer } from '../common/utils/MaterialPatternDrawer'

interface HSL {
  h: number
  s: number
  l: number
}

interface RGB {
  r: number
  g: number
  b: number
}

@Component
export struct AlchemyPage {
  @Link currentPage: GamePage
  @State selectedMaterials: Map<string, number> = new Map()
  @State currentColor: ColorRGB = { r: 80, g: 80, b: 120 }
  @State totalAmount: number = 0
  @State showMaterialSelector: boolean = false
  @State isProcessing: boolean = false
  @State colorIntensity: number = 0
  
  private gameManager: GameManager = GameManager.getInstance()
  private screenAdapter: ScreenAdapter = ScreenAdapter.getInstance()
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private canvasContext: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private materialCanvasContext: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private bubbleInterval: number = -1
  
  aboutToAppear() {
    this.startBubbles()
  }
  
  aboutToDisappear() {
    if (this.bubbleInterval !== -1) {
      clearInterval(this.bubbleInterval)
    }
  }
  
  startBubbles() {
    this.bubbleInterval = setInterval(() => {
      this.drawCauldron()
    }, 100)
  }
  
  drawCauldron() {
    const ctx = this.canvasContext
    const canvasSize = this.screenAdapter.scaleValue(320)
    ctx.clearRect(0, 0, canvasSize, canvasSize)
    
    const centerX = canvasSize / 2
    const cauldronY = canvasSize * 0.72
    const radius = canvasSize * 0.38
    
    this.drawMagicCircle(ctx, centerX, cauldronY, radius)
    
    ctx.fillStyle = '#333333'
    ctx.beginPath()
    ctx.ellipse(centerX, cauldronY, radius * 0.83, radius * 0.28, 0, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = '#222222'
    ctx.beginPath()
    ctx.moveTo(centerX - radius, cauldronY)
    ctx.quadraticCurveTo(centerX - radius, cauldronY - radius * 1.2, centerX, cauldronY - radius * 1.5)
    ctx.quadraticCurveTo(centerX + radius, cauldronY - radius * 1.2, centerX + radius, cauldronY)
    ctx.lineTo(centerX + radius, cauldronY + radius * 0.1)
    ctx.quadraticCurveTo(centerX, cauldronY + radius * 0.2, centerX - radius, cauldronY + radius * 0.1)
    ctx.closePath()
    ctx.fill()
    
    const r = Math.max(10, Math.min(255, this.currentColor.r))
    const g = Math.max(10, Math.min(255, this.currentColor.g))
    const b = Math.max(10, Math.min(255, this.currentColor.b))
    
    const gradient = ctx.createRadialGradient(centerX, cauldronY - radius * 0.5, 0, centerX, cauldronY - radius * 0.5, radius)
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`)
    gradient.addColorStop(0.5, `rgba(${Math.floor(r * 0.8)}, ${Math.floor(g * 0.8)}, ${Math.floor(b * 0.8)}, 0.85)`)
    gradient.addColorStop(1, `rgba(${Math.floor(r * 0.4)}, ${Math.floor(g * 0.4)}, ${Math.floor(b * 0.4)}, 0.95)`)
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(centerX - radius * 0.9, cauldronY - radius * 0.1)
    ctx.quadraticCurveTo(centerX - radius * 0.9, cauldronY - radius * 1.2, centerX, cauldronY - radius * 1.4)
    ctx.quadraticCurveTo(centerX + radius * 0.9, cauldronY - radius * 1.2, centerX + radius * 0.9, cauldronY - radius * 0.1)
    ctx.lineTo(centerX + radius * 0.9, cauldronY)
    ctx.quadraticCurveTo(centerX, cauldronY + radius * 0.1, centerX - radius * 0.9, cauldronY)
    ctx.closePath()
    ctx.fill()
    
    this.drawSwirlEffect(ctx, centerX, cauldronY - radius * 0.5, r, g, b)
    
    const time = Date.now()
    const bubbleCount = this.totalAmount > 0 ? Math.min(15, 5 + Math.floor(this.totalAmount / 10)) : 8
    
    for (let i = 0; i < bubbleCount; i++) {
      const x = centerX - radius * 0.5 + Math.random() * radius
      const y = cauldronY - radius * 0.8 + Math.random() * radius * 0.6
      const size = this.screenAdapter.scaleValue(3 + Math.random() * 8 + (this.colorIntensity / 20))
      const opacity = 0.2 + Math.sin(time / 500 + i) * 0.4
      
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`
      ctx.beginPath()
      ctx.arc(x, y - (time / 50 % 100), size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    if (this.totalAmount > 0) {
      this.drawGlowEffect(ctx, centerX, cauldronY - radius * 0.5, r, g, b)
    }
  }
  
  drawSwirlEffect(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, g: number, b: number) {
    const time = Date.now() / 1000
    ctx.save()
    
    for (let i = 0; i < 3; i++) {
      const radius = 40 + i * 25
      const alpha = 0.15 - i * 0.03
      
      ctx.strokeStyle = `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, ${alpha})`
      ctx.lineWidth = 2
      ctx.beginPath()
      
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const swirl = Math.sin(angle * 3 + time + i) * 10
        const px = x + Math.cos(angle) * (radius + swirl)
        const py = y + Math.sin(angle) * (radius + swirl) * 0.6
        
        if (angle === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }
    
    ctx.restore()
  }
  
  drawGlowEffect(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, g: number, b: number) {
    const glowRadius = 60 + this.colorIntensity / 2
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius)
    
    const alpha = Math.min(0.3, this.colorIntensity / 300)
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`)
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
    ctx.fill()
  }
  
  drawMagicCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)'
    ctx.lineWidth = 1
    
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.arc(x, y, radius * 0.85, 0, Math.PI * 2)
    ctx.stroke()
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI / 3) - Math.PI / 2
      const x1 = x + Math.cos(angle) * radius * 0.3
      const y1 = y + Math.sin(angle) * radius * 0.3
      const x2 = x + Math.cos(angle) * radius * 0.95
      const y2 = y + Math.sin(angle) * radius * 0.95
      
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI / 3) - Math.PI / 2
      const px = x + Math.cos(angle) * radius * 0.6
      const py = y + Math.sin(angle) * radius * 0.6
      
      ctx.beginPath()
      ctx.arc(px, py, radius * 0.08, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
  
  build() {
    Column() {
      Row() {
        Button('返回')
          .fontSize(this.screenAdapter.scaleFont(14))
          .onClick(() => {
            this.currentPage = GamePage.MAIN
          })
        
        Text('⚗ 炼金工坊 ⚗')
          .fontSize(this.screenAdapter.scaleFont(20))
          .fontColor(Color.White)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
        
        Column() {
          Text(`${this.totalAmount}/100`)
            .fontSize(this.screenAdapter.scaleFont(16))
            .fontColor('#FFD700')
          Text('☽ ☾')
            .fontSize(this.screenAdapter.scaleFont(10))
            .fontColor('rgba(255, 215, 0, 0.4)')
        }
      }
      .width('100%')
      .padding({ left: 15, right: 15, top: 10, bottom: 10 })
      .margin({ top: 20 })
      
      Stack() {
        Canvas(this.canvasContext)
          .width(this.screenAdapter.scaleValue(320))
          .height(this.screenAdapter.scaleValue(320))
          .onReady(() => {
            this.drawCauldron()
          })
        
        Column() {
          Text('✧ ⚝ ✦ ⬡ ◈')
            .fontSize(this.screenAdapter.scaleFont(10))
            .fontColor('rgba(255, 215, 0, 0.3)')
        }
        .position({ x: '35%', y: 10 })
      }
      .width('100%')
      .height(this.screenAdapter.scaleValue(340))
      .alignContent(Alignment.Center)
      
      Column() {
        Text('已添加材料:')
          .fontSize(this.screenAdapter.scaleFont(14))
          .fontColor(Color.White)
          .margin({ bottom: 8 })
        
        if (this.selectedMaterials.size > 0) {
          Column() {
            ForEach(Array.from(this.selectedMaterials.entries()), (entry: [string, number]) => {
              Row() {
                Text(this.getMaterialName(entry[0]))
                  .fontSize(this.screenAdapter.scaleFont(12))
                  .fontColor('#aaaaaa')
                Text(` x${entry[1]}`)
                  .fontSize(this.screenAdapter.scaleFont(12))
                  .fontColor('#FFD700')
              }
              .width('100%')
              .justifyContent(FlexAlign.SpaceBetween)
              .padding({ left: 15, right: 15 })
            })
          }
          .width('100%')
          .constraintSize({ maxHeight: 80 })
        }
      }
      .width('100%')
      .padding({ left: 15, right: 15 })
      .margin({ top: 15 })
      
      Row() {
        Button('添加材料')
          .fontSize(this.screenAdapter.scaleFont(14))
          .backgroundColor('#4CAF50')
          .onClick(() => {
            this.showMaterialSelector = true
          })
        
        Button('开始炼金')
          .fontSize(this.screenAdapter.scaleFont(14))
          .backgroundColor('#FF9800')
          .enabled(this.totalAmount === 100)
          .onClick(() => {
            this.startAlchemy()
          })
          .margin({ left: 15 })
      }
      .width('100%')
      .padding({ left: 15, right: 15 })
      .justifyContent(FlexAlign.SpaceEvenly)
      .margin({ top: 15 })
      
      if (this.showMaterialSelector) {
        this.MaterialSelectorSheet()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#1a1a1a')
  }
  
  @Builder
  MaterialSelectorSheet() {
    Column() {
      Row() {
        Text('选择材料')
          .fontSize(this.screenAdapter.scaleFont(18))
          .fontColor(Color.White)
        
        Button('关闭')
          .fontSize(this.screenAdapter.scaleFont(14))
          .onClick(() => {
            this.showMaterialSelector = false
          })
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .padding({ left: 15, right: 15, top: 15, bottom: 15 })
      
      Scroll() {
        Column() {
          ForEach([
            MaterialColorType.RED,
            MaterialColorType.ORANGE,
            MaterialColorType.YELLOW,
            MaterialColorType.GREEN,
            MaterialColorType.CYAN,
            MaterialColorType.BLUE,
            MaterialColorType.PURPLE
          ], (colorType: MaterialColorType) => {
            Column() {
              Text(colorType)
                .fontSize(this.screenAdapter.scaleFont(14))
                .fontColor(this.getColorHex(colorType))
                .fontWeight(FontWeight.Bold)
                .margin({ top: 8, bottom: 8 })
              
              Grid() {
                ForEach(getMaterialsByColor(colorType), (material: MaterialData) => {
                  GridItem() {
                    this.MaterialCard(material)
                  }
                })
              }
              .columnsTemplate(this.getGridColumnsTemplate())
              .rowsGap(this.screenAdapter.getMargin())
              .columnsGap(this.screenAdapter.getMargin())
              .width('100%')
            }
            .width('100%')
            .margin({ bottom: 10 })
          })
        }
        .width('100%')
        .padding({ bottom: 20, left: 10, right: 10 })
      }
      .width('100%')
      .layoutWeight(1)
      .scrollBar(BarState.Off)
      .edgeEffect(EdgeEffect.Spring)
    }
    .width('100%')
    .height('70%')
    .backgroundColor('rgba(30, 30, 30, 0.95)')
    .borderRadius({ topLeft: 20, topRight: 20 })
    .position({ x: 0, y: '30%' })
  }
  
  @Builder
  MaterialCard(material: MaterialData) {
    Column() {
      Stack() {
        Canvas(new CanvasRenderingContext2D(new RenderingContextSettings(true)))
          .width(this.screenAdapter.getImageSize())
          .height(this.screenAdapter.getImageSize())
          .onReady(() => {
            let ctx = new CanvasRenderingContext2D(new RenderingContextSettings(true))
            const size = this.screenAdapter.getImageSize()
            ctx.clearRect(0, 0, size, size)
            
            ctx.fillStyle = this.getColorHex(material.colorType)
            ctx.beginPath()
            ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2)
            ctx.fill()
            
            MaterialPatternDrawer.drawPattern(ctx, material.id, size / 2, size / 2, size * 0.35)
          })
      }
      .width(this.screenAdapter.getImageSize())
      .height(this.screenAdapter.getImageSize())
      
      Text(material.name)
        .fontSize(this.screenAdapter.scaleFont(10))
        .fontColor(Color.White)
        .margin({ top: 4 })
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
      
      Text(`库存: ${this.gameManager.getMaterialCount(material.id)}`)
        .fontSize(this.screenAdapter.scaleFont(9))
        .fontColor('#aaaaaa')
      
      Button('+5')
        .fontSize(this.screenAdapter.scaleFont(10))
        .height(this.screenAdapter.scaleValue(24))
        .width('85%')
        .backgroundColor(this.gameManager.getMaterialCount(material.id) >= 5 ? '#4CAF50' : '#666666')
        .enabled(this.totalAmount < 100 && this.gameManager.getMaterialCount(material.id) >= 5)
        .onClick(() => {
          this.addMaterial(material.id, 5)
        })
    }
    .width('100%')
    .padding(6)
    .backgroundColor('rgba(60, 60, 60, 0.9)')
    .borderRadius(8)
  }
  
  addMaterial(materialId: string, amount: number) {
    if (this.totalAmount + amount > 100) {
      amount = 100 - this.totalAmount
    }
    
    if (amount <= 0) return
    
    const current = this.selectedMaterials.get(materialId) || 0
    this.selectedMaterials.set(materialId, current + amount)
    this.totalAmount += amount
    
    // 强制更新Map
    const newMap = new Map<string, number>()
    this.selectedMaterials.forEach((value: number, key: string) => {
      newMap.set(key, value)
    })
    this.selectedMaterials = newMap
    
    this.updateColor()
  }
  
  updateColor() {
    if (this.selectedMaterials.size === 0) {
      this.currentColor = { r: 80, g: 80, b: 120 }
      this.colorIntensity = 0
      return
    }
    
    let totalR = 0, totalG = 0, totalB = 0
    let totalAmount = 0
    const colorComponents: Map<string, number> = new Map()
    
    this.selectedMaterials.forEach((amount: number, materialId: string) => {
      const material = AllMaterials.find((m: MaterialData) => m.id === materialId)
      if (material) {
        const color = MaterialColors[material.colorType]
        totalR += color.r * amount
        totalG += color.g * amount
        totalB += color.b * amount
        totalAmount += amount
        
        const colorTypeStr = material.colorType.toString()
        const currentCount = colorComponents.get(colorTypeStr) || 0
        colorComponents.set(colorTypeStr, currentCount + amount)
      }
    })
    
    if (totalAmount > 0) {
      const depthLevel = totalAmount / 100
      this.colorIntensity = totalAmount
      
      let r = totalR / totalAmount
      let g = totalG / totalAmount
      let b = totalB / totalAmount
      
      const subtractiveR = 1 - Math.pow(1 - r / 255, totalAmount / 15)
      const subtractiveG = 1 - Math.pow(1 - g / 255, totalAmount / 15)
      const subtractiveB = 1 - Math.pow(1 - b / 255, totalAmount / 15)
      
      r = subtractiveR * 255
      g = subtractiveG * 255
      b = subtractiveB * 255
      
      const hsl = this.rgbToHsl(r, g, b)
      
      const colorDiversity = colorComponents.size
      if (colorDiversity >= 2) {
        const blendEnhance = Math.min(0.4, (colorDiversity - 1) * 0.12)
        hsl.s = Math.min(1.0, hsl.s * (1.0 + blendEnhance))
      }
      
      const baseLightness = 0.85
      const maxDarkness = 0.15
      const lightnessRange = baseLightness - maxDarkness
      const targetLightness = baseLightness - (lightnessRange * depthLevel)
      
      hsl.l = targetLightness
      
      if (depthLevel < 0.2) {
        hsl.s = Math.max(0.3, hsl.s * 0.7)
      } else if (depthLevel > 0.6) {
        hsl.s = Math.min(1.0, hsl.s * 1.2)
      }
      
      hsl.l = Math.max(0.1, Math.min(0.85, hsl.l))
      hsl.s = Math.max(0.2, Math.min(1.0, hsl.s))
      
      const rgb = this.hslToRgb(hsl.h, hsl.s, hsl.l)
      
      this.currentColor = { 
        r: Math.max(10, Math.min(255, Math.floor(rgb.r))), 
        g: Math.max(10, Math.min(255, Math.floor(rgb.g))), 
        b: Math.max(10, Math.min(255, Math.floor(rgb.b)))
      }
    }
  }
  
  rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2
    
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }
    
    return { h, s, l }
  }
  
  hslToRgb(h: number, s: number, l: number): RGB {
    let r: number, g: number, b: number
    
    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    }
  }
  
  getMaterialName(id: string): string {
    const material = AllMaterials.find((m: MaterialData) => m.id === id)
    return material ? material.name : '未知'
  }
  
  getColorHex(colorType: MaterialColorType): string {
    const color = MaterialColors[colorType]
    return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
  }
  
  startAlchemy() {
    this.isProcessing = true
    if (this.bubbleInterval !== -1) {
      clearInterval(this.bubbleInterval)
    }
    this.currentPage = GamePage.FORMATION_WHEEL
  }
  
  getGridColumnsTemplate(): string {
    const deviceType = this.screenAdapter.getDeviceType()
    if (deviceType === DeviceType.PHONE) {
      return '1fr 1fr 1fr'
    } else if (deviceType === DeviceType.TABLET) {
      return '1fr 1fr 1fr 1fr'
    } else {
      return '1fr 1fr 1fr 1fr 1fr'
    }
  }
}
