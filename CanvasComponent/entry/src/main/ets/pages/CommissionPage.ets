import { GamePage } from '../model/GameTypes'
import { Commission } from '../model/GameState'
import { AllMaterials, MaterialData } from '../model/Material'
import { GameManager } from '../model/GameManager'

@Component
export struct CommissionPage {
  @Link currentPage: GamePage
  @State commissions: Commission[] = []
  @State selectedCommission: Commission | null = null
  @State showDialog: boolean = false
  @State currentTab: number = 0
  
  private gameManager: GameManager = GameManager.getInstance()
  private npcNames: string[] = ['炼金商人', '古老法师', '神秘旅者', '药剂大师', '元素使者']
  
  aboutToAppear() {
    this.generateCommissions()
  }
  
  generateCommissions() {
    this.commissions = []
    const numCommissions = Math.floor(Math.random() * 3) + 2
    
    for (let i = 0; i < numCommissions; i++) {
      const material = AllMaterials[Math.floor(Math.random() * AllMaterials.length)]
      const commission: Commission = {
        id: `commission_${Date.now()}_${i}`,
        npcName: this.npcNames[Math.floor(Math.random() * this.npcNames.length)],
        requiredItem: material.id,
        requiredAmount: Math.floor(Math.random() * 5) + 1,
        reward: (Math.floor(Math.random() * 100) + 50) * 10,
        description: `需要${material.name}用于炼金实验`,
        deadline: Date.now() + 7 * 24 * 60 * 60 * 1000,
        isAccepted: false,
        isCompleted: false
      }
      this.commissions.push(commission)
    }
  }
  
