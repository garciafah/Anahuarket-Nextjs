'use client'

import { registerUserAction } from "@/features/auth/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type RegisterFormValues = {
    name: string;
    email: string;
    tel: string;
    password: string;
    passwordConfirm: string;
};

export default function RegisterPage() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormValues>();
    const [serverError, setServerError] = useState<string | undefined>(undefined);
    const router = useRouter();

    const onSubmitHandler = handleSubmit(async (data) => {


        const resJSON = await registerUserAction({
            nombre: data.name,
            correo: data.email,
            telefono: data.tel,
            contrasena: data.password
        });

        if ('error' in resJSON) {
            setServerError(resJSON.error);
            reset();
            return;
        }
        router.push(`/verificar-correo?email=${encodeURIComponent(data.email)}`)
    });

    console.log(errors)

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <header className="py-10 bg-[#FF6B00] text-white text-center shadow-lg">
                <h1 className="text-4xl font-black tracking-tight">ANAHUARKET</h1>
                <p className="mt-2 text-orange-100 font-medium">REGISTRO</p>
            </header>

            <main className="flex-grow flex items-center justify-center p-6 bg-gray-700">
                <div className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">

                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-800">Bienvenid@ Prueba</h2>
                        <p className="text-gray-500 mt-2">Ingresa tus credenciales para continuar</p>
                    </div>

                    <form onSubmit={onSubmitHandler}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Nombre Completo</label>
                                    <input
                                        type="text"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "El nombre es necesario"
                                            }
                                        })}
                                        placeholder="Francisco García"
                                        className="w-full px-5 py-4 mb-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none transition-all text-gray-700"
                                    />
                                    {errors.name && (
                                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center font-semibold border border-red-100">
                                            {errors.name.message}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Correo Institucional</label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: "El correo institucional es necesario"
                                            }
                                        })}
                                        placeholder="nombre.apellido@anahuac.mx"
                                        className="w-full px-5 py-4 mb-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none transition-all text-gray-700"
                                    />
                                    {errors.email && (
                                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center font-semibold border border-red-100">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Teléfono</label>
                                    <input
                                        type="tel"
                                        {...register("tel", {
                                            required: {
                                                value: true,
                                                message: "El telefono es necesario"
                                            }
                                        })}
                                        placeholder="9988445595"
                                        className="w-full px-5 py-4 mb-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none transition-all text-gray-700"
                                    />
                                    {errors.tel && (
                                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center font-semibold border border-red-100">
                                            {errors.tel.message}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Contraseña</label>
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: "La contraseña es neceseria"
                                            }
                                        })}
                                        placeholder="••••••••"
                                        className="w-full px-5 py-4 mb-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none transition-all text-gray-700"
                                    />
                                    {errors.password && (
                                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center font-semibold border border-red-100">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Confirmar Contraseña</label>
                                    <input
                                        type="password"
                                        {...register("passwordConfirm", {
                                            required: {
                                                value: true,
                                                message: "Se debe de confirmar la contraseña"
                                            },
                                            validate: (
                                                value,
                                                formValue) =>
                                                value === formValue.password || "Las contraseñasno no coinciden"
                                        })}
                                        placeholder="••••••••"
                                        className="w-full px-5 py-4 mb-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none transition-all text-gray-700"
                                    />
                                    {errors.passwordConfirm && (
                                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center font-semibold border border-red-100">
                                            {errors.passwordConfirm.message}
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div className="md:col-span-2 flex flex-col gap-4 pt-4">
                                {/** error && (
                                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-semibold border border-red-100">
                                        {error}
                                    </div>
                                )**/}

                                { }
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#FF6B00] hover:bg-[#e66000] text-white font-black rounded-xl transition-all transform hover:scale-[1.01] shadow-xl text-center"
                                >
                                    CREAR CUENTA
                                </button>

                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-gray-200"></div>
                                    <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase font-bold">o</span>
                                    <div className="flex-grow border-t border-gray-200"></div>
                                </div>

                                <Link
                                    href="/login"
                                    className="w-full py-4 bg-white border-2 border-gray-200 hover:border-[#FF6B00] text-gray-700 font-bold rounded-xl text-center transition-all"
                                >
                                    INICIAR SESION
                                </Link>
                            </div>

                        </div>
                        {serverError && (
                            <div className="bg-red-50 text-red-600 p-4 mt-4 rounded-lg text-sm text-center font-semibold border border-red-100">
                                {serverError}
                            </div>
                        )}
                    </form>


                </div>
            </main>

            <footer className="py-8 text-center bg-[#FF6B00] ">
                <p className="text-sm font-medium text-white">
                    © 2026 Anahuarket - Universidad Anáhuac Cancún
                </p>
            </footer>
        </div>
    );
}