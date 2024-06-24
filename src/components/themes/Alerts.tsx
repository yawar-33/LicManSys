// src/components/Alert.tsx
import React from 'react';

interface AlertProps {
  message: string;
  type?: 'success' | 'danger' | 'warning' | 'info';
}

const Alert: React.FC<AlertProps> = ({ message, type = 'danger' }) => {
  const alertClass = `alert alert-${type}`;

  return (
    <div className={alertClass} role="alert">
      {message}
    </div>
  );
};

export default Alert;
