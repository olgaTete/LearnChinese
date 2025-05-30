Made next changes:

✅ 1. index.tsx (Header component)
File location: components/layout/header/index.tsx

🔧 Changes made:
✅ Language switcher integrated into the main header layout using the <LocaleSelect /> component.

✅ The LocaleSelect is placed next to the Auth/Login menu, aligned properly for desktop view.

✅ The header now supports locale-aware routing using cookie and pathname logic.

✅ 2. localeSelect.tsx
File location: components/layout/header/items/LocaleSelect.tsx

🔧 Changes made:
✅ Language detection from NEXT_LOCALE cookie.

✅ Dynamic language switch using:

Cookie update via nookies.setCookie()

Path-based redirect using window.location.href = /[locale]/[path]

✅ useEffect + useState used to avoid hydration errors

🧠 Automatically strips old locale from pathname and injects the new one.

✅ 3. burgerMenu.tsx
File location: components/layout/header/items/burgerMenu.tsx

🔧 Changes made:
✅ Added locale detection logic using the same pattern as in LocaleSelect.tsx

✅ Implemented language switch options styled like regular menu items, using Chakra UI <Flex> with .link styling

✅ The language options appear at the bottom of the drawer menu

✨ Switches between "Русский" and "English" depending on current locale


![image](https://github.com/user-attachments/assets/de617e95-fd75-4748-9369-cd03d71e2670)
![image](https://github.com/user-attachments/assets/6e907cbf-633c-4993-91fb-8e37c819ebb6)

![image](https://github.com/user-attachments/assets/0d5009d4-0375-43d3-91f0-087283a19c32)

