import StatusBadge from "./StatusBadge";
import { formatDate } from "../constants";

const RequestCard = ({ request, showId = false, actions = null }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="font-semibold text-slate-900 break-words">{request.title}</h3>
        {request.description && (
          <p className="mt-1 text-sm text-slate-600 break-words">{request.description}</p>
        )}
      </div>
      <StatusBadge status={request.status} />
    </div>

    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
      <span>
        {showId && `ID: ${request.id.slice(0, 8)} · `}
        {formatDate(request.createdAt)}
      </span>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  </div>
);

export default RequestCard;
