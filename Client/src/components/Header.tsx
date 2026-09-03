const Header = () => {
  return (
    <header className="relative h-40 w-full shrink-0 overflow-hidden bg-[#299999]">
      {/* Background decoration */}

      <div
        className="
          absolute
          -left-20 -top-24
          h-64 w-64
          rounded-full
          border-[30px]
          border-white/10
        "
      />

      <div
        className="
          absolute
          -right-20 -top-16
          h-56 w-56
          rounded-full
          border-[25px]
          border-white/10
        "
      />

      <div
        className="
          absolute
          -bottom-32 -left-24
          h-72 w-72
          rounded-full
          border-[35px]
          border-white/10
        "
      />

      {/* Header content */}

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium tracking-wide text-white/80">
            Welcome back
          </p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white">
            My Todo List
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
