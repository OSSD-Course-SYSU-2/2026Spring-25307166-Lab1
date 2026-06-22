import { GamePage } from '../model/GameTypes'
import { Commission } from '../model/GameState'
import { AllMaterials, MaterialData, getMaterialById } from '../model/Material'
import { GameManager } from '../model/GameManager'
import { AllItems, Item, getItemById } from '../model/Item'
import { MaterialColorType, MaterialColors } from '../model/GameTypes'
import { MaterialPatternDrawer } from '../common/utils/MaterialPatternDrawer'

interface ShopItem {
  type: 'material' | 'item'
  id: string
  price: number
  amount: number
}

@Component
export struct CommissionPage {
  @Link currentPage: GamePage
  @State commissions: Commission[] = []
  @State selectedCommission: Commission | null = null
  @State showDialog: boolean = false
  @State currentTab: number = 0
  @State showMerchant: boolean = false
  @State merchantItems: ShopItem[] = []
  @State merchantMessage: string = ''
  
  private gameManager: GameManager = GameManager.getInstance()
  private npcNames: string[] = ['炼金商人', '古老法师', '神秘旅者', '药剂大师', '元素使者']
  
  aboutToAppear() {
    this.generateCommissions()
    this.checkMerchant()
  }
  
  checkMerchant() {
    const merchantChance = Math.random() * 100
    if (merchantChance >= 20) {
      this.showMerchant = true
      this.generateMerchantItems()
    } else {
      this.showMerchant = false
      this.merchantMessage = '今天商人没有出摊'
    }
  }
  
  generateMerchantItems() {
    this.merchantItems = []
    
    const materialCount = Math.floor(Math.random() * 4) + 3
    for (let i = 0; i < materialCount; i++) {
      const material = AllMaterials[Math.floor(Math.random() * AllMaterials.length)]
      const rarity = material.difficulty
      let basePrice = 30
      if (rarity === '中等') basePrice = 50
      else if (rarity === '较高') basePrice = 80
      else if (rarity === '高') basePrice = 120
      else if (rarity === '极高') basePrice = 200
      
      const price = basePrice + Math.floor(Math.random() * 30)
      const amount = Math.floor(Math.random() * 5) + 3
      
      this.merchantItems.push({
        type: 'material',
        id: material.id,
        price: price,
        amount: amount
      })
    }
    
    const itemCount = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < itemCount; i++) {
      const item = AllItems[Math.floor(Math.random() * AllItems.length)]
      const rarity = item.rarity
      let basePrice = 50
      if (rarity === 'rare') basePrice = 150
      else if (rarity === 'epic') basePrice = 400
      else if (rarity === 'legendary') basePrice = 1000
      
      const price = basePrice + Math.floor(Math.random() * 100)
      const amount = Math.floor(Math.random() * 2) + 1
      
      this.merchantItems.push({
        type: 'item',
        id: item.id,
        price: price,
        amount: amount
      })
    }
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
              this.checkMerchant()
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
        
