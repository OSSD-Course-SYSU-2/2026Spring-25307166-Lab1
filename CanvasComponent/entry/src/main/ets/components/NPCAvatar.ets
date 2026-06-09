@Component
export struct NPCAvatar {
  @Prop npcId: string
  @Prop avatarSize: number = 80

  build() {
    Stack() {
      Column()
        .width(this.avatarSize)
        .height(this.avatarSize)
        .borderRadius(this.avatarSize / 2)
        .linearGradient({
          angle: this.getGradientAngle(),
          colors: this.getGradientColors()
        })
        .shadow({
          radius: this.avatarSize / 4,
          color: this.getGlowColor(),
          offsetX: 0,
          offsetY: 0
        })
      
      Text(this.getInitial())
        .fontSize(this.avatarSize * 0.45)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
    }
    .width(this.avatarSize)
    .height(this.avatarSize)
    .border({
      width: 2,
      color: this.getBorderColor()
    })
    .borderRadius(this.avatarSize / 2)
  }

  getInitial(): string {
    return this.npcId.charAt(0).toUpperCase()
  }

  getGradientAngle(): number {
    const hash = this.hashCode(this.npcId)
    return (hash % 360)
  }

  getGradientColors(): Array<[string, number]> {
    const colorSets: Array<Array<[string, number]>> = [
      [['#8B0000', 0.0], ['#DC143C', 0.5], ['#FF4500', 1.0]],  // 深红
      [['#4B0082', 0.0], ['#8A2BE2', 0.5], ['#9932CC', 1.0]],  // 靛紫
      [['#191970', 0.0], ['#4169E1', 0.5], ['#6495ED', 1.0]],  // 皇家蓝
      [['#006400', 0.0], ['#228B22', 0.5], ['#32CD32', 1.0]],  // 森林绿
      [['#B8860B', 0.0], ['#DAA520', 0.5], ['#FFD700', 1.0]],  // 金色
      [['#2F4F4F', 0.0], ['#5F9EA0', 0.5], ['#00CED1', 1.0]],  // 暗青
      [['#483D8B', 0.0], ['#6959CD', 0.5], ['#9370DB', 1.0]],  // 暗紫
      [['#800000', 0.0], ['#A0522D', 0.5], ['#CD853F', 1.0]]   // 褐红
    ]
    
    const index = Math.abs(this.hashCode(this.npcId) % colorSets.length)
    return colorSets[index]
  }
  
  getBorderColor(): string {
    const borders = [
      '#FFD700',  // 金色
      '#C0C0C0',  // 银色
      '#CD7F32',  // 铜色
      '#E5E4E2',  // 铂金
      '#B76E79',  // 玫瑰金
      '#8A2BE2',  // 紫色
      '#00CED1',  // 青色
      '#FF6347'   // 番茄红
    ]
    
    const index = Math.abs(this.hashCode(this.npcId) % borders.length)
    return borders[index]
  }
  
  getGlowColor(): string {
    const glows = [
      'rgba(255, 215, 0, 0.3)',
      'rgba(138, 43, 226, 0.3)',
      'rgba(0, 191, 255, 0.3)',
      'rgba(50, 205, 50, 0.3)',
      'rgba(255, 69, 0, 0.3)',
      'rgba(255, 20, 147, 0.3)',
      'rgba(72, 61, 139, 0.3)',
      'rgba(184, 134, 11, 0.3)'
    ]
    
    const index = Math.abs(this.hashCode(this.npcId) % glows.length)
    return glows[index]
  }

  hashCode(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash)
  }
}
