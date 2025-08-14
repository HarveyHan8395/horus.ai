import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "@/pages/Home";
import News from "@/pages/News";
import Daily from "@/pages/Daily";
import Weekly from "@/pages/Weekly";
import Podcast from "@/pages/Podcast";
import Enterprise from "@/pages/Enterprise";
import Contact from "@/pages/Contact";
import Navigation from "@/components/Navigation";
import { Toaster } from "sonner";
import { useThemeStore } from "@/stores/themeStore";

export default function App() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    // Apply theme class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  );
}
