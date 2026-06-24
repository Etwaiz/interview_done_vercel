import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTheme } from "./hooks/useTheme";
import { useLang } from "./hooks/lang";
import UserView from "./views/UserView";
import ManagerView from "./views/ManagerView";

const App = () => {
  const [role, setRole] = useLocalStorage("role", "user");
  const [requests, setRequests] = useLocalStorage("requests", []);

  const {theme, toggleTheme} = useTheme();

  const addRequest = (title, description) => {
    const newRequest = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "new",
      createdAt: Date.now(),
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  const editRequest = (id, title, description) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, title, description } : r))
    );
  };

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const deleteRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-surface text-content">
      <div className="mx-auto max-w-3xl p-6">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex gap-3 items-center my-4">
              <h1 className="text-2xl font-bold m-0">Mini Request System</h1>
              <button onClick={toggleTheme} className="cursor-pointer text-sm text-slate-500 self-center">
                {theme === "dark" ? "🌙" : "☀️"} 
              </button>
            </div>
            <p className="text-sm text-slate-500">
              Role: {role === "user" ? "User" : "Manager"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setRole("user")}
              className={`rounded-lg px-4 py-2 font-medium ${
                role === "user"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              User
            </button>
            <button
              onClick={() => setRole("manager")}
              className={`rounded-lg px-4 py-2 font-medium ${
                role === "manager"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              Manager
            </button>
          </div>
        </header>

        <main>
          {role === "user" ? (
            <UserView
              requests={requests}
              onCreate={addRequest}
              onEdit={editRequest}
              onDelete={deleteRequest}
            />
          ) : (
            <ManagerView
              requests={requests}
              onUpdateStatus={updateStatus}
              onDelete={deleteRequest}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
