// A decorative chess board: plays a handful of well-known openings on a loop.
// It's a hint of chess on the first screen, not tied to any content.

const OPENINGS = [
  { name: "Ruy López", moves: ["e2e4", "e7e5", "g1f3", "b8c6", "f1b5", "a7a6"], san: "1.e4 e5 2.Nf3 Nc6 3.Bb5 a6" },
  { name: "Italian Game", moves: ["e2e4", "e7e5", "g1f3", "b8c6", "f1c4", "f8c5"], san: "1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5" },
  {
    name: "Sicilian Najdorf",
    moves: ["e2e4", "c7c5", "g1f3", "d7d6", "d2d4", "c5d4", "f3d4", "g8f6", "b1c3", "a7a6"],
    san: "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6",
  },
  { name: "Queen's Gambit Declined", moves: ["d2d4", "d7d5", "c2c4", "e7e6", "b1c3", "g8f6"], san: "1.d4 d5 2.c4 e6 3.Nc3 Nf6" },
  { name: "French Defense", moves: ["e2e4", "e7e6", "d2d4", "d7d5", "b1c3", "f8b4"], san: "1.e4 e6 2.d4 d5 3.Nc3 Bb4" },
  { name: "Caro-Kann Defense", moves: ["e2e4", "c7c6", "d2d4", "d7d5", "b1c3", "d5e4", "c3e4"], san: "1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4" },
  {
    name: "King's Indian Defense",
    moves: ["d2d4", "g8f6", "c2c4", "g7g6", "b1c3", "f8g7", "e2e4", "d7d6"],
    san: "1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6",
  },
  {
    name: "Réti Opening",
    moves: ["g1f3", "d7d5", "c2c4", "e7e6", "g2g3", "g8f6", "f1g2"],
    san: "1.Nf3 d5 2.c4 e6 3.g3 Nf6 4.Bg2",
  },
];

const START = ["rnbqkbnr", "pppppppp", "........", "........", "........", "........", "PPPPPPPP", "RNBQKBNR"];
const FILES = "abcdefgh";
const toXY = (sq) => [FILES.indexOf(sq[0]), 8 - Number(sq[1])];

const MOVE_MS = 700;
const HOLD_MS = 2600;

function initialPieces() {
  const pieces = new Map();
  START.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === ".") return;
      const square = FILES[x] + (8 - y);
      const color = ch === ch.toUpperCase() ? "l" : "d";
      pieces.set(`${color}${ch.toLowerCase()}-${square}`, { square, color, type: ch.toLowerCase() });
    })
  );
  return pieces;
}

export function createOpeningsBoard(root, caption, { reducedMotion = false } = {}) {
  const pieces = initialPieces();

  const squares = document.createElement("div");
  squares.className = "board-squares";
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const sq = document.createElement("div");
      sq.className = `sq ${(x + y) % 2 ? "sq-dark" : "sq-light"}`;
      sq.dataset.square = FILES[x] + (8 - y);
      squares.append(sq);
    }
  }

  const layer = document.createElement("div");
  layer.className = "board-pieces";
  const els = new Map();
  for (const [id, p] of pieces) {
    const img = document.createElement("img");
    img.src = `assets/pieces/${p.color}${p.type}.svg`;
    img.alt = "";
    img.className = `piece piece-${p.color}`;
    img.draggable = false;
    layer.append(img);
    els.set(id, img);
  }
  root.append(squares, layer);

  let occupancy = new Map();

  function place() {
    const onBoard = new Set(occupancy.values());
    for (const [square, id] of occupancy) {
      const [x, y] = toXY(square);
      els.get(id).style.setProperty("--x", x);
      els.get(id).style.setProperty("--y", y);
    }
    for (const [id, el] of els) el.classList.toggle("is-captured", !onBoard.has(id));
  }

  function highlight(from, to) {
    root.querySelectorAll(".is-from, .is-to").forEach((s) => s.classList.remove("is-from", "is-to"));
    if (from) root.querySelector(`[data-square="${from}"]`).classList.add("is-from");
    if (to) root.querySelector(`[data-square="${to}"]`).classList.add("is-to");
  }

  function reset() {
    occupancy = new Map([...pieces].map(([id, p]) => [p.square, id]));
    highlight();
    place();
  }

  function move(uci) {
    const from = uci.slice(0, 2);
    const to = uci.slice(2, 4);
    const id = occupancy.get(from);
    occupancy.delete(from);
    occupancy.set(to, id);
    highlight(from, to);
    place();
  }

  function show(opening) {
    caption.innerHTML = `<span class="opening-name">${opening.name}</span><span class="opening-moves">${opening.san}</span>`;
  }

  // Reduced motion: one finished opening, no loop.
  if (reducedMotion) {
    reset();
    OPENINGS[0].moves.forEach(move);
    show(OPENINGS[0]);
    return;
  }

  // The loop pauses while the board is off screen or the tab is hidden.
  let visible = true;
  let timer = null;
  let openingIndex = 0;
  let moveIndex = 0;

  function tick() {
    timer = null;
    if (!visible || document.hidden) return;
    const opening = OPENINGS[openingIndex];
    // -1 = pieces glide back home and the next opening's name appears, on a beat of its own.
    if (moveIndex === -1) {
      reset();
      show(opening);
      moveIndex = 0;
      timer = setTimeout(tick, MOVE_MS * 1.5);
    } else if (moveIndex < opening.moves.length) {
      move(opening.moves[moveIndex]);
      moveIndex += 1;
      timer = setTimeout(tick, MOVE_MS);
    } else {
      openingIndex = (openingIndex + 1) % OPENINGS.length;
      moveIndex = -1;
      timer = setTimeout(tick, HOLD_MS);
    }
  }

  const resume = () => {
    if (!timer && visible && !document.hidden) timer = setTimeout(tick, MOVE_MS);
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    resume();
  }).observe(root);
  document.addEventListener("visibilitychange", resume);

  reset();
  show(OPENINGS[0]);
  timer = setTimeout(tick, 600);
}
