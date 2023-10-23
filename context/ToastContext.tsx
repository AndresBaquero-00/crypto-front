import { FC, createContext, useState } from 'react';

import { toast } from '../components';

export const ToastContext = createContext<toast.Props>({} as toast.Props);

export const ToastProvider: FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [toastOptions, setToastOptions] = useState<toast.Props['toastOptions']>({
    show: false,
    message: '',
    color: '',
  });

  return (
    <ToastContext.Provider value={{ toastOptions, setToastOptions }}>
      <toast.Toast
        toastOptions={toastOptions} 
        setToastOptions={setToastOptions} 
      />
      {children}
    </ToastContext.Provider>
  );
};
