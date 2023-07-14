function Input({ id, register, type, errors,disabled}) {
  return (
    <div className="w-full relative">
      <input
        type={type}
        disabled={disabled}
        {...register(id)}
        className={`
          block w-full mt-1 p-2 
          border-gray-300 
          rounded-md 
          shadow-sm 
          focus:border-indigo-300 
          focus:ring 
          focus:ring-indigo-200 
          focus:ring-opacity-50
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
    </div>
  );
}

export default Input;
