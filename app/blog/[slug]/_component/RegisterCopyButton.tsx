'use client';
import { registerCopyButton } from '@/transformer';
import React from 'react';

const RegisterCopyButton = () => {
  React.useEffect(() => {
    const cleanup = registerCopyButton();
    return cleanup;
  }, []);
  return null;
};

export default RegisterCopyButton;
