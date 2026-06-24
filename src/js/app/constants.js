export const STATUSES = ["new", "in progress", "done"];

export const STATUS_LABELS_EN = {
  new: "New",
  "in progress": "In progress",
  done: "Done",
};

export const STATUS_LABELS_UA = {
  new: "Новий",
  "in progress": "В роботі",
  done: "Готовий",
};

export function nextStatus(status) {
  const i = STATUSES.indexOf(status);
  return i >= 0 && i < STATUSES.length - 1 ? STATUSES[i + 1] : null;
}

export function formatDate(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleString();
}

export const translations = {
  en : {
    text1: "Mini Request System",
    text2: "Theme",
    text3: "Language",
    text4: "Role",
    text5: "User",
    text6: "Manager",
    textForm0: "Create request",
    textForm1: "Please enter a title",
    textForm2: "e.g. Printer is broken",
    textForm3: "Short description of the problem",
    textForm4: "Cancel",
    textUser0: "New request",
    textUser1: "My requests",
    textUser2: "No requests yet — create your first one.",
    textUser3: "Save",
    textUser4: "Edit",
    textUser5: "Delete",
    textUser6: "Are you sure?",
    textManager0: "All",
    textManager1: "Newest first",
    textManager2: "Oldest first",
    textManager3: "No requests match the selected filter.",
    textManager4: "Delete",
    textManager5: "Reset logs?",
    textManager6: "Reset logs",
    textLog0: "Requests",
    textLog1: "Logs",
    textLog2: "Role",
    textLog3: "Time",
    textLog4: "Action",
    textLog5: "No actions logged yet.",
    textLog6: "Created request",
    textLog7: "Edited request",
    textLog8: "Changed status",
    textLog9: "Deleted request",
    textLog10: "Request id",
  },
  ua: {
    text1: "Mini Request System",
    text2: "Тема",
    text3: "Мова",
    text4: "Роль",
    text5: "Користувач",
    text6: "Менеджер",
    textForm0: "Створити заявку",
    textForm1: "Будь ласка, введіть заголовок",
    textForm2: "напр. Принтер не працює",
    textForm3: "Короткий опис проблеми",
    textForm4: "Скасувати",
    textUser0: "Нова заявка",
    textUser1: "Мої заявки",
    textUser2: "Заявок ще немає — створіть першу.",
    textUser3: "Зберегти",
    textUser4: "Редагувати",
    textUser5: "Видалити",
    textUser6: "Ви впевнені?",
    textManager0: "Усі",
    textManager1: "Спочатку нові",
    textManager2: "Спочатку старі",
    textManager3: "Немає заявок за обраним фільтром.",
    textManager4: "Видалити",
    textManager5: "Очистити логи?",
    textManager6: "Очистити логи",
    textLog0: "Заявки",
    textLog1: "Логи",
    textLog2: "Роль",
    textLog3: "Час",
    textLog4: "Дія",
    textLog5: "Дій ще не зафіксовано.",
    textLog6: "Створено заявку",
    textLog7: "Відредаговано заявку",
    textLog8: "Змінено статус",
    textLog9: "Видалено заявку",
    textLog10: "Номер запиту",
},
};
