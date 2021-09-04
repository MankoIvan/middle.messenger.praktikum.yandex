# Веб-приложение «Чат»

## Инструкция по развертыванию:
- клонируйте репозиторий `https://github.com/MankoIvan/middle.messenger.praktikum.yandex.git`
- уcтановите зависимости npm `npm install`

- запуск проекта в режиме разработчика `npm run dev`
- сборка проекта `npm run build`
- сборка проекта и запуск локального сервера `npm run start`
- запуск линтеров `npm run lint`
- запуск тестов `npm run test`
### Устаревшие команды
- запуск проекта в режиме разработчика `npm run dev:parcel`
- сборка проекта `npm run build:parcel`
- сборка проекта и запуск локального сервера `npm run start:parcel`

## Netlify

- https://enigmatic-ridge-93327.herokuapp.com/ -авторизация
- https://enigmatic-ridge-93327.herokuapp.com/sign-up - регистрация
- https://enigmatic-ridge-93327.herokuapp.com/settings - профиль
- https://enigmatic-ridge-93327.herokuapp.com/messenger - страница чатов
- https://enigmatic-ridge-93327.herokuapp.com/500 - ошибка сервера
- https://enigmatic-ridge-93327.herokuapp.com/any-other-url - 404

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

### Спринт №4
- настроен webpack
- настроена Docker сборка
- проект размещен на Heroku
- настроен precommit

## Pull requests
- https://github.com/MankoIvan/middle.messenger.praktikum.yandex/pull/8 - спринт 3
