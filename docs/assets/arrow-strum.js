// Makes the heart on the Arrow Strum page playable. It is level 13 exactly as
// the game deals it, with the game's tuning. Without this script the board
// stays a picture. Nothing is stored or sent.
const demo = document.querySelector("#board-demo");
const board = demo.querySelector(".board");
const status = demo.querySelector(".board-status");
const restartButton = demo.querySelector("[data-restart]");
const autoplayButton = demo.querySelector("[data-autoplay]");
const still = window.matchMedia("(prefers-reduced-motion: reduce)");
const WIDTH = 12, HEIGHT = 11;
const STEP = { R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1] };
const WORD = { R: "right", L: "left", U: "up", D: "down" };
const START = "New board";
const specs = [...board.querySelectorAll("[data-arrow]")].map((path) => path.dataset.arrow);
let arrows = [], bumps = 0, audio;

// ---- Sound: a plucked string, tuned by arrow length.
const notes = new Map();
const frequencyOf = (length) => {
  const k = length - 2;
  return 523.25 * 2 ** (-([0, 3, 5, 8, 10][k % 5] + 12 * Math.floor(k / 5)) / 12);
};
function noteFor(length) {
  if (notes.has(length)) return notes.get(length);
  const rate = audio.sampleRate, seconds = 2, frequency = frequencyOf(length);
  const period = Math.round(rate / frequency), line = new Float32Array(period);
  const buffer = audio.createBuffer(1, rate * seconds, rate), out = buffer.getChannelData(0);
  const damping = 0.03 ** (1 / (seconds * frequency));
  let previous = 0, peak = 0;
  for (let i = 0; i < period; i++) line[i] = previous = 0.6 * (Math.random() * 2 - 1) + 0.4 * previous;
  for (let n = 0, i = 0; n < out.length; n++, i = (i + 1) % period) {
    out[n] = line[i];
    line[i] = damping * 0.5 * (line[i] + line[(i + 1) % period]);
    peak = Math.max(peak, Math.abs(out[n]));
  }
  for (let n = 0; n < out.length; n++) out[n] *= 0.5 / peak * Math.min(1, (out.length - n) / (rate * 0.04));
  notes.set(length, buffer);
  return buffer;
}
function ready() {
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return false;
  audio ||= new Context();
  if (audio.state === "suspended") audio.resume();
  return true;
}
function play(tones, gap = 0) {
  if (!ready()) return;
  tones.forEach(([length, level], i) => {
    const source = audio.createBufferSource(), gain = audio.createGain();
    source.buffer = noteFor(length);
    gain.gain.value = level;
    source.connect(gain).connect(audio.destination);
    source.start(audio.currentTime + i * gap);
  });
}
// The board's one long string (22 points) speaks as a low chord, as in the game.
const pluck = (length, level = .8) => play(length > 16
  ? [[17, .5], [12, .65], [9, .5], [10, .4]].map(([tone, weight]) => [tone, weight * level / .8])
  : [[length, level]]);
const strum = () => play([[12, .5], [10, .45], [7, .45], [5, .4], [4, .4], [2, .4]], .05);
function bonk() {
  if (!ready()) return;
  const tone = audio.createOscillator(), gain = audio.createGain(), now = audio.currentTime;
  tone.frequency.setValueAtTime(150, now);
  tone.frequency.exponentialRampToValueAtTime(60, now + .12);
  gain.gain.setValueAtTime(.3, now);
  gain.gain.exponentialRampToValueAtTime(.001, now + .16);
  tone.connect(gain).connect(audio.destination);
  tone.start(now);
  tone.stop(now + .17);
}

