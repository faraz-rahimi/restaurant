const FoodinoLogo = ({ iconOnly = false, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 text-orange-600"
      >
        <path d="M3 18h18" />
        <path d="M4 14a8 8 0 0 1 16 0" />
        <path d="M12 9v-4" />
        <path d="M10 5h4" />
      </svg>

      {!iconOnly && (
        <span className="text-2xl font-black tracking-tight bg-clip-text text-orange-600">
          Foodino
        </span>
      )}
    </div>
  );
};

export default FoodinoLogo;
