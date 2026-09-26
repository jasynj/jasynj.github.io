// First screen: the career as a game. The move list drives the board.

import { createBoard, assignMoves } from "../board.js";
import { html, figurine } from "../util.js";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function glyph(entry) {
  if (!entry.glyph) return "";
  const brilliant = entry.glyph === "!!";
  return html`<span class="glyph${brilliant ? " glyph-brilliant" : ""}" aria-label="${brilliant ? "brilliant move" : "good move"}">${entry.glyph}</span>`;
}

function moveRow({ entry, number, san, ply }) {
  return html`<li class="move${entry.glyph === "!!" ? " is-brilliant" : ""}" data-ply="${ply}">
    <a href="#exp-${entry.id}">
      <span class="move-no">${number}.</span>
      <span class="move-san">${figurine(san)}${glyph(entry)}</span>
      <span class="move-what">
        <span class="move-org">${entry.org}</span>
        <span class="move-role">${entry.start.slice(0, 4)} · ${entry.role}</span>
      </span>
      <span class="move-proof">${entry.proof ?? ""}</span>
    </a>
  </li>`;
}

export function renderHero({ list, board: boardRoot, evalFill }, mainline) {
  const moves = assignMoves(mainline);
  if (!moves.length) return;
  list.innerHTML = moves.map(moveRow).join("");

  const rows = [...list.querySelectorAll(".move")];
  const brilliantPly = moves.find((m) => m.entry.glyph === "!!")?.ply;
  const finalPly = moves.at(-1).ply;

  const board = createBoard(boardRoot, {
    // White's edge grows as the game goes on; the bar is the story, not a number.
    onPly: (ply) => {
      evalFill.style.transform = `scaleY(${0.5 + (ply / board.plies) * 0.38})`;
      rows.forEach((row) => row.classList.toggle("is-current", Number(row.dataset.ply) === ply));
    },
  });
  const show = (ply) => board.setPly(ply, { brilliant: ply === brilliantPly });

  rows.forEach((row) => {
    const ply = Number(row.dataset.ply);
    const link = row.querySelector("a");
    link.addEventListener("mouseenter", () => show(ply));
    link.addEventListener("focus", () => show(ply));
  });
  list.addEventListener("mouseleave", () => show(finalPly));
  list.addEventListener("focusout", (e) => {
    if (!list.contains(e.relatedTarget)) show(finalPly);
  });

  // Play the game through once, landing on the latest move.
  if (REDUCED_MOTION) {
    show(finalPly);
    return;
  }
  let ply = 0;
  show(0);
  const step = () => {
    ply += 1;
    show(ply);
    if (ply < finalPly) setTimeout(step, ply % 2 ? 380 : 520);
  };
  setTimeout(step, 500);
}
