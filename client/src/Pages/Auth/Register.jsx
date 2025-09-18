import { useForm } from "react-hook-form"
import { signup } from "../../api/authcontroller";
export const Register = () => {
    const { register, handleSubmit } = useForm();
    const dataValidator = (data) => {
        data.email = data.email.toLowerCase() + "@company.com";
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match");
            throw new Error("Passwords do not match");
        }

    }
    const handleRegister = async (data) => {
        dataValidator(data);
        const res = await signup(data);
        console.log(res);
    }
    return (
        <main className="login w-screen bg-gradient-to-tr to-[#ebedee] from-[#c4d7ee] h-screen flex items-center justify-center">
            <div className="login-field flex items-center  relative overflow-hidden bg-[#181818] flex-col w-96 h-96 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl text-[#707D7A] text-center">Company</h1>
                <form autoComplete="off" onSubmit={handleSubmit(handleRegister)} className="flex w-full flex-col gap-4 justify-center h-full text-[#707D7A]">
                    <input type="text"  {...register("email")} placeholder="Create Username" className="p-2 border text-[#707D7A] border-gray-600 rounded" />
                    <input type="password" {...register("password")} placeholder="Create Password" className="p-2 border text-[#707D7A] border-gray-600 rounded" />
                    <input type="password" {...register("confirmPassword")} placeholder="Confirm Password" className="p-2 border text-[#707D7A] border-gray-600 rounded" />
                    <button type="submit" className=" text-[#bcd4ce] p-2 bg-blue-500 rounded">Register</button>
                </form>
                <a href="/login" className="text-xs cursor-pointer w-fit text-[#707D7A] text-center">Already a Employee?</a>
            </div>
        </main>
    )
}
