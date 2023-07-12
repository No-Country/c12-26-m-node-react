interface ButtonProps {
  label: string;
  // eslint-disable-next-line react/require-default-props
  outline?: boolean;
  // eslint-disable-next-line react/require-default-props
  small?: boolean;
}

function Button({ label, outline, small }: ButtonProps) {
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
        ${outline ? "bg-white" : "bg-rose-500"}
        ${outline ? "border-black" : "border-rose-500"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
        `}
    >
      {label}
    </button>
  );
}

export default Button;
