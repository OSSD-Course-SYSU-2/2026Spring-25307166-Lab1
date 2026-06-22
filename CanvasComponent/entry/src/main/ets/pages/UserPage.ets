import { GamePage } from '../model/GameTypes'
import { GameManager } from '../model/GameManager'
import { AllMaterials, MaterialData } from '../model/Material'
import { MaterialColorType, MaterialColors } from '../model/GameTypes'

@Component
export struct UserPage {
  @Link currentPage: GamePage
  @State showMaterials: boolean = true
  
  private gameManager: GameManager = GameManager.getInstance()
  
  build() {
    Column() {
      Row() {
        Button('返回')
          .onClick(() => {
            this.currentPage = GamePage.MAIN
          })
        
        Text('个人信息')
          .fontSize(24)
          .fontColor(Color.White)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
        
        Column()
          .width(60)
      }
      .width('90%')
      .padding(15)
      
      Column() {
        if (this.gameManager.getUserState().avatar) {
          Image(this.gameManager.getUserState().avatar)
            .width(100)
            .height(100)
            .borderRadius(50)
        } else {
          Column()
            .width(100)
            .height(100)
            .borderRadius(50)
            .backgroundColor('#333333')
        }
        
        Text(this.gameManager.getUserState().name)
          .fontSize(24)
          .fontColor(Color.White)
          .margin({ top: 15 })
        
        Text(`金币: ${this.gameManager.getUserState().gold}`)
          .fontSize(18)
          .fontColor('#FFD700')
          .margin({ top: 5 })
      }
      .width('100%')
      .padding(20)
      
      Row() {
        Button('材料背包')
          .backgroundColor(this.showMaterials ? '#4a90e2' : '#666666')
          .onClick(() => {
            this.showMaterials = true
          })
        
        Button('物品背包')
          .backgroundColor(!this.showMaterials ? '#4a90e2' : '#666666')
          .onClick(() => {
            this.showMaterials = false
          })
      }
      .width('90%')
      .justifyContent(FlexAlign.SpaceEvenly)
      .margin({ top: 10 })
      
      if (this.showMaterials) {
        this.MaterialsList()
      } else {
        this.ItemsList()
      }
      
      Column() {
        Button('🔧 测试功能：获得所有资源')
          .width('90%')
          .backgroundColor('#9c27b0')
          .onClick(() => {
            this.testGetAllResources()
          })
          .margin({ top: 20 })
        
        Button('💖 测试功能：NPC好感满值')
          .width('90%')
          .backgroundColor('#e91e63')
          .onClick(() => {
            this.testMaxNPCFavor()
          })
          .margin({ top: 10 })
        
        Button('注销')
          .width('90%')
          .backgroundColor('#f44336')
          .onClick(() => {
            this.currentPage = GamePage.INTRO
          })
          .margin({ top: 10 })
        
        Button('重启游戏')
          .width('90%')
          .backgroundColor('#ff9800')
          .onClick(() => {
            this.currentPage = GamePage.INTRO
          })
          .margin({ top: 10 })
      }
      .width('100%')
      .margin({ top: 20 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#1a1a1a')
  }
  
  @Builder
  MaterialsList() {
    List() {
      ForEach([
        MaterialColorType.RED,
        MaterialColorType.ORANGE,
        MaterialColorType.YELLOW,
        MaterialColorType.GREEN,
        MaterialColorType.CYAN,
        MaterialColorType.BLUE,
        MaterialColorType.PURPLE
      ], (colorType: MaterialColorType) => {
        ListItemGroup({ header: this.ColorTypeHeader(colorType) }) {
          ForEach(this.getMaterialsByColor(colorType), (material: MaterialData) => {
            ListItem() {
              Row() {
                Column()
                  .width(30)
                  .height(30)
                  .backgroundColor(this.getColorHex(colorType))
                  .borderRadius(15)
                
                Text(material.name)
                  .fontSize(16)
                  .fontColor(Color.White)
                  .margin({ left: 15 })
                  .layoutWeight(1)
                
                Text(`x${this.gameManager.getMaterialCount(material.id)}`)
                  .fontSize(16)
                  .fontColor('#FFD700')
              }
              .width('100%')
              .padding(10)
              .backgroundColor('rgba(50, 50, 50, 0.8)')
              .borderRadius(5)
              .margin({ bottom: 5 })
            }
          })
        }
      })
    }
    .width('90%')
    .layoutWeight(1)
    .margin({ top: 15 })
  }
  
  @Builder
  ItemsList() {
    Column() {
      if (this.gameManager.getUserState().items.size > 0) {
        List() {
          ForEach(Array.from(this.gameManager.getUserState().items.entries()), (entry: [string, number]) => {
            ListItem() {
              Row() {
                Text(entry[0])
                  .fontSize(16)
                  .fontColor(Color.White)
                  .layoutWeight(1)
                
                Text(`x${entry[1]}`)
                  .fontSize(16)
                  .fontColor('#FFD700')
              }
              .width('100%')
              .padding(10)
              .backgroundColor('rgba(50, 50, 50, 0.8)')
              .borderRadius(5)
              .margin({ bottom: 5 })
            }
          })
        }
        .width('100%')
        .layoutWeight(1)
      } else {
        Column() {
          Text('暂无物品')
            .fontSize(18)
            .fontColor('#aaaaaa')
        }
        .width('100%')
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
      }
    }
    .width('90%')
    .layoutWeight(1)
    .margin({ top: 15 })
  }
  
  @Builder
  ColorTypeHeader(colorType: MaterialColorType) {
    Row() {
      Text(colorType)
        .fontSize(16)
        .fontColor(this.getColorHex(colorType))
        .fontWeight(FontWeight.Bold)
    }
    .width('100%')
    .margin({ top: 15, bottom: 10 })
  }
  
  getColorHex(colorType: MaterialColorType): string {
    const color = MaterialColors[colorType]
    return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
  }
  
  testGetAllResources() {
    // 所有原材料100个
    AllMaterials.forEach((m: MaterialData) => {
      this.gameManager.addMaterial(m.id, 100)
    })
    
    // 所有物品10个
    const allItemIds = [
      'stamina_potion_small', 'stamina_potion_medium', 'stamina_potion_large',
      'social_perfume', 'lucky_cookie', 'material_magnet',
      'combat_elixir', 'luck_amulet', 'perception_potion', 'craftsmanship_boost',
      'super_stamina_potion', 'rage_elixir', 'wind_walk_potion', 'shadow_cloak',
      'ancient_blessing', 'phoenix_feather', 'divine_essence', 'world_tree_sap',
      'gold_coin_bag', 'mystic_orb', 'elemental_crystal', 'fortune_card',
      'mysticism_tome', 'craftsman_kit', 'explorer_compass'
    ]
    allItemIds.forEach((itemId: string) => {
      this.gameManager.addItem(itemId, 10)
    })
    
    // 大量金币
    this.gameManager.addGold(100000)
  }
  
  testMaxNPCFavor() {
    const npcIds = ['opaque', 'talia', 'paparacha', 'elder_wise', 'merchant_rare']
    npcIds.forEach((npcId: string) => {
      this.gameManager.getUserState().npcRelationships.set(npcId, {
        npcId: npcId,
        trust: 100,
        completedTasks: 10,
        currentTask: null
      })
    })
  }
  
  getMaterialsByColor(colorType: MaterialColorType): MaterialData[] {
    return AllMaterials.filter((m: MaterialData) => m.colorType === colorType)
  }
}
