import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required: boolean;
}

function Input({ id, register, errors, required }: InputProps) {
  return (
    <div className="w-full relative">
      <input
        {...register(id, { required })}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
    </div>
  );
}

export default Input;