  build() {
    Column() {
      Row() {
        Button('返回')
          .onClick(() => {
            this.currentPage = GamePage.MAIN
          })
        
        Text('📜 委托板 📜')
          .fontSize(24)
          .fontColor(Color.White)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
        
        Column() {
          Button('刷新')
            .height(30)
            .onClick(() => {
              this.generateCommissions()
            })
          Text('☾')
            .fontSize(12)
            .fontColor('rgba(255, 215, 0, 0.5)')
        }
      }
      .width('90%')
      .padding(15)
      
      Row() {
        Button('可接委托')
          .backgroundColor(this.currentTab === 0 ? '#4a90e2' : '#666666')
          .onClick(() => {
            this.currentTab = 0
          })
        
        Button('已接委托')
          .backgroundColor(this.currentTab === 1 ? '#4a90e2' : '#666666')
          .onClick(() => {
            this.currentTab = 1
          })
      }
      .width('90%')
      .justifyContent(FlexAlign.SpaceEvenly)
      .margin({ top: 10 })
      
      Scroll() {
        Column() {
          if (this.currentTab === 0) {
            ForEach(this.commissions, (commission: Commission) => {
              this.CommissionCard(commission)
            })
          } else {
            ForEach(this.gameManager.getUserState().acceptedCommissions, (commission: Commission) => {
              this.AcceptedCommissionCard(commission)
            })
            
            if (this.gameManager.getUserState().acceptedCommissions.length === 0) {
              Text('暂无已接受的委托')
                .fontSize(16)
                .fontColor('#aaaaaa')
                .margin({ top: 50 })
            }
          }
        }
        .width('100%')
      }
      .width('90%')
      .layoutWeight(1)
      .margin({ top: 20 })
      .scrollBar(BarState.On)
      .edgeEffect(EdgeEffect.Spring)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#1a1a1a')
  }
  
  @Builder
  CommissionCard(commission: Commission) {
    Column() {
      Row() {
        Text(commission.npcName)
          .fontSize(20)
          .fontColor('#FFD700')
          .fontWeight(FontWeight.Bold)
        
        if (commission.isAccepted && !commission.isCompleted) {
          Text('进行中')
            .fontSize(14)
            .fontColor('#4CAF50')
            .margin({ left: 10 })
        }
      }
      .width('100%')
      .justifyContent(FlexAlign.Start)
      
      Text(commission.description)
        .fontSize(16)
        .fontColor(Color.White)
        .margin({ top: 10 })
      
      Row() {
        Text(`需要: ${this.getMaterialName(commission.requiredItem)} x${commission.requiredAmount}`)
          .fontSize(14)
          .fontColor('#aaaaaa')
        
        Text(`奖励: ${commission.reward}金币`)
          .fontSize(14)
          .fontColor('#FFD700')
          .margin({ left: 20 })
      }
      .width('100%')
      .margin({ top: 10 })
      
      if (!commission.isAccepted) {
        Row() {
          Button('接受')
            .backgroundColor('#4CAF50')
            .onClick(() => {
              this.gameManager.acceptCommission(commission)
              this.commissions = this.commissions.filter(c => c.id !== commission.id)
            })
          
          Button('拒绝')
            .backgroundColor('#f44336')
            .margin({ left: 20 })
            .onClick(() => {
              this.commissions = this.commissions.filter(c => c.id !== commission.id)
            })
        }
        .width('100%')
        .justifyContent(FlexAlign.End)
        .margin({ top: 10 })
      }
    }
    .width('100%')
    .padding(20)
    .backgroundColor('rgba(50, 50, 50, 0.9)')
    .borderRadius(10)
    .margin({ bottom: 15 })
  }
  
  @Builder
  AcceptedCommissionCard(commission: Commission) {
    Column() {
      Row() {
        Text(commission.npcName)
          .fontSize(20)
          .fontColor('#FFD700')
          .fontWeight(FontWeight.Bold)
        
        if (commission.isCompleted) {
          Text('已完成')
            .fontSize(14)
            .fontColor('#4CAF50')
            .margin({ left: 10 })
        } else {
          Text(this.getTimeRemaining(commission.deadline))
            .fontSize(14)
            .fontColor(this.getTimeColor(commission.deadline))
            .margin({ left: 10 })
        }
      }
      .width('100%')
      .justifyContent(FlexAlign.Start)
      
      Text(commission.description)
        .fontSize(16)
        .fontColor(Color.White)
        .margin({ top: 10 })
      
      Row() {
        Text(`需要: ${this.getMaterialName(commission.requiredItem)} x${commission.requiredAmount}`)
          .fontSize(14)
          .fontColor('#aaaaaa')
        
        Text(`奖励: ${commission.reward}金币`)
          .fontSize(14)
          .fontColor('#FFD700')
          .margin({ left: 20 })
      }
      .width('100%')
      .margin({ top: 10 })
      
      if (!commission.isCompleted) {
        Row() {
          Button('提交')
            .backgroundColor(this.canComplete(commission) ? '#4CAF50' : '#666666')
            .enabled(this.canComplete(commission))
            .onClick(() => {
              this.completeCommission(commission)
            })
          
          Button('放弃')
            .backgroundColor('#f44336')
            .margin({ left: 20 })
            .onClick(() => {
              this.abandonCommission(commission)
            })
        }
        .width('100%')
        .justifyContent(FlexAlign.End)
        .margin({ top: 10 })
      }
    }
    .width('100%')
    .padding(20)
    .backgroundColor('rgba(50, 50, 50, 0.9)')
    .borderRadius(10)
    .margin({ bottom: 15 })
  }
  
  getMaterialName(id: string): string {
    const material = AllMaterials.find((m: MaterialData) => m.id === id)
    return material ? material.name : '未知材料'
  }
  
  getTimeRemaining(deadline: number): string {
    const remaining = deadline - Date.now()
    if (remaining <= 0) return '已超时'
    
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000))
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    
    if (days > 0) return `剩余${days}天${hours}时`
    if (hours > 0) return `剩余${hours}小时`
    return '即将超时'
  }
  
  getTimeColor(deadline: number): string {
    const remaining = deadline - Date.now()
    const days = remaining / (24 * 60 * 60 * 1000)
    
    if (days <= 0) return '#ff3333'
    if (days <= 1) return '#ff9900'
    if (days <= 3) return '#ffcc00'
    return '#4CAF50'
  }
  
  canComplete(commission: Commission): boolean {
    return this.gameManager.getMaterialCount(commission.requiredItem) >= commission.requiredAmount
  }
  
  completeCommission(commission: Commission) {
    this.gameManager.useMaterial(commission.requiredItem, commission.requiredAmount)
    this.gameManager.completeCommission(commission.id)
  }
  
  abandonCommission(commission: Commission) {
    const userState = this.gameManager.getUserState()
    userState.acceptedCommissions = userState.acceptedCommissions.filter(c => c.id !== commission.id)
    const penalty = Math.floor(commission.reward * 0.2)
    this.gameManager.addGold(-penalty)
  }
}
