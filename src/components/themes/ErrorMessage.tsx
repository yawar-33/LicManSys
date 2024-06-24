import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <ul className="parsley-errors-list filled">
      <li className="parsley-required">{message}</li>
    </ul>
  );
};

export default ErrorMessage;
