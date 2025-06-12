1. Header (index.tsx)
📂 components/layout/header/index.tsx

✅ Интеграция: добавлен переключатель языка в основной макет шапки

📌 Расположение: LocaleSelect рядом с меню Авторизации/Логина (только для десктопа)

🌐 Маршрутизация: поддержка локали через cookie и логику разбора pathname

2. LocaleSelect (LocaleSelect.tsx)
📂 components/layout/header/items/LocaleSelect.tsx

✅ Определение языка: чтение из cookie NEXT_LOCALE

🔄 Переключение:

установка cookie через nookies.setCookie()

редирект на window.location.href = '/[locale]/[path]'

⚙️ Стабильность: useEffect + useState для устранения ошибок гидратации

🧠 Умная обработка пути: удаляет старую локаль из URL и вставляет новую

3. BurgerMenu (burgerMenu.tsx)
📂 components/layout/header/items/burgerMenu.tsx

🌍 Логика локали: скопирована из LocaleSelect.tsx

🔧 Пункты переключения:

стилизованы как обычные ссылки Chakra UI

расположены внизу выдвижного меню

✨ Доступные языки: “Русский” ↔️ “English” в зависимости от текущей локали


![image](https://github.com/user-attachments/assets/de617e95-fd75-4748-9369-cd03d71e2670)
![image](https://github.com/user-attachments/assets/6e907cbf-633c-4993-91fb-8e37c819ebb6)

![image](https://github.com/user-attachments/assets/0d5009d4-0375-43d3-91f0-087283a19c32)

