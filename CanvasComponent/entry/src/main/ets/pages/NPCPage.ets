import { GamePage } from '../model/GameTypes'
import { GameManager } from '../model/GameManager'
import { FixedNPCs, FixedNPC, getStoryByTrust, NPCStory } from '../model/NPC'
import { AllRecipes, AlchemyRecipe } from '../model/AlchemyRecipe'
import { NPCAvatar } from '../components/NPCAvatar'

@Component
export struct NPCPage {
  @Link currentPage: GamePage
  @State selectedNPC: FixedNPC | null = null
  @State showStory: boolean = false
  @State currentStory: NPCStory | null = null
  @State currentRecipe: AlchemyRecipe | null = null
  
  private gameManager: GameManager = GameManager.getInstance()
  
  build() {
    Column() {
      Row() {
        Button('返回')
          .onClick(() => {
            this.currentPage = GamePage.MAIN
          })
        
        Text('炼金术师公会')
          .fontSize(24)
          .fontColor(Color.White)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
        
        Column()
          .width(60)
      }
      .width('90%')
      .padding(15)
      
      if (!this.selectedNPC) {
        Column() {
          ForEach(FixedNPCs, (npc: FixedNPC) => {
            this.NPCCard(npc)
          })
        }
        .width('90%')
        .layoutWeight(1)
        .margin({ top: 20 })
      } else {
        this.NPCDetail()
      }
      
      if (this.showStory && this.currentStory) {
        this.StoryDialog()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#1a1a1a')
  }
  
  @Builder
  NPCCard(npc: FixedNPC) {
    Column() {
      Row() {
        NPCAvatar({ npcId: npc.id, avatarSize: 80 })
        
        Column() {
          Text(npc.name)
            .fontSize(20)
            .fontColor('#FFD700')
            .fontWeight(FontWeight.Bold)
          
          Text(npc.description)
            .fontSize(14)
            .fontColor('#aaaaaa')
            .margin({ top: 5 })
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Start)
        .margin({ left: 15 })
        
        Column() {
          Text(`好感: ${this.getTrust(npc.id)}`)
            .fontSize(16)
            .fontColor(this.getTrustColor(this.getTrust(npc.id)))
          
          if (this.getTrust(npc.id) >= 20) {
            Text('♥')
              .fontSize(20)
              .fontColor('#ff69b4')
          }
        }
      }
      .width('100%')
      
      Row() {
        Text(npc.personality)
          .fontSize(12)
          .fontColor('#888888')
        
        Text(npc.symbol)
          .fontSize(12)
          .fontColor('#666666')
          .margin({ left: 10 })
      }
      .width('100%')
      .margin({ top: 10 })
      
      Button('交流')
        .width('100%')
        .height(40)
        .backgroundColor('#4a90e2')
        .margin({ top: 10 })
        .onClick(() => {
          this.selectedNPC = npc
          this.currentRecipe = this.getRandomRecipe()
        })
    }
    .width('100%')
    .padding(15)
    .backgroundColor('rgba(50, 50, 50, 0.9)')
    .borderRadius(10)
    .margin({ bottom: 15 })
  }
  
  @Builder
  NPCDetail() {
    Column() {
      Row() {
        Button('返回')
          .onClick(() => {
            this.selectedNPC = null
          })
        
        Text(this.selectedNPC!.name)
          .fontSize(24)
          .fontColor('#FFD700')
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
        
        Column()
          .width(60)
      }
      .width('90%')
      .padding(15)
      
      Column() {
        NPCAvatar({ npcId: this.selectedNPC!.id, avatarSize: 120 })
        
        Text(this.selectedNPC!.description)
          .fontSize(16)
          .fontColor('#aaaaaa')
          .margin({ top: 15 })
        
        Row() {
          Text(`好感度: ${this.getTrust(this.selectedNPC!.id)}/100`)
            .fontSize(18)
            .fontColor(this.getTrustColor(this.getTrust(this.selectedNPC!.id)))
          
          if (this.getTrust(this.selectedNPC!.id) < 100) {
            Button('查看故事')
              .height(30)
              .backgroundColor('#9c27b0')
              .margin({ left: 20 })
              .onClick(() => {
                this.currentStory = getStoryByTrust(this.selectedNPC!, this.getTrust(this.selectedNPC!.id))
                if (this.currentStory) {
                  this.showStory = true
                }
              })
          } else {
            Text('已满好感')
              .fontSize(16)
              .fontColor('#ff69b4')
              .margin({ left: 20 })
          }
        }
        .margin({ top: 20 })
        
        Text(`任务特点: ${this.selectedNPC!.taskType}`)
          .fontSize(14)
          .fontColor('#888888')
          .margin({ top: 15 })
        
        Divider()
          .color('#333333')
          .margin({ top: 20, bottom: 20 })
        
        Text('当前委托')
          .fontSize(18)
          .fontColor(Color.White)
          .margin({ bottom: 10 })
        
        this.QuestPanel()
      }
      .width('90%')
      .layoutWeight(1)
    }
    .width('100%')
    .layoutWeight(1)
  }
  
  @Builder
  QuestPanel() {
    Column() {
      if (this.currentRecipe) {
        Text(`需求: ${this.currentRecipe.icon} ${this.currentRecipe.name}`)
          .fontSize(16)
          .fontColor('#ffcc00')
          .margin({ bottom: 10 })
        
        Text(this.currentRecipe.effect)
          .fontSize(14)
          .fontColor('#aaaaaa')
          .margin({ bottom: 15 })
        
        Text(`奖励: ${this.calculateReward(this.currentRecipe)} 金币`)
          .fontSize(18)
          .fontColor('#FFD700')
          .margin({ bottom: 20 })
        
        Row() {
          Button('接受委托')
            .backgroundColor('#4CAF50')
            .onClick(() => {
              this.acceptQuest(this.currentRecipe!)
            })
          
          Button('拒绝')
            .backgroundColor('#f44336')
            .margin({ left: 20 })
            .onClick(() => {
              this.selectedNPC = null
            })
        }
      }
    }
    .width('100%')
    .padding(20)
    .backgroundColor('rgba(40, 40, 40, 0.9)')
    .borderRadius(10)
  }
  
  @Builder
  StoryDialog() {
    Column() {
      Text(this.currentStory!.title)
        .fontSize(22)
        .fontColor('#FFD700')
        .margin({ bottom: 20 })
      
      Text(this.currentStory!.content)
        .fontSize(16)
        .fontColor(Color.White)
        .textAlign(TextAlign.Center)
        .padding({ left: 20, right: 20 })
      
      Button('确定')
        .width('60%')
        .height(50)
        .backgroundColor('#9c27b0')
        .margin({ top: 30 })
        .onClick(() => {
          this.showStory = false
        })
    }
    .width('80%')
    .padding(30)
    .backgroundColor('rgba(30, 30, 30, 0.98)')
    .borderRadius(15)
    .justifyContent(FlexAlign.Center)
  }
  
  getTrust(npcId: string): number {
    const relationships = this.gameManager.getUserState().npcRelationships
    const relationship = relationships.get(npcId)
    return relationship ? relationship.trust : 0
  }
  
  getTrustColor(trust: number): string {
    if (trust < 20) return '#888888'
    if (trust < 40) return '#aaaaaa'
    if (trust < 60) return '#ffcc00'
    if (trust < 80) return '#ff9900'
    return '#ff69b4'
  }
  
  getRandomRecipe(): AlchemyRecipe | null {
    const recipes = AllRecipes.filter(r => r.id !== 'magicless_water')
    return recipes[Math.floor(Math.random() * recipes.length)]
  }
  
  calculateReward(recipe: AlchemyRecipe): number {
    const baseReward = (recipe.rewardRange[0] + recipe.rewardRange[1]) / 2
    const trust = this.getTrust(this.selectedNPC!.id)
    const trustBonus = 1 + (trust / 100) * 0.5
    return Math.floor(baseReward * trustBonus)
  }
  
  acceptQuest(recipe: AlchemyRecipe) {
    this.addTrust(this.selectedNPC!.id, 5)
    const reward = this.calculateReward(recipe)
    this.gameManager.addGold(reward)
    this.selectedNPC = null
  }
  
  addTrust(npcId: string, amount: number) {
    const state = this.gameManager.getUserState()
    let relationship = state.npcRelationships.get(npcId)
    
    if (!relationship) {
      relationship = {
        npcId: npcId,
        trust: 0,
        completedTasks: 0,
        currentTask: null
      }
      state.npcRelationships.set(npcId, relationship)
    }
    
    relationship.trust = Math.min(100, relationship.trust + amount)
    relationship.completedTasks++
  }
}
