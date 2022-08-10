import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};
