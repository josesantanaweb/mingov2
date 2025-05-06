'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import ButtonIcon from '@/components/button-icon';

const Configuration = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(!open);

  return (
    <ButtonIcon onClick={handleOpen}>
      <FontAwesomeIcon icon={faCog} fontSize={18} width={18} />
    </ButtonIcon>
  );
};

export default Configuration;
