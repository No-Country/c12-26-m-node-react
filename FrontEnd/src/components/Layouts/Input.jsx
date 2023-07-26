function Input({ id, register, type, errors,disabled,placeholder, required,number}) {
  return (
    <div className="w-full relative">
      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id, {valueAsNumber: number,  required })}
        className={`
          block w-full mt-1 p-2 
          border-gray-800 
          rounded-md 
          shadow-sm 
          focus:border-gray-300 
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
