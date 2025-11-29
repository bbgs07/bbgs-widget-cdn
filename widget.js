// Melvin Widget – Production-ready (Option C: close = minimize)
(function () {
  "use strict";

  // CONFIG
  var IFRAME_SRC = "https://bestbuygeeksquad.great-site.net/"; // target site
  var DESKTOP_WIDTH_PERC = 33; // percent width on desktop
  var DESKTOP_HEIGHT_PERC = 93; // percent height on desktop
  var MOBILE_BREAKPOINT = 768; // px
  var ANIM_MS = 220; // animation duration

  // UTILS
  function css(el, rules) {
    for (var k in rules) {
      el.style[k] = rules[k];
    }
  }

  function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  // WAIT FOR DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    if (document.getElementById("melvinWidgetContainer")) return; // already injected

    // Container
    var container = document.createElement("div");
    container.id = "melvinWidgetContainer";
    container.setAttribute("aria-hidden", "false");
    css(container, {
      position: "fixed",
      zIndex: "2147483647",
      bottom: "16px",
      right: "16px",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      pointerEvents: "auto",
      fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    });

    // Chat button (bubble)
    var chatBtn = document.createElement("button");
    chatBtn.id = "melvinChatButton";
    chatBtn.setAttribute("aria-label", "Open chat");
    chatBtn.title = "Open chat";
    css(chatBtn, {
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      border: "none",
      outline: "none",
      cursor: "pointer",
      boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg,#0a84ff,#0066ff)",
      color: "#fff",
      transition: "transform 160ms ease, box-shadow 160ms ease",
      transform: "translateZ(0)",
    });

    // Chat icon (SVG)
    chatBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" fill="white" opacity="0.95"/>
      </svg>`;

    // Widget wrapper (overlay)
    var wrapper = document.createElement("div");
    wrapper.id = "melvinWidgetWrapper";
    wrapper.setAttribute("role", "dialog");
    wrapper.setAttribute("aria-modal", "false");
    wrapper.setAttribute("aria-label", "Chat widget");
    css(wrapper, {
      position: "fixed",
      right: "16px",
      bottom: "16px",
      width: "56px",
      height: "56px",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      transformOrigin: "bottom right",
      transition: "width " + ANIM_MS + "ms ease, height " + ANIM_MS + "ms ease, bottom " + ANIM_MS + "ms ease, right " + ANIM_MS + "ms ease, border-radius " + ANIM_MS + "ms ease",
      background: "#fff",
      display: "flex",
      alignItems: "stretch",
      justifyContent: "stretch",
      pointerEvents: "auto",
      zIndex: "2147483647",
    });

    // Close (minimize) button - visible on open
    var closeBtn = document.createElement("button");
    closeBtn.id = "melvinCloseButton";
    closeBtn.setAttribute("aria-label", "Close chat");
    closeBtn.title = "Close chat";
    css(closeBtn, {
      position: "absolute",
      top: "12px",
      right: "12px",
      width: "36px",
      height: "36px",
      borderRadius: "8px",
      border: "none",
      background: "rgba(255,255,255,0.9)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
      cursor: "pointer",
      display: "none", // hidden when minimized
      alignItems: "center",
      justifyContent: "center",
      zIndex: "5",
    });
    closeBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M18 6L6 18M6 6l12 12" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

    // Iframe (the actual chat content)
    var iframe = document.createElement("iframe");
    iframe.id = "melvinWidgetFrame";
    iframe.src = IFRAME_SRC;
    iframe.setAttribute("aria-hidden", "true");
    iframe.setAttribute("title", "Chat");
    iframe.setAttribute("allow", "camera; microphone; display-capture; fullscreen");
    // no sandbox — we want the site to work as intended (it's cross-origin)
    css(iframe, {
      border: "none",
      width: "100%",
      height: "100%",
      display: "block",
      background: "#fff",
      flex: "1 1 auto",
    });

    // Append elements
    wrapper.appendChild(iframe);
    wrapper.appendChild(closeBtn);
    container.appendChild(wrapper);
    container.appendChild(chatBtn);
    document.documentElement.appendChild(container);

    // State
    var isOpen = false;
    var lastKnownModeMobile = isMobile();

    // Ensure body has enough bottom spacing on small screens when widget is open full screen
    function ensureBodySafeAreaForMobileOpen(open) {
      if (open && isMobile()) {
        // add a small class or inline style so site content isn't hidden behind the fixed widget when full-screen
        document.body.style.paddingBottom = "0px";
      } else {
        document.body.style.paddingBottom = "";
      }
    }

    // Set size and position depending on breakpoint & state
    function applySizes(open) {
      var safeTop = "env(safe-area-inset-top, 0px)";
      var safeBottom = "env(safe-area-inset-bottom, 0px)";
      var safeLeft = "env(safe-area-inset-left, 0px)";
      var safeRight = "env(safe-area-inset-right, 0px)";

      if (open) {
        if (isMobile()) {
          // Fullscreen-like on mobile (use safe area)
          css(wrapper, {
            width: "100vw",
            height: "100vh",
            right: "0",
            left: "0",
            bottom: "0",
            top: "0",
            borderRadius: "0",
          });
          // adjust iframe to honor safe-area-inset-top so content not cropped by notch
          css(iframe, {
            height: "calc(100vh)",
            width: "100%",
            display: "block",
          });
          // place close button in safe area top-right
          css(closeBtn, {
            display: "flex",
            top: "calc(" + safeTop + " + 10px)",
            right: "calc(" + safeRight + " + 10px)",
          });
        } else {
          // Desktop: 33% x 93% anchored bottom-right
          var w = Math.max(320, Math.floor((DESKTOP_WIDTH_PERC / 100) * window.innerWidth)) + "px";
          var h = Math.max(320, Math.floor((DESKTOP_HEIGHT_PERC / 100) * window.innerHeight)) + "px";

          css(wrapper, {
            width: w,
            height: h,
            right: "16px",
            bottom: "16px",
            left: "auto",
            top: "auto",
            borderRadius: "12px",
          });

          css(iframe, {
            height: "100%",
            width: "100%",
            display: "block",
          });

          css(closeBtn, {
            display: "flex",
            top: "12px",
            right: "12px",
          });
        }
        wrapper.setAttribute("aria-hidden", "false");
        iframe.setAttribute("aria-hidden", "false");
      } else {
        // Minimized state: show small circular wrapper that matches chat button
        css(wrapper, {
          width: "56px",
          height: "56px",
          borderRadius: "12px",
          right: "16px",
          bottom: "16px",
        });
        css(iframe, {
          height: "56px",
          width: "56px",
        });
        css(closeBtn, { display: "none" });
        wrapper.setAttribute("aria-hidden", "true");
        iframe.setAttribute("aria-hidden", "true");
      }
    }

    // Open widget (animate)
    function openWidget() {
      if (isOpen) return;
      isOpen = true;

      // hide the chat button slightly (scale)
      css(chatBtn, { transform: "scale(0.9)", pointerEvents: "none" });

      // reveal wrapper — animate sizes
      applySizes(true);

      // a small timeout to ensure transitions run
      setTimeout(function () {
        css(wrapper, { boxShadow: "0 18px 48px rgba(0,0,0,0.32)" });
      }, ANIM_MS);

      // Accessibility focus flow
      try {
        iframe.focus();
      } catch (e) {}

      ensureBodySafeAreaForMobileOpen(true);
    }

    // Minimize widget (close button behaviour per Option C)
    function minimizeWidget() {
      if (!isOpen) return;
      isOpen = false;
      css(wrapper, { boxShadow: "0 10px 30px rgba(0,0,0,0.25)" });

      // shrink
      applySizes(false);

      // restore chat button
      setTimeout(function () {
        css(chatBtn, { transform: "scale(1)", pointerEvents: "auto" });
      }, ANIM_MS + 10);

      try {
        chatBtn.focus();
      } catch (e) {}

      ensureBodySafeAreaForMobileOpen(false);
    }

    // Toggle (for external API usage)
    function toggleWidget() {
      if (isOpen) minimizeWidget();
      else openWidget();
    }

    // Click handlers
    chatBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openWidget();
    });

    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Option C: do not fully "close" or remove widget — just minimize it to bubble
      minimizeWidget();
    });

    // Close on ESC when open (keyboard)
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" || ev.key === "Esc") {
        if (isOpen) {
          minimizeWidget();
        }
      }
    });

    // Resize: adapt sizes if breakpoint crosses
    var resizeTimer = null;
    window.addEventListener("resize", function () {
      // adapt if mobile/desktop changed while open
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var nowMobile = isMobile();
        if (nowMobile !== lastKnownModeMobile && isOpen) {
          // re-apply sizes for new mode
          applySizes(true);
        } else if (isOpen) {
          applySizes(true);
        }
        lastKnownModeMobile = nowMobile;
      }, 120);
    });

    // Expose public API
    window.MelvinWidgetAPI = window.MelvinWidgetAPI || {};
    window.MelvinWidgetAPI.open = openWidget;
    window.MelvinWidgetAPI.minimize = minimizeWidget;
    window.MelvinWidgetAPI.toggle = toggleWidget;
    window.MelvinWidgetAPI.getState = function () {
      return { isOpen: !!isOpen, isMobile: isMobile() };
    };

    // Small hover effect for chat button
    chatBtn.addEventListener("pointerdown", function () {
      css(chatBtn, { transform: "scale(0.95)" });
    });
    chatBtn.addEventListener("pointerup", function () {
      css(chatBtn, { transform: "scale(1)" });
    });
    chatBtn.addEventListener("pointerenter", function () {
      css(chatBtn, { boxShadow: "0 8px 20px rgba(0,0,0,0.18)", transform: "translateY(-1px) scale(1.02)" });
    });
    chatBtn.addEventListener("pointerleave", function () {
      css(chatBtn, { boxShadow: "0 6px 18px rgba(0,0,0,0.25)", transform: "scale(1)" });
    });

    // Prevent accidental text selection when dragging on mobile
    chatBtn.addEventListener("touchstart", function () {}, { passive: true });

    // ensure initial state
    applySizes(false);
  }
})();
