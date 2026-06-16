const THEME_STORAGE_KEY = "theme";
const DARK_THEME_CLASS = "theme-dark";

export function applySavedTheme(themeButton: HTMLButtonElement): void {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "dark") {
    document.documentElement.classList.add(DARK_THEME_CLASS);
  }

  updateThemeButtonText(themeButton);
}

export function toggleTheme(themeButton: HTMLButtonElement): void {
  document.documentElement.classList.toggle(DARK_THEME_CLASS);

  const isDarkTheme = document.documentElement.classList.contains(DARK_THEME_CLASS);
  localStorage.setItem(THEME_STORAGE_KEY, isDarkTheme ? "dark" : "light");

  updateThemeButtonText(themeButton);
}

function updateThemeButtonText(themeButton: HTMLButtonElement): void {
  const isDarkTheme = document.documentElement.classList.contains(DARK_THEME_CLASS);
  themeButton.textContent = isDarkTheme ? "Light theme" : "Dark theme";
}