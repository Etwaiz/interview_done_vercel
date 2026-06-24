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
  },
  ua: { 
    text1: "Mini Request System",
    text2: "Тема",
    text3: "Language",
    text4: "Role",
    text5: "User",
    text6: "Manager",
    textForm0: "Create request",
    textForm1: "Please enter a title",
    textForm2: "e.g. Printer is broken",
    textForm3: "Short description of the problem",
    textForm4: "Cancel",
},
};