// ---- Board
function parse(spec) {
  const [start, ...moves] = spec.split(" ");
  let [x, y] = start.split(",").map(Number);
  const points = [[x, y]];
  for (const move of moves) {
    const [dx, dy] = STEP[move[0]];
    for (let i = 0; i < Number(move.slice(1)); i++) points.push([x += dx, y += dy]);
  }
  return { points, way: moves.at(-1)[0] };
}
function draw(points, [dx, dy]) {
  const [x, y] = points.at(-1), k = .34;
  return "M" + points.map((p) => p.join(" ")).join("L") +
    `M${x - k * dx - k * dy} ${y - k * dy + k * dx}L${x} ${y}L${x - k * dx + k * dy} ${y - k * dy - k * dx}`;
}
function svg(name, className, parent) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  element.setAttribute("class", className);
  parent.append(element);
  return element;
}
function rayOf(arrow) {
  const [dx, dy] = STEP[arrow.way], ray = [];
  let [x, y] = arrow.points.at(-1);
  while ((x += dx) >= 0 && x < WIDTH && (y += dy) >= 0 && y < HEIGHT) ray.push([x, y]);
  return ray;
}
function focusable(arrow) {
  for (const other of arrows) other.group.tabIndex = other === arrow ? 0 : -1;
}
function deal(message) {
  stopAutoplay();
  bumps = 0;
  board.replaceChildren();
  arrows = specs.map((spec, index) => {
    const arrow = parse(spec);
    arrow.index = index;
    const group = arrow.group = svg("g", "arrow", board);
    arrow.line = svg("path", "line", group);
    const d = draw(arrow.points, STEP[arrow.way]);
    arrow.line.setAttribute("d", d);
    svg("path", "hit", group).setAttribute("d", d);
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", `Arrow pointing ${WORD[arrow.way]}, length ${arrow.points.length}`);
    group.addEventListener("click", () => tap(arrow));
    group.addEventListener("keydown", (event) => onKey(event, arrow));
    return arrow;
  });
  focusable(arrows[0]);
  status.textContent = message;
}
function onKey(event, arrow) {
  const turn = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    tap(arrow, true);
  } else if (turn) {
    event.preventDefault();
    const next = arrows[(arrows.indexOf(arrow) + turn + arrows.length) % arrows.length];
    focusable(next);
    next.group.focus();
  }
}
function tap(arrow, byKey = false) {
  if (!arrows.includes(arrow)) return;
  stopAutoplay();
  const ray = rayOf(arrow);
  const taken = new Set(arrows.filter((a) => a !== arrow).flatMap((a) => a.points.map(String)));
  if (ray.some((point) => taken.has(String(point)))) return bump(arrow);
  const index = arrows.indexOf(arrow);
  arrows.splice(index, 1);
  pluck(arrow.points.length);
  leave(arrow, ray);
  if (arrows.length) {
    const next = arrows[index % arrows.length];
    focusable(next);
    if (byKey) next.group.focus();
    status.textContent = `${arrows.length} to go`;
  } else {
    status.textContent = bumps ? "Cleared! 99 more coming soon" : "Perfect! 99 more coming soon";
    if (byKey) restartButton.focus();
    setTimeout(strum, 500);
  }
}
function bump(arrow) {
  bumps++;
  bonk();
  status.textContent = "Something’s in the way";
  arrow.line.classList.add("bumped");
  setTimeout(() => arrow.line.classList.remove("bumped"), 700);
  if (still.matches) return;
  const [dx, dy] = STEP[arrow.way];
  arrow.line.animate([0, .2, -.13, .06, 0].map((n) => ({ transform: `translate(${dx * n}px, ${dy * n}px)` })),
    { duration: 320, easing: "ease-out" });
}
// Slides the arrow along its own path and off the board, as the game does.
function leave(arrow, ray) {
  arrow.group.classList.add("leaving");
  arrow.group.removeAttribute("role");
  arrow.group.removeAttribute("tabindex");
  arrow.group.setAttribute("aria-hidden", "true");
  if (still.matches) return arrow.group.remove();
  const [dx, dy] = STEP[arrow.way], body = arrow.points.length - 1;
  const track = [...arrow.points, ...ray];
  const [endX, endY] = track.at(-1);
  for (let i = 1; i <= body + 4; i++) track.push([endX + dx * i, endY + dy * i]);
  const distance = track.length - 1 - body, duration = 180 + 40 * (ray.length + body + 1);
  const at = (arc) => {
    const i = Math.min(Math.floor(arc), track.length - 2), t = arc - i;
    return [track[i][0] + (track[i + 1][0] - track[i][0]) * t, track[i][1] + (track[i + 1][1] - track[i][1]) * t];
  };
  let begin;
  const frame = (now) => {
    begin ??= now;
    const t = (now - begin) / duration;
    if (t >= 1) return arrow.group.remove();
    const s = t * t * distance, points = [at(s)];
    for (let i = Math.floor(s) + 1; i < s + body; i++) points.push(track[i]);
    points.push(at(s + body));
    arrow.line.setAttribute("d", draw(points, headingAt(track, s + body)));
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
function headingAt(track, arc) {
  const i = Math.min(Math.max(Math.ceil(arc), 1), track.length - 1);
  return [track[i][0] - track[i - 1][0], track[i][1] - track[i - 1][1]];
}

board.setAttribute("role", "group");
board.setAttribute("aria-label", "Playable heart-shaped board. Use the arrow keys to move between arrows and Enter to free one.");

// ---- Autoplay: the game's own score for level 13, "Rain ribbons". The arrows
// are listed in score order, so the first one left is always free. Each entry
// is [beats until the next note, loudness, bass string].
const TEMPO = 94, VOLUME = .8;
const SCORE = [
  [.5, .42, 10], [.5, .49], [.5, .55], [.5, .59], [1, .6], [1, .58], [1, .54, 12], [3, .43],
  [.5, .48, 12], [.5, .55], [1, .6], [.75, .62], [.25, .62], [1, .58], [2, .52, 12], [2, .4],
  [.75, .44, 10], [.25, .49], [3, .54, 12],
];
let timer, onset;
function showPlaying(playing) {
  autoplayButton.classList.toggle("playing", playing);
  autoplayButton.title = playing ? "Stop" : "Autoplay";
  autoplayButton.setAttribute("aria-label", autoplayButton.title);
}
function startAutoplay() {
  if (!arrows.length) deal(START);
  showPlaying(true);
  status.textContent = `Autoplay · ${TEMPO} bpm`;
  onset = performance.now();
  playNext();
}
function playNext() {
  const arrow = arrows.shift();
  const [beats, loudness, bass] = SCORE[arrow.index];
  if (bass) play([[bass, .24 * VOLUME * 1.6]]);
  pluck(arrow.points.length, loudness * VOLUME * 1.6);
  leave(arrow, rayOf(arrow));
  if (arrows.length) focusable(arrows[0]);
  onset += beats * 60000 / TEMPO;
  timer = setTimeout(arrows.length ? playNext : stopAutoplay, onset - performance.now());
}
function stopAutoplay() {
  if (!autoplayButton.classList.contains("playing")) return;
  clearTimeout(timer);
  showPlaying(false);
  status.textContent = arrows.length ? `${arrows.length} to go` : "99 more coming soon";
}
autoplayButton.addEventListener("click", () => {
  autoplayButton.classList.contains("playing") ? stopAutoplay() : startAutoplay();
});
document.addEventListener("visibilitychange", () => { if (document.hidden) stopAutoplay(); });

demo.querySelector(".board-controls").hidden = false;
restartButton.addEventListener("click", () => deal(START));
deal("");

// ---- Screenshots open full size. Without this script they are plain links.
const viewer = document.querySelector(".viewer");
const shots = [...document.querySelectorAll(".shot")];
if (viewer.showModal) {
  const picture = viewer.querySelector("img"), caption = viewer.querySelector(".viewer-caption");
  let current = 0, startX = null;
  const show = (index) => {
    current = (index + shots.length) % shots.length;
    const shot = shots[current], image = shot.querySelector("img");
    picture.src = shot.href;
    picture.alt = image.alt;
    caption.textContent = shot.querySelector("span")?.textContent ?? "";
  };
  shots.forEach((shot, index) => shot.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    show(index);
    viewer.showModal();
  }));
  viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
  viewer.querySelector(".viewer-previous").addEventListener("click", () => show(current - 1));
  viewer.querySelector(".viewer-next").addEventListener("click", () => show(current + 1));
  viewer.addEventListener("click", (event) => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener("close", () => shots[current].focus());
  viewer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
  picture.addEventListener("pointerdown", (event) => { startX = event.clientX; });
  picture.addEventListener("pointerup", (event) => {
    const moved = startX === null ? 0 : event.clientX - startX;
    if (Math.abs(moved) > 40) show(current + (moved < 0 ? 1 : -1));
    startX = null;
  });
  picture.addEventListener("dragstart", (event) => event.preventDefault());
}
