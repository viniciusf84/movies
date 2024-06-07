import { useEffect } from 'react';

function ScrollToTop(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);

  return props.children;
}

export default ScrollToTop;
