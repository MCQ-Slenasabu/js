var PF_VERSION = "2017-03-14-071354402", data = document.getElementById("printfriendly-data");

if (data) {
  var pfData = JSON.parse(data.getAttribute("data"));
  pfstyle = pfData.pfstyle, pfOptions = pfData.pfOptions;
}

var pfMod = window.pfMod || function(e, t) {
  var i = e.document, n = i.location.protocol, o = {
    environment: "production",
    disableUI: !1,
    protocol: n,
    dir: "ltr",
    usingBM: !1,
    maxImageWidth: 750,
    filePath: "/assets/versions/",
    hosts: {
      cdn: n + "//cdn.printfriendly.com",
      pf: n + "//app.printfriendly.com",
      ds: "https://www.printfriendly.com",
      ds_cdn: "https://pro-cdn.printfriendly.com",
      pdf: n + "//pdf.printfriendly.com",
      email: n + "//app.printfriendly.com",
      page: e.location.host.split(":")[0]
    },
    domains: {
      page: e.location.host.split(":")[0].split("www.").pop()
    }
  }, s = {
    removeEmailsFromUrl: function(e) {
      e = e.split("?")[0];
      for (var t = e.split("/"), i = t.length; i-- > 0; ) -1 !== t[i].indexOf("@") && t.splice(i, 1);
      return t.join("/");
    }
  }, a = {
    isReady: !1,
    readyBound: !1,
    setWidthOfImages: function() {
      for (var e = document.getElementsByTagName("img"), t = 0; t < e.length; t++) {
        var i = e[t];
        -1 === i.className.indexOf("hidden-originally") && (i.width = i.width);
      }
    },
    convertRelativetoAbsolute: function(e) {
      for (var t = document.getElementsByTagName(e), i, n, o = 0; o < t.length; o++) {
        i = t[o];
        try {
          "img" === e ? i.src = i.src : (n = i.getAttribute("href") || "", "#" !== n.charAt(0) && (i.href = i.href));
        } catch (s) {}
      }
    },
    removeScripts: function() {
      for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) e[t].parentNode && (e[t].parentNode.removeChild(e[t]), 
      t--);
    },
    processElements: function() {
      for (var t = "|link|style|noscript|object|embed|", i, n, o, s, a = document.body.getElementsByTagName("*"), r = 0; r < a.length; r++) try {
        n = a[r], o = n.nodeName.toLowerCase(), -1 !== t.indexOf("|" + o + "|") || "iframe" === o && !n.classList.contains("twitter-tweet-rendered") ? (n.parentNode.removeChild(n), 
        r--) : (i = "NA", i = n.currentStyle ? n.currentStyle.display : e.getComputedStyle(n, null).getPropertyValue("display"), 
        "none" === i && (s = n.getAttribute("class"), s = s ? s : "", s += " hidden-originally", 
        n.setAttribute("class", s))), "svg" === o ? this.convertSvgToImage(n) : "canvas" === o && this.convertCanvasToImage(n);
      } catch (c) {}
    },
    convertSvgToImage: function(t) {
      var i, n, o;
      t.setAttribute("version", 1.1), t.setAttribute("xmlns", "http://www.w3.org/2000/svg"), 
      n = t.outerHTML;
      var s = this.scaleImageDimensions({
        width: t.getBoundingClientRect().width,
        height: t.getBoundingClientRect().height
      });
      i = t.getAttribute("class"), i = i ? i : "", i += " pf-svg-image", o = new Image(), 
      o.src = "data:image/svg+xml;base64," + e.btoa(unescape(encodeURIComponent(n))), 
      o.setAttribute("class", i), o.width = s.width, o.height = s.height, t.parentNode.replaceChild(o, t);
    },
    convertCanvasToImage: function(e) {
      var t;
      classNames = e.getAttribute("class"), classNames = classNames ? classNames : "", 
      classNames += " canvas-png", t = new Image(), t.src = e.toDataURL("image/png"), 
      t.setAttribute("class", classNames), e.parentNode.replaceChild(t, e);
    },
    scaleImageDimensions: function(e) {
      if (e.width = parseInt(e.width, 10), e.height = parseInt(e.height, 10), e.width > pfMod.config.maxImageWidth) {
        var t = pfMod.config.maxImageWidth / e.width;
        e.width = e.width * t, e.height = e.height * t;
      }
      return e;
    },
    ready: function() {
      if (!a.isReady) {
        if (!document.body) return setTimeout(a.ready, 13);
        a.isReady = !0, a.readyFunc.call();
      }
    },
    doScrollCheck: function() {
      if (!a.isReady) {
        try {
          document.documentElement.doScroll("left");
        } catch (e) {
          return setTimeout(a.doScrollCheck, 50);
        }
        a.detach(), a.ready();
      }
    },
    detach: function() {
      document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a.completed, !1), 
      e.removeEventListener("load", a.completed, !1)) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a.completed), 
      e.detachEvent("onload", a.completed));
    },
    completed: function(e) {
      (document.addEventListener || "load" === e.type || "complete" === document.readyState) && (a.detach(), 
      a.ready());
    },
    bindReady: function() {
      if (!a.readyBound) {
        if (a.readyBound = !0, "complete" === document.readyState) return a.ready();
        if (document.addEventListener) document.addEventListener("DOMContentLoaded", a.completed, !1), 
        e.addEventListener("load", a.completed, !1); else if (document.attachEvent) {
          document.attachEvent("onreadystatechange", a.completed), e.attachEvent("onload", a.completed);
          var t = !1;
          try {
            t = null == e.frameElement && document.documentElement;
          } catch (i) {}
          t && t.doScroll && a.doScrollCheck();
        }
      }
    },
    domReady: function(e) {
      this.readyFunc = e, this.bindReady();
    },
    canonicalize: function(e) {
      if (e) {
        var t = document.createElement("div");
        return t.innerHTML = "<a></a>", t.firstChild.href = e, t.innerHTML = t.innerHTML, 
        t.firstChild.href;
      }
      return e;
    },
    processDocument: function() {
      this.removeScripts(), c.onServer || (this.processElements(), this.convertRelativetoAbsolute("a"), 
      this.convertRelativetoAbsolute("img"), this.setWidthOfImages());
    }
  }, r = {
    headerImageUrl: e.pfHeaderImgUrl,
    headerTagline: e.pfHeaderTagline,
    imageDisplayStyle: e.pfImageDisplayStyle,
    customCSSURL: a.canonicalize(e.pfCustomCSS),
    disableClickToDel: e.pfdisableClickToDel,
    disablePDF: e.pfDisablePDF,
    disablePrint: e.pfDisablePrint,
    disableEmail: e.pfDisableEmail,
    hideImages: e.pfHideImages
  }, c = {
    version: PF_VERSION,
    initialized: !1,
    finished: !1,
    onServer: !1,
    hasContent: !1,
    messages: [],
    errors: [],
    init: function(t) {
      try {
        this.initialized = !0, this.configure(t), this.onServerSetup(), this.setVariables(), 
        this.detectBrowser(), this.startIfNecessary(), e.print = this.start;
      } catch (i) {
        d.log(i);
      }
    },
    configure: function(t) {
      if (this.config = o, t) {
        this.config.environment = t.environment || "development";
        for (var i in t.hosts) this.config.hosts[i] = t.hosts[i];
        t.filePath && (this.config.filePath = t.filePath), t.ssLocation && (this.config.ssLocation = t.ssLocation), 
        t.ssStyleSheetHrefs && (this.config.ssStyleSheetHrefs = t.ssStyleSheetHrefs);
      }
      this.userOptions = {
        redirect: {
          disableForiPad: !!this.getVal(e.pfUserOptions, "redirect.disableForiPad")
        }
      };
    },
    getVal: function(e, t) {
      for (var i = t.split("."); "undefined" != typeof e && i.length; ) e = e[i.shift()];
      return e;
    },
    startIfNecessary: function() {
      (e.pfstyle || this.urlHasAutoStartParams()) && this.start();
    },
    urlHasAutoStartParams: function() {
      return -1 !== this.config.urls.page.indexOf("pfstyle=wp");
    },
    start: function() {
      c.isRedirectNecessary() ? c.redirect() : c.supportedSiteType() && a.domReady(function() {
        try {
          c.startTime = new Date().getTime(), c.sanitizeLocation(), c.grabDataForAlgo(), a.processDocument(), 
          c.detectPlatforms(), c.cacheBodyHTML(), c.config.disableUI || c.createMask(), c.loadCore();
        } catch (e) {
          d.log(e);
        }
      });
    },
    sanitizeLocation: function() {
      url = document.location.href.split("?")[0], url = s.removeEmailsFromUrl(url), url !== document.location.href && (history && "function" == typeof history.pushState ? history.pushState({
        pf: "sanitized"
      }, document.title, url) : c.urlHasPII = !0);
    },
    unsanitizeLocation: function() {
      history && history.state && "sanitized" == history.state.pf && history.back();
    },
    onServerSetup: function() {
      e.onServer && (this.onServer = !0, this.config.disableUI = !0);
    },
    setVariables: function() {
      var t = this, i, o = "";
      "production" !== this.config.environment && (o = "?_=" + Math.random());
      var s = t.config.hosts.cdn + t.config.filePath + t.version + "/pf-app/print.css" + o;
      this.config.disableUI && (s = ""), this.config.urls = {
        js: {
          jquery: n + "//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js",
          jqueryBackup: t.config.hosts.cdn + "/javascripts/common/jquery/1.11.0/jquery.min.js",
          core: t.config.hosts.cdn + t.config.filePath + t.version + "/core.js" + o,
          algo: t.config.hosts.cdn + t.config.filePath + t.version + "/algo.js" + o
        },
        css: {
          page: s
        },
        pdfMake: t.config.hosts.pdf + "/pdfs/make",
        email: t.config.hosts.email + "/email/new"
      };
      try {
        i = top.location.href;
      } catch (a) {
        i = e.location.href;
      }
      this.config.urls.page = i, this.userSettings = r, !e.pfstyle || "bk" !== e.pfstyle && "nbk" !== e.pfstyle && "cbk" !== e.pfstyle || (this.config.usingBM = !0);
    },
    detectBrowser: function() {
      this.browser = {};
      var e = navigator.appVersion;
      e && -1 !== e.indexOf("MSIE") ? (this.browser.version = parseFloat(e.split("MSIE")[1]), 
      this.browser.isIE = !0) : this.browser.isIE = !1;
    },
    detectPlatforms: function() {
      var t = /wp-content/i, i = /blogger.com/i, n = /squarespace.com/i, o, s = this.config.ssStyleSheetHrefs || [];
      if (0 === s.length) for (o = 0; o < document.styleSheets.length; o++) s.push(document.styleSheets[o].href);
      if ("wikihow.com" === this.config.domains.page || this.config.ssLocation && -1 !== this.config.ssLocation.indexOf("wikihow.com")) this.config.isWikiHow = !0; else if ("nytimes.com" === this.config.domains.page || this.config.ssLocation && -1 !== this.config.ssLocation.indexOf("nytimes.com")) this.config.isNYTimes = !0; else if ("wsite" === e.STYLE_PREFIX) this.config.isWeebly = !0; else {
        for (o = 0; o < c.metas.length; o++) {
          var a = c.metas[o];
          "generator" === a.name && "blogger" === a.content ? c.config.isBlogger = !0 : "blogger-template" === a.name && "dynamic" === a.content && (c.config.isBloggerDynamic = !0);
        }
        for (o = 0; o < s.length; o++) {
          var r = s[o];
          t.test(r) ? c.config.isWP = !0 : i.test(r) ? c.config.isBlogger = !0 : n.test(r) && (c.config.isSquareSpace = !0);
        }
      }
    },
    grabDataForAlgo: function() {
      c.metas = document.getElementsByTagName("meta");
    },
    detectAdBlock: function() {
      c.loadScript("https://cdnjs.cloudflare.com/ajax/libs/fuckadblock/3.2.1/fuckadblock.js", function() {
        function e(e) {
          var t = new XMLHttpRequest();
          t.open("POST", c.config.hosts.pf + "/stats", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), 
          t.send("event=" + e), "undefined" != typeof fuckAdBlock && fuckAdBlock.clearEvent();
        }
        if ("undefined" == typeof fuckAdBlock) e("adblock.present"); else {
          fuckAdBlock.onDetected(function() {
            e("adblock.present");
          }), fuckAdBlock.onNotDetected(function() {
            e("adblock.absent");
          });
          try {
            fuckAdBlock.check(!0);
          } catch (t) {}
        }
      });
    },
    loadScript: function(e, t) {
      var i = document.getElementsByTagName("head")[0], n = document.createElement("script");
      n.type = "text/javascript", n.src = e, n.onreadystatechange = t, n.onload = t, i.appendChild(n);
    },
    createIframe: function(e) {
      var t = e.createElement("iframe");
      return t.src = "javascript:false", t.frameBorder = "0", t.allowTransparency = "true", 
      t;
    },
    loadHtmlInIframe: function(e, t, i) {
      var n, o;
      try {
        o = t.contentWindow.document;
      } catch (s) {
        n = e.domain, t.src = "javascript:var d=document.open();d.domain='" + n + "';void(0);", 
        o = t.contentWindow.document;
      }
      o.write(i), o.close();
    },
    redirect: function() {
      var e = [ "source=cs", "url=" + encodeURIComponent(top.location.href) ], t;
      for (var i in r) "undefined" != typeof r[i] && e.push(i + "=" + encodeURIComponent(r[i]));
      t = this.config.hosts.pf + "/print/?" + e.join("&"), this.urlHasAutoStartParams() ? top.location.replace(t) : top.location.href = t;
    },
    supportedSiteType: function() {
      return "about:blank" === c.config.urls.page || "http:" !== c.config.protocol && "https:" !== c.config.protocol ? !1 : !0;
    },
    isRedirectNecessary: function() {
      try {
        var t = navigator.userAgent.match(/Edge\/(\d+.\d+)/);
        return !history || "function" != typeof history.pushState || navigator.userAgent.match(/(ipod|opera.mini|blackberry|playbook|bb10)/i) || this.browser.isIE && this.browser.version < 8 || this.browser.isIE && e.adsbygoogle || "undefined" != typeof $ && $.jcarousel && this.browser.isIE || this.browser.isIE && this.browser.version < 9 && "skinnytaste.com" === this.config.domains.page || t && 2 === t.length && parseFloat(t[1]) < 13.10586 ? !0 : !1;
      } catch (i) {
        return d.log(i), !1;
      }
    },
    createMask: function() {
      var e = document.createElement("div");
      e.innerHTML = '<div id="pf-mask" style="z-index: 2147483627!important; position: fixed !important; top: 0pt !important; left: 0pt !important; background-color: rgb(0, 0, 0) !important; opacity: 0.8 !important;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=80); height: 100% !important; width: 100% !important;"></div>', 
      document.body.appendChild(e.firstChild);
    },
    cacheBodyHTML: function() {
      c.bodyCache = '<div id="' + document.body.id + '" class="' + document.body.className + ' pf-body-cache">' + document.body.innerHTML + "</div>", 
      (c.browser.isIE || c.config.disableUI) && (document.body.innerHTML = "<p></p>");
    },
    refresh: function() {
      c.unsanitizeLocation();
      var t = c.config.urls.page.replace("pfstyle=wp", "").replace(/#(.*)$/, "");
      try {
        return document.body.innerHTML = '<div style="position:absolute; top:0; bottom:0; left:0; right:0; padding:10%; text-align:center; background:#333;">&nbsp;</div>', 
        this.urlHasAutoStartParams() ? e.top.location.href = t : e.top.location.reload(), 
        !1;
      } catch (i) {
        d.log(i), setTimeout(function() {
          e.top.location.replace(t);
        }, 100);
      }
    },
    removeDoubleSemiColon: function(e) {
      return e.replace(/;{2}/g, ";");
    },
    loadCore: function() {
      var e = '<!DOCTYPE html><html><head><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1"><script src="' + this.config.urls.js.jquery + '"></script><script src="' + this.config.urls.js.core + '"></script><link media="screen" type="text/css" rel="stylesheet" href="' + this.config.urls.css.page + '"></head><body class="cs-core-iframe" onload="core.init();"></body>', t = this.createIframe(document);
      t.id = "pf-core", t.name = "pf-core", document.body.appendChild(t);
      var i = t.style.cssText + ";width: 100% !important;max-width:100% !important;height: 100% !important; display: block !important; overflow: hidden !important; position: absolute !important; top: 0px !important; left: 0px !important; background-color: transparent !important; z-index: 2147483647!important";
      t.style.cssText = this.removeDoubleSemiColon(i), this.loadHtmlInIframe(document, t, e);
    }
  }, d = {
    _window: e.top,
    _doc: e.top.document,
    installInitiated: !1,
    validFile: /d3nekkt1lmmhms|printfriendly\.com|printnicer\.com|algo\.js|printfriendly\.js|core\.js/,
    setVars: function() {
      this._window.frames["pf-core"] && this._window.frames["pf-core"].document && (this._window = this._window.frames["pf-core"], 
      this._doc = this._window.document);
    },
    install: function() {
      if (this.installInitiated) return !0;
      this.installInitiated = !0, this.setVars();
      var e = this._doc.createElement("script"), t = this._doc.getElementsByTagName("script")[0];
      e.src = "//cdn.ravenjs.com/3.2.0/raven.min.js", t.parentNode.appendChild(e), this.wait();
    },
    wait: function() {
      return this._window.Raven ? (this.configure(), void this.pushExistingErrors()) : setTimeout(function() {
        d.wait();
      }, 100);
    },
    configure: function() {
      var e = "https://5463b49718cd4266911eab9e5c0e114d@app.getsentry.com/22091", t = {
        dataCallback: function(e) {
          var t, i;
          try {
            t = e.stacktrace.frames[0], t.filename.match(d.validFile) && "onload" !== t["function"] || e.stacktrace.frames.shift();
          } catch (n) {}
          return e;
        },
        shouldSendCallback: function(e) {
          return e && e.extra && e.extra.file ? !0 : !1;
        },
        release: c.version
      };
      this._window.Raven.config(e, t).install();
    },
    sendError: function(e, t) {
      t = "undefined" != typeof t ? {
        file: t.file
      } : {
        file: "printfriendly.js"
      }, t.usingBM = c.config.usingBM, t.url = c.config.urls.page, "production" === c.config.environment && this._window.Raven.captureException(e, {
        extra: t
      });
    },
    pushExistingErrors: function() {
      for (var e = 0; e < c.errors.length; e++) this.sendError(c.errors[e].err, c.errors[e].opts);
    },
    log: function(e, t) {
      c.finished = !0, t = t || {
        file: "printfriendly.js"
      };
      try {
        this._window.Raven ? this.sendError(e, t) : (c.errors.push({
          err: e,
          opts: t
        }), this.install(), c.messages.push(e.name + " : " + e.message), c.messages.push(e.stack));
      } catch (i) {}
    }
  };
  return c.exTracker = d, c;
}(window), priFri = pfMod;

"algo" === window.name || "pf-core" === window.name || pfMod.initialized || pfMod.init(window.pfOptions);