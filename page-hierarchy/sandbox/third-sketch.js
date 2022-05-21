const paletteButton = document.getElementById("theme-switcher");
const bodyDataset = document.body.dataset;

function paletteSwitcher() {
  const currentPalette = bodyDataset.theme;
  switch (currentPalette()){
    case "dark-theme":
      currentPalette = "theme-royal";
      break;
    case "theme-royal":
      currentPalette = "theme-dark";
      break;
  };
};