import { STATUS_LABELS } from "../constants";

const STYLES = {
  new: "bg-sky-100 text-sky-700",
  "in progress": "bg-amber-100 text-amber-700",
  done: "bg-emerald-100 text-emerald-700",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${
      STYLES[status] || "bg-slate-100 text-slate-700"
    }`}
  >
    {STATUS_LABELS[status] || status}
  </span>
);

export default StatusBadge;
