// components/withAuth.tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isUserValidated } from '../utils/authHelper';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (!isUserValidated()) {
        router.replace('/login');
      }
    }, [router]);

    if (!isUserValidated()) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
