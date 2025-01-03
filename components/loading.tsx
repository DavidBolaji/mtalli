'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 300,
    showSpinner: true,
    trickle: true,
    trickleSpeed: 200,
});

export default function Loading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 10); // Small delay to ensure smooth transition

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]);

  return null;
}