        Button('商人区')
          .backgroundColor(this.currentTab === 2 ? '#4a90e2' : '#666666')
          .onClick(() => {
            this.currentTab = 2
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
          } else if (this.currentTab === 1) {
            ForEach(this.gameManager.getUserState().acceptedCommissions, (commission: Commission) => {
              this.AcceptedCommissionCard(commission)
            })
            
            if (this.gameManager.getUserState().acceptedCommissions.length === 0) {
              Text('暂无已接受的委托')
                .fontSize(16)
                .fontColor('#aaaaaa')
                .margin({ top: 50 })
            }
          } else {
            this.MerchantArea()
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
  
  @Builder
  MerchantArea() {
    Column() {
      if (this.showMerchant) {
        Text('🏪 神秘商人 🏪')
          .fontSize(20)
          .fontColor('#FFD700')
          .fontWeight(FontWeight.Bold)
          .margin({ top: 20, bottom: 15 })
        
        Text(`金币: ${this.gameManager.getUserState().gold}`)
          .fontSize(16)
          .fontColor('#FFD700')
          .margin({ bottom: 15 })
        
        Text('售卖物品:')
          .fontSize(16)
          .fontColor('#aaaaaa')
          .margin({ bottom: 10 })
        
        ForEach(this.merchantItems, (shopItem: ShopItem) => {
          this.ShopItemCard(shopItem)
        })
      } else {
        Column() {
          Text('🏪')
            .fontSize(60)
            .margin({ top: 50 })
          
          Text(this.merchantMessage)
            .fontSize(18)
            .fontColor('#aaaaaa')
            .margin({ top: 20 })
          
          Text('商人可能明天会来，请明天再来看看吧。')
            .fontSize(14)
            .fontColor('#666666')
            .margin({ top: 10 })
        }
        .width('100%')
        .justifyContent(FlexAlign.Center)
      }
    }
    .width('100%')
  }
  
  @Builder
  ShopItemCard(shopItem: ShopItem) {
    Row() {
      if (shopItem.type === 'material') {
        Column() {
          Stack() {
            Canvas(new CanvasRenderingContext2D(new RenderingContextSettings(true)))
              .width(40)
              .height(40)
              .onReady(() => {
                const material = getMaterialById(shopItem.id)
                if (material) {
                  let ctx = new CanvasRenderingContext2D(new RenderingContextSettings(true))
                  ctx.clearRect(0, 0, 40, 40)
                  
                  const color = MaterialColors[material.colorType]
                  ctx.fillStyle = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
                  ctx.beginPath()
                  ctx.arc(20, 20, 18, 0, Math.PI * 2)
                  ctx.fill()
                  
                  MaterialPatternDrawer.drawPattern(ctx, shopItem.id, 20, 20, 15)
                }
              })
          }
          .width(40)
          .height(40)
        }
        .width(50)
      } else {
        Text(this.getItemIcon(shopItem.id))
          .fontSize(32)
          .width(50)
      }
      
      Column() {
        if (shopItem.type === 'material') {
          Text(getMaterialById(shopItem.id)?.name || '未知')
            .fontSize(14)
            .fontColor(Color.White)
        } else {
          Text(getItemById(shopItem.id)?.name || '未知')
            .fontSize(14)
            .fontColor(Color.White)
        }
        
        Text(`数量: ${shopItem.amount}`)
          .fontSize(12)
          .fontColor('#aaaaaa')
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)
      .margin({ left: 10 })
      
      Column() {
        Text(`💰${shopItem.price}`)
          .fontSize(14)
          .fontColor('#FFD700')
        
        Button('购买')
          .fontSize(12)
          .height(30)
          .backgroundColor(this.canBuy(shopItem) ? '#4CAF50' : '#666666')
          .enabled(this.canBuy(shopItem))
          .onClick(() => {
            this.buyItem(shopItem)
          })
      }
      .width(80)
    }
    .width('100%')
    .padding(10)
    .backgroundColor('rgba(50, 50, 50, 0.9)')
    .borderRadius(8)
    .margin({ bottom: 10 })
  }
  
  getItemIcon(itemId: string): string {
    const item = getItemById(itemId)
    return item ? item.icon : '📦'
  }
  
  canBuy(shopItem: ShopItem): boolean {
    return this.gameManager.getUserState().gold >= shopItem.price
  }
  
  buyItem(shopItem: ShopItem) {
    if (!this.canBuy(shopItem)) return
    
    this.gameManager.addGold(-shopItem.price)
    
    if (shopItem.type === 'material') {
      this.gameManager.addMaterial(shopItem.id, shopItem.amount)
    } else {
      this.gameManager.addItem(shopItem.id, shopItem.amount)
    }
    
    this.merchantItems = this.merchantItems.filter(item => item !== shopItem)
  }
}
