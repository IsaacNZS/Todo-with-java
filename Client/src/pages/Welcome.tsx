import { Link } from "react-router-dom";
import "../App.css";

const Welcome = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#299999]">
      {/* Dark shape - top right */}
      <div
        className="
          absolute
          -top-40
          -right-32
          h-[420px]
          w-[420px]
          rounded-[40%_0_0_60%]
          bg-[#303038]
        "
      />

      {/* Mint shape - bottom left */}
      <div
        className="
          absolute
          -bottom-52
          -left-32
          h-[420px]
          w-[300px]
          rounded-full
          bg-[#A9F1DF]
        "
      />

      {/* Yellow shape - bottom right */}
      <div
        className="
          absolute
          -bottom-52
          -right-32
          h-[400px]
          w-[300px]
          rounded-full
          bg-[#FFD47B]
        "
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="welcome-animate text-7xl font-extrabold tracking-wide text-white">
          TOIO
        </h1>

        <p className="welcome-animate welcome-delay-1 mt-4 text-xl font-semibold text-left leading-relaxed text-white">
          The simplest todo
          <br />
          app ever
        </p>

        <button
          className="
          welcome-animate
          welcome-delay-2
            mt-8
            rounded-full
            bg-white
            px-8
            py-3
            font-bold
            text-[#299999]
            shadow-lg
            transition
            hover:scale-105
          "
        >
          <Link to={"/home"}>Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
