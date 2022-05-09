function Battle(attacker, defender, attack) {
  function chanceTime(range) {
    return Math.ceil(Math.random() * range);
  }
  const dmgVerbs = [
    'attacks', 'slices', 'strike',
    'roasts', 'clobbers', 'disses',
    'hits', 'mauls', 'blasts', 'bum rushes',
    'cuts', 'chops', 'whacks', 'smacks',
    'boinks', 'penetrates', 'gashes',
    'nicks', 'scratches', 'sores',
  ];
  const missVerbs = [
    ' whiffs against', ' misses against', ' can not find target, ',
    ' might as well be blind against', ' needs strength training against',
    `'s grandmother could do a better job against`,
  ];
  const adj = [
    'violently', 'grotesquely', 'grossly',
    'fiercely', 'forcefully', 'forcibly',
    'intensely', 'insanely', 'powerfully',
    'vigorously', 'non-chalantly', 'brutaly',
    'hysterically', 'passionately', 'uncontrollably',
    'savagely', 'viciously', 'impatiently',
    'disturbingly', 'hauntingly', 'wildly',
  ];
  const killVerbs = [
    'obliterates', 'decimates', 'destroys', 'wipes out',
    'kills', 'sat on', 'decapitated', 'sharted on', 'KOs', 'disposes of',
    'humiliates', 'slaughters', 'impales', 'claps',
  ];
  const atkDice = attack.attack.split(' + ');
  let numberOfRolls = Number(atkDice[0].split('d')[0]);
  let range = Number(atkDice[0].split('d')[1]);
  let modifier = Number(atkDice[1]);
  while (numberOfRolls >= 0) {
    modifier += chanceTime(range);
    numberOfRolls -= 1;
  }
  if (modifier < defender.armor) {
    return `${attacker.name}${missVerbs[Math.floor(Math.random() * missVerbs.length)]} ${defender.name}, dealing no damage`;
  }
  const dmgDice = attack.damage.split(' + ');
  numberOfRolls = Number(dmgDice[0].split('d')[0]);
  range = Number(dmgDice[0].split('d')[1]);
  modifier = Number(dmgDice[1]);
  while (numberOfRolls >= 0) {
    modifier += chanceTime(range);
    numberOfRolls -= 1;
  }
  if (modifier >= defender.currentHealth) {
    defender.currentHealth -= modifier;
    return `${attacker.name} ${adj[Math.floor(Math.random() * adj.length)]} ${killVerbs[Math.floor(Math.random() * killVerbs.length)]} ${defender.name}`;
  }
  defender.currentHealth -= modifier;
  return `${attacker.name} ${dmgVerbs[Math.floor(Math.random() * dmgVerbs.length)]} ${defender.name} for ${modifier} damage. ${defender.name} has ${defender.currentHealth} HP left`;
}

// let i = 10;
// while (i > 0) {
//   const attacker = sampleArray.Zelroth[Math.floor(Math.random() * sampleArray.Zelroth.length)];
//   const defender = sampleArray.Gene[Math.floor(Math.random() * sampleArray.Gene.length)];
//   console.log(
//     Battle(attacker, defender, attacker.attacks[
//       Math.floor(Math.random() * attacker.attacks.length)
//     ]),
//   );
//   i -= 1;
// }

module.exports = {
  Battle,
};