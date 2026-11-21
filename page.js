// Shared by index.html and 404.html (GitHub Pages serves 404.html for /r/<code>, so it also renders invitations).
(function () {
  var cfg = window.HYF || {};
  var $ = function (id) { return document.getElementById(id); };
  var play = $("play"), ios = $("ios"), soon = $("soon");
  if (play) play.href = cfg.PLAY_URL;
  if (ios) {
    if (cfg.APP_STORE_ID && /^[0-9]+$/.test(cfg.APP_STORE_ID)) { ios.href = "https://apps.apple.com/app/id" + cfg.APP_STORE_ID; if (soon) soon.hidden = true; }
    else { ios.setAttribute("aria-disabled", "true"); ios.removeAttribute("href"); ios.textContent = "App Store: coming soon"; }
  }
  var view = $("view"); if (!view) return;
  var path = location.pathname.replace(/\/+$/, "");
  var m = path.match(/^\/r\/([^\/]+)$/);
  if (!m) { if (view.dataset.page === "notfound") { $("invite").hidden = true; $("missing").hidden = false; } return; }
  // The game's room code alphabet: 2-9 and A-Z without I, L, O; exactly six characters.
  var code = decodeURIComponent(m[1]).toUpperCase();
  $("missing").hidden = true;
  if (/^[2-9A-HJKMNP-Z]{6}$/.test(code)) {
    $("invite").hidden = false; $("code").textContent = code;
    var copy = $("copy");
    if (copy && navigator.clipboard) { copy.hidden = false; copy.onclick = function () { navigator.clipboard.writeText(code).then(function () { copy.textContent = "Copied"; }, function () {}); }; }
  } else {
    $("badlink").hidden = false;
  }
})();
