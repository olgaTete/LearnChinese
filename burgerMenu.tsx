'use client';
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Flex,
    Icon,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useTranslations } from 'use-intl';
import { navLinks } from '@/components/layout/header';
import styles from '@/components/layout/header/index.module.css';
import VideoModal from '@/components/videoModal';
import { setCookie } from 'nookies';
import { useEffect, useState, useCallback } from 'react';


const BurgerMenu = ({ user, videoUrl }: { user: User | null, videoUrl?:string }) => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const pathname = usePathname();
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const t = useTranslations('Layout');
    const [locale, setLocale] = useState<'ru' | 'en'>('ru');

    useEffect(() => {
        const match = document.cookie.match(/NEXT_LOCALE=(\w+)/);
        const current = match?.[1] === 'en' ? 'en' : 'ru';
        setLocale(current);
      }, []);
      
      const switchLocale = useCallback(
        (newLocale: string) => {
          const segments = pathname.split('/');
          const currentLocale = segments[1];
          let pathWithoutLocale = pathname;
          if (['en', 'ru'].includes(currentLocale)) {
            pathWithoutLocale = '/' + segments.slice(2).join('/');
          }
      
          setCookie(null, 'NEXT_LOCALE', newLocale, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
          });
      
          window.location.href = `/${newLocale}${pathWithoutLocale}`;
        },
        [pathname]
      );

    return (
        <Box className={styles.burgerMenu}>
            <Button
                onClick={onOpen}
                h={'60px'}
                borderRadius={0}
                color={'white'}
                backgroundColor={'transparent'}
                className={styles.menuButton}
            >
                <Icon boxSize={7} as={AiOutlineMenu} />
            </Button>
            <Drawer isOpen={isOpen} placement={'right'} onClose={onClose} finalFocusRef={btnRef}>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{t('menu')}</DrawerHeader>

                    <DrawerBody p={0}>
                        {navLinks.map((link) => (
                            <Flex
                                className={
                                    pathname.includes(link.path) ? styles.linkActive : styles.link
                                }
                                key={link.path}
                                cursor={'pointer'}
                                borderBottom={'1px solid gray'}
                                p={2}
                                alignItems={'center'}
                                justifyContent={'flex-end'}
                                onClick={() => {
                                    router.push(link.path);
                                    onClose();
                                }}
                            >
                                <Text fontSize={20}>{t(link.title)}</Text>
                            </Flex>
                        ))}
                       
                            <VideoModal videoUrl={videoUrl} >
                                
                            <Flex
                                className={
                                  styles.link
                                }
                           
                                cursor={'pointer'}
                                borderBottom={'1px solid gray'}
                                p={2}
                                alignItems={'center'}
                                justifyContent={'flex-end'}
                             
                               
                            >
                                <Text fontSize={20}>{'Обучающее видео'}</Text>
                            </Flex>
                            </VideoModal>
                        {user ? (
                            <Flex
                                className={
                                    pathname.includes('/profile') ? styles.linkActive : styles.link
                                }
                                cursor={'pointer'}
                                borderBottom={'1px solid gray'}
                                p={2}
                                alignItems={'center'}
                                justifyContent={'flex-end'}
                                onClick={() => {
                                    router.push('/profile');
                                    onClose();
                                }}
                            >
                                <Text fontSize={20}>{t('profile')}</Text>
                            </Flex>
                        ) : (
                            <Flex
                                className={
                                    pathname.includes('/auth/login')
                                        ? styles.linkActive
                                        : styles.link
                                }
                                cursor={'pointer'}
                                borderBottom={'1px solid gray'}
                                p={2}
                                alignItems={'center'}
                                justifyContent={'flex-end'}
                                onClick={() => {
                                    router.push('/auth/login');
                                    onClose();
                                }}
                            >
                                <Text fontSize={20}>{t('auth')}</Text>
                            </Flex>
                        )}
                        <Flex
  className={styles.link}
  cursor={'pointer'}
  borderTop={'1px solid gray'}
  borderBottom={'1px solid gray'}
  p={2}
  alignItems={'center'}
  justifyContent={'flex-end'}
  onClick={() => switchLocale(locale === 'ru' ? 'en' : 'ru')}
>
  <Text fontSize={20}>
    {locale === 'ru' ? 'English' : 'Русский'}
  </Text>
</Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default BurgerMenu;
