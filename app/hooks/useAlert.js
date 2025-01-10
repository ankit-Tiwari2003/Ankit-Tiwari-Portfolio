import { useState, useEffect } from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState({
    show: false,
    text: '',
    type: '',
  });

  const showAlert = (alert) => {
    setAlert(alert);
  };

  useEffect(() => {
    if (alert.show) {
      const timeoutId = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000); // 3000ms = 3s
      return () => clearTimeout(timeoutId);
    }
  }, [alert.show]);

  return { alert, showAlert };
};

export default useAlert;