import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTheme } from "./hooks/useTheme";
import { useLang } from "./hooks/lang";
import UserView from "./views/UserView";
import ManagerView from "./views/ManagerView";

const App = () => {
  const [role, setRole] = useLocalStorage("role", "user");
  const [requests, setRequests] = useLocalStorage("requests", []);
  const [logs, setLogs] = useLocalStorage("logs", []);

  const {theme, toggleTheme} = useTheme();

  const {t, lang, setLang} = useLang();

  const addLog = (action, requestId) => setLogs((prev) => [
  { id: crypto.randomUUID(), 
    role, 
    action, 
    timestamp: Date.now(),
    requestId,
  }, ...prev]);

  const resetLogs = () => setLogs([]);

  const addRequest = (title, description) => {
    const newRequest = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "new",
      createdAt: Date.now(),
    };
    setRequests((prev) => [newRequest, ...prev]);
    addLog("textLog6", newRequest.id);
  };

  const editRequest = (id, title, description) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, title, description } : r))
    );
    addLog("textLog7", id);
  };

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    addLog("textLog8", id);
  };

  const deleteRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    addLog("textLog9", id);
  };

  return (
    <div className="min-h-screen bg-surface text-content">
      <div className="mx-auto max-w-3xl p-6">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
              <h1 className="text-3xl font-bold m-0">{t("text1")}</h1>
              <div className="flex items-center my-4 gap-4">
                <p className="text-sm text-slate-500">
                  {t("text4")}: {role === "user" ? t("text5") : t("text6")}
                </p>
                <button onClick={toggleTheme} className="cursor-pointer text-sm text-slate-500 self-end">
                  {t("text2")}: {theme === "dark" ? "🌙" : "☀️"} 
                </button>
                <button onClick={() => setLang(lang === "en" ? "ua" : "en")} className="cursor-pointer text-sm text-slate-500 self-end">
                  {t("text3")}: {lang === "en" ? "EN" : "UA"} 
                </button>
            </div>
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
              {t("text5")}
            </button>
            <button
              onClick={() => setRole("manager")}
              className={`rounded-lg px-4 py-2 font-medium ${
                role === "manager"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {t("text6")}
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
              logs={logs}
              resetLogs={resetLogs}
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
