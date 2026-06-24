import { useState } from "react";
import RequestCard from "../components/RequestCard";
import LogsView from "./LogsView";
import { STATUSES, STATUS_LABELS_EN, STATUS_LABELS_UA, nextStatus } from "../constants";
import { useLang } from "../hooks/lang";

const FILTERS = ["all", ...STATUSES];

const ManagerView = ({ requests, logs, onUpdateStatus, onDelete, resetLogs }) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [tab, setTab] = useState("requests");
  const { t, lang } = useLang();
  const statusLabels = lang === "ua" ? STATUS_LABELS_UA : STATUS_LABELS_EN;

  const visible = requests
    .filter((r) => filter === "all" || r.status === filter)
    .sort((a, b) =>
      sort === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );

  const handleResetLogs = () => {
    const isConfirmed = window.confirm(t("textManager5"));
    if (isConfirmed) {
      resetLogs();
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["requests", "logs"].map((tabName) => (
          <button
            key={tabName}
            onClick={() => setTab(tabName)}
            className={`rounded-lg px-4 py-2 font-medium ${
              tab === tabName
                ? "bg-emerald-500 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            {tabName === "requests" ? t("textLog0") : t("textLog1")}
          </button>
        ))}
        {tab === "logs" ? (
          <button onClick={handleResetLogs} className="rounded-lg px-4 py-2 font-medium bg-red-500 text-white cursor-pointer">
            {t("textManager6")}
          </button>) : true}
      </div>

      {tab === "logs" ? (
        <LogsView logs={logs} />
      ) : (
        <>
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
                  {f === "all" ? t("textManager0") : statusLabels[f]}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-black bg-white"
            >
              <option value="newest">{t("textManager1")}</option>
              <option value="oldest">{t("textManager2")}</option>
            </select>
          </div>

          {visible.length === 0 ? (
            <p className="text-sm text-slate-500">{t("textManager3")}</p>
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
                            → {statusLabels[next]}
                          </button>
                        )}
                        <button
                          onClick={() => onDelete(r.id)}
                          className="rounded-md px-2 py-1 text-red-600 hover:bg-red-50"
                        >
                          {t("textManager4")}
                        </button>
                      </>
                    }
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManagerView;
