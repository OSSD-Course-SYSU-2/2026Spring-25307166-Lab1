export enum MaterialColorType {
    RED = "\u7EA2\u8272\u7CFB",
    ORANGE = "\u6A59\u8272\u7CFB",
    YELLOW = "\u9EC4\u8272\u7CFB",
    GREEN = "\u7EFF\u8272\u7CFB",
    CYAN = "\u9752\u8272\u7CFB",
    BLUE = "\u84DD\u8272\u7CFB",
    PURPLE = "\u7D2B\u8272\u7CFB"
}
export enum FormationType {
    A = "\u8D64\u7130\u6CD5\u9635",
    B = "\u7FE0\u98CE\u6CD5\u9635",
    C = "\u5E7D\u84DD\u6CD5\u9635",
    D = "\u7D2B\u6708\u6CD5\u9635"
}
export enum GamePage {
    INTRO = "intro",
    DRAWING = "drawing",
    NAME_INPUT = "name_input",
    IDENTITY_CONFIRM = "identity_confirm",
    GAME_STORY = "game_story",
    MAIN = "main",
    COMMISSION = "commission",
    ALCHEMY = "alchemy",
    ALCHEMY_MIX = "alchemy_mix",
    FORMATION_WHEEL = "formation_wheel",
    COLLECTION = "collection",
    USER = "user",
    ADVENTURE = "adventure",
    NPC = "npc"
}
export interface ColorRGB {
    r: number;
    g: number;
    b: number;
}
export const MaterialColors: Record<MaterialColorType, ColorRGB> = {
    [MaterialColorType.RED]: { r: 255, g: 50, b: 50 },
    [MaterialColorType.ORANGE]: { r: 255, g: 165, b: 0 },
    [MaterialColorType.YELLOW]: { r: 255, g: 255, b: 50 },
    [MaterialColorType.GREEN]: { r: 50, g: 200, b: 50 },
    [MaterialColorType.CYAN]: { r: 50, g: 200, b: 200 },
    [MaterialColorType.BLUE]: { r: 50, b: 100, g: 200 },
    [MaterialColorType.PURPLE]: { r: 150, g: 50, b: 200 }
};
export const MaterialEffectDescription: Record<MaterialColorType, string> = {
    [MaterialColorType.RED]: '温暖火焰效果',
    [MaterialColorType.ORANGE]: '金色流光效果',
    [MaterialColorType.YELLOW]: '明亮光芒效果',
    [MaterialColorType.GREEN]: '自然生命效果',
    [MaterialColorType.CYAN]: '神秘幻境效果',
    [MaterialColorType.BLUE]: '深邃海洋效果',
    [MaterialColorType.PURPLE]: '魔法漩涡效果'
};
export interface UserAttributes {
    combatPower: number;
    social: number;
    luck: number;
    mysticism: number;
    perception: number;
    craftsmanship: number;
}
