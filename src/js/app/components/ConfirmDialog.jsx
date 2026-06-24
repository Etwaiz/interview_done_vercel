import { useEffect } from "react";
import { useLang } from "../hooks/lang";

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) => {
  const { t } = useLang();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        )}
        <p className="mt-2 text-sm text-slate-600 break-words">{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-300"
          >
            {cancelLabel ?? t("confirm3")}
          </button>
          <button
            type="button"
            autoFocus
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
          >
            {confirmLabel ?? t("confirm2")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
