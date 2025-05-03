import { createRoot } from "react-dom/client";
import SimplestApp from "./SimplestApp"; // Importing the simplest app possible

// Remove all imports that might cause issues
// import "./index.css";
// import { ThemeProvider } from "./components/ui/theme-provider";
// import { registerServiceWorker } from "./sw-register";

// Comment out service worker registration
// registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <SimplestApp />
);
