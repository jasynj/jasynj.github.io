// The career game: a fixed line from the Fried Liver Attack. Career moves map onto
// White's moves (latest last), so the newest role always lands as 6.Nxf7!!.

const LINE = [
  ["e2", "e4", "e4"], ["e7", "e5", "e5"],
  ["g1", "f3", "Nf3"], ["b8", "c6", "Nc6"],
  ["f1", "c4", "Bc4"], ["g8", "f6", "Nf6"],
  ["f3", "g5", "Ng5"], ["d7", "d5", "d5"],
  ["e4", "d5", "exd5"], ["f6", "d5", "Nxd5"],
  ["g5", "f7", "Nxf7"],
];

const WHITE_MOVES = LINE.filter((_, i) => i % 2 === 0).length; // 6

const START = [
  "rnbqkbnr",
  "pppppppp",
  "........",
  "........",
  "........",
  "........",
  "PPPPPPPP",
  "RNBQKBNR",
];

const FILES = "abcdefgh";
const toXY = (sq) => [FILES.indexOf(sq[0]), 8 - Number(sq[1])];

// Every piece gets a stable id so it can glide between positions.
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

// positions[i] = square→pieceId after i plies.
function buildPositions() {
  const occupancy = new Map([...initialPieces()].map(([id, p]) => [p.square, id]));
  const positions = [new Map(occupancy)];
  for (const [from, to] of LINE) {
    const id = occupancy.get(from);
    occupancy.delete(from);
    occupancy.set(to, id);
    positions.push(new Map(occupancy));
  }
  return positions;
}

export function createBoard(root, { onPly } = {}) {
  const pieces = initialPieces();
  const positions = buildPositions();

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

  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  arrow.setAttribute("class", "board-arrow");
  arrow.setAttribute("viewBox", "0 0 8 8");
  arrow.innerHTML = `<defs><marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="2.6" markerHeight="2.6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z"/></marker></defs><line marker-end="url(#arrowhead)"/>`;

  root.append(squares, layer, arrow);

  function setPly(ply, { brilliant = false } = {}) {
    const position = positions[ply];
    const onBoard = new Set(position.values());
    for (const [square, id] of position) {
      const [x, y] = toXY(square);
      const el = els.get(id);
      el.style.setProperty("--x", x);
      el.style.setProperty("--y", y);
    }
    for (const [id, el] of els) el.classList.toggle("is-captured", !onBoard.has(id));

    root.querySelectorAll(".sq.is-from, .sq.is-to").forEach((s) => s.classList.remove("is-from", "is-to"));
    const line = arrow.querySelector("line");
    if (ply === 0) {
      arrow.classList.remove("is-visible");
    } else {
      const [from, to] = LINE[ply - 1];
      root.querySelector(`[data-square="${from}"]`).classList.add("is-from");
      root.querySelector(`[data-square="${to}"]`).classList.add("is-to");
      const [x1, y1] = toXY(from);
      const [x2, y2] = toXY(to);
      // Stop short of the target square's centre so the head sits on the piece's edge.
      const len = Math.hypot(x2 - x1, y2 - y1);
      const k = (len - 0.32) / len;
      line.setAttribute("x1", x1 + 0.5);
      line.setAttribute("y1", y1 + 0.5);
      line.setAttribute("x2", x1 + 0.5 + (x2 - x1) * k);
      line.setAttribute("y2", y1 + 0.5 + (y2 - y1) * k);
      arrow.classList.add("is-visible");
    }
    arrow.classList.toggle("is-brilliant", brilliant);
    root.classList.toggle("is-brilliant", brilliant);
    onPly?.(ply);
  }

  return { setPly, plies: LINE.length };
}

// Career entries (oldest first) → the white plies they play. Earlier white moves stay "book".
export function assignMoves(entries) {
  const played = entries.slice(-WHITE_MOVES);
  const offset = WHITE_MOVES - played.length;
  return played.map((entry, i) => {
    const whiteIndex = offset + i;
    const ply = whiteIndex * 2 + 1; // position after White's move
    const [, , san] = LINE[whiteIndex * 2];
    const reply = LINE[whiteIndex * 2 + 1]?.[2] ?? null;
    return { entry, number: whiteIndex + 1, san, reply, ply };
  });
}

export function bookMoves(count) {
  const out = [];
  for (let i = 0; i < WHITE_MOVES - count; i++) {
    out.push({ number: i + 1, san: LINE[i * 2][2], reply: LINE[i * 2 + 1][2], ply: i * 2 + 1 });
  }
  return out;
}
