import { FC, useEffect, useState } from 'react';
import { Alert, Box } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';

export interface Props {
  toastOptions: {
    show: boolean;
    message: string;
    color?: string;
  };
  setToastOptions: (opt: Props['toastOptions']) => void;
}

export const Toast: FC<Props> = ({ toastOptions, setToastOptions }) => {
  const [showToast, setShowToast] = useState(toastOptions.show);
  const style = useSpring({
    from: { opacity: toastOptions.show ? 0 : 1 },
    to: { opacity: toastOptions.show ? 1 : 0 },
    onRest: () => {
      if (!toastOptions.show) {
        setToastOptions({ show: false, message: '', color: '' });
        setShowToast(false);
      }
    },
  });

  useEffect(() => {
    if (toastOptions.show) {
      setShowToast(true);
      setTimeout(() => setToastOptions({ ...toastOptions, show: false }), 2500);
    }
  }, [toastOptions, setToastOptions]);

  return (
    <Box className='toast' sx={{ display: showToast ? 'block' : 'none' }}>
      <animated.div style={style}>
        <Alert
          severity={toastOptions.color as any}
          color={toastOptions.color as any}
          sx={{ margin: '15px 0' }}
        >
          {toastOptions.message}
        </Alert>
      </animated.div>
    </Box>
  );
};
