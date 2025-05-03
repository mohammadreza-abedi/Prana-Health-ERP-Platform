import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import { registerServiceWorker } from "./sw-register";

// ثبت سرویس ورکر برای قابلیت‌های PWA
registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="prana-theme">
    <App />
  </ThemeProvider>
);
