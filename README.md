# Веб-приложение «Чат»

## Инструкция по развертыванию:
- клонируйте репозиторий `https://github.com/MankoIvan/middle.messenger.praktikum.yandex.git`
- уcтановите зависимости npm `npm install`

- запуск проекта в режиме разработчика `npm run dev`
- сборка проекта `npm run build`
- сборка проекта и запуск локального сервера `npm run start`
- запуск линтеров `npm run lint`
- запуск тестов `npm run test`

## Netlify

- https://stupefied-nobel-c31678.netlify.app/ -авторизация
- https://stupefied-nobel-c31678.netlify.app/sign-up - регистрация
- https://stupefied-nobel-c31678.netlify.app/settings - профиль
- https://stupefied-nobel-c31678.netlify.app/messenger - страница чатов
- https://stupefied-nobel-c31678.netlify.app/500 - ошибка сервера
- https://stupefied-nobel-c31678.netlify.app/any-other-url - 404

## Процесс
### Спринт №1
- макеты прототипов экрана были взяты из https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1
- подключен Parcel
- в качестве препроцессора выбран SCSS
- в качестве шаблонизатора выбран Handlebars
- реализованы макеты страниц с помощью шаблонизатора
- настроено dev-окружение с помощью NodeJS и Express для раздачи статики 
- настроена раздача статики на Netlify

### Спринт №2
- внедрен Typescript
- добавлен компонентный подход (реализованы блоки и Event Bus)
- данные из форм выводятся в консоль
- добавлена валидация на все формы
- реализован класс для работы с HTTP запросами
- добавлены линтеры (ESLint и Stylelint)

### Спринт №3
- реализован роутер для регистрации роутов
- внедрен HTTP API для чатов https://ya-praktikum.tech/api/v2/swagger/#/
    + авторизация
    + работа с пользовательской информацией
    + работа с чатами
- настроен WebSocket для сообщений
- напсианы базовые тесты с использованием Mocha и Chai

## Pull requests
- https://github.com/MankoIvan/middle.messenger.praktikum.yandex/pull/7 - спринт 2 
