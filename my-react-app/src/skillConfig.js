// 技能类型枚举
export const SkillType = {
  ATTACK: 'attack',      // 攻击类
  DEFENSE: 'defense',    // 防御类
  HEAL: 'heal',          // 加血类
  CONTROL: 'control'     // 控制类
};

// 技能池配置 - 可在此处添加或修改技能
export const skillPool = [
  // 攻击类技能
  {
    id: 'fireball',
    name: '火球术',
    type: SkillType.ATTACK,
    description: '造成15-25点伤害',
    minDamage: 15,
    maxDamage: 25,
    maxUses: 6,
    cost: 0
  },
  {
    id: 'slash',
    name: '劈砍',
    type: SkillType.ATTACK,
    description: '造成10-18点伤害',
    minDamage: 10,
    maxDamage: 18,
    maxUses: 8,
    cost: 0
  },
  {
    id: 'thunder',
    name: '雷霆一击',
    type: SkillType.ATTACK,
    description: '造成20-30点伤害',
    minDamage: 20,
    maxDamage: 30,
    maxUses: 4,
    cost: 0
  },
  {
    id: 'poison',
    name: '毒液喷射',
    type: SkillType.ATTACK,
    description: '造成8-12点伤害并附加中毒效果',
    minDamage: 8,
    maxDamage: 12,
    maxUses: 5,
    cost: 0,
    effect: 'poison'
  },
  
  // 防御类技能
  {
    id: 'shield',
    name: '护盾',
    type: SkillType.DEFENSE,
    description: '获得20点护盾值',
    shieldValue: 20,
    maxUses: 5,
    cost: 0
  },
  {
    id: 'armor',
    name: '铁甲术',
    type: SkillType.DEFENSE,
    description: '获得35点护盾值',
    shieldValue: 35,
    maxUses: 3,
    cost: 0
  },
  {
    id: 'barrier',
    name: '魔法屏障',
    type: SkillType.DEFENSE,
    description: '获得15点护盾值并可叠加',
    shieldValue: 15,
    maxUses: 7,
    cost: 0
  },
  
  // 加血类技能
  {
    id: 'heal_light',
    name: '轻度治疗',
    type: SkillType.HEAL,
    description: '恢复15-25点生命值',
    minHeal: 15,
    maxHeal: 25,
    maxUses: 5,
    cost: 0
  },
  {
    id: 'heal_medium',
    name: '中度治疗',
    type: SkillType.HEAL,
    description: '恢复25-40点生命值',
    minHeal: 25,
    maxHeal: 40,
    maxUses: 3,
    cost: 0
  },
  {
    id: 'heal_big',
    name: '强力治疗',
    type: SkillType.HEAL,
    description: '恢复40-60点生命值',
    minHeal: 40,
    maxHeal: 60,
    maxUses: 2,
    cost: 0
  },
  
  // 控制类技能
  {
    id: 'stun',
    name: '眩晕术',
    type: SkillType.CONTROL,
    description: '使敌人眩晕1回合（50%概率）',
    stunChance: 0.5,
    stunDuration: 1,
    maxUses: 3,
    cost: 0
  },
  {
    id: 'freeze',
    name: '冰冻术',
    type: SkillType.CONTROL,
    description: '使敌人冻结1回合（40%概率）',
    freezeChance: 0.4,
    freezeDuration: 1,
    maxUses: 3,
    cost: 0
  },
  {
    id: 'silence',
    name: '沉默术',
    type: SkillType.CONTROL,
    description: '使敌人沉默1回合（45%概率）',
    silenceChance: 0.45,
    silenceDuration: 1,
    maxUses: 3,
    cost: 0
  },
  {
    id: 'weakness',
    name: '虚弱诅咒',
    type: SkillType.CONTROL,
    description: '降低敌人下次攻击伤害30%（1回合）',
    weakenRate: 0.3,
    weakenDuration: 1,
    maxUses: 4,
    cost: 0
  }
];

// 从技能池中随机抽取指定数量的技能（确保四大类都有分布）
export function drawSkills(count = 4) {
  const shuffled = [...skillPool].sort(() => Math.random() - 0.5);
  
  // 尝试确保每个类型至少有一个技能
  const skillsByType = {
    [SkillType.ATTACK]: [],
    [SkillType.DEFENSE]: [],
    [SkillType.HEAL]: [],
    [SkillType.CONTROL]: []
  };
  
  shuffled.forEach(skill => {
    if (skillsByType[skill.type].length < 2) {
      skillsByType[skill.type].push(skill);
    }
  });
  
  // 合并所有技能
  let drawnSkills = [];
  Object.values(skillsByType).forEach(typeSkills => {
    drawnSkills = drawnSkills.concat(typeSkills);
  });
  
  // 如果还不够，再从剩余技能中补充
  if (drawnSkills.length < count) {
    const remaining = shuffled.filter(s => !drawnSkills.includes(s));
    drawnSkills = drawnSkills.concat(remaining.slice(0, count - drawnSkills.length));
  }
  
  // 返回指定数量的技能
  return drawnSkills.slice(0, count).map(skill => ({
    ...skill,
    currentUses: skill.maxUses,
    onCooldown: false,
    cooldownRemaining: 0
  }));
}

// 获取技能类型的中文名称
export function getSkillTypeName(type) {
  const names = {
    [SkillType.ATTACK]: '攻击',
    [SkillType.DEFENSE]: '防御',
    [SkillType.HEAL]: '治疗',
    [SkillType.CONTROL]: '控制'
  };
  return names[type] || type;
}

// 获取技能类型的颜色
export function getSkillTypeColor(type) {
  const colors = {
    [SkillType.ATTACK]: '#ff4444',
    [SkillType.DEFENSE]: '#44aaff',
    [SkillType.HEAL]: '#44ff44',
    [SkillType.CONTROL]: '#ffaa44'
  };
  return colors[type] || '#888888';
}
