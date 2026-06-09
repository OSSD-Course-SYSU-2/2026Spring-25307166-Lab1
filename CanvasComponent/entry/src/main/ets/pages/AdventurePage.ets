import { GamePage } from '../model/GameTypes'
import { GameManager } from '../model/GameManager'
import { AdventureLocations, AdventureLocation, AdventureEvent, getRandomEvent, rollDice, getRandomDialogue, AdventureResult, EventReward, EventFailure } from '../model/Adventure'
import { AllMaterials, MaterialData, getMaterialById } from '../model/Material'
import { Item, AllItems, getItemById } from '../model/Item'

@Component
export struct AdventurePage {
  @Link currentPage: GamePage
  @State selectedLocation: AdventureLocation | null = null
  @State showResult: boolean = false
  @State adventureResult: AdventureResult | null = null
  @State showItemSelection: boolean = false
  @State selectedItems: string[] = []
  @State showNoStaminaDialog: boolean = false
  @State currentStamina: number = 0
  @State currentGold: number = 0
  
  private gameManager: GameManager = GameManager.getInstance()
  private staminaTimer: number = -1
  
  aboutToAppear() {
    this.currentStamina = this.gameManager.getUserState().stamina
    this.currentGold = this.gameManager.getUserState().gold
    this.startStaminaRecovery()
  }
  
  aboutToDisappear() {
    if (this.staminaTimer !== -1) {
      clearInterval(this.staminaTimer)
    }
  }
  
  startStaminaRecovery() {
    this.staminaTimer = setInterval(() => {
      const state = this.gameManager.getUserState()
      this.currentStamina = state.stamina
      this.currentGold = state.gold
    }, 1000)
  }
  
