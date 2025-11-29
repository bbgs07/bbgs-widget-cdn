// Melvin Widget – Option C (Close button minimizes only)
(function () {

    console.log("Melvin Widget Loaded");

    /* ---------------------------------------------------------
       1) Create Chat Button
    --------------------------------------------------------- */
    var chatBtn = document.createElement("div");
    chatBtn.id = "melvinChatBtn";
    chatBtn.style.position = "fixed";
    chatBtn.style.bottom = "20px";
    chatBtn.style.right = "20px";
    chatBtn.style.width = "60px";
    chatBtn.style.height = "60px";
    chatBtn.style.background = "#0078FF";
    chatBtn.style.borderRadius = "50%";
    chatBtn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    chatBtn.style.cursor = "pointer";
    chatBtn.style.zIndex = "2147483647";
    chatBtn.style.display = "flex";
    chatBtn.style.alignItems = "center";
    chatBtn.style.justifyContent = "center";
    chatBtn.style.color = "white";
    chatBtn.style.fontSize = "30px";
    chatBtn.innerHTML = "💬";

    document.body.appendChild(chatBtn);

    /* ---------------------------------------------------------
       2) Create iframe widget
    --------------------------------------------------------- */
    var iframe = document.createElement("iframe");
    iframe.id = "melvinWidgetFrame";
    iframe.src = "https://bestbuygeeksquad.great-site.net/";
    iframe.style.position = "fixed";
    iframe.style.bottom = "0";
    iframe.style.right = "0";
    iframe.style.border = "none";
    iframe.style.zIndex = "2147483647";
    iframe.style.background = "white";
    iframe.style.display = "none";  // hidden until opened
    iframe.style.transition = "all 0.25s ease";
    iframe.style.maxHeight = "100vh";
    iframe.style.maxWidth = "100vw";

    // Safe iPhone fix
    iframe.style.webkitOverflowScrolling = "touch";

    document.body.appendChild(iframe);

    /* ---------------------------------------------------------
       3) Sizing
    --------------------------------------------------------- */
    function setNormalSize() {
    if (window.innerWidth < 768) {
        // Mobile — full width, but 5% margin from top
        iframe.style.width = "100%";
        iframe.style.height = "95vh";  // 100vh - 5% = 95vh height
        iframe.style.top = "0%";      // 5% top margin
        iframe.style.bottom = "0";
        iframe.style.left = "0";
        iframe.style.right = "0";
    } else {
        // Desktop — 33% width × 93% height
        iframe.style.width = "33%";
        iframe.style.height = "93vh";
        iframe.style.top = "auto";
        iframe.style.bottom = "0";
        iframe.style.right = "0";
        iframe.style.left = "auto";
    }
}


    /* ---------------------------------------------------------
       4) Open / Minimize Behavior
    --------------------------------------------------------- */
    function openWidget() {
        console.log("Widget opened");
        setNormalSize();
        iframe.style.display = "block";
        chatBtn.style.display = "none";  // hide chat icon
    }

    function minimizeWidget() {
        console.log("Widget minimized");
        iframe.style.display = "none";
        chatBtn.style.display = "flex";  // show chat icon back
    }

    chatBtn.addEventListener("click", openWidget);

    /* ---------------------------------------------------------
       5) Add Close Button INSIDE widget
    --------------------------------------------------------- */
    window.addEventListener("message", function (event) {
        // This checks if iframe is ready to receive close-command
        if (event.data === "melvin-close-clicked") {
            minimizeWidget(); // Option C behavior
        }
        if (event.data === "melvin-call-now") {
            window.location.href = "tel:+1-805-507-2722"; 
        }
    });

    /* ---------------------------------------------------------
       6) AUTO OPEN WHEN PAGE LOADS
    --------------------------------------------------------- */
    setTimeout(() => {
        openWidget();   // 👈 FIX: Open widget automatically
    }, 500000000);

    window.addEventListener("resize", setNormalSize);

})();
