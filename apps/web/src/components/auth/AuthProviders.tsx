'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import ButtonIcon from '@/components/button-icon';

const AuthProviders = (): ReactElement => {
  const handleGoogle = () => {};

  return (
    <div className="flex gap-3 items-center">
      <ButtonIcon onClick={handleGoogle}>
        <FontAwesomeIcon icon={faGoogle} fontSize={18} width={18} />
      </ButtonIcon>
      <ButtonIcon onClick={handleGoogle}>
        <FontAwesomeIcon icon={faGoogle} fontSize={18} width={18} />
      </ButtonIcon>
      <ButtonIcon onClick={handleGoogle}>
        <FontAwesomeIcon icon={faGoogle} fontSize={18} width={18} />
      </ButtonIcon>
    </div>
  );
};

export default AuthProviders;
