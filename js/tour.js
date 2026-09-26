// The projects' knight's tour: every project sits on a square a knight can reach from the
// previous one. A small board beside the list shows the path; the knight jumps to whichever
// project you're looking at.

const FILES = "abcdefgh";
const JUMPS = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

const toSquare = ([x, y]) => FILES[x] + (y + 1);

// The tour opens with a hand-picked sweep across the board (every step a legal knight move);
// past that it continues by Warnsdorff's rule (jump to the square with the fewest onward moves).
// Deterministic, so the same projects always land on the same squares.
const OPENING = ["b1", "c3", "e4", "f6", "h7", "f8", "d7", "b6", "a4"];
const fromSquare = (sq) => [FILES.indexOf(sq[0]), Number(sq[1]) - 1];

export function knightTour(count) {
  const seen = new Set();
  const inside = ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8;
  const key = ([x, y]) => x * 8 + y;
  const onward = (sq) => JUMPS.map(([dx, dy]) => [sq[0] + dx, sq[1] + dy]).filter((n) => inside(n) && !seen.has(key(n)));

  const path = OPENING.slice(0, count).map(fromSquare);
  path.forEach((sq) => seen.add(key(sq)));
  while (path.length < Math.min(count, 64)) {
    const options = onward(path.at(-1));
    if (!options.length) break;
    options.sort((a, b) => onward(a).length - onward(b).length || key(a) - key(b));
    path.push(options[0]);
    seen.add(key(options[0]));
  }
  return path.map((xy) => ({ xy, square: toSquare(xy) }));
}

// Board geometry in SVG units: each square is 1×1; rank 8 at the top.
const centre = ([x, y]) => [x + 0.5, 7 - y + 0.5];

export function createTourBoard(root, path) {
  const squares = Array.from({ length: 64 }, (_, i) => {
    const x = i % 8;
    const y = 7 - Math.floor(i / 8);
    return `<rect x="${x}" y="${7 - y}" width="1" height="1" class="${(x + y) % 2 ? "t-light" : "t-dark"}"/>`;
  }).join("");

  const points = path.map((p) => centre(p.xy).join(",")).join(" ");
  const stops = path
    .map((p, i) => {
      const [cx, cy] = centre(p.xy);
      return `<g class="t-stop" data-stop="${i}"><circle cx="${cx}" cy="${cy}" r="0.2"/><text x="${cx}" y="${cy}">${i + 1}</text></g>`;
    })
    .join("");

  root.innerHTML = `
    <svg class="tour-svg" viewBox="0 0 8 8" focusable="false">
      <defs><pattern id="tour-hatch" width="0.14" height="0.14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="0.14"/></pattern></defs>
      <g class="t-squares">${squares}</g>
      <polyline class="t-path" points="${points}"/>
      <polyline class="t-walked" points=""/>
      ${stops}
    </svg>
    <img class="tour-knight" src="assets/pieces/ln.svg" alt="" width="45" height="45">
    <p class="tour-caption"></p>`;

  const knight = root.querySelector(".tour-knight");
  const walked = root.querySelector(".t-walked");
  const caption = root.querySelector(".tour-caption");
  const stopEls = [...root.querySelectorAll(".t-stop")];

  function go(index, label = "") {
    const stop = path[index];
    if (!stop) return;
    const [x, y] = stop.xy;
    knight.style.setProperty("--x", x);
    knight.style.setProperty("--y", 7 - y);
    walked.setAttribute("points", path.slice(0, index + 1).map((p) => centre(p.xy).join(",")).join(" "));
    stopEls.forEach((el, i) => {
      el.classList.toggle("is-walked", i <= index);
      el.classList.toggle("is-current", i === index);
    });
    caption.textContent = label ? `N${stop.square} — ${label}` : "";
  }

  return { go };
}
