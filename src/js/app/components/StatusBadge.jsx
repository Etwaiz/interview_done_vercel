import { STATUS_LABELS_EN, STATUS_LABELS_UA } from "../constants";
import { useLang } from "../hooks/lang";

const STYLES = {
  new: "bg-sky-100 text-sky-700",
  "in progress": "bg-amber-100 text-amber-700",
  done: "bg-emerald-100 text-emerald-700",
};

const StatusBadge = ({ status }) => {
  const {lang} = useLang();

  return (
  <span
    className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${
      STYLES[status] || "bg-slate-100 text-slate-700"
    }`}
  >
    {(lang === "en" ? STATUS_LABELS_EN : STATUS_LABELS_UA)[status] || status}
  </span>
);
};

export default StatusBadge;
