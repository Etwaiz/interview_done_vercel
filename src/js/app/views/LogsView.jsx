import { useLang } from "../hooks/lang";
import { formatDate } from "../constants";

const LogsView = ({ logs}) => {
  const { t } = useLang();

  if (logs.length === 0) {
    return <p className="text-sm text-slate-500">{t("textLog5")}</p>;
  }

  return (
    <>
      <table className="w-full table-fixed border-collapse text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="w-1/4 border-b border-slate-200 py-2 pr-4 font-medium">{t("textLog3")}</th>
            <th className="w-1/4 border-b border-slate-200 py-2 pr-4 font-medium">{t("textLog10")}</th>
            <th className="w-1/4 border-b border-slate-200 py-2 pr-4 font-medium">{t("textLog2")}</th>
            <th className="w-1/4 border-b border-slate-200 py-2 font-medium">{t("textLog4")}</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="border-b border-slate-100 py-2 pr-4 whitespace-nowrap">
                {formatDate(log.timestamp)}
              </td>
              <td className="border-b border-slate-100 py-2 pr-4">{log.requestId}</td>
              <td className="border-b border-slate-100 py-2 pr-4">
                {log.role === "user" ? t("text5") : t("text6")}
              </td>
              <td className="border-b border-slate-100 py-2">{t(log.action)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
    
  );
};

export default LogsView;
