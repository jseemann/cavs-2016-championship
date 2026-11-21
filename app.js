(function () {
  "use strict";
  var data = window.ARCHIVE || [];
  var main = document.getElementById("archive");
  var toc = document.getElementById("toc");

  var drive = function (id) { return "https://drive.google.com/file/d/" + id + "/view"; };
  var preview = function (id) { return "https://drive.google.com/file/d/" + id + "/preview"; };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function initials(title) {
    var words = title.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean);
    return words.slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase();
  }

  function frame(item) {
    var f = el("span", "frame");
    if (item.th) {
      var img = el("img");
      img.src = "thumbs/" + item.id + ".jpg";
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      f.appendChild(img);
    } else {
      f.appendChild(el("span", "ph", item.k === "photo" ? item.t : initials(item.t)));
    }
    return f;
  }

  function videoTile(item) {
    var b;
    if (item.u) {
      // Google Photos can't be embedded, so these open in a new tab
      b = el("a", "tile");
      b.href = item.u;
      b.target = "_blank";
      b.rel = "noopener";
    } else {
      b = el("button", "tile");
      b.type = "button";
    }
    var f = frame(item);
    f.appendChild(el("span", "play"));
    if (item.d) f.appendChild(el("span", "dur", item.d));
    b.appendChild(f);
    b.appendChild(el("span", "cap", item.t));
    if (!item.u) b.addEventListener("click", function () { open(item, ""); });
    return b;
  }

  function photoTile(item) {
    var b = el("button", "tile");
    b.type = "button";
    b.setAttribute("aria-label", item.t);
    b.appendChild(frame(item));
    b.appendChild(el("span", "cap", item.t));
    b.addEventListener("click", function () { open(item, "tall"); });
    return b;
  }

  function row(item) {
    var li = el("li");
    var b = el("button", "row" + (item.k === "doc" ? " doc" : ""));
    b.type = "button";
    b.appendChild(el("span", "ico"));
    b.appendChild(el("span", "t", item.t));
    b.appendChild(el("span", "d", item.d || (item.k === "doc" ? "PDF" : "")));
    b.addEventListener("click", function () { open(item, item.k === "doc" ? "tall" : "audio"); });
    li.appendChild(b);
    return li;
  }

  function renderGroup(items) {
    var byKind = { video: [], photo: [], audio: [], doc: [] };
    items.forEach(function (it) { byKind[it.k].push(it); });
    var frag = document.createDocumentFragment();
    if (byKind.video.length) {
      var gv = el("div", "grid-video");
      byKind.video.forEach(function (it) { gv.appendChild(videoTile(it)); });
      frag.appendChild(gv);
    }
    if (byKind.photo.length) {
      var gp = el("div", "grid-photo");
      byKind.photo.forEach(function (it) { gp.appendChild(photoTile(it)); });
      frag.appendChild(gp);
    }
    var rows = byKind.audio.concat(byKind.doc);
    if (rows.length) {
      var ul = el("ul", "list");
      rows.forEach(function (it) { ul.appendChild(row(it)); });
      frag.appendChild(ul);
    }
    return frag;
  }

  data.forEach(function (s) {
    var sec = el("section", "section");
    sec.id = s.key;
    var head = el("div", "section-head");
    head.appendChild(el("h2", null, s.title));
    if (s.date) head.appendChild(el("span", "date", s.date));
    sec.appendChild(head);
    sec.appendChild(el("p", "blurb", s.blurb));
    s.groups.forEach(function (g) {
      if (g.label) sec.appendChild(el("h3", "group-label", g.label));
      sec.appendChild(renderGroup(g.items));
    });
    main.appendChild(sec);

    var li = el("li");
    var a = el("a", null, s.title);
    a.href = "#" + s.key;
    if (s.date) a.appendChild(el("small", null, s.date));
    li.appendChild(a);
    toc.appendChild(li);
  });

  // Highlight the section in view
  var links = Array.prototype.slice.call(toc.querySelectorAll("a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          a.setAttribute("aria-current", a.getAttribute("href") === "#" + e.target.id ? "true" : "false");
        });
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    document.querySelectorAll(".section").forEach(function (s) { io.observe(s); });
  }

  // Viewer
  var dlg = document.getElementById("viewer");
  var iframe = document.getElementById("viewer-iframe");
  var wrap = iframe.parentNode;
  var lastFocus = null;

  function open(item, mode) {
    lastFocus = document.activeElement;
    document.getElementById("viewer-title").textContent = item.t;
    document.getElementById("viewer-open").href = drive(item.id);
    wrap.className = "viewer-frame" + (mode ? " " + mode : "");
    iframe.src = preview(item.id);
    if (dlg.showModal) dlg.showModal(); else window.open(drive(item.id), "_blank", "noopener");
  }
  function close() {
    iframe.src = "about:blank";
    if (dlg.open) dlg.close();
  }
  document.getElementById("viewer-close").addEventListener("click", close);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
  dlg.addEventListener("close", function () {
    iframe.src = "about:blank";
    if (lastFocus) lastFocus.focus();
  });
})();
