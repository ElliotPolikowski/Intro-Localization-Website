import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DestinationDetail from './pages/DestinationDetail';

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return null;
}

export default function App() {
  const { i18n } = useTranslation();
  const isXY = i18n.language === 'xy';
  const isEN = i18n.language === 'en';

  useEffect(() => {
    if (isXY) {
      document.documentElement.style.fontSize = '112.5%'; // 18px / 16px = 1.125
    } else {
      document.documentElement.style.fontSize = '';
    }
  }, [isXY]);

  return (
    <Router>
      <ScrollToHash />
      <div className={`min-h-screen flex flex-col ${isXY ? 'lang-xy' : ''} ${isEN ? 'lang-en' : ''}`}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
