import { createRoot } from "react-dom/client";
// import App from "./App";
import MinimalApp from "./MinimalApp"; // Importing the minimal app for debugging
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import { registerServiceWorker } from "./sw-register";

// ثبت سرویس ورکر برای قابلیت‌های PWA
registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="prana-theme">
    <MinimalApp />
  </ThemeProvider>
);
