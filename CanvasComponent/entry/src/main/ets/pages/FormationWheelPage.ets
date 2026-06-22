import { GamePage } from '../model/GameTypes'
import { Formation } from '../model/Formation'
import { AllFormations } from '../model/Formation'
import { GameManager } from '../model/GameManager'
import { ScreenAdapter, DeviceType } from '../common/utils/ScreenAdapter'

@Component
export struct FormationWheelPage {
  @Link currentPage: GamePage
  @State rotateDegree: number = 0
  @State selectedFormation: Formation | null = null
  @State showResult: boolean = false
  @State flashOpacity: number = 1
  
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private canvasContext: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private staticContext: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private gameManager: GameManager = GameManager.getInstance()
  private screenAdapter: ScreenAdapter = ScreenAdapter.getInstance()
  
  build() {
    Column() {
      if (!this.showResult) {
        Text('星盘')
          .fontSize(this.screenAdapter.scaleFont(24))
          .fontColor(Color.White)
          .margin({ top: 30, bottom: 20 })
        
        Stack() {
          Canvas(this.canvasContext)
            .width(this.screenAdapter.scaleValue(320))
            .height(this.screenAdapter.scaleValue(320))
            .onReady(() => {
              this.drawWheel()
            })
            .rotate({
              angle: this.rotateDegree,
              centerX: this.screenAdapter.scaleValue(160),
              centerY: this.screenAdapter.scaleValue(160)
            })
          
          Column()
            .width(70)
            .height(70)
            .borderRadius(35)
            .backgroundColor('#1a1a1a')
            .border({ width: 3, color: '#FFD700' })
            .onClick(() => {
              this.spinWheel()
            })
        }
        .width(this.screenAdapter.scaleValue(320))
        .height(this.screenAdapter.scaleValue(320))
      } else {
        Scroll() {
          Column() {
            Text('法阵显现!')
              .fontSize(this.screenAdapter.scaleFont(20))
              .fontColor('#FFD700')
              .margin({ top: 30, bottom: 20 })
            
            if (this.selectedFormation) {
              this.FormationDisplay(this.selectedFormation)
              
              Column() {
                Text('━━━━━━━━━━━━━━━')
                  .fontSize(this.screenAdapter.scaleFont(12))
                  .fontColor('#666666')
                  .margin({ top: 15, bottom: 10 })
                
                Text('炼金物品')
                  .fontSize(this.screenAdapter.scaleFont(16))
                  .fontColor('#FFD700')
                  .fontWeight(FontWeight.Bold)
                  .margin({ bottom: 8 })
                
                Row() {
                  Text(this.getItemName())
                    .fontSize(this.screenAdapter.scaleFont(16))
                    .fontColor('#FFFFFF')
                    .fontWeight(FontWeight.Bold)
                  
                  Text(' Lv.' + this.getItemLevel())
                    .fontSize(this.screenAdapter.scaleFont(14))
                    .fontColor('#00ff88')
                    .margin({ left: 8 })
                }
                .margin({ bottom: 8 })
                
                Text(this.getItemRarity())
                  .fontSize(this.screenAdapter.scaleFont(14))
                  .fontColor(this.getItemRarityColor())
              }
              .width('90%')
              .padding(15)
              .backgroundColor('rgba(50, 50, 50, 0.8)')
              .borderRadius(10)
              .margin({ top: 15 })
            }
            
            Button('收入囊中')
              .width('70%')
              .height(this.screenAdapter.scaleValue(50))
              .fontSize(this.screenAdapter.scaleFont(16))
              .backgroundColor('#9c27b0')
              .margin({ top: 20, bottom: 30 })
              .onClick(() => {
                this.addItemToInventory()
                this.currentPage = GamePage.MAIN
              })
          }
          .width('100%')
          .padding({ left: 15, right: 15 })
        }
        .width('100%')
        .layoutWeight(1)
        .scrollBar(BarState.Off)
        .edgeEffect(EdgeEffect.Spring)
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor(Color.Black)
    .opacity(this.flashOpacity)
  }
  
  drawWheel() {
    const ctx = this.canvasContext
    const canvasSize = this.screenAdapter.scaleValue(320)
    const centerX = canvasSize / 2
    const centerY = canvasSize / 2
    const radius = this.screenAdapter.scaleValue(140)
    
    ctx.fillStyle = '#2a2a2a'
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 3
    ctx.stroke()
    
    const formationsCount = AllFormations.length
    const anglePerFormation = (Math.PI * 2) / formationsCount
    
    ctx.font = `${this.screenAdapter.scaleFont(10)}px sans-serif`
    ctx.textAlign = 'center'
    
    for (let i = 0; i < formationsCount; i++) {
      const startAngle = (i * anglePerFormation) - Math.PI / 2
      const endAngle = startAngle + anglePerFormation
      
      ctx.strokeStyle = '#444444'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.stroke()
      
      const textAngle = startAngle + anglePerFormation / 2
      const textX = centerX + Math.cos(textAngle) * (radius * 0.65)
      const textY = centerY + Math.sin(textAngle) * (radius * 0.65)
      
      this.drawFormationPattern(ctx, textX, textY, i, this.screenAdapter.scaleValue(25))
      
      ctx.fillStyle = '#aaaaaa'
      ctx.fillText(AllFormations[i].name, textX, textY + this.screenAdapter.scaleValue(35))
    }
  }
  
  drawFormationPattern(ctx: CanvasRenderingContext2D, x: number, y: number, type: number, size: number) {
    ctx.save()
    ctx.translate(x, y)
    
    switch (type) {
      case 0:
        this.drawFireFormation(ctx, size)
        break
      case 1:
        this.drawWindFormation(ctx, size)
        break
      case 2:
        this.drawWaterFormation(ctx, size)
        break
      case 3:
        this.drawMoonFormation(ctx, size)
        break
      case 4:
        this.drawChaosFormation(ctx, size)
        break
      case 5:
        this.drawTreeFormation(ctx, size)
        break
      case 6:
        this.drawAbyssFormation(ctx, size)
        break
      case 7:
        this.drawConstellationFormation(ctx, size)
        break
    }
    
    ctx.restore()
  }
  
  drawFireFormation(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#FF4444'
    ctx.lineWidth = 2
    
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.moveTo(0, -size + i * 8)
      ctx.lineTo(-size * 0.5 + i * 4, size - i * 8)
      ctx.lineTo(size * 0.5 - i * 4, size - i * 8)
      ctx.closePath()
      ctx.stroke()
    }
    
    ctx.fillStyle = '#FF6666'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2)
    ctx.fill()
  }
  
