import { GamePage } from '../model/GameTypes'
import { IntroPage } from './IntroPage'
import { NameInputPage } from './NameInputPage'
import { GameStoryPage } from './GameStoryPage'
import { MainPage } from './MainPage'
import { CommissionPage } from './CommissionPage'
import { AlchemyPage } from './AlchemyPage'
import { FormationWheelPage } from './FormationWheelPage'
import { CollectionPage } from './CollectionPage'
import { AdventurePage } from './AdventurePage'
import { NPCPage } from './NPCPage'
import { UserPage } from './UserPage'

@Entry
@Component
struct GameEntry {
  @State currentPage: GamePage = GamePage.INTRO
  @State avatarImage: string = ''

  build() {
    Column() {
      if (this.currentPage === GamePage.INTRO) {
        IntroPage({ currentPage: $currentPage })
      } else if (this.currentPage === GamePage.NAME_INPUT) {
        NameInputPage({ currentPage: $currentPage, avatarImage: $avatarImage })
      } else if (this.currentPage === GamePage.GAME_STORY) {
        GameStoryPage({ currentPage: $currentPage })
      } else if (this.currentPage === GamePage.MAIN) {
        MainPage({ currentPage: $currentPage })
      } else if (this.currentPage === GamePage.COMMISSION) {
        CommissionPage({ currentPage: $currentPage })
      } else if (this.currentPage === GamePage.ALCHEMY) {
        AlchemyPage({ currentPage: $currentPage })
      } else if (this.currentPage === GamePage.FORMATION_WHEEL) {
        FormationWheelPage({ currentPage: $currentPage })
      } else if (this.currentPage === GamePage.COLLECTION) {
        CollectionPage({ currentPage: $currentPage })
      } else if (this.currentPage === GamePage.USER) {
        UserPage({ currentPage: $currentPage })
      } else if (this.currentPage === GamePage.ADVENTURE) {
        AdventurePage({ currentPage: $currentPage })
      } else if (this.currentPage === GamePage.NPC) {
        NPCPage({ currentPage: $currentPage })
      }
    }
    .width('100%')
    .height('100%')
  }
}
