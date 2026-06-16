# Mini Request System

Cистема подачі та обробки заявок з перемиканням ролей **User / Manager**.

Стек: **React 19**, **Tailwind CSS v4**, **webpack 5**. Дані зберігаються у **localStorage**.

## Функціонал

**User (користувач)**

- Створення заявки (Title + Description), валідація поля Title
- Перегляд списку своїх заявок (назва, опис, статус, дата)
- Редагування заявки, доки її статус `new`
- Видалення заявки

**Manager (менеджер)**

- Перегляд усіх заявок (ID, Title, Description, Status, дата)
- Зміна статусу за правилом `new → in progress → done`
- Фільтрація за статусом: всі / new / in progress / done
- Сортування: спочатку нові / спочатку старі

Обрана роль і список заявок зберігаються в localStorage і переживають
перезавантаження сторінки.

## Запуск

Потрібен Node.js 18+ (перевірено на Node 22).

```bash
npm install
npm start
npm run build
```

## Vercel

Проєкт містить `vercel.json` з налаштуваннями:

```json
{ "buildCommand": "npm run build", "outputDirectory": "public" }
```

## Структура проєкту

```
src/
  index.html              # сторінка з <div id="root">
  css/tailwind.css        # точка входу Tailwind
  scss/                   # базові стилі (normalize/reset, шрифти)
  js/app/
    index.jsx             # точка входу React (createRoot)
    App.jsx               # кореневий компонент: стан + перемикання ролей
    constants.js          # статуси, переходи статусів, формат дати
    hooks/
      useLocalStorage.js  # хук-обгортка над useState + localStorage
    components/
      RequestForm.jsx     # форма створення/редагування (controlled inputs)
      RequestCard.jsx     # картка заявки
      StatusBadge.jsx     # кольоровий бейдж статусу
    views/
      UserView.jsx        # екран користувача
      ManagerView.jsx     # екран менеджера (фільтр + сортування)
```

## Архітектура (коротко)

Увесь стан живе в `App` (єдине джерело правди): масив `requests` і поточна
`role`. Дочірні компоненти отримують дані та колбеки через props і повертають
зміни нагору (однонаправлений потік даних). Збереження у localStorage винесено
в перевикористовуваний хук `useLocalStorage`. Бізнес-правила статусів зібрані в
`constants.js`, тож логіка не розповзається по компонентах.

## Модель даних

```js
{
  id: "uuid",
  title: "string",
  description: "string",
  status: "new" | "in progress" | "done",
  createdAt: 1718000000000  // timestamp
}
```
