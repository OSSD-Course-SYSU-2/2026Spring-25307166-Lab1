import { GamePage } from '../model/GameTypes'
import { GameManager } from '../model/GameManager'
import { AllMaterials, MaterialData } from '../model/Material'
import { MaterialColorType, MaterialColors } from '../model/GameTypes'
import { MaterialPatternDrawer } from '../common/utils/MaterialPatternDrawer'
import { FixedNPCs, FixedNPC, NPCStory, NPCSpecialRecipes, NPCSpecialRecipe } from '../model/NPC'

interface ItemDisplay {
  id: string
  name: string
  icon: string
  desc: string
  rarity: string
  effect?: string
  usage?: string
  source?: string
  tip?: string
  story?: string
}

@Component
export struct CollectionPage {
  @Link currentPage: GamePage
  @State selectedMaterial: MaterialData | null = null
  @State selectedItem: ItemDisplay | null = null
  @State showDetail: boolean = false
  @State currentTab: number = 0
  @State selectedNPCStory: NPCStory | null = null
  @State selectedSpecialRecipe: NPCSpecialRecipe | null = null
  
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
        
        Button('NPC')
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
          } else if (this.currentTab === 1) {
            this.ItemsList()
          } else {
            this.NPCList()
          }
        }
        .width('100%')
      }
      .width('100%')
      .layoutWeight(1)
      .scrollBar(BarState.On)
      .edgeEffect(EdgeEffect.Spring)
      
      if (this.showDetail && (this.selectedMaterial || this.selectedItem)) {
        this.MaterialDetailSheet()
      }
      
      if (this.selectedNPCStory) {
        this.NPCStoryDialog()
      }
      
      if (this.selectedSpecialRecipe) {
        this.SpecialRecipeDialog()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#1a1a1a')
  }
  
  @Builder
  MaterialCard(material: MaterialData) {
    Column() {
      Stack() {
        Canvas(new CanvasRenderingContext2D(new RenderingContextSettings(true)))
          .width(50)
          .height(50)
          .onReady(() => {
            let ctx = new CanvasRenderingContext2D(new RenderingContextSettings(true))
            ctx.clearRect(0, 0, 50, 50)
            
            ctx.fillStyle = this.getColorHex(material.colorType)
            ctx.beginPath()
            ctx.arc(25, 25, 23, 0, Math.PI * 2)
            ctx.fill()
            
            MaterialPatternDrawer.drawPattern(ctx, material.id, 25, 25, 18)
          })
      }
      .width(50)
      .height(50)
      
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
      
      Scroll() {
        Grid() {
          ForEach([
            { id: 'stamina_potion_small', name: '小型体力药水', icon: '🧪', desc: '恢复5点体力', rarity: '普通', effect: '体力+5', usage: '冒险前使用', source: '炼金、商店', tip: '基础体力恢复道具', story: '炼金学徒的入门作品，蕴含着对生命力的初步理解' },
            { id: 'stamina_potion_medium', name: '中型体力药水', icon: '💊', desc: '恢复10点体力', rarity: '普通', effect: '体力+10', usage: '冒险前使用', source: '炼金、商店', tip: '稳定的体力恢复', story: '经过改良的配方，已成为冒险者的常备之物' },
            { id: 'stamina_potion_large', name: '大型体力药水', icon: '⚗️', desc: '恢复15点体力', rarity: '稀有', effect: '体力+15', usage: '冒险前使用', source: '炼金（紫月法阵）', tip: '高效的体力恢复', story: '紫月法阵的杰作，月光精华赋予其强大的恢复力' },
            { id: 'super_stamina_potion', name: '超级体力药水', icon: '🧬', desc: '恢复30点体力', rarity: '史诗', effect: '体力+30', usage: '冒险前使用', source: '高级炼金', tip: '强大的体力恢复', story: '传说中炼金大师的秘方，能瞬间恢复大量体力' },
            { id: 'combat_elixir', name: '战斗灵药', icon: '⚔️', desc: '战斗力+20，持续1小时', rarity: '稀有', effect: '战斗力+20', usage: '冒险中使用', source: '炼金（赤焰法阵）', tip: '提升战斗能力', story: '赤焰法阵的烈火淬炼而成，蕴含着战士的勇气' },
            { id: 'berserker_elixir', name: '狂暴灵药', icon: '🔥', desc: '战斗力+35，持续1小时', rarity: '史诗', effect: '战斗力+35', usage: '冒险中使用', source: '高级炼金', tip: '强大的战斗提升', story: '古代狂战士的秘药，能激发体内潜藏的力量' },
            { id: 'social_perfume', name: '社交香水', icon: '🌸', desc: '交际+15，持续1小时', rarity: '普通', effect: '交际+15', usage: '与NPC交流前使用', source: '炼金（翠风法阵）', tip: '提升NPC好感度', story: '翠风法阵的清风凝结，散发着自然的芬芳' },
            { id: 'luck_amulet', name: '幸运护身符', icon: '🍀', desc: '幸运+25，持续1小时', rarity: '稀有', effect: '幸运+25', usage: '冒险中使用', source: '炼金（幽蓝法阵）', tip: '提高暴击和掉落率', story: '幽蓝法阵的神秘力量，能扭转命运的轨迹' },
            { id: 'luck_cookie', name: '幸运饼干', icon: '🍪', desc: '幸运+10，持续30分钟', rarity: '普通', effect: '幸运+10', usage: '冒险中使用', source: '炼金、商店', tip: '小幅提升幸运', story: '古老的幸运符文被烘焙进饼干中，美味又实用' },
            { id: 'material_magnet', name: '材料磁石', icon: '🧲', desc: '材料掉落率+30%，持续1小时', rarity: '稀有', effect: '掉落率+30%', usage: '冒险前使用', source: '炼金（星辰命运阵）', tip: '增加材料获取', story: '星辰命运阵的星力凝聚，能吸引稀有的材料' },
            { id: 'stamina_cake', name: '体力蛋糕', icon: '🎂', desc: '恢复10点体力', rarity: '普通', effect: '体力+10', usage: '冒险前使用', source: '炼金（生命神树阵）', tip: '美味的体力恢复', story: '生命神树阵的自然之力，化作美味的生命蛋糕' },
            { id: 'combat_ration', name: '战斗口粮', icon: '🍖', desc: '战斗力+10，持续30分钟', rarity: '普通', effect: '战斗力+10', usage: '冒险中使用', source: '炼金、商店', tip: '基础的战斗提升', story: '军需官配发的标准战斗补给，简单但有效' },
            { id: 'energy_drink', name: '能量饮料', icon: '🥤', desc: '恢复8点体力', rarity: '普通', effect: '体力+8', usage: '冒险前使用', source: '商店', tip: '快速恢复体力', story: '现代炼金术的产物，蕴含着浓缩的能量精华' },
            { id: 'healing_herb', name: '治愈草药', icon: '🌿', desc: '恢复6点体力', rarity: '普通', effect: '体力+6', usage: '冒险前使用', source: '冒险掉落', tip: '天然的体力恢复', story: '生长在纯净之地的灵草，蕴含着自然的治愈之力' },
            { id: 'warrior_potion', name: '勇士药剂', icon: '💪', desc: '战斗力+15，幸运+10', rarity: '稀有', effect: '战斗力+15，幸运+10', usage: '冒险中使用', source: '炼金', tip: '综合提升战斗能力', story: '古代勇士出征前的祝福药剂，能带来勇气与好运' },
            { id: 'nature_blessing', name: '自然祝福', icon: '🍃', desc: '恢复12体力，交际+10', rarity: '稀有', effect: '体力+12，交际+10', usage: '冒险前使用', source: '炼金', tip: '自然之力加持', story: '自然精灵的祝福，能恢复体力并提升魅力' },
            { id: 'ocean_essence', name: '海洋精华', icon: '🌊', desc: '恢复18体力，幸运+15', rarity: '稀有', effect: '体力+18，幸运+15', usage: '冒险前使用', source: '炼金', tip: '海洋的力量', story: '深海中提取的精华，蕴含着海洋的神秘力量' },
            { id: 'moonlight_dew', name: '月光露珠', icon: '🌙', desc: '交际+20，幸运+15', rarity: '稀有', effect: '交际+20，幸运+15', usage: '与NPC交流前使用', source: '炼金', tip: '月光的祝福', story: '满月之夜收集的露珠，蕴含着月神的祝福' },
            { id: 'arcane_crystal', name: '奥术水晶', icon: '💎', desc: '战斗力+12，掉落率+20%', rarity: '稀有', effect: '战斗力+12，掉落率+20%', usage: '冒险中使用', source: '炼金', tip: '奥术能量结晶', story: '奥术能量凝结而成的晶体，能增强战斗和探索能力' },
            { id: 'wind_walk_potion', name: '风行药剂', icon: '💨', desc: '恢复20体力，交际+25', rarity: '史诗', effect: '体力+20，交际+25', usage: '冒险前使用', source: '高级炼金', tip: '风之精灵的祝福', story: '风之精灵的恩赐，能让人如风般轻盈自如' },
            { id: 'abyss_tear', name: '深渊之泪', icon: '💧', desc: '恢复25体力，掉落率+40%', rarity: '史诗', effect: '体力+25，掉落率+40%', usage: '冒险前使用', source: '深渊探索', tip: '深渊的神秘力量', story: '深渊领主的眼泪，蕴含着深渊的神秘力量' },
            { id: 'celestial_blessing', name: '天界祝福', icon: '⭐', desc: '恢复20体力，交际+30', rarity: '史诗', effect: '体力+20，交际+30', usage: '冒险前使用', source: '天界冒险', tip: '天界的神圣祝福', story: '天界神明的祝福，能带来强大的力量与魅力' },
            { id: 'ancient_blessing', name: '远古祝福', icon: '✨', desc: '全属性+30，持续2小时', rarity: '传说', effect: '全属性+30', usage: '随时使用', source: '炼金（虚空混沌阵）', tip: '远古神明的祝福', story: '远古神明留下的祝福，能全面提升使用者的能力' },
            { id: 'phoenix_feather', name: '凤凰之羽', icon: '🔥', desc: '冒险失败时自动复活', rarity: '史诗', effect: '自动复活', usage: '被动效果', source: '炼金（深渊召唤阵）', tip: '凤凰的重生之力', story: '不死凤凰的羽毛，蕴含着重生之力，能在危急时刻拯救生命' },
            { id: 'godly_essence', name: '神之精华', icon: '🌟', desc: '恢复40体力，全属性+40', rarity: '传说', effect: '体力+40，全属性+40', usage: '随时使用', source: '神级炼金', tip: '神明的精华凝聚', story: '神明精华的凝聚，能带来接近神明的力量' },
            { id: 'world_tree_sap', name: '世界树汁液', icon: '🌳', desc: '恢复50体力，掉落率+50%', rarity: '传说', effect: '体力+50，掉落率+50%', usage: '冒险前使用', source: '世界树', tip: '世界树的生命精华', story: '世界树的生命精华，蕴含着无穷的生命力与探索之力' }
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
              .onClick(() => {
                this.selectedItem = item
                this.showDetail = true
              })
            }
          })
        }
        .columnsTemplate('1fr 1fr 1fr 1fr')
        .rowsGap(10)
        .columnsGap(10)
        .width('100%')
      }
      .width('100%')
      .height('100%')
      .scrollBar(BarState.Off)
      .edgeEffect(EdgeEffect.Spring)
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
        Text(this.currentTab === 0 ? '材料详情' : '物品详情')
          .fontSize(20)
          .fontColor(Color.White)
        
        Button('关闭')
          .onClick(() => {
            this.showDetail = false
            this.selectedMaterial = null
            this.selectedItem = null
          })
      }
      .width('90%')
      .justifyContent(FlexAlign.SpaceBetween)
      .padding(20)
      
      if (this.currentTab === 0 && this.selectedMaterial) {
        Column() {
          Stack() {
            Canvas(new CanvasRenderingContext2D(new RenderingContextSettings(true)))
              .width(80)
              .height(80)
              .onReady(() => {
                if (this.selectedMaterial) {
                  let ctx = new CanvasRenderingContext2D(new RenderingContextSettings(true))
                  ctx.clearRect(0, 0, 80, 80)
                  
                  ctx.fillStyle = this.getColorHex(this.selectedMaterial.colorType)
                  ctx.beginPath()
                  ctx.arc(40, 40, 38, 0, Math.PI * 2)
                  ctx.fill()
                  
                  MaterialPatternDrawer.drawPattern(ctx, this.selectedMaterial.id, 40, 40, 30)
                }
              })
          }
          .width(80)
          .height(80)
          
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
      
      if (this.currentTab === 1 && this.selectedItem) {
        Column() {
          Text(this.selectedItem.icon)
            .fontSize(60)
          
          Text(this.selectedItem.name)
            .fontSize(24)
            .fontColor(Color.White)
            .margin({ top: 15 })
          
          Text(this.selectedItem.rarity)
            .fontSize(18)
            .fontColor(this.getRarityColor(this.selectedItem.rarity))
            .margin({ top: 10 })
          
          Column() {
            this.DetailRow('描述', this.selectedItem.desc)
            this.DetailRow('拥有数量', `${this.gameManager.getItemCount(this.selectedItem.id)}个`)
            
            if (this.selectedItem.effect) {
              this.DetailRow('效果', this.selectedItem.effect)
            }
            
            if (this.selectedItem.usage) {
              this.DetailRow('使用场景', this.selectedItem.usage)
            }
            
            if (this.selectedItem.source) {
              this.DetailRow('获取途径', this.selectedItem.source)
            }
            
            if (this.selectedItem.tip) {
              this.DetailRow('提示', this.selectedItem.tip)
            }
            
            if (this.selectedItem.story) {
              this.DetailRow('故事', this.selectedItem.story)
            }
            
            if (this.selectedItem.rarity === '传说') {
              this.DetailRow('特性', '极其珍贵，使用后获得强大效果')
            } else if (this.selectedItem.rarity === '史诗') {
              this.DetailRow('特性', '非常稀有，效果显著')
            } else if (this.selectedItem.rarity === '稀有') {
              this.DetailRow('特性', '较为稀有，效果良好')
            } else {
              this.DetailRow('特性', '常见物品，效果普通')
            }
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
  
  @Builder
  NPCList() {
    Column() {
      Text('NPC图鉴')
        .fontSize(18)
        .fontColor('#FFD700')
        .fontWeight(FontWeight.Bold)
        .margin({ top: 20, bottom: 15 })
      
      ForEach(FixedNPCs, (npc: FixedNPC) => {
        Column() {
          Row() {
            Text(npc.avatar)
              .fontSize(40)
            
            Column() {
              Text(npc.name)
                .fontSize(16)
                .fontColor(Color.White)
                .fontWeight(FontWeight.Bold)
              
              Text(npc.description)
                .fontSize(12)
                .fontColor('#aaaaaa')
                .margin({ top: 5 })
              
              Text(`好感度: ${this.gameManager.getNPCTrust(npc.id)}/100`)
                .fontSize(12)
                .fontColor('#FFD700')
                .margin({ top: 5 })
            }
            .alignItems(HorizontalAlign.Start)
            .layoutWeight(1)
            .margin({ left: 15 })
          }
          .width('90%')
          .padding(15)
          .backgroundColor('rgba(60, 60, 60, 0.9)')
          .borderRadius(8)
          .onClick(() => {
            this.selectedItem = {
              id: npc.id,
              name: npc.name,
              icon: npc.avatar,
              desc: npc.description,
              rarity: 'NPC',
              effect: npc.personality,
              usage: npc.taskType,
              source: npc.symbol,
              story: npc.stories.map(s => `【${s.title}】\n${s.content}${s.letter ? '\n\n信件:\n' + s.letter : ''}${s.specialRecipe ? '\n\n配方: ' + s.specialRecipe : ''}`).join('\n\n')
            }
            this.showDetail = true
          })
          
          if (this.gameManager.getNPCTrust(npc.id) >= 100) {
            Column() {
              Text('已解锁所有故事')
                .fontSize(12)
                .fontColor('#00FF00')
                .margin({ top: 5 })
              
              ForEach(npc.stories, (story: NPCStory) => {
                Row() {
                  if (story.letter) {
                    Button(`✉️ ${story.title}`)
                      .height(28)
                      .fontSize(11)
                      .backgroundColor('#4a90e2')
                      .margin({ top: 3, right: 5 })
                      .onClick(() => {
                        this.selectedNPCStory = story
                      })
                  }
                  if (story.specialRecipe) {
                    Button(`📜 ${this.getRecipeName(story.specialRecipe)}`)
                      .height(28)
                      .fontSize(11)
                      .backgroundColor('#9c27b0')
                      .margin({ top: 3 })
                      .onClick(() => {
                        const recipe = NPCSpecialRecipes.find(r => r.id === story.specialRecipe)
                        if (recipe) {
                          this.selectedSpecialRecipe = recipe
                        }
                      })
                  }
                }
                .width('100%')
                .justifyContent(FlexAlign.Center)
              })
            }
            .width('90%')
            .margin({ top: 5 })
          }
        }
        .width('100%')
        .margin({ bottom: 15 })
      })
    }
    .width('90%')
  }
  
  getRecipeName(recipeId: string): string {
    const recipe = NPCSpecialRecipes.find(r => r.id === recipeId)
    return recipe ? recipe.name : recipeId
  }
  
  @Builder
  NPCStoryDialog() {
    Column() {
      Text(this.selectedNPCStory!.title)
        .fontSize(22)
        .fontColor('#FFD700')
        .margin({ bottom: 20 })
      
      Scroll() {
        Column() {
          Text(this.selectedNPCStory!.content)
            .fontSize(16)
            .fontColor(Color.White)
            .textAlign(TextAlign.Center)
            .lineHeight(24)
            .padding({ left: 20, right: 20 })
            .margin({ bottom: 20 })
          
          if (this.selectedNPCStory!.letter) {
            Column() {
              Text('━━━━━━━━━━━━━━━')
                .fontSize(14)
                .fontColor('#666666')
                .margin({ bottom: 15 })
              
              Text('✉️ 信件')
                .fontSize(18)
                .fontColor('#FFD700')
                .margin({ bottom: 10 })
              
              Text(this.selectedNPCStory!.letter!)
                .fontSize(14)
                .fontColor('#aaaaaa')
                .lineHeight(22)
                .padding({ left: 20, right: 20 })
            }
          }
          
          if (this.selectedNPCStory!.specialRecipe) {
            Column() {
              Text('━━━━━━━━━━━━━━━')
                .fontSize(14)
                .fontColor('#666666')
                .margin({ top: 20, bottom: 15 })
              
              Text('📜 特殊配方')
                .fontSize(18)
                .fontColor('#FFD700')
                .margin({ bottom: 10 })
              
              Button(this.getRecipeName(this.selectedNPCStory!.specialRecipe!))
                .backgroundColor('#9c27b0')
                .onClick(() => {
                  const recipe = NPCSpecialRecipes.find(r => r.id === this.selectedNPCStory!.specialRecipe)
                  if (recipe) {
                    this.selectedSpecialRecipe = recipe
                  }
                })
            }
          }
        }
        .width('100%')
      }
      .width('100%')
      .layoutWeight(1)
      .scrollBar(BarState.Off)
      
      Button('关闭')
        .width('60%')
        .height(50)
        .backgroundColor('#666666')
        .margin({ top: 20 })
        .onClick(() => {
          this.selectedNPCStory = null
        })
    }
    .width('85%')
    .height('70%')
    .padding(20)
    .backgroundColor('rgba(30, 30, 30, 0.98)')
    .borderRadius(15)
  }
  
  @Builder
  SpecialRecipeDialog() {
    Column() {
      Text(this.selectedSpecialRecipe!.name)
        .fontSize(24)
        .fontColor('#FFD700')
        .margin({ bottom: 10 })
      
      Text(this.selectedSpecialRecipe!.icon)
        .fontSize(60)
        .margin({ bottom: 15 })
      
      Scroll() {
        Column() {
          Text('【传说配方】')
            .fontSize(16)
            .fontColor('#FF00FF')
            .margin({ bottom: 15 })
          
          Text(this.selectedSpecialRecipe!.description)
            .fontSize(16)
            .fontColor(Color.White)
            .textAlign(TextAlign.Center)
            .margin({ bottom: 20 })
          
          Text('━━━━━━━━━━━━━━━')
            .fontSize(14)
            .fontColor('#666666')
            .margin({ bottom: 15 })
          
          Text('传说')
            .fontSize(18)
            .fontColor('#FFD700')
            .margin({ bottom: 10 })
          
          Text(this.selectedSpecialRecipe!.legend)
            .fontSize(14)
            .fontColor('#aaaaaa')
            .lineHeight(22)
            .padding({ left: 20, right: 20 })
            .margin({ bottom: 20 })
          
          Text('━━━━━━━━━━━━━━━')
            .fontSize(14)
            .fontColor('#666666')
            .margin({ bottom: 15 })
          
          Text(`价值: ${this.selectedSpecialRecipe!.value[0]} ~ ${this.selectedSpecialRecipe!.value[1]} 金币`)
            .fontSize(16)
            .fontColor('#FFD700')
            .margin({ bottom: 10 })
          
          Text('满好感解锁后可炼制并出售')
            .fontSize(14)
            .fontColor('#00ff88')
        }
        .width('100%')
      }
      .width('100%')
      .layoutWeight(1)
      .scrollBar(BarState.Off)
      
      Button('关闭')
        .width('60%')
        .height(50)
        .backgroundColor('#666666')
        .margin({ top: 20 })
        .onClick(() => {
          this.selectedSpecialRecipe = null
        })
    }
    .width('85%')
    .height('70%')
    .padding(20)
    .backgroundColor('rgba(30, 30, 30, 0.98)')
    .borderRadius(15)
  }
}
