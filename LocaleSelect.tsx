'use client';

import { Select } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { setCookie } from 'nookies';

const LocaleSelect = () => {
  const path = usePathname();
  const [locale, setLocale] = useState<'ru' | 'en'>('ru');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(/NEXT_LOCALE=(\w+)/);
    const current = match?.[1] === 'en' ? 'en' : 'ru';
    setLocale(current);
    setIsClient(true);
  }, []);

  const switchLocale = useCallback(
    (newLocale: string) => {
      const segments = path.split('/');
      const currentLocale = segments[1];

      // Удаляем текущую локаль, если есть
      let pathWithoutLocale = path;
      if (['en', 'ru'].includes(currentLocale)) {
        pathWithoutLocale = '/' + segments.slice(2).join('/');
      }

      setCookie(null, 'NEXT_LOCALE', newLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      });

      window.location.href = `/${newLocale}${pathWithoutLocale}`;
    },
    [path]
  );

  if (!isClient) return null;

  return (
    <Select
      size="sm"
      w="80px"
      variant="outline"
      value={locale}
      onChange={(e) => switchLocale(e.target.value)}
    >
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </Select>
  );
};

export default LocaleSelect;
