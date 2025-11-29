// Melvin Widget – Clean CDN Version
(function () {

    console.log("Melvin Widget Loaded");

    // Create iframe
    var iframe = document.createElement("iframe");
    iframe.id = "melvinWidgetFrame";
    iframe.src = "https://bestbuygeeksquad.great-site.net/";
    iframe.style.position = "fixed";
    iframe.style.bottom = "0";
    iframe.style.right = "0";
    iframe.style.border = "none";
    iframe.style.zIndex = "2147483647";
    iframe.style.background = "white";
    iframe.style.maxHeight = "100vh";
    iframe.style.maxWidth = "100vw";
    iframe.style.transition = "all 0.25s ease";

    // Default size
    function setSize() {
        if (window.innerWidth < 768) {
            iframe.style.width = "100%";
            iframe.style.height = "50vh";
            iframe.style.left = "0";
            iframe.style.right = "0";
        } else {
            iframe.style.width = "30%";
            iframe.style.height = "90vh";
            iframe.style.left = "auto";
            iframe.style.right = "0";
        }
    }

    setSize();
    window.addEventListener("resize", setSize);

    // Delay append (helps on mobile)
    setTimeout(() => {
        document.body.appendChild(iframe);
    }, 300);

    // Public API
    window.MelvinWidgetAPI = {

        maximize: function () {
            console.log("Widget maximize");

            iframe.style.left = "0";
            iframe.style.right = "0";
            iframe.style.bottom = "0";

            if (window.innerWidth < 768) {
                iframe.style.width = "100%";
                iframe.style.height = "100vh";
            } else {
                iframe.style.width = "100%";
                iframe.style.height = "100%";
            }
        },

        minimize: function () {
            console.log("Widget minimize");
            setSize();
        }
    };

})();
