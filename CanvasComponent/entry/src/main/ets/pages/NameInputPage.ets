import { GamePage } from '../model/GameTypes'
import { GameManager } from '../model/GameManager'

@Component
export struct NameInputPage {
  @State userName: string = ''
  @State showError: boolean = false
  @Link currentPage: GamePage
  @Link avatarImage: string
  
  private gameManager: GameManager = GameManager.getInstance()

  build() {
    Column() {
      Text('创建角色')
        .fontSize(32)
        .fontColor('#FFD700')
        .fontWeight(FontWeight.Bold)
        .margin({ top: 80, bottom: 30 })

      Column()
        .width(120)
        .height(120)
        .borderRadius(60)
        .linearGradient({
          angle: 135,
          colors: [['#FF6B6B', 0.0], ['#4ECDC4', 1.0]]
        })
        .margin({ bottom: 30 })

      Text('请输入您的名字')
        .fontSize(18)
        .fontColor('#aaaaaa')
        .margin({ bottom: 15 })

      TextInput({ placeholder: '炼金术士之名' })
        .width('70%')
        .height(50)
        .backgroundColor('#2a2a2a')
        .fontColor(Color.White)
        .borderRadius(10)
        .margin({ bottom: 20 })
        .onChange((value: string) => {
          this.userName = value
          this.showError = false
        })

      if (this.showError) {
        Text('请输入您的名字')
          .fontSize(16)
          .fontColor('#ff4444')
          .margin({ bottom: 20 })
      }

      Button('开始冒险')
        .width('60%')
        .height(60)
        .fontSize(20)
        .fontColor(Color.White)
        .backgroundColor(this.userName.trim().length > 0 ? '#4CAF50' : '#666666')
        .borderRadius(15)
        .enabled(this.userName.trim().length > 0)
        .onClick(() => {
          if (this.userName.trim().length > 0) {
            this.gameManager.setUserName(this.userName.trim())
            this.currentPage = GamePage.GAME_STORY
          } else {
            this.showError = true
          }
        })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#000000')
  }
}
