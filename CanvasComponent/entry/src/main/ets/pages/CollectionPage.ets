import { GamePage } from '../model/GameTypes'
import { GameManager } from '../model/GameManager'
import { AllMaterials, MaterialData } from '../model/Material'
import { MaterialColorType, MaterialColors } from '../model/GameTypes'

interface ItemDisplay {
  id: string
  name: string
  icon: string
  desc: string
  rarity: string
}

@Component
export struct CollectionPage {
  @Link currentPage: GamePage
  @State selectedMaterial: MaterialData | null = null
  @State showDetail: boolean = false
  @State currentTab: number = 0
  
  private gameManager: GameManager = GameManager.getInstance()
  
  build() {
    Column() {
      Row() {
        Button('返回')
          .onClick(() => {
            this.currentPage = GamePage.MAIN
          })
        
        Text('炼金图鉴')
          .fontSize(24)
          .fontColor(Color.White)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
        
        Column()
          .width(60)
      }
      .width('90%')
      .padding(15)
      
      Row() {
        Button('材料')
          .backgroundColor(this.currentTab === 0 ? '#4a90e2' : '#666666')
          .onClick(() => {
            this.currentTab = 0
          })
        
        Button('物品')
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
            ForEach([
              MaterialColorType.RED,
              MaterialColorType.ORANGE,
              MaterialColorType.YELLOW,
              MaterialColorType.GREEN,
              MaterialColorType.CYAN,
              MaterialColorType.BLUE,
              MaterialColorType.PURPLE
            ], (colorType: MaterialColorType) => {
              Column() {
                Text(colorType)
                  .fontSize(16)
                  .fontColor(this.getColorHex(colorType))
                  .fontWeight(FontWeight.Bold)
                  .margin({ bottom: 10 })
                
                Grid() {
                  ForEach(this.getMaterialsByColorType(colorType), (material: MaterialData) => {
                    GridItem() {
                      this.MaterialCard(material)
                    }
                  })
                }
                .columnsTemplate('1fr 1fr 1fr 1fr')
                .rowsGap(10)
                .columnsGap(10)
                .width('100%')
              }
              .width('90%')
              .margin({ bottom: 20 })
            })
          } else {
            this.ItemsList()
          }
        }
        .width('100%')
      }
      .width('100%')
      .layoutWeight(1)
      .scrollBar(BarState.On)
      .edgeEffect(EdgeEffect.Spring)
      
      if (this.showDetail && this.selectedMaterial) {
        this.MaterialDetailSheet()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#1a1a1a')
  }
  
  @Builder
  MaterialCard(material: MaterialData) {
    Column() {
      Column()
        .width(50)
        .height(50)
        .backgroundColor(this.getColorHex(material.colorType))
        .borderRadius(25)
      
      Text(material.name)
        .fontSize(11)
        .fontColor(Color.White)
        .maxLines(1)
        .margin({ top: 5 })
      
      Text(`x${this.gameManager.getMaterialCount(material.id)}`)
        .fontSize(10)
        .fontColor('#FFD700')
    }
    .width('100%')
    .padding(8)
    .backgroundColor('rgba(60, 60, 60, 0.9)')
    .borderRadius(8)
    .onClick(() => {
      this.selectedMaterial = material
      this.showDetail = true
    })
  }
  
