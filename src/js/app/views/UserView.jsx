import { useState } from "react";
import RequestForm from "../components/RequestForm";
import RequestCard from "../components/RequestCard";
import { useLang } from "../hooks/lang";

const UserView = ({ requests, onCreate, onEdit, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const { t } = useLang();

  const handleRequestDelete = (id) => {
    const isConfirmed = window.confirm(t("textUser6"));
    if (isConfirmed) {
      onDelete(id);
    }
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-lg font-semibold">{t("textUser0")}</h2>
        <RequestForm onSubmit={onCreate} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">{t("textUser1")} ({requests.length})</h2>

        {requests.length === 0 ? (
          <p className="text-sm text-slate-500">{t("textUser2")}</p>
        ) : (
          <div className="space-y-3">
            {requests.map((r) =>
              editingId === r.id ? (
                <RequestForm
                  key={r.id}
                  initial={r}
                  submitLabel={t("textUser3")}
                  onCancel={() => setEditingId(null)}
                  onSubmit={(title, description) => {
                    onEdit(r.id, title, description);
                    setEditingId(null);
                  }}
                />
              ) : (
                <RequestCard
                  key={r.id}
                  request={r}
                  actions={
                    <>
                      {r.status === "new" && (
                        <button
                          onClick={() => setEditingId(r.id)}
                          className="rounded-md px-2 py-1 text-emerald-600 hover:bg-emerald-50"
                        >
                          {t("textUser4")}
                        </button>
                      )}
                      <button
                        onClick={() => handleRequestDelete(r.id)}
                        className="rounded-md px-2 py-1 text-red-600 hover:bg-red-50"
                      >
                        {t("textUser5")}
                      </button>
                    </>
                  }
                />
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserView;
