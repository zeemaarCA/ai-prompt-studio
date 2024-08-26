'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { signInSuccess } from '@store/user/userSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData) {
      dispatch(signInSuccess(sessionData.user));
    }
  }, [sessionData, dispatch]);

  return children;
};

const AuthWrapper = ({ children, session }) => (
  <SessionProvider session={session}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </SessionProvider>
);

export default AuthWrapper;