  @Builder
  ItemsList() {
    Column() {
      Text('炼金物品')
        .fontSize(18)
        .fontColor('#FFD700')
        .fontWeight(FontWeight.Bold)
        .margin({ top: 20, bottom: 15 })
      
      Grid() {
        ForEach([
          { id: 'stamina_potion_small', name: '小型体力药水', icon: '🧪', desc: '恢复5点体力', rarity: '普通' },
          { id: 'stamina_potion_large', name: '大型体力药水', icon: '⚗️', desc: '恢复15点体力', rarity: '稀有' },
          { id: 'combat_elixir', name: '战斗灵药', icon: '⚔️', desc: '战斗力+20', rarity: '稀有' },
          { id: 'social_perfume', name: '社交香水', icon: '🌸', desc: '交际+15', rarity: '普通' },
          { id: 'luck_amulet', name: '幸运护身符', icon: '🍀', desc: '幸运+25', rarity: '稀有' },
          { id: 'material_magnet', name: '材料磁石', icon: '🧲', desc: '掉落率+30%', rarity: '稀有' },
          { id: 'stamina_cake', name: '体力蛋糕', icon: '🎂', desc: '恢复10点体力', rarity: '普通' },
          { id: 'ancient_blessing', name: '远古祝福', icon: '✨', desc: '全面提升', rarity: '传说' }
        ], (item: ItemDisplay) => {
          GridItem() {
            Column() {
              Text(item.icon)
                .fontSize(32)
              
              Text(item.name)
                .fontSize(12)
                .fontColor(Color.White)
                .maxLines(1)
                .margin({ top: 5 })
              
              Text(item.rarity)
                .fontSize(10)
                .fontColor(this.getRarityColor(item.rarity))
              
              Text(`拥有: ${this.gameManager.getItemCount(item.id)}`)
                .fontSize(10)
                .fontColor('#aaaaaa')
            }
            .width('100%')
            .padding(8)
            .backgroundColor('rgba(60, 60, 60, 0.9)')
            .borderRadius(8)
          }
        })
      }
      .columnsTemplate('1fr 1fr 1fr 1fr')
      .rowsGap(10)
      .columnsGap(10)
      .width('100%')
    }
    .width('90%')
  }
  
  getRarityColor(rarity: string): string {
    switch (rarity) {
      case '传说': return '#FFD700'
      case '史诗': return '#FF00FF'
      case '稀有': return '#00BFFF'
      case '优秀': return '#00FF00'
      default: return '#FFFFFF'
    }
  }
  
  @Builder
  MaterialDetailSheet() {
    Column() {
      Row() {
        Text('材料详情')
          .fontSize(20)
          .fontColor(Color.White)
        
        Button('关闭')
          .onClick(() => {
            this.showDetail = false
          })
      }
      .width('90%')
      .justifyContent(FlexAlign.SpaceBetween)
      .padding(20)
      
      if (this.selectedMaterial) {
        Column() {
          Column()
            .width(80)
            .height(80)
            .backgroundColor(this.getColorHex(this.selectedMaterial.colorType))
            .borderRadius(40)
          
          Text(this.selectedMaterial.name)
            .fontSize(24)
            .fontColor(Color.White)
            .margin({ top: 15 })
          
          Column() {
            this.DetailRow('产地', this.selectedMaterial.origin)
            this.DetailRow('属性', this.selectedMaterial.property)
            this.DetailRow('效果', this.selectedMaterial.effect)
            this.DetailRow('传说', this.selectedMaterial.legend)
            this.DetailRow('获取难度', this.selectedMaterial.difficulty)
          }
          .width('90%')
          .margin({ top: 20 })
        }
        .width('100%')
        .layoutWeight(1)
      }
    }
    .width('100%')
    .height('70%')
    .backgroundColor('rgba(20, 20, 20, 0.98)')
    .borderRadius({ topLeft: 20, topRight: 20 })
    .position({ x: 0, y: '30%' })
  }
  
  @Builder
  DetailRow(label: string, value: string) {
    Row() {
      Text(label + ':')
        .fontSize(14)
        .fontColor('#aaaaaa')
        .width(80)
      
      Text(value)
        .fontSize(14)
        .fontColor(Color.White)
        .layoutWeight(1)
    }
    .width('100%')
    .margin({ bottom: 10 })
    .alignItems(VerticalAlign.Top)
  }
  
  isUnlocked(materialId: string): boolean {
    return this.gameManager.getUserState().unlockedMaterials.has(materialId)
  }
  
  getMaterialsByColorType(colorType: MaterialColorType): MaterialData[] {
    return AllMaterials.filter((m: MaterialData) => m.colorType === colorType)
  }
  
  getColorHex(colorType: MaterialColorType): string {
    const color = MaterialColors[colorType]
    return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
  }
}
