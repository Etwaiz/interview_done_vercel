import { useState } from "react";

const RequestForm = ({
  onSubmit,
  initial = { title: "", description: "" },
  submitLabel = "Create request",
  onCancel,
}) => {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Please enter a title");
      return;
    }

    onSubmit(title.trim(), description.trim());

    if (!onCancel) {
      setTitle("");
      setDescription("");
    }
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Printer is broken"
          className="box-border w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Short description of the problem"
          className="box-border w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white hover:bg-emerald-600"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default RequestForm;
