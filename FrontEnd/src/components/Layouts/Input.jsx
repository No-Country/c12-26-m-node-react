function Input({ id, register, errors, required, placeholder }) {
  return (
    <div className="w-full relative">
      <input
      placeholder={placeholder}
        className={`
          peer
          w-full
          p-4
          pt-3 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
        
        `}
      />
    </div>
  );
}

export default Input;
