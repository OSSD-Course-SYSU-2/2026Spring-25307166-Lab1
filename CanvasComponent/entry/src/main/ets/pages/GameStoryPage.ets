import { GamePage } from '../model/GameTypes'

@Component
export struct GameStoryPage {
  @Link currentPage: GamePage
  @State currentLine: number = 0
  
  private storyLines: string[] = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '☽ ✧ ⚝ ✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡ ◈ ☽',
    '',
    '隐秘的炼金术士集会',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '是的，我接收到了您的神秘符号。',
    '',
    '新手炼金师，欢迎加入我们的行列。',
    '',
    '在这个被遗忘的世界里，炼金术并非简单的物质转换，',
    '而是连接现实与神秘维度的桥梁。',
    '',
    '我们，隐秘的炼金术士集会，',
    '守护着古老的知识与禁忌的配方。',
    '',
    '☽ ✧ ⚝ ✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡ ◈ ☽',
    '',
    '作为新手炼金师，你将学习：',
    '',
    '✧ 调配材料，掌握颜色与能量的共鸣',
    '✧ 铸造法阵，引导元素的流动',
    '✧ 探索危险之地，收集稀有的素材',
    '✧ 与神秘NPC交流，获取古老配方',
    '✧ 完成委托，积累声望与财富',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '但请记住，年轻的炼金师...',
    '',
    '每一次炼金都是与未知的契约。',
    '材料的配比、法阵的选择、时机的把握...',
    '任何疏忽都可能带来不可预知的后果。',
    '',
    '有些配方被封印了数百年，',
    '有些材料只存在于深渊的边缘，',
    '有些法阵能召唤出超越理解的存在...',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '现在，拿起你的坩埚，点燃炉火。',
    '',
    '炼金的世界，等待你的探索。',
    '',
    '☽ ✧ ⚝ ✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡ ◈ ☽',
    '',
    '愿神秘之力与你同在。'
  ]
  
  build() {
    Column() {
      Column() {
        Scroll() {
          Column() {
            ForEach(this.storyLines, (line: string, index: number) => {
              Text(line)
                .fontSize(this.getFontSize(line))
                .fontColor(this.getFontColor(line))
                .fontWeight(this.getFontWeight(line))
                .textAlign(TextAlign.Center)
                .margin({ top: this.getMarginTop(line) })
            })
          }
          .width('100%')
          .padding({ left: 30, right: 30, top: 40, bottom: 40 })
        }
        .width('100%')
        .layoutWeight(1)
        .scrollBar(BarState.Off)
        .edgeEffect(EdgeEffect.Spring)
        
        Column() {
          Button('开始炼金之旅')
            .width('80%')
            .height(60)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('rgba(255, 215, 0, 0.3)')
            .border({ width: 2, color: '#FFD700' })
            .borderRadius(30)
            .onClick(() => {
              this.currentPage = GamePage.MAIN
            })
          
          Text('☽ ☾ ✧ ⚝ ✦ ⬡ ◈')
            .fontSize(14)
            .fontColor('rgba(255, 215, 0, 0.4)')
            .margin({ top: 15 })
        }
        .width('100%')
        .padding({ bottom: 50 })
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor(Color.Black)
  }
  
  getFontSize(line: string): number {
    if (line.includes('━━━━')) return 12
    if (line.includes('☽ ✧ ⚝')) return 14
    if (line.includes('隐秘的炼金术士集会')) return 28
    if (line.includes('新手炼金师')) return 20
    if (line.includes('作为新手炼金师')) return 18
    if (line.includes('开始炼金之旅')) return 16
    if (line.includes('但请记住')) return 18
    if (line.includes('愿神秘之力')) return 16
    if (line.startsWith('✧')) return 15
    return 16
  }
  
  getFontColor(line: string): string {
    if (line.includes('━━━━')) return 'rgba(255, 215, 0, 0.5)'
    if (line.includes('☽ ✧ ⚝')) return 'rgba(255, 215, 0, 0.6)'
    if (line.includes('隐秘的炼金术士集会')) return '#FFD700'
    if (line.includes('新手炼金师')) return '#FFD700'
    if (line.includes('作为新手炼金师')) return '#88ccff'
    if (line.includes('但请记住')) return '#ff9966'
    if (line.includes('愿神秘之力')) return '#FFD700'
    if (line.startsWith('✧')) return '#aaddff'
    return '#cccccc'
  }
  
  getFontWeight(line: string): FontWeight {
    if (line.includes('隐秘的炼金术士集会')) return FontWeight.Bold
    if (line.includes('新手炼金师')) return FontWeight.Bold
    if (line.includes('作为新手炼金师')) return FontWeight.Bold
    if (line.includes('但请记住')) return FontWeight.Bold
    return FontWeight.Normal
  }
  
  getMarginTop(line: string): number {
    if (line === '') return 10
    if (line.includes('隐秘的炼金术士集会')) return 20
    if (line.includes('新手炼金师')) return 15
    if (line.includes('作为新手炼金师')) return 25
    if (line.includes('但请记住')) return 25
    if (line.includes('开始炼金之旅')) return 20
    if (line.includes('愿神秘之力')) return 20
    return 5
  }
}
