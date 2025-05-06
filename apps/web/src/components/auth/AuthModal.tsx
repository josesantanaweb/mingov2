'use client';
import React from 'react';
import type { ReactElement } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import ButtonIcon from '@/components/button-icon';
import Modal from '@/components/modal';
import { IAuthModal } from '@/types/auth';

import AuthForm from './AuthForm';

interface AuthModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: IAuthModal;
  setType: (type: IAuthModal) => void;
}

const AuthModal = ({
  open,
  setOpen,
  type,
  setType,
}: AuthModalProps): ReactElement => {
  const isRegister = type === IAuthModal.REGISTER;

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="w-[800px] h-[637px] flex items-center justify-center"
    >
      <div className="flex w-full h-full bg-base-300 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full flex items-center justify-center py-10">
          <Image src="/images/logo.svg" alt="logo" width={117} height={30} />
        </div>
        <Image
          src="/images/auth/background.png"
          alt="auth-background"
          className="w-full h-full object-cover"
          width={800}
          height={637}
        />
      </div>
      <div className="flex w-full h-full bg-base-600 flex-col items-center justify-center p-5">
        <div className="flex justify-center items-center w-full mb-10 relative">
          <h4 className="text-white text-xl font-medium flex-1 text-center">
            {isRegister ? 'Registro' : 'Iniciar sesión'}
          </h4>
          <ButtonIcon
            onClick={handleClose}
            className="absolute -top-[5] right-0"
          >
            <FontAwesomeIcon icon={faTimes} fontSize={20} width={20} />
          </ButtonIcon>
        </div>
        <AuthForm type={type} setType={setType} setOpen={setOpen} />
      </div>
    </Modal>
  );
};

export default AuthModal;
