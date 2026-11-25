const navLinks = document.getElementById("navLinks");
const menuButton = document.querySelector(".menu");

function setMenuOpen(isOpen) {
    navLinks.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

function toggleMenu() {
    setMenuOpen(!navLinks.classList.contains("open"));
}

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        setMenuOpen(false);
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
        setMenuOpen(false);
        menuButton.focus();
    }
});

const themeToggle = document.getElementById("themeToggle");
const themeToggleLabel = document.getElementById("themeToggleLabel");
const themeIcon = document.getElementById("themeIcon");

themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.dataset.theme !== "light";
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
    themeToggleLabel.textContent = isLight ? "Dark mode" : "Light mode";
    themeIcon.textContent = isLight ? "☾" : "☀";
    themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
});

const qrImage = document.getElementById("downloadQr");
const qrStatus = document.getElementById("qrStatus");
const apkDownload = document.querySelector('a[download]');

if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    const qrServiceUrl = new URL("https://api.qrserver.com/v1/create-qr-code/");
    qrServiceUrl.searchParams.set("size", "240x240");
    qrServiceUrl.searchParams.set("margin", "10");
    qrServiceUrl.searchParams.set("data", apkDownload.href);

    qrImage.addEventListener("load", () => {
        qrStatus.textContent = "Scan to open the direct APK download. Your phone may ask you to confirm.";
    });
    qrImage.addEventListener("error", () => {
        qrImage.hidden = true;
        qrStatus.textContent = "The QR code could not be loaded. Check your internet connection and try again.";
    });
    qrStatus.textContent = "Preparing a QR code for the APK download...";
    qrImage.hidden = false;
    qrImage.src = qrServiceUrl.toString();
}

document.querySelectorAll(".screenshot-image").forEach(image => {
    const phoneFrame = image.closest(".phone-frame");
    const showScreenshot = () => {
        phoneFrame.classList.add("has-screenshot");
        image.setAttribute("aria-hidden", "false");
    };

    image.addEventListener("load", showScreenshot);
    image.addEventListener("error", () => phoneFrame.classList.remove("has-screenshot"));

    if (image.complete && image.naturalWidth > 0) {
        showScreenshot();
    }
});

const feedback = document.getElementById("interactionFeedback");
let feedbackTimeout;

document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener("click", () => {
        feedback.textContent = "Download requested. Check your downloads for HarDix.apk.";
        feedback.classList.add("visible");
        window.clearTimeout(feedbackTimeout);
        feedbackTimeout = window.setTimeout(() => {
            feedback.classList.remove("visible");
        }, 4000);
    });
});