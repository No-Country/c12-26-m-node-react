/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import Button from "../Button.jsx";
import Input from "../Layouts/Input";
import { closeModal } from "../../hooks/modalSlice";

export default function RegisterModal() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div
          className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
        >
          <button
            type="button"
            className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
            onClick={() => dispatch(closeModal())}
          >
            <AiOutlineCloseCircle size={18} />
          </button>
        </div>
        <Input
          id="email"
          register={register}
          errors={errors}
          placeholder="Email"
          required
        />
        <Input
          id="name"
          register={register}
          errors={errors}
          placeholder="Name"
          required
        />
        <Input
          id="password"
          register={register}
          errors={errors}
          placeholder="Password"
          required
        />
        <div className="mt-3">
          <Button label="Registrarse" outline />
        </div>
      </div>
    </div>
  );
}
