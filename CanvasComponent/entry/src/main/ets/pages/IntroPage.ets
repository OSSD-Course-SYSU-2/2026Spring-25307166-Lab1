import { GamePage } from '../model/GameTypes'

@Component
export struct IntroPage {
  @Link currentPage: GamePage

  build() {
    Column() {
      Text('炼金术士集会')
        .fontSize(48)
        .fontColor('#FFD700')
        .fontWeight(FontWeight.Bold)

      Text('点击开始游戏')
        .fontSize(20)
        .fontColor('#aaaaaa')
        .margin({ top: 40 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#000000')
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.currentPage = GamePage.NAME_INPUT
    })
  }
}
