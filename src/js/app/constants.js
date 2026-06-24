export const STATUSES = ["new", "in progress", "done"];

export const STATUS_LABELS = {
  new: "New",
  "in progress": "In progress",
  done: "Done",
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
    text1: "Mini Request System"
  },
  uk: { 
    text1: "Система обробки запитань"
  },
};
