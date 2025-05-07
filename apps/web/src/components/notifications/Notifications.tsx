'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ButtonIcon } from '@mingo/ui';

const Notifications = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(!open);

  return (
    <ButtonIcon onClick={handleOpen}>
      <FontAwesomeIcon icon={faBell} fontSize={18} width={18} />
    </ButtonIcon>
  );
};

export default Notifications;
