import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Agar lenis instance available hai toh usse scroll karo
    if (lenis) {
      lenis.scrollTo(0, { immediate: true }); // immediate: true matlab bina animation ke upar jump karega page change pe
    } else {
      // Fallback agar lenis load nahi hua
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTop;