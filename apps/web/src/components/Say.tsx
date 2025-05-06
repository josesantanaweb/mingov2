'use client';
import React from 'react';

import { useTranslation } from '@/contexts/TranslationProvider';

export const Say = () => {
  const { t } = useTranslation();

  return <div>{t('welcome')}</div>;
};
