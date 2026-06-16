import { useState } from "react";
import RequestForm from "../components/RequestForm";
import RequestCard from "../components/RequestCard";

const UserView = ({ requests, onCreate, onEdit, onDelete }) => {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-lg font-semibold">New request</h2>
        <RequestForm onSubmit={onCreate} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">My requests ({requests.length})</h2>

        {requests.length === 0 ? (
          <p className="text-sm text-slate-500">No requests yet — create your first one.</p>
        ) : (
          <div className="space-y-3">
            {requests.map((r) =>
              editingId === r.id ? (
                <RequestForm
                  key={r.id}
                  initial={r}
                  submitLabel="Save"
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
                          Edit
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
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserView;
