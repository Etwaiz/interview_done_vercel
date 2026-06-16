import { useState } from "react";
import RequestCard from "../components/RequestCard";
import { STATUSES, STATUS_LABELS, nextStatus } from "../constants";

const FILTERS = ["all", ...STATUSES];

const ManagerView = ({ requests, onUpdateStatus, onDelete }) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  const visible = requests
    .filter((r) => filter === "all" || r.status === filter)
    .sort((a, b) =>
      sort === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                filter === f
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {f === "all" ? "All" : STATUS_LABELS[f]}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-slate-500">No requests match the selected filter.</p>
      ) : (
        <div className="space-y-3">
          {visible.map((r) => {
            const next = nextStatus(r.status);
            return (
              <RequestCard
                key={r.id}
                request={r}
                showId
                actions={
                  <>
                    {next && (
                      <button
                        onClick={() => onUpdateStatus(r.id, next)}
                        className="rounded-md bg-emerald-500 px-2 py-1 text-white hover:bg-emerald-600"
                      >
                        → {STATUS_LABELS[next]}
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(r.id)}
                      className="rounded-md px-2 py-1 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </>
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManagerView;
