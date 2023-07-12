interface ButtonProps {
  label: string;
}

function Button({ label }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`
        relative 
        disabled:opacity-70 
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        `}
    >
      {label}
    </button>
  );
}

export default Button;
