'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Custom404: React.FC = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.back();
  }, [router]);

  return null;
};

export default Custom404;
