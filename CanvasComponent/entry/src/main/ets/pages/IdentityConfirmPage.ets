import { GamePage } from '../model/GameTypes'
import { GameManager } from '../model/GameManager'

@Component
export struct IdentityConfirmPage {
  @State opacityValue: number = 0
  @State showConfirm: boolean = false
  @Link currentPage: GamePage
  
  private gameManager: GameManager = GameManager.getInstance()
  private timer: number = -1
  
  aboutToAppear() {
    this.startAnimation()
  }

  aboutToDisappear() {
    if (this.timer !== -1) {
      clearTimeout(this.timer)
    }
  }
  
  startAnimation() {
    this.timer = setTimeout(() => {
      this.opacityValue = 1
      this.timer = setTimeout(() => {
        this.showConfirm = true
      }, 2000)
    }, 100)
  }
  
  build() {
    Column() {
      Column() {
        Text('身份验证完成')
          .fontSize(32)
          .fontColor('#FFD700')
          .fontWeight(FontWeight.Bold)
          .opacity(this.opacityValue)
          .margin({ bottom: 20 })
        
        Text(`欢迎您，${this.gameManager.getUserState().name}`)
          .fontSize(24)
          .fontColor(Color.White)
          .opacity(this.opacityValue)
          .margin({ bottom: 40 })
        
        Text('我们已经收到了您的身份证明')
          .fontSize(20)
          .fontColor('#aaaaaa')
          .opacity(this.opacityValue)
          .margin({ bottom: 10 })
        
        Text('炼金术士集会的大门已为您敞开')
          .fontSize(20)
          .fontColor('#aaaaaa')
          .opacity(this.opacityValue)
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .padding({ left: 40, right: 40 })
      
      if (this.showConfirm) {
        Button('踏入炼金世界')
          .width('70%')
          .height(60)
          .backgroundColor('#4a90e2')
          .fontSize(20)
          .margin({ top: 60 })
          .onClick(() => {
            this.currentPage = GamePage.MAIN
          })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor(Color.Black)
    .justifyContent(FlexAlign.Center)
  }
}
