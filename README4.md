Лабораторна робота №4

У цій лабораторній роботі я інтегрував React-застосунок, створений раніше, у проєкт на Django. Головною метою було об’єднати клієнтський інтерфейс на React із серверною частиною на Django, щоб забезпечити більш тісну взаємодію між frontend і backend. React-компоненти, які я реалізував у лабораторній роботі №3, вже містили повний функціонал для виконання CRUD-операцій із моделлю Team, а стилізація інтерфейсу була виконана ще в лабораторній роботі №1 з використанням SCSS. Ці напрацювання я переніс у поточний проєкт і адаптував до продакшн-збірки.

Для цього я спочатку зібрав React-застосунок у продакшн-режимі, виконавши команду npm run build. В результаті цієї операції у каталозі build з’явилися готові для розгортання файли JavaScript та CSS, оптимізовані для швидкого завантаження.

Після цього я скопіював статичні файли, які згенерувалися у React, до проекту Django за допомогою команди cp -r frontend/build/static mydjango/static/. Це дозволило помістити всі JS, CSS та інші статичні ресурси React у відповідну папку Django, що відповідає за обслуговування статичних файлів. Таким чином, усі необхідні для відображення React-компонентів ресурси стали доступними серверу Django.

У шаблонах Django я підключив ці файли за допомогою стандартного тега {% static %}, що дозволило браузеру коректно завантажувати JavaScript і стилі React-застосунку. У конфігурації settings.py було налаштовано параметри STATIC_URL і STATICFILES_DIRS, що дозволило правильно обробляти й знаходити статичні файли.

В результаті React-застосунок тепер працює як частина вебінтерфейсу, який обслуговується Django. Це дозволяє поєднати зручність розробки React із функціональністю бекенду на Django, водночас зберігаючи розділення логіки frontend і backend.

Такий підхід дає змогу розробляти і тестувати React-інтерфейс окремо, а потім легко інтегрувати його в Django-проєкт для розгортання у виробничому середовищі без необхідності запускати окремий сервер для React.