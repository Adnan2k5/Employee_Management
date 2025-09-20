import { useForm } from "react-hook-form"
import { login } from "../../api/authcontroller";
export const Login = () => {
    const { register, handleSubmit } = useForm();
    const handleLogin = async (data) => {
        console.log(data);
        const res = await login(data);
        console.log(res);
    }
    return (
        <main className="login w-screen bg-gradient-to-tr to-[#ebedee] from-[#c4d7ee] h-screen flex items-center justify-center">
            <div className="login-field flex items-center  relative overflow-hidden bg-[#181818] flex-col w-96 h-96 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl text-[#707D7A] text-center">Company</h1>
                <form autoComplete="off" onSubmit={handleSubmit(handleLogin)} className="flex w-full flex-col gap-4 justify-center h-full text-[#707D7A]">
                    <input type="text"  {...register("email")} placeholder="email" className="p-2 border text-[#707D7A] border-gray-600 rounded" />
                    <input type="password" {...register("password")} placeholder="*******" className="p-2 border text-[#707D7A] border-gray-600 rounded" />
                    <button type="submit" className=" text-[#bcd4ce] p-2 bg-blue-500 rounded">Login</button>
                    <a href="/register" className="text-xs cursor-pointer w-fit text-[#707D7A] text-center">New Employee Registration?</a>
                </form>
                <p className="text-xs cursor-pointer w-fit text-[#707D7A] text-center">Forgot your password?</p>
            </div>
        </main>
    )
}
