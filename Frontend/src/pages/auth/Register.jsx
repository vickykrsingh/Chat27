import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate()
  const onSubmit = async (userData) => {
    try {
      const {data} = await axios.post(`/auth/register`,userData);
      if(data.success){
        toast.success(data.message)
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <main className="w-full h-[92vh] flex items-center justify-center">
      <section className="flex flex-col gap-3 bg-slate-700 p-4 rounded-md w-96">
        <h1 className="text-3xl font-bold font-mono">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            placeholder="name"
            {...register("name", {
              required: "name is required",
              maxLength: 15,
              minLength: 3,
            })}
            className="w-full px-3 py-2 bg-transparent border border-slate-900 text-slate-500 placeholder:text-slate-500 rounded-md"
          />
          {errors.name?.type=='minLength' && <span className="input-error">Name is too short</span>}
          {errors.name?.type=='maxLength' && <span className="input-error">Name is too long</span>}
          {errors.name?.type=='required' && <span className="input-error">Name is required</span>}
          <input
            placeholder="email"
            {...register("email", {
              required: "Email is required",
              maxLength: 30,
              minLength: 12,
            })}
            className="w-full px-3 py-2 bg-transparent border border-slate-900 text-slate-500 placeholder:text-slate-500 rounded-md"
          />
          {errors.email?.type=='minLength' && <span className="input-error">Email is too short</span>}
          {errors.email?.type=='maxLength' && <span className="input-error">Email is too long</span>}
          {errors.email?.type=='required' && <span className="input-error">Email is required</span>}
          <input
            placeholder="password"
            {...register("password", {
              required: true,
              maxLength: 12,
              minLength: 6,
            })}
            className="w-full px-3 py-2 bg-transparent border border-slate-900 text-slate-500 placeholder:text-slate-500 rounded-md"
            />
            {errors.password?.type=='required' && <span className="input-error">Password is required</span>}
            {errors.password?.type=='maxLength' && <span className="input-error">Password is too long</span>}
            {errors.password?.type=='minLength' && <span className="input-error">Password is too short</span>}
          {/* errors will return when field validation fails  */}
          <input type="submit" className="bg-slate-800 hover:bg-slate-900 duration-300 py-2 rounded-md cursor-pointer" />
          <p className="text-center">or</p>
          <p className="text-center">have an account ? <Link to={'/login'}>login</Link></p>
        </form>
      </section>
    </main>
  );
}
