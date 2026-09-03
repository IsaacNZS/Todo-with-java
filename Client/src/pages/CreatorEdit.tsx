import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaTrash,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  dueDateTime: string;
  createdAt: string;
};

const CreatorEdit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("medium");
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const [todo, setTodo] = useState<Todo | null>(null);
  const status = searchParams.get("status");
  const id = searchParams.get("id");

  const isEdit = status === "edit";

  // =========================
  // Get Todo By ID
  // =========================
  const getTodo = async () => {
    if (!id) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch todo");
      }

      const data: Todo = await res.json();
      setTodo(data);
      setPriority(data.priority.toLowerCase());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getTodo();
    }
  }, [id]);

  const handleCreate = async () => {
    const data = {
      title,
      description,
      completed: false,
      priority,
      dueDateTime: `${date}T${time}:00`,
    };

    if (!isEdit) {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result) {
        router("/home");
      }
      console.log(result);
    } else {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result) {
        router(`/home/detail?id=${id}`);
      }
      console.log(result);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F8]">
      {/* Header */}
      <header className="relative h-40 overflow-hidden bg-[#299999]">
        {/* Background decoration */}
        <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full border-[30px] border-white/10" />

        <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full border-[25px] border-white/10" />

        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full border-[35px] border-white/10" />

        {/* Header content */}
        <div className="relative z-10 flex h-full items-center px-5">
          <Link
            to={isEdit ? `/home/detail?id=${id}` : "/home"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#299999] shadow-md transition hover:scale-105"
          >
            <FaArrowLeft />
          </Link>

          <div className="ml-4">
            <p className="text-sm font-medium text-white/70">
              {isEdit ? `Task #${id}` : "New Task"}
            </p>

            <h1 className="text-2xl font-extrabold text-white">
              {isEdit ? "Edit Task" : "Create Task"}
            </h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="mx-auto w-full max-w-xl px-4 py-5">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Task Title
            </label>

            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={isEdit ? todo?.title : ""}
              placeholder="What do you need to do?"
              className="
                w-full rounded-2xl
                border border-gray-200
                bg-[#F8FAFA]
                px-4 py-3
                text-gray-800
                outline-none
                transition
                focus:border-[#299999]
                focus:ring-2
                focus:ring-[#299999]/20
              "
            />
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Description
            </label>

            <textarea
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={isEdit ? todo?.description : ""}
              placeholder="Add some details..."
              className="
                w-full resize-none rounded-2xl
                border border-gray-200
                bg-[#F8FAFA]
                px-4 py-3
                text-gray-800
                outline-none
                transition
                focus:border-[#299999]
                focus:ring-2
                focus:ring-[#299999]/20
              "
            />
          </div>

          {/* Date & Time */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Date
              </label>

              <div className="relative">
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  className="
                    w-full rounded-2xl
                    border border-gray-200
                    bg-[#F8FAFA]
                    px-3 py-3
                    text-gray-700
                    outline-none
                    focus:border-[#299999]
                  "
                />

                <FaCalendarAlt className="pointer-events-none absolute right-3 top-4 text-[#299999]" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Time
              </label>

              <div className="relative">
                <input
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  className="
                    w-full rounded-2xl
                    border border-gray-200
                    bg-[#F8FAFA]
                    px-3 py-3
                    text-gray-700
                    outline-none
                    focus:border-[#299999]
                  "
                />

                <FaClock className="pointer-events-none absolute right-3 top-4 text-[#299999]" />
              </div>
            </div>
          </div>

          {/* Priority */}
          <div className="grid mt-5 grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPriority("low")}
              className={`rounded-xl py-3 text-sm font-bold ${
                priority === "low"
                  ? "border-2 border-[#299999] bg-[#A9F1DF] text-[#176969]"
                  : "border border-gray-200 bg-gray-50 text-gray-500"
              }`}
            >
              Low
            </button>

            <button
              type="button"
              onClick={() => setPriority("medium")}
              className={`rounded-xl py-3 text-sm font-bold ${
                priority === "medium"
                  ? "border-2 border-[#FFD47B] bg-[#FFF4D6] text-[#176969]"
                  : "border border-gray-200 bg-gray-50 text-gray-500"
              }`}
            >
              Medium
            </button>

            <button
              type="button"
              onClick={() => setPriority("high")}
              className={`rounded-xl py-3 text-sm font-bold ${
                priority === "high"
                  ? "border-2 border-[#ff7b7b] bg-[#ffd6d6] text-[#9A7118]"
                  : "border border-gray-200 bg-gray-50 text-gray-500"
              }`}
            >
              High
            </button>
          </div>
          {/* Save */}
          <button
            onClick={handleCreate}
            type="button"
            className="
              mt-7 flex w-full
              items-center justify-center gap-2
              rounded-2xl
              bg-[#299999]
              px-5 py-4
              text-lg font-bold text-white
              shadow-lg shadow-[#299999]/20
              transition
              hover:-translate-y-0.5
              hover:bg-[#238888]
              active:scale-[0.98]
            "
          >
            <FaSave size={17} />

            {isEdit ? "Save Changes" : "Create Task"}
          </button>

          {/* Delete - Edit only */}
          {isEdit && (
            <button
              type="button"
              className="
                mt-3 flex w-full
                items-center justify-center gap-2
                rounded-2xl
                border border-red-100
                bg-red-50
                px-5 py-3
                font-semibold text-red-500
                transition
                hover:bg-red-100
              "
            >
              <FaTrash size={14} />
              Delete Task
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreatorEdit;
