import React, { createContext, useState } from 'react';

export const QrContext = createContext();

export const QrProvider = ({ children }) => {
  const [isQrValid, setIsQrValid] = useState(false);

  return (
    <QrContext.Provider value={{ isQrValid, setIsQrValid }}>
      {children}
    </QrContext.Provider>
  );
};