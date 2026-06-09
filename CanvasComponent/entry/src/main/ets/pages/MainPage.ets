import { GamePage } from '../model/GameTypes'
import { GameManager } from '../model/GameManager'
import { ScreenAdapter, DeviceType } from '../common/utils/ScreenAdapter'

@Component
export struct MainPage {
  @Link currentPage: GamePage
  private gameManager: GameManager = GameManager.getInstance()
  private screenAdapter: ScreenAdapter = ScreenAdapter.getInstance()
  
  private romanNumerals: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI']
  private mysticSymbols: string[] = ['☽', '☾', '✧', '⚝', '✦', '⬡', '⬢', '◈']
  
  build() {
    Stack() {
      Column() {
        this.MysticBackgroundPattern()
      }
      .width('100%')
      .height('100%')
      
      Column() {
        Row() {
          Stack() {
            Column()
              .width(this.screenAdapter.getImageSize() * 0.8)
              .height(this.screenAdapter.getImageSize() * 0.8)
              .borderRadius(this.screenAdapter.getImageSize() * 0.4)
              .linearGradient({
                angle: 135,
                colors: [['#FF6B6B', 0.0], ['#4ECDC4', 1.0]]
              })
            
            Text('☉')
              .fontSize(this.screenAdapter.scaleFont(20))
              .fontColor('#FFD700')
          }
          .width(this.screenAdapter.getImageSize())
          .height(this.screenAdapter.getImageSize())
          
          Column() {
            Text(this.gameManager.getUserState().name)
              .fontSize(this.screenAdapter.scaleFont(16))
              .fontColor(Color.White)
            Text(`金币: ${this.gameManager.getUserState().gold}`)
              .fontSize(this.screenAdapter.scaleFont(12))
              .fontColor('#FFD700')
          }
          .alignItems(HorizontalAlign.Start)
          .margin({ left: 10 })
          .layoutWeight(1)
          
          Text('⚗️')
            .fontSize(this.screenAdapter.scaleFont(24))
        }
        .width('100%')
        .padding(this.screenAdapter.getPadding())
        .backgroundColor('rgba(50, 50, 50, 0.8)')
        .borderRadius(10)
        .margin({ top: 20, left: 15, right: 15 })
        .border({ width: 1, color: 'rgba(255, 215, 0, 0.3)' })
        .height(70)
        
        Scroll() {
          Column() {
            this.FunctionButton('委托', '接受任务，获取奖励', '#8B0000', 'I', () => {
              this.currentPage = GamePage.COMMISSION
            })
            
            this.FunctionButton('炼金', '调配材料，铸造法阵', '#4B0082', 'II', () => {
              this.currentPage = GamePage.ALCHEMY
            })
            
            this.FunctionButton('图鉴', '查看解锁的材料和物品', '#006400', 'III', () => {
              this.currentPage = GamePage.COLLECTION
            })
            
            this.FunctionButton('冒险', '探索危险地点，收集稀有材料', '#B8860B', 'IV', () => {
              this.currentPage = GamePage.ADVENTURE
            })
            
            this.FunctionButton('公会', '与NPC交流，接受委托', '#2F4F4F', 'V', () => {
              this.currentPage = GamePage.NPC
            })
            
            this.FunctionButton('个人信息', '查看背包和设置', '#483D8B', 'VI', () => {
              this.currentPage = GamePage.USER
            })
          }
          .width('100%')
          .padding({ left: 15, right: 15 })
        }
        .width('100%')
        .layoutWeight(1)
        .margin({ top: 15 })
        .scrollBar(BarState.Off)
        .edgeEffect(EdgeEffect.Spring)
        .align(Alignment.Top)
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Start)
    }
    .width('100%')
    .height('100%')
    .linearGradient({
      angle: 135,
      colors: [['#0a0a1f', 0.0], ['#1a1a2e', 0.5], ['#16213e', 1.0]]
    })
  }
  
  @Builder
  MysticBackgroundPattern() {
    Column() {
      Row() {
        Text('☽ ✧ ⚝ ✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡ ◈ ☽')
          .fontSize(this.screenAdapter.scaleFont(12))
          .fontColor('rgba(255, 215, 0, 0.15)')
          .letterSpacing(6)
      }
      .width('100%')
      .margin({ top: 60 })
      
      Row() {
        Text('⬢ ◈ ☽ ✧ ⚝ ✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡')
          .fontSize(this.screenAdapter.scaleFont(12))
          .fontColor('rgba(255, 215, 0, 0.12)')
          .letterSpacing(6)
      }
      .width('100%')
      .margin({ top: 25 })
      
      Row() {
        Text('☾ ✧ ⚝ ✦ ⬡ ◈ ☽ ✧ ⚝ ✦ ⬡ ◈ ☾')
          .fontSize(this.screenAdapter.scaleFont(12))
          .fontColor('rgba(255, 215, 0, 0.15)')
          .letterSpacing(6)
      }
      .width('100%')
      .margin({ top: 25 })
      
      Row() {
        Text('✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡ ◈ ☽ ✧ ⚝ ✦')
          .fontSize(this.screenAdapter.scaleFont(12))
          .fontColor('rgba(255, 215, 0, 0.12)')
          .letterSpacing(6)
      }
      .width('100%')
      .margin({ top: 25 })
    }
    .width('100%')
    .justifyContent(FlexAlign.Start)
  }
  
  @Builder
  FunctionButton(title: string, desc: string, color: string, romanNum: string, onClick: () => void) {
    Column() {
      Row() {
        Text(romanNum)
          .fontSize(this.screenAdapter.scaleFont(16))
          .fontColor('rgba(255, 215, 0, 0.6)')
          .fontWeight(FontWeight.Bold)
          .width(30)
        
        Column() {
          Text(title)
            .fontSize(this.screenAdapter.scaleFont(18))
            .fontColor(Color.White)
            .fontWeight(FontWeight.Bold)
          
          Text(desc)
            .fontSize(this.screenAdapter.scaleFont(10))
            .fontColor('#aaaaaa')
            .margin({ top: 3 })
            .maxLines(1)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
        }
        .layoutWeight(1)
        .margin({ left: 10, right: 10 })
        .alignItems(HorizontalAlign.Start)
        
        Text(this.getRandomSymbol())
          .fontSize(this.screenAdapter.scaleFont(18))
          .fontColor('rgba(255, 255, 255, 0.3)')
          .width(30)
      }
      .width('100%')
      .height('100%')
      .padding({
        left: this.screenAdapter.getPadding(),
        right: this.screenAdapter.getPadding(),
        top: 10,
        bottom: 10
      })
      .alignItems(VerticalAlign.Center)
    }
    .width('100%')
    .height(this.screenAdapter.getCardHeight())
    .backgroundColor(color)
    .borderRadius(12)
    .margin({ bottom: this.screenAdapter.getMargin() })
    .border({ width: 1, color: 'rgba(255, 215, 0, 0.2)' })
    .onClick(onClick)
  }
  
  getRandomSymbol(): string {
    const index = Math.floor(Math.random() * this.mysticSymbols.length)
    return this.mysticSymbols[index]
  }
}
