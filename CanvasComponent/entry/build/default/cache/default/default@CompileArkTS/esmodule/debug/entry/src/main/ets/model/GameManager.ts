import type { UserState, Commission } from './GameState';
import { AllMaterials } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import type { MaterialData } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import type { NPCRelationship } from './NPC';
import { getItemById } from "@bundle:com.example.canvascomponent/entry/ets/model/Item";
import type { ItemEffect } from "@bundle:com.example.canvascomponent/entry/ets/model/Item";
export class GameManager {
    private static instance: GameManager;
    private userState: UserState;
    private constructor() {
        this.userState = this.initUserState();
    }
    static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
    private initUserState(): UserState {
        const materials = new Map<string, number>();
        AllMaterials.forEach((m: MaterialData) => {
            materials.set(m.id, 100);
        });
        const stamina = Math.floor(Math.random() * 41) + 40;
        const maxStamina = 100;
        return {
            name: '',
            materials: materials,
            items: new Map<string, number>(),
            gold: 100,
            unlockedMaterials: new Set<string>(),
            unlockedItems: new Set<string>(),
            acceptedCommissions: [],
            npcRelationships: new Map<string, NPCRelationship>(),
            combatPower: Math.floor(Math.random() * 41) + 40,
            social: Math.floor(Math.random() * 41) + 40,
            luck: Math.floor(Math.random() * 41) + 40,
            mysticism: Math.floor(Math.random() * 41) + 40,
            perception: Math.floor(Math.random() * 41) + 40,
            craftsmanship: Math.floor(Math.random() * 41) + 40,
            stamina: stamina,
            maxStamina: maxStamina,
            lastStaminaUpdate: Date.now()
        };
    }
    recoverStamina(amount: number): void {
        this.userState.stamina = Math.min(this.userState.maxStamina, this.userState.stamina + amount);
    }
    useStamina(amount: number): boolean {
        this.updateStamina();
        if (this.userState.stamina >= amount) {
            this.userState.stamina -= amount;
            this.userState.lastStaminaUpdate = Date.now();
            return true;
        }
        return false;
    }
    private updateStamina(): void {
        const now = Date.now();
        const elapsed = (now - this.userState.lastStaminaUpdate) / 1000;
        const recovery = Math.floor(elapsed / 180);
        if (recovery > 0) {
            this.userState.stamina = Math.min(this.userState.maxStamina, this.userState.stamina + recovery);
            this.userState.lastStaminaUpdate = now;
        }
    }
    canAdventure(): boolean {
        this.updateStamina();
        return this.userState.stamina > 0;
    }
    useItem(itemId: string, amount: number = 1): boolean {
        const current = this.userState.items.get(itemId) || 0;
        if (current >= amount) {
            const item = getItemById(itemId);
            if (item) {
                this.userState.items.set(itemId, current - amount);
                this.applyItemEffects(item.effects);
                return true;
            }
        }
        return false;
    }
    private applyItemEffects(effects: ItemEffect[]): void {
        effects.forEach(effect => {
            switch (effect.type) {
                case 'stamina':
                    this.userState.stamina = Math.min(this.userState.maxStamina, this.userState.stamina + effect.value);
                    break;
                case 'gold':
                    this.addGold(effect.value);
                    break;
                case 'combatPower':
                    this.userState.combatPower += effect.value;
                    break;
                case 'social':
                    this.userState.social += effect.value;
                    break;
                case 'luck':
                    this.userState.luck += effect.value;
                    break;
                case 'mysticism':
                    this.userState.mysticism += effect.value;
                    break;
                case 'perception':
                    this.userState.perception += effect.value;
                    break;
                case 'craftsmanship':
                    this.userState.craftsmanship += effect.value;
                    break;
            }
        });
    }
    getValueForCheck(checkType: string): number {
        switch (checkType) {
            case 'combatPower':
                return this.userState.combatPower;
            case 'social':
                return this.userState.social;
            case 'luck':
                return this.userState.luck;
            case 'mysticism':
                return this.userState.mysticism;
            case 'perception':
                return this.userState.perception;
            case 'craftsmanship':
                return this.userState.craftsmanship;
            case 'combined':
                return Math.floor((this.userState.combatPower + this.userState.social + this.userState.luck +
                    this.userState.mysticism + this.userState.perception + this.userState.craftsmanship) / 6);
            default:
                return 50;
        }
    }
    addStamina(amount: number): void {
        this.userState.stamina = Math.min(this.userState.maxStamina, this.userState.stamina + amount);
    }
    getUserState(): UserState {
        return this.userState;
    }
    setUserName(name: string): void {
        this.userState.name = name;
    }
    setUserAvatar(avatar: string): void {
        this.userState.avatar = avatar;
    }
    addMaterial(materialId: string, amount: number): void {
        const current = this.userState.materials.get(materialId) || 0;
        this.userState.materials.set(materialId, current + amount);
        this.userState.unlockedMaterials.add(materialId);
    }
    useMaterial(materialId: string, amount: number): boolean {
        const current = this.userState.materials.get(materialId) || 0;
        if (current >= amount) {
            this.userState.materials.set(materialId, current - amount);
            return true;
        }
        return false;
    }
    addItem(itemId: string, amount: number): void {
        const current = this.userState.items.get(itemId) || 0;
        this.userState.items.set(itemId, current + amount);
        this.userState.unlockedItems.add(itemId);
    }
    addGold(amount: number): void {
        this.userState.gold += amount;
    }
    acceptCommission(commission: Commission): void {
        commission.isAccepted = true;
        this.userState.acceptedCommissions.push(commission);
    }
    completeCommission(commissionId: string): boolean {
        const commission = this.userState.acceptedCommissions.find(c => c.id === commissionId);
        if (commission && !commission.isCompleted) {
            commission.isCompleted = true;
            this.addGold(commission.reward);
            return true;
        }
        return false;
    }
    getMaterialCount(materialId: string): number {
        return this.userState.materials.get(materialId) || 0;
    }
    getItemCount(itemId: string): number {
        return this.userState.items.get(itemId) || 0;
    }
    getNPCTrust(npcId: string): number {
        const relationship = this.userState.npcRelationships.get(npcId);
        return relationship ? relationship.trust : 0;
    }
    addNPCTrust(npcId: string, amount: number): void {
        let relationship = this.userState.npcRelationships.get(npcId);
        if (!relationship) {
            relationship = {
                npcId: npcId,
                trust: 0,
                completedTasks: 0,
                currentTask: null
            };
            this.userState.npcRelationships.set(npcId, relationship);
        }
        relationship.trust = Math.min(100, relationship.trust + amount);
    }
}
