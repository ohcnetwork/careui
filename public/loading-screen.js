/**
 * Pre-React loading screen.
 *
 * Renders the pixel-art Care UI animation from the very first paint, before
 * the React bundle loads. Plays a full heart → logo cycle before removing
 * itself, so the animation is never cut off mid-transition.
 *
 * Lifecycle:
 *   1. Runs synchronously; injects SVG + text into <div id="app-loading">.
 *   2. Animates: heart in → ripple to logo.
 *   3. When the page is ready, DynamicMainContent calls __removeLoadingScreen().
 *      The screen fades out at the next natural cycle boundary.
 */
(function () {
  var ROWS = 8, COLS = 10;
  var WAVE_STEP_MS = 35;
  var HOLD_MS = 400;
  var CELL_ANIM_MS = 300;
  var HEART_FILL = "#f43f5e";
  var LOGO_LIGHT = "#059669";
  var LOGO_DARK  = "#047857";
  var R = 0.30;

  var HEART_PATTERN = [
    [0,0,1,1,0,0,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [1,1,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
  ];

  var LOGO_PATTERN = [
    [0,0,1,1,0,0,1,1,0,0],
    [0,0,1,1,0,0,1,1,0,0],
    [1,1,0,0,1,1,0,0,1,1],
    [1,1,0,0,1,1,0,0,1,1],
    [0,0,1,1,1,1,1,1,0,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
  ];

  var LOGO_LIGHT_KEYS = {
    "0,2":1,"1,2":1,"0,3":1,"1,3":1,
    "0,6":1,"1,6":1,"0,7":1,"1,7":1,
    "2,0":1,"2,1":1,"3,0":1,"3,1":1,
    "2,8":1,"2,9":1,"3,8":1,"3,9":1,
  };

  var CORNER_MAP = {
    "0,2":{tl:R},"0,3":{tr:R},
    "0,6":{tl:R},"0,7":{tr:R},
    "2,0":{tl:R},"3,0":{bl:R},
    "2,9":{tr:R},"3,9":{br:R},
    "7,4":{bl:R},"7,5":{br:R},
  };

  // ─── cell path builder ────────────────────────────────────────────────────
  function cellPath(x, y, c) {
    c = c || {};
    var w = 1.01, h = 1.01;
    var tl = c.tl||0, tr = c.tr||0, br = c.br||0, bl = c.bl||0;
    var p = [];
    p.push("M " + (x+tl) + "," + y);
    p.push("L " + (x+w-tr) + "," + y);
    if (tr) p.push("Q " + (x+w) + "," + y + " " + (x+w) + "," + (y+tr));
    p.push("L " + (x+w) + "," + (y+h-br));
    if (br) p.push("Q " + (x+w) + "," + (y+h) + " " + (x+w-br) + "," + (y+h));
    p.push("L " + (x+bl) + "," + (y+h));
    if (bl) p.push("Q " + x + "," + (y+h) + " " + x + "," + (y+h-bl));
    p.push("L " + x + "," + (y+tl));
    if (tl) p.push("Q " + x + "," + y + " " + (x+tl) + "," + y);
    p.push("Z");
    return p.join(" ");
  }

  // ─── build cell data ──────────────────────────────────────────────────────
  var CELL_DATA = [];
  for (var row = 0; row < ROWS; row++) {
    for (var col = 0; col < COLS; col++) {
      var key = row + "," + col;
      CELL_DATA.push({
        row: row, col: col,
        idx: row * COLS + col,
        inHeart: HEART_PATTERN[row][col] === 1,
        inLogo:  LOGO_PATTERN[row][col] === 1,
        isLogoLight: !!LOGO_LIGHT_KEYS[key],
        d: cellPath(col, row, CORNER_MAP[key]),
      });
    }
  }
  CELL_DATA.sort(function(a, b) {
    var da = Math.sqrt(Math.pow(a.row-3.5,2) + Math.pow(a.col-4.5,2));
    var db = Math.sqrt(Math.pow(b.row-3.5,2) + Math.pow(b.col-4.5,2));
    return da - db;
  });

  var CELL_BY_IDX = new Array(ROWS * COLS);
  CELL_DATA.forEach(function(c) { CELL_BY_IDX[c.idx] = c; });

  // ─── wave groups ──────────────────────────────────────────────────────────
  var groupMap = {};
  CELL_DATA.forEach(function(c) {
    var k = Math.round(Math.sqrt(Math.pow(c.row-3.5,2) + Math.pow(c.col-4.5,2)) * 2);
    if (!groupMap[k]) groupMap[k] = [];
    groupMap[k].push(c.idx);
  });
  var WAVE_GROUPS = Object.keys(groupMap)
    .map(Number).sort(function(a,b){return a-b;})
    .map(function(k){ return { indices: groupMap[k] }; });
  var WAVE_GROUPS_REV = WAVE_GROUPS.slice().reverse();

  // ─── build DOM ────────────────────────────────────────────────────────────
  var NS = "http://www.w3.org/2000/svg";

  var container = document.getElementById("app-loading");
  if (!container) return;

  var svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 " + COLS + " " + ROWS);
  svg.setAttribute("aria-hidden", "true");
  svg.style.cssText = "width:72px;aspect-ratio:" + COLS + "/" + ROWS;

  var beatG = document.createElementNS(NS, "g");
  beatG.style.cssText = "transform-box:fill-box;transform-origin:center";
  svg.appendChild(beatG);

  var rectRefs = new Array(ROWS * COLS);
  var KF = new Array(ROWS * COLS);
  for (var i = 0; i < ROWS * COLS; i++) {
    var cell = CELL_BY_IDX[i];
    var lFill = cell.isLogoLight ? LOGO_LIGHT : LOGO_DARK;
    KF[i] = {
      heartIn:     [{ fill: HEART_FILL, transform:"scale(0.35)", opacity:"0" }, { fill: HEART_FILL, transform:"scale(1)", opacity:"1" }],
      logoIn:      [{ fill: lFill,      transform:"scale(0.35)", opacity:"0" }, { fill: lFill,      transform:"scale(1)", opacity:"1" }],
      heartOut:    [{ fill: HEART_FILL, transform:"scale(1)", opacity:"1" }, { fill: HEART_FILL, transform:"scale(0.35)", opacity:"0" }],
      logoOut:     [{ fill: lFill,      transform:"scale(1)", opacity:"1" }, { fill: lFill,      transform:"scale(0.35)", opacity:"0" }],
      heartToLogo: [
        { fill: HEART_FILL, transform:"scale(1)",    opacity:"1",   offset:0    },
        { fill: HEART_FILL, transform:"scale(0.68)", opacity:"0.4", offset:0.30 },
        { fill: lFill,      transform:"scale(0.68)", opacity:"0.4", offset:0.33 },
        { fill: lFill,      transform:"scale(1)",    opacity:"1",   offset:1    },
      ],
      logoToHeart: [
        { fill: lFill,      transform:"scale(1)",    opacity:"1",   offset:0    },
        { fill: lFill,      transform:"scale(0.68)", opacity:"0.4", offset:0.30 },
        { fill: HEART_FILL, transform:"scale(0.68)", opacity:"0.4", offset:0.33 },
        { fill: HEART_FILL, transform:"scale(1)",    opacity:"1",   offset:1    },
      ],
    };
    var path = document.createElementNS(NS, "path");
    path.setAttribute("d", cell.d);
    path.setAttribute("fill", "transparent");
    path.setAttribute("opacity", "0");
    path.style.cssText = "transform-box:fill-box;transform-origin:center";
    beatG.appendChild(path);
    rectRefs[i] = path;
  }

  var label = document.createElement("p");
  label.style.cssText = "padding-left:12px;margin:0;text-align:center;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280";
  label.textContent = "loading care...";

  container.appendChild(svg);
  container.appendChild(label);

  // ─── animation engine ─────────────────────────────────────────────────────
  var timers = new Set();
  var mounted = true;
  var isFirstShow = true;
  var pendingRemove = false;

  function schedule(fn, delay) {
    var id = setTimeout(function() {
      timers.delete(id);
      fn();
    }, delay);
    timers.add(id);
  }

  function show(next, onDone) {
    var first = isFirstShow;
    if (first) isFirstShow = false;

    var nextProp = next === "heart" ? "inHeart" : "inLogo";
    var prevProp = next === "heart" ? "inLogo"  : "inHeart";
    var groups = next === "logo" ? WAVE_GROUPS_REV : WAVE_GROUPS;
    var waveDuration = (groups.length - 1) * WAVE_STEP_MS;

    // heartbeat pulse
    schedule(function() {
      if (!mounted) return;
      beatG.animate([
        { transform:"scale(1)",    offset:0    },
        { transform:"scale(1.08)", offset:0.20 },
        { transform:"scale(1)",    offset:0.46 },
        { transform:"scale(1.03)", offset:0.68 },
        { transform:"scale(1)",    offset:1    },
      ], { duration:580, easing:"ease-in-out", fill:"none" });
    }, Math.round(waveDuration * 0.45));

    groups.forEach(function(group, i) {
      schedule(function() {
        if (!mounted) return;
        group.indices.forEach(function(idx) {
          var cell = CELL_BY_IDX[idx];
          if (!cell) return;
          var inNext = cell[nextProp];
          var inPrev = !first && cell[prevProp];
          if (!inNext && !inPrev) return;

          var el = rectRefs[idx];
          if (!el) return;

          el.getAnimations().forEach(function(a) {
            try { a.commitStyles(); } catch(e) { /* ignore */ }
            a.cancel();
          });

          var kf = KF[idx];
          if (inNext && inPrev) {
            el.animate(next === "heart" ? kf.logoToHeart : kf.heartToLogo,
              { duration:CELL_ANIM_MS, easing:"ease-in-out", fill:"forwards" });
          } else if (inNext) {
            el.animate(next === "heart" ? kf.heartIn : kf.logoIn,
              { duration:CELL_ANIM_MS, easing:"cubic-bezier(0.2,0,0.2,1)", fill:"forwards" });
          } else {
            el.animate(next === "heart" ? kf.logoOut : kf.heartOut,
              { duration:CELL_ANIM_MS, easing:"cubic-bezier(0.55,0,1,0.45)", fill:"forwards" });
          }
        });
      }, i * WAVE_STEP_MS);
    });

    // breathing pulse mid-hold
    schedule(function() {
      if (!mounted) return;
      beatG.animate([
        { transform:"scale(1)",     offset:0   },
        { transform:"scale(1.025)", offset:0.5 },
        { transform:"scale(1)",     offset:1   },
      ], { duration:Math.round(HOLD_MS * 0.8), easing:"ease-in-out", fill:"none" });
    }, waveDuration + Math.round(CELL_ANIM_MS * 0.55));

    schedule(function() {
      if (!mounted) return;
      if (onDone) onDone();
    }, waveDuration + HOLD_MS);
  }

  // ─── start loop ───────────────────────────────────────────────────────────
  function doRemove() {
    mounted = false;
    timers.forEach(clearTimeout);
    timers.clear();
    if (container && container.parentNode) {
      container.style.transition = "opacity 150ms ease";
      container.style.opacity = "0";
      setTimeout(function() {
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }, 200);
    }
    delete window.__removeLoadingScreen;
  }

  show("heart", function() {
    show("logo", function() {
      // One full sequence (heart → logo) done. Remove now if page is ready,
      // otherwise keep cycling until it is.
      if (pendingRemove) { doRemove(); return; }
      function cycle() {
        show("heart", function() {
          show("logo", function() {
            if (pendingRemove) { doRemove(); return; }
            cycle();
          });
        });
      }
      cycle();
    });
  });

  // ─── teardown (called by main.tsx after React mounts) ─────────────────────
  // Sets a flag; the loading screen fades out at the next natural shape
  // boundary so the current animation is never cut off mid-transition.
  // Safety timeout ensures removal even if the cycle loop stalls (3s cap).
  window.__removeLoadingScreen = function() {
    pendingRemove = true;
    setTimeout(function() { if (mounted) doRemove(); }, 3000);
  };
})();
