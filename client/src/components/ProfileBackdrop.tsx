import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector, selectLoading } from '@/store';

export function ProfileBackdrop() {
  const loading = useAppSelector(selectLoading);
  const [debounce, setDebounce] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setDebounce(true), 100)
  })

  return ( 
    <Backdrop sx={{ zIndex: 1000 }} open={debounce && loading} className="text-zinc-50">
      <CircularProgress color="inherit" />
    </Backdrop>
  ) 
}
