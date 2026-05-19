const moves = [
  "必殺の一撃",
  "回避からのカウンター",
  "謎の覚醒",
  "気合いの連打",
  "ラッキークリティカル",
  "奥義・逆転フィニッシュ",
];

const battleBtn = document.querySelector("#battleBtn");
const fighterAInput = document.querySelector("#fighterA");
const fighterBInput = document.querySelector("#fighterB");
const result = document.querySelector("#result");
const log = document.querySelector("#log");

function randomStat() {
  return 30 + Math.floor(Math.random() * 71);
}

function simulateBattle(nameA, nameB) {
  const fighterA = {
    name: nameA,
    power: randomStat(),
    speed: randomStat(),
    luck: randomStat(),
  };

  const fighterB = {
    name: nameB,
    power: randomStat(),
    speed: randomStat(),
    luck: randomStat(),
  };

  const scoreA = fighterA.power * 0.45 + fighterA.speed * 0.35 + fighterA.luck * 0.2;
  const scoreB = fighterB.power * 0.45 + fighterB.speed * 0.35 + fighterB.luck * 0.2;

  const winner = scoreA === scoreB ? null : scoreA > scoreB ? fighterA : fighterB;

  return {
    fighterA,
    fighterB,
    winner,
    rounds: [
      `${fighterA.name} の ${moves[Math.floor(Math.random() * moves.length)]}！`,
      `${fighterB.name} の ${moves[Math.floor(Math.random() * moves.length)]}！`,
      `${(winner ?? fighterA).name} が流れを掴んだ！`,
    ],
  };
}

battleBtn.addEventListener("click", () => {
  const nameA = fighterAInput.value.trim() || "ファイターA";
  const nameB = fighterBInput.value.trim() || "ファイターB";

  if (nameA === nameB) {
    result.classList.remove("hidden");
    result.textContent = "同じ名前同士は戦えない！別のものを入力してね。";
    log.classList.add("hidden");
    return;
  }

  const battle = simulateBattle(nameA, nameB);
  const { fighterA, fighterB, winner, rounds } = battle;

  result.classList.remove("hidden");
  result.textContent = winner
    ? `勝者は ${winner.name}！ (A:${Math.round(fighterA.power + fighterA.speed + fighterA.luck)} / B:${Math.round(fighterB.power + fighterB.speed + fighterB.luck)})`
    : "完全決着つかず、引き分け！";

  log.classList.remove("hidden");
  log.innerHTML = `
    <strong>バトルログ</strong>
    <ul>
      ${rounds.map((round) => `<li>${round}</li>`).join("")}
    </ul>
  `;
});
