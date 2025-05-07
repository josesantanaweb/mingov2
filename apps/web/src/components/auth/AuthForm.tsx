'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Input, Button } from '@mingo/ui';

import type { IAuthInput } from '@/types/auth';
import { IAuthModal } from '@/types/auth';
import { schema } from '@/validations/auth';
import { LOGIN_REDIRECT_ROUTE } from '@/constants';

import AuthProviders from './AuthProviders';

interface AuthFormProps {
  type: IAuthModal;
  setType: (type: IAuthModal) => void;
  setOpen: (open: boolean) => void;
}

const AuthForm = ({ type, setType, setOpen }: AuthFormProps): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isRegister = type === IAuthModal.REGISTER;
  const isLogin = type === IAuthModal.LOGIN;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IAuthInput>({
    resolver: zodResolver(schema(isRegister)),
    mode: 'onChange',
  });
  const [showReferredCode, setShowReferredCode] = useState<boolean>(false);

  const handleReferredCode = () => setShowReferredCode(!showReferredCode);

  const handleshowPassword = () => setShowPassword(!showPassword);

  const handleToggleType = () => {
    setType(isRegister ? IAuthModal.LOGIN : IAuthModal.REGISTER);
    reset();
  };

  const onSubmit = async (input: IAuthInput) => {
    if (isRegister) {
      // lógica de registro si decides implementarla
    } else {
      const { email, password } = input;
      try {
        const result = await signIn('credentials', {
          email,
          password,
          callbackUrl: LOGIN_REDIRECT_ROUTE,
        });

        if (result?.ok) {
          setOpen(false);
        } else {
          console.error('Error al iniciar sesión:', result?.error);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col justify-between items-center w-full gap-5 "
    >
      <div className="flex flex-col justify-center items-center w-full gap-4">
        {isRegister && (
          <Input
            placeholder="Username"
            {...register('username')}
            error={errors.username?.message}
          />
        )}

        <Input
          placeholder="Correo Electrónico"
          {...register('email', {
            required: 'Correo Electrónico es requerido',
          })}
          error={errors.email?.message}
        />
        <Input
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          icon={
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              fontSize={14}
              className="text-base-300 cursor-pointer"
              onClick={handleshowPassword}
            />
          }
          {...register('password', { required: 'Contraseña es requerida' })}
          error={errors.password?.message}
        />
        {isRegister && (
          <div
            className="relative cursor-pointer w-full flex flex-col gap-2"
            onClick={handleReferredCode}
          >
            <div className="flex items-center gap-2 text-base-300">
              <p className="text-sm">Ingresa el codigo de referencia</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                fontSize={14}
                width={14}
                className={`transition-transform duration-300 ${
                  showReferredCode ? 'rotate-180' : ''
                }`}
              />
            </div>
            <AnimatePresence>
              {showReferredCode && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  className="overflow-hidden mt-2"
                >
                  <Input
                    placeholder="Código Promocional"
                    {...register('referredCode')}
                    error={errors.referredCode?.message}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        {isLogin && (
          <Link
            href="/"
            className="text-violet-500 cursor-pointer text-sm w-full text-right hover:underline"
          >
            ¿Has olvidado tu contraseña?
          </Link>
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <Button type="submit" disabled={!isValid}>
          {isRegister ? 'Confirmar' : 'Iniciar sesión'}
        </Button>
        <p className="text-base-300 text-sm">
          {isRegister ? 'Ya tienes una cuenta?' : 'No tienes una cuenta?'}
          <span
            className="text-violet-500 ml-2 cursor-pointer"
            onClick={handleToggleType}
          >
            {isRegister ? 'Iniciar sesión' : 'Registrate'}
          </span>
        </p>
        <div className="relative w-full flex items-center justify-center">
          <div className="text-base-300 relative z-10 text-sm bg-base-600 w-10 h-5 rounded-full flex justify-center items-center">
            O
          </div>
          <span className="absolute left-0 top-[10px] w-full h-[1px] bg-base-500" />
        </div>
        <AuthProviders />
      </div>
    </form>
  );
};

export default AuthForm;
