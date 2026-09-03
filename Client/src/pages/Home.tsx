import { FaCheckCircle } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
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

const Home = () => {
  const [Todo, setTodo] = useState<Todo[]>([]);

  const todos = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }

    const data = await res.json();
    setTodo(data);
  };

  useEffect(() => {
    todos();
  }, []);

  const toggleComplete = async (todo: Todo) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
        priority: todo.priority,
        dueDateTime: todo.dueDateTime,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update todo");
    }

    todos();
  };

  const totalTodos = Todo.length;

  const completedTodos = Todo.filter((todo) => todo.completed).length;

  const progress =
    totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  return (
    <div className="relative flex h-screen w-full flex-col bg-[#F4F7F8]">
      {/* Header */}
      <Header />

      <div className="mx-auto w-full max-w-xl px-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Your Tasks</p>

            <h2 className="text-xl font-bold text-gray-800">
              {completedTodos} / {totalTodos} completed
            </h2>
          </div>

          <div className="text-right">
            <p className="text-2xl font-extrabold text-[#299999]">
              {progress}%
            </p>

            <p className="text-xs text-gray-400">Progress</p>
          </div>
        </div>

        {/* Loading / Progress bar */}
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#299999] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Todo List */}
      <main className="flex-1 overflow-y-auto min-h-0 px-4 py-4 pb-24">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
          {Todo.map((todo) => (
            <Link
              to={`/home/detail?id=${todo.id}`}
              key={todo.id}
              className={`
                group flex w-full items-center justify-between
                rounded-2xl
                border
                px-4 py-3
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                ${
                  todo.completed
                    ? "border-[#D8EFE9] bg-[#E8F7F3]"
                    : "border-[#C8EDE4] bg-[#A9F1DF]"
                }
              `}
            >
              {/* Todo information */}
              <div className="min-w-0 flex-1">
                <p
                  className={`
                    truncate text-lg font-bold
                    ${
                      todo.completed
                        ? "text-gray-400 line-through"
                        : "text-[#1F2937]"
                    }
                  `}
                >
                  {todo.title}
                </p>

                <p className="mt-1 truncate text-xs font-medium text-gray-500">
                  {todo.description}
                </p>

                <p className="mt-1 text-[10px] font-medium text-gray-400">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Check */}
              <FaCheckCircle
                size={27}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleComplete(todo);
                }}
                className={`
                  ml-3 shrink-0 transition-transform duration-200
                  group-hover:scale-110
                  ${todo.completed ? "text-[#299999]" : "text-white"}
                `}
              />
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
