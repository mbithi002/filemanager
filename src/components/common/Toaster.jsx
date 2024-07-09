// src/Toast.js
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #333;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${props => (props.isVisible ? fadeIn : fadeOut)} 0.5s forwards;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const ToastMessage = styled.div`
  flex: 1;
`;

const icons = {
  success: <i class="fa-solid fa-circle-check m-2"></i>,
  info: <i class="fa-solid fa-circle-info m-2"></i>,
  warning: <i class="fa-solid fa-circle-exclamation m-2"></i>,
  error: <i class="fa-solid fa-circle-xmark m-2"></i>
};

const Toast = ({ message, iconType, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <ToastContainer isVisible={isVisible}>
      <IconWrapper>{icons[iconType]}</IconWrapper>
      <ToastMessage>{message}</ToastMessage>
    </ToastContainer>
  );
};

export default Toast;