  drawWindFormation(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#44FF44'
    ctx.lineWidth = 2
    
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI / 2)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.arc(Math.cos(angle) * size * 0.7, Math.sin(angle) * size * 0.7, size * 0.15, 0, Math.PI * 2)
      ctx.stroke()
    }
    
    ctx.fillStyle = '#66FF66'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2)
    ctx.fill()
  }
  
  drawWaterFormation(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#4444FF'
    ctx.lineWidth = 2
    
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(0, 0, size - i * 10, 0, Math.PI * 2)
      ctx.stroke()
    }
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI / 3)
      ctx.beginPath()
      ctx.moveTo(Math.cos(angle) * size * 0.3, Math.sin(angle) * size * 0.3)
      ctx.lineTo(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.8)
      ctx.stroke()
    }
    
    ctx.fillStyle = '#6666FF'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2)
    ctx.fill()
  }
  
  drawMoonFormation(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#AA44FF'
    ctx.lineWidth = 2
    
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2 / 5) - Math.PI / 2
      const nextAngle = ((i + 2) * Math.PI * 2 / 5) - Math.PI / 2
      
      ctx.beginPath()
      ctx.moveTo(Math.cos(angle) * size * 0.4, Math.sin(angle) * size * 0.4)
      ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size)
      ctx.lineTo(Math.cos(nextAngle) * size * 0.4, Math.sin(nextAngle) * size * 0.4)
      ctx.stroke()
    }
    
    ctx.fillStyle = '#CC66FF'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2)
    ctx.fill()
  }
  
  drawChaosFormation(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#8B0000'
    ctx.lineWidth = 2
    
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2 / 8)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size)
      ctx.stroke()
    }
    
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(0, 0, size * (0.3 + i * 0.25), 0, Math.PI * 2)
      ctx.stroke()
    }
    
    ctx.strokeStyle = '#FF4500'
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI / 3) + Math.PI / 6
      const x1 = Math.cos(angle) * size * 0.5
      const y1 = Math.sin(angle) * size * 0.5
      const x2 = Math.cos(angle + Math.PI) * size * 0.5
      const y2 = Math.sin(angle + Math.PI) * size * 0.5
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
    
    ctx.fillStyle = '#8B0000'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2)
    ctx.fill()
  }
  
  drawTreeFormation(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#228B22'
    ctx.lineWidth = 3
    
    ctx.beginPath()
    ctx.moveTo(0, size * 0.8)
    ctx.lineTo(0, -size * 0.2)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.1)
    ctx.lineTo(-size * 0.5, -size * 0.6)
    ctx.moveTo(0, -size * 0.1)
    ctx.lineTo(size * 0.5, -size * 0.6)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.3)
    ctx.lineTo(-size * 0.35, -size * 0.8)
    ctx.moveTo(0, -size * 0.3)
    ctx.lineTo(size * 0.35, -size * 0.8)
    ctx.stroke()
    
    ctx.fillStyle = '#228B22'
    ctx.beginPath()
    ctx.arc(0, -size * 0.6, size * 0.15, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#32CD32'
    ctx.lineWidth = 1
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(0, -size * 0.6, size * (0.2 + i * 0.15), 0, Math.PI * 2)
      ctx.stroke()
    }
  }
  
  drawAbyssFormation(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#4B0082'
    ctx.lineWidth = 2
    
    for (let i = 0; i < 6; i++) {
      ctx.beginPath()
      ctx.arc(0, 0, size * (0.15 + i * 0.15), 0, Math.PI * 2)
      ctx.stroke()
    }
    
    ctx.strokeStyle = '#800080'
    ctx.lineWidth = 3
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI * 2 / 12)
      ctx.beginPath()
      ctx.moveTo(Math.cos(angle) * size * 0.2, Math.sin(angle) * size * 0.2)
      ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size)
      ctx.stroke()
    }
    
    ctx.fillStyle = '#4B0082'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.05, 0, Math.PI * 2)
    ctx.fill()
  }
  
  drawConstellationFormation(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#DAA520'
    ctx.lineWidth = 2
    
    const starPositions: number[][] = []
    for (let i = 0; i < 7; i++) {
      const angle = (i * Math.PI * 2 / 7) - Math.PI / 2
      const r = size * 0.7
      starPositions.push([Math.cos(angle) * r, Math.sin(angle) * r])
    }
    
    ctx.fillStyle = '#FFD700'
    for (let pos of starPositions) {
      ctx.beginPath()
      ctx.arc(pos[0], pos[1], size * 0.08, 0, Math.PI * 2)
      ctx.fill()
    }
    
    ctx.strokeStyle = '#DAA520'
    ctx.lineWidth = 1
    for (let i = 0; i < starPositions.length; i++) {
      const next = (i + 2) % starPositions.length
      ctx.beginPath()
      ctx.moveTo(starPositions[i][0], starPositions[i][1])
      ctx.lineTo(starPositions[next][0], starPositions[next][1])
      ctx.stroke()
    }
    
    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2)
    ctx.fill()
  }
  
  spinWheel() {
    const randomAngle = Math.random() * 360
    const finalAngle = 360 * 5 + randomAngle
    
    const steps = 100
    const duration = 4000
    const stepDuration = duration / steps
    let currentStep = 0
    
    const animate = () => {
      if (currentStep < steps) {
        currentStep++
        const progress = currentStep / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)
        this.rotateDegree = finalAngle * easeOut
        
        setTimeout(animate, stepDuration)
      } else {
        this.determineResult(randomAngle)
        this.showResult = true
        this.startFlash()
      }
    }
    
    animate()
  }
  
  determineResult(angle: number) {
    const normalizedAngle = angle % 360
    const formationsCount = AllFormations.length
    const anglePerFormation = 360 / formationsCount
    
    let formationIndex = Math.floor(normalizedAngle / anglePerFormation)
    formationIndex = (formationsCount - formationIndex) % formationsCount
    this.selectedFormation = AllFormations[formationIndex]
  }
  
  startFlash() {
    let flashCount = 0
    const maxFlash = 6
    
    const flash = () => {
      if (flashCount < maxFlash) {
        this.flashOpacity = this.flashOpacity === 1 ? 0.3 : 1
        flashCount++
        setTimeout(flash, 300)
      } else {
        this.flashOpacity = 1
      }
    }
    
    flash()
  }
  
  @Builder
  FormationDisplay(formation: Formation) {
    Column() {
      Canvas(this.canvasContext)
        .width(this.screenAdapter.scaleValue(240))
        .height(this.screenAdapter.scaleValue(240))
        .onReady(() => {
          this.drawFormation(formation)
        })
      
      Text(formation.name)
        .fontSize(this.screenAdapter.scaleFont(20))
        .fontColor('#FFD700')
        .margin({ top: 15 })
      
      Text(formation.description)
        .fontSize(this.screenAdapter.scaleFont(12))
        .fontColor('#aaaaaa')
        .margin({ top: 8 })
        .padding({ left: 20, right: 20 })
        .textAlign(TextAlign.Center)
    }
  }
  
  drawFormation(formation: Formation) {
    const ctx = this.canvasContext
    const canvasSize = this.screenAdapter.scaleValue(240)
    const centerX = canvasSize / 2
    const centerY = canvasSize / 2
    
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvasSize, canvasSize)
    
    const formationIndex = AllFormations.findIndex(f => f.name === formation.name)
    this.drawFormationPattern(ctx, centerX, centerY, formationIndex, this.screenAdapter.scaleValue(80))
    
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, this.screenAdapter.scaleValue(100), 0, Math.PI * 2)
    ctx.stroke()
  }
  
  getItemName(): string {
    if (!this.selectedFormation) return '未知物品'
    
    if (this.selectedFormation.name === '赤焰') {
      return '战斗灵药'
    } else if (this.selectedFormation.name === '翠风') {
      return '社交香水'
    } else if (this.selectedFormation.name === '幽蓝') {
      return '幸运护身符'
    } else if (this.selectedFormation.name === '紫月') {
      return '大型体力药水'
    } else if (this.selectedFormation.name === '虚空混沌阵') {
      return '远古祝福'
    } else if (this.selectedFormation.name === '生命神树阵') {
      return '体力蛋糕'
    } else if (this.selectedFormation.name === '深渊召唤阵') {
      return '凤凰之羽'
    } else if (this.selectedFormation.name === '星辰命运阵') {
      return '材料磁石'
    }
    
    return '炼金药剂'
  }
  
  getItemLevel(): number {
    if (!this.selectedFormation) return 1
    
    let baseLevel = this.selectedFormation.complexity + Math.floor(Math.random() * 3)
    
    if (this.selectedFormation.levelBonus) {
      baseLevel += this.selectedFormation.levelBonus
    } else {
      if (this.selectedFormation.name === '赤焰') {
        baseLevel += 1
      } else if (this.selectedFormation.name === '翠风') {
        baseLevel += 1
      } else if (this.selectedFormation.name === '幽蓝') {
        baseLevel += 2
      } else if (this.selectedFormation.name === '紫月') {
        baseLevel += 2
      }
    }
    
    return Math.min(15, baseLevel)
  }
  
  getItemRarity(): string {
    const level = this.getItemLevel()
    if (level >= 8) return '★★★★★ 传说'
    if (level >= 6) return '★★★★ 史诗'
    if (level >= 4) return '★★★ 稀有'
    if (level >= 2) return '★★ 优秀'
    return '★ 普通'
  }
  
  getItemRarityColor(): string {
    const level = this.getItemLevel()
    if (level >= 8) return '#FFD700'  // 金色
    if (level >= 6) return '#FF00FF'  // 紫色
    if (level >= 4) return '#00BFFF'  // 蓝色
    if (level >= 2) return '#00FF00'  // 绿色
    return '#FFFFFF'  // 白色
  }
  
  addItemToInventory() {
    if (!this.selectedFormation) return
    
    if (this.selectedFormation.failChance && this.selectedFormation.failChance > 0) {
      const roll = Math.random() * 100
      if (roll < this.selectedFormation.failChance) {
        return
      }
    }
    
    const itemName = this.getItemName()
    const level = this.getItemLevel()
    const rarity = this.getItemRarity()
    
    // 根据法阵类型生成对应物品ID
    let itemId = 'stamina_potion_small'
    if (this.selectedFormation.name === '赤焰') {
      itemId = 'combat_elixir'
    } else if (this.selectedFormation.name === '翠风') {
      itemId = 'social_perfume'
    } else if (this.selectedFormation.name === '幽蓝') {
      itemId = 'luck_amulet'
    } else if (this.selectedFormation.name === '紫月') {
      itemId = 'stamina_potion_large'
    } else if (this.selectedFormation.name === '虚空混沌阵') {
      itemId = 'ancient_blessing'
    } else if (this.selectedFormation.name === '生命神树阵') {
      itemId = 'stamina_cake'
    } else if (this.selectedFormation.name === '深渊召唤阵') {
      itemId = 'phoenix_feather'
    } else if (this.selectedFormation.name === '星辰命运阵') {
      itemId = 'material_magnet'
    }
    
    // 添加物品到背包
    this.gameManager.addItem(itemId, 1)
    
    // 添加金币奖励
    this.gameManager.addGold(level * 50)
    
    // 随机奖励材料
    const materials = ['red_spider', 'slime_heart', 'fairy_dust', 'cat_eye', 'phoenix_ash', 'demon_heart']
    const randomMaterial = materials[Math.floor(Math.random() * materials.length)]
    this.gameManager.addMaterial(randomMaterial, Math.floor(Math.random() * 5) + 1)
  }
}
