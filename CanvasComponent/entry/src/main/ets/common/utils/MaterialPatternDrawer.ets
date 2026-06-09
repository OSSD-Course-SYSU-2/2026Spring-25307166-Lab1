export class MaterialPatternDrawer {
  
  static drawPattern(
    ctx: CanvasRenderingContext2D,
    materialId: string,
    x: number,
    y: number,
    size: number
  ) {
    ctx.save()
    ctx.translate(x, y)
    
    switch (materialId) {
      case 'red_spider':
        MaterialPatternDrawer.drawRedSpider(ctx, size)
        break
      case 'dan_zhu':
        MaterialPatternDrawer.drawDanZhu(ctx, size)
        break
      case 'vampire_fang':
        MaterialPatternDrawer.drawVampireFang(ctx, size)
        break
      case 'phoenix_ash':
        MaterialPatternDrawer.drawPhoenixAsh(ctx, size)
        break
      case 'demon_heart':
        MaterialPatternDrawer.drawDemonHeart(ctx, size)
        break
      case 'autumn_king_fruit':
        MaterialPatternDrawer.drawAutumnKingFruit(ctx, size)
        break
      case 'amber_antler':
        MaterialPatternDrawer.drawAmberAntler(ctx, size)
        break
      case 'coral_branch':
        MaterialPatternDrawer.drawCoralBranch(ctx, size)
        break
      case 'mountain_firefly':
        MaterialPatternDrawer.drawMountainFirefly(ctx, size)
        break
      case 'wheat_wave_bug':
        MaterialPatternDrawer.drawWheatWaveBug(ctx, size)
        break
      case 'sun_fragments':
        MaterialPatternDrawer.drawSunFragments(ctx, size)
        break
      case 'sea_ridge_sand':
        MaterialPatternDrawer.drawSeaRidgeSand(ctx, size)
        break
      case 'griffin_feather':
        MaterialPatternDrawer.drawGriffinFeather(ctx, size)
        break
      case 'ridge_mother_rock':
        MaterialPatternDrawer.drawRidgeMotherRock(ctx, size)
        break
      case 'star_dust':
        MaterialPatternDrawer.drawStarDust(ctx, size)
        break
      case 'golden_apple_seeds':
        MaterialPatternDrawer.drawGoldenAppleSeeds(ctx, size)
        break
      case 'turquoise_dragon_scale':
        MaterialPatternDrawer.drawTurquoiseDragonScale(ctx, size)
        break
      case 'cat_eye':
        MaterialPatternDrawer.drawCatEye(ctx, size)
        break
      case 'world_tree_leaf':
        MaterialPatternDrawer.drawWorldTreeLeaf(ctx, size)
        break
      case 'basilisk_scale':
        MaterialPatternDrawer.drawBasiliskScale(ctx, size)
        break
      case 'slime_heart':
        MaterialPatternDrawer.drawSlimeHeart(ctx, size)
        break
      case 'swamp_core':
        MaterialPatternDrawer.drawSwampCore(ctx, size)
        break
      case 'dream_wave':
        MaterialPatternDrawer.drawDreamWave(ctx, size)
        break
      case 'repentance_tear':
        MaterialPatternDrawer.drawRepentanceTear(ctx, size)
        break
      case 'ice_queen_crystal':
        MaterialPatternDrawer.drawIceQueenCrystal(ctx, size)
        break
      case 'siren_tear':
        MaterialPatternDrawer.drawSirenTear(ctx, size)
        break
      case 'sea_god_pearl':
        MaterialPatternDrawer.drawSeaGodPearl(ctx, size)
        break
      case 'triton_conch':
        MaterialPatternDrawer.drawTritonConch(ctx, size)
        break
      case 'void_crystal':
        MaterialPatternDrawer.drawVoidCrystal(ctx, size)
        break
      case 'undead_dream':
        MaterialPatternDrawer.drawUndeadDream(ctx, size)
        break
      case 'fairy_dust':
        MaterialPatternDrawer.drawFairyDust(ctx, size)
        break
      case 'alice_seed':
        MaterialPatternDrawer.drawAliceSeed(ctx, size)
        break
      case 'shadow essence':
        MaterialPatternDrawer.drawShadowEssence(ctx, size)
        break
      case 'oracle_crystal':
        MaterialPatternDrawer.drawOracleCrystal(ctx, size)
        break
      default:
        MaterialPatternDrawer.drawDefaultPattern(ctx, size)
    }
    
    ctx.restore()
  }
  
  private static drawRedSpider(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#8B0000'
    ctx.lineWidth = 2
    
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI / 4)
      const x1 = Math.cos(angle) * size * 0.2
      const y1 = Math.sin(angle) * size * 0.2
      const x2 = Math.cos(angle) * size * 0.8
      const y2 = Math.sin(angle) * size * 0.8
      
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
    
    ctx.fillStyle = '#FF0000'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2)
    ctx.fill()
  }
  
  private static drawDanZhu(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#FF4500'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 3
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI / 4)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.8)
      ctx.stroke()
    }
  }
  
  private static drawVampireFang(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#DC143C'
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.8)
    ctx.lineTo(-size * 0.3, size * 0.4)
    ctx.lineTo(size * 0.3, size * 0.4)
    ctx.closePath()
    ctx.fill()
    
    ctx.strokeStyle = '#8B0000'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.8)
    ctx.lineTo(0, size * 0.4)
    ctx.stroke()
  }
  
  private static drawPhoenixAsh(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#FF6347'
    for (let i = 0; i < 12; i++) {
      const x = (Math.random() - 0.5) * size * 1.2
      const y = (Math.random() - 0.5) * size * 1.2
      const s = size * 0.1 * Math.random()
      ctx.beginPath()
      ctx.arc(x, y, s, 0, Math.PI * 2)
      ctx.fill()
    }
    
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2)
    ctx.stroke()
  }
  
  private static drawDemonHeart(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#8B0000'
    ctx.beginPath()
    ctx.moveTo(0, size * 0.3)
    ctx.bezierCurveTo(-size * 0.1, -size * 0.3, -size * 0.5, -size * 0.3, -size * 0.5, size * 0.1)
    ctx.bezierCurveTo(-size * 0.5, size * 0.4, 0, size * 0.5, 0, size * 0.3)
    ctx.bezierCurveTo(0, size * 0.5, size * 0.5, size * 0.4, size * 0.5, size * 0.1)
    ctx.bezierCurveTo(size * 0.5, -size * 0.3, size * 0.1, -size * 0.3, 0, size * 0.3)
    ctx.fill()
    
    ctx.strokeStyle = '#FF0000'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2)
    ctx.stroke()
  }
  
  private static drawAutumnKingFruit(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#FFA500'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#8B4513'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.6)
    ctx.lineTo(0, -size * 0.9)
    ctx.stroke()
    
    ctx.fillStyle = '#228B22'
    ctx.beginPath()
    ctx.ellipse(0, -size * 0.85, size * 0.2, size * 0.1, 0, 0, Math.PI * 2)
    ctx.fill()
  }
  
  private static drawAmberAntler(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#DAA520'
    ctx.lineWidth = 4
    
    ctx.beginPath()
    ctx.moveTo(0, size * 0.3)
    ctx.lineTo(-size * 0.5, -size * 0.5)
    ctx.lineTo(-size * 0.7, -size * 0.8)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(0, size * 0.3)
    ctx.lineTo(size * 0.5, -size * 0.5)
    ctx.lineTo(size * 0.7, -size * 0.8)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(0, size * 0.3)
    ctx.lineTo(0, -size * 0.6)
    ctx.stroke()
  }
  
  private static drawCoralBranch(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#FF7F50'
    ctx.lineWidth = 3
    
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI / 5) - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(0, 0)
      const x = Math.cos(angle) * size * 0.7
      const y = Math.sin(angle) * size * 0.7
      ctx.lineTo(x, y)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.arc(x, y, size * 0.15, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
  
  private static drawMountainFirefly(ctx: CanvasRenderingContext2D, size: number) {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.5)
    gradient.addColorStop(0, '#FFFF00')
    gradient.addColorStop(0.5, '#FFD700')
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2)
    ctx.fill()
  }
  
  private static drawWheatWaveBug(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#DAA520'
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.6, size * 0.3, 0, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#8B4513'
    ctx.lineWidth = 2
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath()
      ctx.moveTo(i * size * 0.15, -size * 0.3)
      ctx.lineTo(i * size * 0.15, size * 0.3)
      ctx.stroke()
    }
  }
  
  private static drawSunFragments(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#FFD700'
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI / 4)
      const x = Math.cos(angle) * size * 0.5
      const y = Math.sin(angle) * size * 0.5
      ctx.beginPath()
      ctx.arc(x, y, size * 0.15, 0, Math.PI * 2)
      ctx.fill()
    }
    
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.4)
    gradient.addColorStop(0, '#FFA500')
    gradient.addColorStop(1, '#FFD700')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2)
    ctx.fill()
  }
  
  private static drawSeaRidgeSand(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#F4A460'
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * size * 1.4
      const y = (Math.random() - 0.5) * size * 1.4
      ctx.beginPath()
      ctx.arc(x, y, size * 0.05, 0, Math.PI * 2)
      ctx.fill()
    }
    
    ctx.strokeStyle = '#87CEEB'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
    ctx.stroke()
  }
  
  private static drawGriffinFeather(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#DAA520'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.8)
    ctx.lineTo(0, size * 0.8)
    ctx.stroke()
    
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 2
    for (let i = -3; i <= 3; i++) {
      const y = i * size * 0.2
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(size * 0.4, y - size * 0.1)
      ctx.moveTo(0, y)
      ctx.lineTo(-size * 0.4, y - size * 0.1)
      ctx.stroke()
    }
  }
  
  private static drawRidgeMotherRock(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#8B7355'
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.6)
    ctx.lineTo(size * 0.5, size * 0.2)
    ctx.lineTo(size * 0.3, size * 0.6)
    ctx.lineTo(-size * 0.3, size * 0.6)
    ctx.lineTo(-size * 0.5, size * 0.2)
    ctx.closePath()
    ctx.fill()
    
    ctx.strokeStyle = '#696969'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(-size * 0.3, -size * 0.3)
    ctx.lineTo(size * 0.2, size * 0.4)
    ctx.moveTo(size * 0.1, -size * 0.2)
    ctx.lineTo(-size * 0.2, size * 0.3)
    ctx.stroke()
  }
  
  private static drawStarDust(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#FFD700'
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * size * 1.4
      const y = (Math.random() - 0.5) * size * 1.4
      const s = size * 0.03 + Math.random() * size * 0.05
      ctx.beginPath()
      ctx.arc(x, y, s, 0, Math.PI * 2)
      ctx.fill()
    }
    
    ctx.strokeStyle = '#C0C0C0'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
    ctx.stroke()
  }
  
  private static drawGoldenAppleSeeds(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = '#8B4513'
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.15, size * 0.25, 0, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#FFA500'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.55, 0, Math.PI * 2)
    ctx.stroke()
  }
  
  private static drawTurquoiseDragonScale(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#40E0D0'
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.6)
    ctx.quadraticCurveTo(size * 0.7, -size * 0.3, size * 0.5, size * 0.4)
    ctx.quadraticCurveTo(0, size * 0.6, -size * 0.5, size * 0.4)
    ctx.quadraticCurveTo(-size * 0.7, -size * 0.3, 0, -size * 0.6)
    ctx.fill()
    
    ctx.strokeStyle = '#008B8B'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(-size * 0.3, 0)
    ctx.lineTo(size * 0.3, 0)
    ctx.stroke()
  }
  
  private static drawCatEye(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#228B22'
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.6, size * 0.4, 0, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.15, size * 0.35, 0, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.arc(-size * 0.15, -size * 0.15, size * 0.08, 0, Math.PI * 2)
    ctx.fill()
  }
  
  private static drawWorldTreeLeaf(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#228B22'
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.7)
    ctx.bezierCurveTo(size * 0.4, -size * 0.3, size * 0.3, size * 0.4, 0, size * 0.5)
    ctx.bezierCurveTo(-size * 0.3, size * 0.4, -size * 0.4, -size * 0.3, 0, -size * 0.7)
    ctx.fill()
    
    ctx.strokeStyle = '#006400'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.7)
    ctx.lineTo(0, size * 0.5)
    ctx.stroke()
  }
  
  private static drawBasiliskScale(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#006400'
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const x = (i - 1) * size * 0.35
        const y = (j - 1) * size * 0.3
        ctx.beginPath()
        ctx.arc(x, y, size * 0.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    ctx.strokeStyle = '#004400'
    ctx.lineWidth = 1
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const x = (i - 1) * size * 0.35
        const y = (j - 1) * size * 0.3
        ctx.beginPath()
        ctx.arc(x, y, size * 0.2, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
  }
  
  private static drawSlimeHeart(ctx: CanvasRenderingContext2D, size: number) {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.6)
    gradient.addColorStop(0, '#00FFFF')
    gradient.addColorStop(0.5, '#00CED1')
    gradient.addColorStop(1, '#008B8B')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.arc(-size * 0.2, -size * 0.2, size * 0.15, 0, Math.PI * 2)
    ctx.fill()
  }
  
  private static drawSwampCore(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#2F4F4F'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#00CED1'
    ctx.lineWidth = 2
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2 / 5)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.8)
      ctx.stroke()
    }
  }
  
  private static drawDreamWave(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#00CED1'
    ctx.lineWidth = 3
    
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      for (let t = -size * 0.6; t <= size * 0.6; t += 2) {
        const y = Math.sin(t / 20) * size * 0.3 + i * size * 0.2 - size * 0.2
        if (t === -size * 0.6) {
          ctx.moveTo(t, y)
        } else {
          ctx.lineTo(t, y)
        }
      }
      ctx.stroke()
    }
  }
  
  private static drawRepentanceTear(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#87CEEB'
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.6)
    ctx.bezierCurveTo(size * 0.3, -size * 0.2, size * 0.3, size * 0.3, 0, size * 0.5)
    ctx.bezierCurveTo(-size * 0.3, size * 0.3, -size * 0.3, -size * 0.2, 0, -size * 0.6)
    ctx.fill()
    
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.arc(-size * 0.1, -size * 0.3, size * 0.1, 0, Math.PI * 2)
    ctx.fill()
  }
  
  private static drawIceQueenCrystal(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#E0FFFF'
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.7)
    ctx.lineTo(size * 0.5, 0)
    ctx.lineTo(0, size * 0.7)
    ctx.lineTo(-size * 0.5, 0)
    ctx.closePath()
    ctx.fill()
    
    ctx.strokeStyle = '#87CEEB'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.7)
    ctx.lineTo(0, size * 0.7)
    ctx.moveTo(-size * 0.5, 0)
    ctx.lineTo(size * 0.5, 0)
    ctx.stroke()
  }
  
  private static drawSirenTear(ctx: CanvasRenderingContext2D, size: number) {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.5)
    gradient.addColorStop(0, '#4169E1')
    gradient.addColorStop(0.5, '#1E90FF')
    gradient.addColorStop(1, '#0000CD')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.5)
    ctx.bezierCurveTo(size * 0.25, -size * 0.1, size * 0.25, size * 0.25, 0, size * 0.4)
    ctx.bezierCurveTo(-size * 0.25, size * 0.25, -size * 0.25, -size * 0.1, 0, -size * 0.5)
    ctx.fill()
  }
  
  private static drawSeaGodPearl(ctx: CanvasRenderingContext2D, size: number) {
    const gradient = ctx.createRadialGradient(-size * 0.2, -size * 0.2, 0, 0, 0, size * 0.6)
    gradient.addColorStop(0, '#FFFFFF')
    gradient.addColorStop(0.3, '#87CEEB')
    gradient.addColorStop(0.7, '#4169E1')
    gradient.addColorStop(1, '#000080')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
    ctx.fill()
  }
  
  private static drawTritonConch(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#4682B4'
    ctx.beginPath()
    ctx.moveTo(size * 0.6, 0)
    for (let i = 0; i <= 12; i++) {
      const angle = (i * Math.PI / 6)
      const r = size * (0.3 + angle * 0.15)
      const x = Math.cos(angle + Math.PI) * r
      const y = Math.sin(angle + Math.PI) * r
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
  }
  
  private static drawVoidCrystal(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#191970'
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.8)
    ctx.lineTo(size * 0.6, size * 0.3)
    ctx.lineTo(0, size * 0.6)
    ctx.lineTo(-size * 0.6, size * 0.3)
    ctx.closePath()
    ctx.fill()
    
    ctx.strokeStyle = '#4B0082'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2)
    ctx.stroke()
  }
  
  private static drawUndeadDream(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#9370DB'
    ctx.lineWidth = 2
    
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(0, 0, size * (0.3 + i * 0.2), 0, Math.PI * 2)
      ctx.stroke()
    }
    
    ctx.fillStyle = '#4B0082'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2)
    ctx.fill()
  }
  
  private static drawFairyDust(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#DA70D6'
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.random() * size * 0.7
      const x = Math.cos(angle) * r
      const y = Math.sin(angle) * r
      const s = size * 0.02 + Math.random() * size * 0.04
      
      ctx.beginPath()
      ctx.arc(x, y, s, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  
  private static drawAliceSeed(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#9932CC'
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 0.3, size * 0.5, 0, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#4B0082'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, -size * 0.5)
    ctx.lineTo(0, -size * 0.8)
    ctx.stroke()
    
    ctx.fillStyle = '#9370DB'
    ctx.beginPath()
    ctx.arc(0, -size * 0.8, size * 0.1, 0, Math.PI * 2)
    ctx.fill()
  }
  
  private static drawShadowEssence(ctx: CanvasRenderingContext2D, size: number) {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.6)
    gradient.addColorStop(0, '#000000')
    gradient.addColorStop(0.5, '#2F0040')
    gradient.addColorStop(1, 'rgba(75, 0, 130, 0.5)')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#9370DB'
    ctx.lineWidth = 1
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI / 3)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.8)
      ctx.stroke()
    }
  }
  
  private static drawOracleCrystal(ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = '#9400D3'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 2
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2 / 5) - Math.PI / 2
      const nextAngle = ((i + 2) * Math.PI * 2 / 5) - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(Math.cos(angle) * size * 0.5, Math.sin(angle) * size * 0.5)
      ctx.lineTo(Math.cos(nextAngle) * size * 0.5, Math.sin(nextAngle) * size * 0.5)
      ctx.stroke()
    }
  }
  
  private static drawDefaultPattern(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = '#888888'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2)
    ctx.stroke()
    
    ctx.fillStyle = '#666666'
    ctx.beginPath()
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2)
    ctx.fill()
  }
}
