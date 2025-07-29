'use client';
import React from 'react';
import { Logo, Button, Input } from '@mingo/components';
import Image from 'next/image';

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-70px)] flex-col w-full px-4">
      <Logo className="mb-10" />
      <div className="flex flex-col items-start mb-6 w-full gap-1">
        <h3 className="text-white uppercase text-xl font-bold">Acceder</h3>
        <p className="text-base-300 text-base">Accede a tu cuenta</p>
      </div>
      <div className="flex flex-col items-start gap-5 w-full mb-6">
        <Input placeholder="Correo electronico" />
        <div className="flex items-end flex-col gap-3 w-full">
          <Input type={showPassword ? 'text' : 'password'} icon={showPassword ? 'icon-show' : 'icon-hide'} iconPosition="right" placeholder="Contraseña" onIconClick={() => setShowPassword(!showPassword)} />
          <span className="text-primary-600 text-base font-medium">
            ¿Olvidaste tu Contraseña?
          </span>
        </div>
      </div>
      <Button variant="primary" isFull>
        Iniciar Sesión
      </Button>
      <div className="my-6 flex items-center gap-4 w-full">
        <div className="flex-1 h-px bg-base-600"></div>
        <span className="text-base-300 text-base capitalize px-2">o</span>
        <div className="flex-1 h-px bg-base-600"></div>
      </div>
      <Button variant="default" isFull>
        <Image src="/images/auth/google.svg" alt="google" width={20} height={20} className='w-5 h-5'/>
        Continua con Google
      </Button>
      <div className="flex items-center gap-2 mt-6">
        <span className="text-base-300 text-base">¿No tienes una cuenta?</span>
        <span className="text-primary-600 text-base font-medium">
          Registrate
        </span>
      </div>
    </div>
  );
};

export default Login;
