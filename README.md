# Веб-приложение «Чат»

## Инструкция по развертыванию:
- клонируйте репозиторий `https://github.com/MankoIvan/middle.messenger.praktikum.yandex.git`
- уcтановите зависимости npm `npm install`

- запуск проекта в режиме разработчика `npm run dev`
- сборка проекта `npm run build`
- сборка проекта и запсук локального сервера `npm run start`
- запуск линтеров `npm run lint`

## Netlify

- https://stupefied-nobel-c31678.netlify.app/ - домашнаяя страница
- https://stupefied-nobel-c31678.netlify.app/user - профиль
- https://stupefied-nobel-c31678.netlify.app/authorize - авторизация
- https://stupefied-nobel-c31678.netlify.app/register - регистрация
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

## Pull requests
- https://github.com/MankoIvan/middle.messenger.praktikum.yandex/pull/6 - спринт 1
