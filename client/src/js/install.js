const butInstall = document.getElementById("buttonInstall");

let beforeInstallPromptEvent;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  beforeInstallPromptEvent = event;
});

butInstall.addEventListener("click", async () => {
  if (beforeInstallPromptEvent !== null) {
    beforeInstallPromptEvent.prompt();
    const { outcome } = await beforeInstallPromptEvent.userChoice;
    if (outcome === "accepted") {
      beforeInstallPromptEvent = null;
    }
  }
});

window.addEventListener("appinstalled", (event) => {
  butInstall.style.display = "none";

  beforeInstallPromptEvent = null;
});