  build() {
    Column() {
      Row() {
        Button('返回')
          .onClick(() => {
            this.currentPage = GamePage.MAIN
          })
        
        Text('⚔ 冒险探索 ⚔')
          .fontSize(24)
          .fontColor(Color.White)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
        
        Column() {
          Text(`💰${this.currentGold}`)
            .fontSize(16)
            .fontColor('#FFD700')
          Text(`⚡${this.currentStamina}/${this.gameManager.getUserState().maxStamina}`)
            .fontSize(14)
            .fontColor('#00ff88')
          Text('☽')
            .fontSize(12)
            .fontColor('rgba(255, 215, 0, 0.5)')
        }
      }
      .width('90%')
      .padding(15)
      
      this.UserStatusPanel()
      
      Text('选择冒险地点')
        .fontSize(20)
        .fontColor('#aaaaaa')
        .margin({ top: 15, bottom: 10 })
      
      Scroll() {
        Column() {
          ForEach(AdventureLocations, (location: AdventureLocation) => {
            this.LocationCard(location)
          })
        }
        .width('100%')
      }
      .width('90%')
      .layoutWeight(1)
      .scrollBar(BarState.On)
      .edgeEffect(EdgeEffect.Spring)
      .margin({ top: 10 })
      
      if (this.showResult && this.adventureResult) {
        this.ResultDialog()
      }
      
      if (this.showItemSelection) {
        this.ItemSelectionDialog()
      }
      
      if (this.showNoStaminaDialog) {
        this.NoStaminaDialog()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#1a1a1a')
  }
  
  @Builder
  UserStatusPanel() {
    Column() {
      Row() {
        Text(`战斗力: ${this.gameManager.getUserState().combatPower}`)
          .fontSize(14)
          .fontColor('#ff6666')
          .layoutWeight(1)
        
        Text(`交际: ${this.gameManager.getUserState().social}`)
          .fontSize(14)
          .fontColor('#66ff66')
          .layoutWeight(1)
        
        Text(`幸运: ${this.gameManager.getUserState().luck}`)
          .fontSize(14)
          .fontColor('#6666ff')
          .layoutWeight(1)
      }
      .width('90%')
      .padding({ top: 5, bottom: 5 })
    }
    .width('90%')
    .backgroundColor('rgba(40, 40, 40, 0.8)')
    .borderRadius(8)
    .padding(8)
  }
  
  @Builder
  LocationCard(location: AdventureLocation) {
    Column() {
      Row() {
        Column() {
          Text(location.name)
            .fontSize(22)
            .fontColor('#FFD700')
            .fontWeight(FontWeight.Bold)
          
          Text(location.description)
            .fontSize(14)
            .fontColor('#aaaaaa')
            .margin({ top: 5 })
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Start)
        
        Column() {
          Text(`危险: ${location.danger}`)
            .fontSize(14)
            .fontColor(this.getDangerColor(location.danger))
          
          Text(`💰${location.cost}`)
            .fontSize(16)
            .fontColor('#FFD700')
            .margin({ top: 5 })
        }
      }
      .width('100%')
      
      Text(`主要收获: ${this.getMaterialNames(location.mainReward)}`)
        .fontSize(14)
        .fontColor('#88ccff')
        .margin({ top: 10 })
      
      Text(location.features)
        .fontSize(12)
        .fontColor('#666666')
        .margin({ top: 5 })
      
      Row() {
        Button('使用物品')
          .width('45%')
          .height(40)
          .backgroundColor('#4a90e2')
          .onClick(() => {
            this.showItemSelection = true
          })
        
        Button('出发冒险')
          .width('45%')
          .height(40)
          .backgroundColor(this.canAdventure(location) ? '#4CAF50' : '#666666')
          .enabled(this.canAdventure(location))
          .onClick(() => {
            this.startAdventure(location)
          })
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({ top: 10 })
    }
    .width('100%')
    .padding(15)
    .backgroundColor('rgba(50, 50, 50, 0.9)')
    .borderRadius(10)
    .margin({ bottom: 15 })
  }
  
  @Builder
  ItemSelectionDialog() {
    Column() {
      Text('选择物品（最多3种）')
        .fontSize(20)
        .fontColor('#FFD700')
        .margin({ bottom: 15 })
      
      Column() {
        ForEach(AllItems.filter(item => item.usableInAdventure), (item: Item) => {
          Row() {
            Text(`${item.icon} ${item.name}`)
              .fontSize(16)
              .fontColor(Color.White)
              .layoutWeight(1)
            
            Text(`x${this.gameManager.getItemCount(item.id)}`)
              .fontSize(14)
              .fontColor('#aaaaaa')
            
            Toggle({ type: ToggleType.Checkbox, isOn: this.selectedItems.includes(item.id) })
              .onChange((isOn: boolean) => {
                if (isOn && this.selectedItems.length < 3) {
                  this.selectedItems.push(item.id)
                } else if (!isOn) {
                  this.selectedItems = this.selectedItems.filter(id => id !== item.id)
                }
              })
              .enabled(this.gameManager.getItemCount(item.id) > 0)
          }
          .width('100%')
          .padding(10)
        })
      }
      .width('100%')
      .height('50%')
      
      Row() {
        Button('取消')
          .width('45%')
          .backgroundColor('#666666')
          .onClick(() => {
            this.showItemSelection = false
          })
        
        Button('确定')
          .width('45%')
          .backgroundColor('#4CAF50')
          .onClick(() => {
            this.selectedItems.forEach(itemId => {
              this.gameManager.useItem(itemId)
            })
            this.selectedItems = []
            this.showItemSelection = false
          })
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({ top: 20 })
    }
    .width('80%')
    .padding(20)
    .backgroundColor('rgba(30, 30, 30, 0.98)')
    .borderRadius(15)
  }
  
  @Builder
  ResultDialog() {
    Column() {
      Text(this.getResultTitle())
        .fontSize(24)
        .fontColor(this.getResultTitleColor())
        .margin({ bottom: 15 })
      
      if (this.adventureResult) {
        Column() {
          Text(`骰子: ${this.adventureResult.diceRoll}`)
            .fontSize(16)
            .fontColor('#aaaaaa')
          
          Text(`判定值: ${this.adventureResult.userValue}`)
            .fontSize(16)
            .fontColor('#aaaaaa')
            .margin({ top: 5 })
        }
        .margin({ bottom: 15 })
        
        Text(this.adventureResult.message)
          .fontSize(16)
          .fontColor(Color.White)
          .textAlign(TextAlign.Center)
          .padding({ left: 20, right: 20 })
          .margin({ bottom: 15 })
        
        this.RewardsPanel()
      }
      
      Button('确定')
        .width('60%')
        .height(50)
        .backgroundColor('#4a90e2')
        .margin({ top: 20 })
        .onClick(() => {
          this.showResult = false
          this.adventureResult = null
        })
    }
    .width('80%')
    .padding(20)
    .backgroundColor('rgba(30, 30, 30, 0.98)')
    .borderRadius(15)
    .justifyContent(FlexAlign.Center)
  }
  
  @Builder
  RewardsPanel() {
    if (this.adventureResult && (this.adventureResult.success || this.adventureResult.criticalSuccess)) {
      Column() {
        Text('获得奖励:')
          .fontSize(16)
          .fontColor('#FFD700')
          .margin({ bottom: 10 })
        
        if (this.adventureResult.rewards.materialId) {
          Text(`${getMaterialById(this.adventureResult.rewards.materialId)?.name || ''} x${this.adventureResult.rewards.materialAmount}`)
            .fontSize(14)
            .fontColor('#88ccff')
        }
        
        if (this.adventureResult.rewards.gold) {
          Text(`金币 +${this.adventureResult.rewards.gold}`)
            .fontSize(14)
            .fontColor('#FFD700')
        }
      }
      .width('100%')
      .padding(10)
      .backgroundColor('rgba(60, 60, 60, 0.8)')
      .borderRadius(8)
    }
  }
  
  @Builder
  NoStaminaDialog() {
    Column() {
      Text('体力不足！')
        .fontSize(24)
        .fontColor('#ff6666')
        .margin({ bottom: 20 })
      
      Text('你的体力已经耗尽，无法继续冒险。\n请等待体力恢复（每3分钟恢复1点）\n或使用体力恢复物品。')
        .fontSize(16)
        .fontColor(Color.White)
        .textAlign(TextAlign.Center)
        .padding({ left: 20, right: 20 })
      
      Button('确定')
        .width('60%')
        .height(50)
        .backgroundColor('#4a90e2')
        .margin({ top: 30 })
        .onClick(() => {
          this.showNoStaminaDialog = false
        })
    }
    .width('80%')
    .padding(30)
    .backgroundColor('rgba(30, 30, 30, 0.98)')
    .borderRadius(15)
  }
  
  canAdventure(location: AdventureLocation): boolean {
    return this.gameManager.canAdventure() && this.gameManager.getUserState().gold >= location.cost
  }
  
  getMaterialNames(colorTypes: string[]): string {
    return colorTypes.join('、') + '系材料'
  }
  
  getDangerColor(danger: string): string {
    if (danger === '中等') return '#ffcc00'
    if (danger === '较高') return '#ff9900'
    if (danger === '高') return '#ff6600'
    if (danger === '极高') return '#ff3300'
    return '#ffffff'
  }
  
  getResultTitle(): string {
    if (!this.adventureResult) return ''
    if (this.adventureResult.criticalSuccess) return '大成功！'
    if (this.adventureResult.criticalFailure) return '大失败！'
    if (this.adventureResult.success) return '成功！'
    return '失败...'
  }
  
  getResultTitleColor(): string {
    if (!this.adventureResult) return '#ffffff'
    if (this.adventureResult.criticalSuccess) return '#FFD700'
    if (this.adventureResult.criticalFailure) return '#ff3300'
    if (this.adventureResult.success) return '#4CAF50'
    return '#ff6666'
  }
  
  startAdventure(location: AdventureLocation) {
    if (!this.gameManager.canAdventure()) {
      this.showNoStaminaDialog = true
      return
    }
    
    this.gameManager.addGold(-location.cost)
    this.gameManager.useStamina(1)
    this.currentStamina = this.gameManager.getUserState().stamina
    this.currentGold = this.gameManager.getUserState().gold
    
    const event = getRandomEvent(location)
    
    if (event) {
      this.adventureResult = this.processEvent(event)
    } else {
      this.adventureResult = this.processNormalAdventure(location)
    }
    
    this.showResult = true
  }
  
  processEvent(event: AdventureEvent): AdventureResult {
    const diceRoll = rollDice()
    const userValue = this.gameManager.getValueForCheck(event.checkType)
    
    const criticalSuccess = diceRoll === 100
    const criticalFailure = diceRoll === 1
    const success = diceRoll <= userValue && !criticalFailure
    
    let message = ''
    const rewards = event.rewards || { }
    const failures = event.failures || { staminaLoss: 10 }
    
    if (criticalSuccess) {
      message = getRandomDialogue(event.dialogues.criticalSuccess)
      if (rewards.materialId && rewards.materialAmount) {
        this.gameManager.addMaterial(rewards.materialId, rewards.materialAmount * 2)
      }
      if (rewards.gold) {
        this.gameManager.addGold(rewards.gold * 2)
      }
    } else if (criticalFailure) {
      message = getRandomDialogue(event.dialogues.criticalFailure)
      this.gameManager.useStamina(failures.staminaLoss * 2)
      if (failures.materialLoss) {
        this.gameManager.useMaterial(failures.materialLoss.materialId, failures.materialLoss.amount)
      }
      if (failures.goldLoss) {
        this.gameManager.addGold(-failures.goldLoss)
      }
    } else if (success) {
      message = getRandomDialogue(event.dialogues.success)
      if (rewards.materialId && rewards.materialAmount) {
        this.gameManager.addMaterial(rewards.materialId, rewards.materialAmount)
      }
      if (rewards.gold) {
        this.gameManager.addGold(rewards.gold)
      }
    } else {
      message = getRandomDialogue(event.dialogues.failure)
      this.gameManager.useStamina(failures.staminaLoss)
      if (failures.goldLoss) {
        this.gameManager.addGold(-failures.goldLoss)
      }
    }
    
    return {
      success: success,
      criticalSuccess: criticalSuccess,
      criticalFailure: criticalFailure,
      diceRoll: diceRoll,
      userValue: userValue,
      message: message,
      rewards: rewards,
      failures: failures
    }
  }
  
  processNormalAdventure(location: AdventureLocation): AdventureResult {
    const diceRoll = rollDice()
    const userValue = this.gameManager.getUserState().luck
    
    const success = diceRoll <= userValue
    
    let message = ''
    const rewards: EventReward = {}
    const failures: EventFailure = { staminaLoss: 0 }
    
    if (success) {
      const rewardType = location.mainReward[0]
      const materials = AllMaterials.filter(m => m.colorType === rewardType)
      if (materials.length > 0) {
        const material = materials[Math.floor(Math.random() * materials.length)]
        const amount = Math.floor(Math.random() * 3) + 1
        this.gameManager.addMaterial(material.id, amount)
        rewards.materialId = material.id
        rewards.materialAmount = amount
        message = `探索成功！在${location.name}发现了${material.name}！`
      }
    } else {
      message = `探索${location.name}没有收获，但至少安全返回了。`
    }
    
    return {
      success: success,
      criticalSuccess: false,
      criticalFailure: false,
      diceRoll: diceRoll,
      userValue: userValue,
      message: message,
      rewards: rewards,
      failures: failures
    }
  }
}
