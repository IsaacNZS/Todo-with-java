import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaTrash,
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

const TodoDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // Get Todo By ID
  // =========================
  const getTodo = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch todo");
      }

      const data: Todo = await res.json();

      setTodo(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodo();
  }, [id]);

  // =========================
  // Delete Todo
  // =========================
  const handleDelete = async () => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete todo");
      }

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F7F8]">
        <p className="font-semibold text-[#299999]">Loading...</p>
      </div>
    );
  }

  // =========================
  // Todo Not Found
  // =========================
  if (!todo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F4F7F8]">
        <p className="mb-4 font-semibold text-gray-500">Todo not found</p>

        <Link
          to="/home"
          className="rounded-xl bg-[#299999] px-5 py-3 font-bold text-white"
        >
          Back Home
        </Link>
      </div>
    );
  }

  // =========================
  // Date / Time
  // =========================
  const date = todo.dueDateTime ? todo.dueDateTime.split("T")[0] : "";

  const time = todo.dueDateTime ? todo.dueDateTime.substring(11, 16) : "";

  // =========================
  // Priority
  // =========================
  const priority = todo.priority?.toLowerCase() || "medium";

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F4F7F8]">
      {/* Header */}
      <header className="relative h-40 shrink-0 overflow-hidden bg-[#299999]">
        {/* Decoration */}
        <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full border-[30px] border-white/10" />

        <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full border-[25px] border-white/10" />

        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full border-[35px] border-white/10" />

        {/* Header content */}
        <div className="relative z-10 flex h-full items-center px-5">
          <Link
            to="/home"
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-full
              bg-white
              text-[#299999]
              shadow-md
              transition
              hover:scale-105
            "
          >
            <FaArrowLeft />
          </Link>

          <div className="ml-4">
            <p className="text-sm font-medium text-white/70">Task #{todo.id}</p>

            <h1 className="text-2xl font-extrabold text-white">Task Details</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-5">
        <div className="mx-auto w-full max-w-xl">
          {/* Main Card */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            {/* Status */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <FaCheckCircle
                  size={22}
                  className={
                    todo.completed ? "text-[#299999]" : "text-gray-300"
                  }
                />

                <span
                  className={`
                    text-sm font-bold
                    ${todo.completed ? "text-[#299999]" : "text-gray-400"}
                  `}
                >
                  {todo.completed ? "Completed" : "Not Completed"}
                </span>
              </div>

              {/* Priority */}
              <span
                className={`
                  rounded-full px-3 py-1
                  text-xs font-bold
                  ${
                    priority === "high"
                      ? "bg-[#ffd6d6] text-[#9A7118]"
                      : priority === "low"
                        ? "bg-[#A9F1DF] text-[#176969]"
                        : "bg-[#FFF4D6] text-[#176969]"
                  }
                `}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </span>
            </div>

            {/* Todo info */}
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Task
              </p>

              <h2
                className={`
                  mt-2 text-3xl font-extrabold
                  ${
                    todo.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }
                `}
              >
                {todo.title}
              </h2>

              {/* Description */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Description
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {todo.description || "No description"}
                </p>
              </div>

              {/* Date / Time */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {/* Date */}
                <div className="rounded-2xl bg-[#E8F7F3] p-4">
                  <FaCalendarAlt className="text-[#299999]" size={18} />

                  <p className="mt-3 text-xs font-medium text-gray-400">Date</p>

                  <p className="mt-1 text-sm font-bold text-gray-700">
                    {date || "No date"}
                  </p>
                </div>

                {/* Time */}
                <div className="rounded-2xl bg-[#FFF4D6] p-4">
                  <FaClock className="text-[#B88B20]" size={18} />

                  <p className="mt-3 text-xs font-medium text-gray-400">Time</p>

                  <p className="mt-1 text-sm font-bold text-gray-700">
                    {time || "No time"}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 border-t border-gray-100 p-5">
              {/* Edit */}
              <Link
                to={`/home/info?status=edit&id=${todo.id}`}
                className="
                  flex flex-1
                  items-center justify-center gap-2
                  rounded-2xl
                  border-2 border-[#299999]
                  py-3
                  font-bold text-[#299999]
                  transition
                  hover:bg-[#E8F7F3]
                "
              >
                <FaEdit />
                Edit
              </Link>

              {/* Delete */}
              <button
                type="button"
                onClick={handleDelete}
                className="
                  flex flex-1
                  items-center justify-center gap-2
                  rounded-2xl
                  bg-red-50
                  py-3
                  font-bold text-red-500
                  transition
                  hover:bg-red-100
                "
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TodoDetail;
