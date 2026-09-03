import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full bg-gradient-to-t from-[#F4F7F8] via-[#F4F7F8] to-transparent px-4 pb-4 pt-8">
      <Link
        to="/home/info?status=create"
        className="
          mx-auto flex
          w-full max-w-xl
          items-center justify-center gap-3
          rounded-2xl
          bg-[#299999]
          px-6 py-4
          text-lg font-bold text-white
          shadow-lg shadow-[#299999]/20
          transition-all duration-200
          hover:bg-[#238888]
          hover:-translate-y-0.5
          active:scale-[0.98]
        "
      >
        <FaPlus size={16} />
        Add New Task
      </Link>
    </footer>
  );
};

export default Footer;
