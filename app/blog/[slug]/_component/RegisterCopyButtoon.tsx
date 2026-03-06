'use client';
import { registerCopyButton } from '@/transformer'
import React from 'react'

const RegisterCopyButtoon = () => {
  React.useEffect(() => {
    registerCopyButton();
  }, []);
  return null;
}

export default RegisterCopyButtoon