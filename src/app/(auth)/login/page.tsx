'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react";
import { checkUserVerifiedAction } from "@/features/auth/actions";
import Link from "next/link";
import { useState, Suspense } from "react";


type LoginFormValues = {
  email: string,
  password: string
}

function LoginContent() {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const errorParam = searchParams.get("error");

  const onSubmit = handleSubmit(async (data) =>{
    const check = await checkUserVerifiedAction(data.email);
    if (check.status === "not-verified") {
      router.push(`/verificar-correo?email=${encodeURIComponent(data.email)}`);
      return;
    }

    const resp = await signIn('credentials', {
      correo: data.email,
      contrasena: data.password,
      redirect: false
    });

    if (resp?.error) {
      if (resp.error === "no-verificado") {
        router.push(`/verificar-correo?email=${encodeURIComponent(data.email)}`);
        return;
      }
      setServerError("Correo o contraseña incorrectos");
    } else {
      router.push("/");
    }
  })

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <header className="py-10 bg-[#FF6B00] text-white text-center shadow-lg">
        <h1 className="text-4xl font-black tracking-tight">ANAHUARKET</h1>
        <p className="mt-2 text-orange-100 font-medium">INICIAR SESIÓN</p>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 bg-gray-700">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-gray-800">Bienvenid@ Prueba</h2>
            <p className="text-gray-500 mt-2">Ingresa tus credenciales para continuar</p>
          </div>

          {verified === "true" && (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm text-center font-semibold border border-green-100 mb-4">
              ¡Cuenta verificada! Ya puedes iniciar sesión.
            </div>
          )}
          {errorParam === "token-expirado" && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center font-semibold border border-red-100 mb-4">
              El link expiró. Solicita uno nuevo.
            </div>
          )}
          {errorParam === "token-invalido" && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm text-center font-semibold border border-red-100 mb-4">
              El link no es válido.
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
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
                placeholder="example@anahuac.mx"
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none transition-all text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Contraseña</label>
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: " La contraseña es necesaria"
                  }
                })}
                placeholder="*********"
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none transition-all text-gray-700"
              />
            </div>

            {(errors.email || errors.password || serverError) && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-semibold border border-red-100">
                {errors.email?.message || errors.password?.message || serverError}
              </div>
            )}

            <div className="flex flex-col gap-4 pt-4">
              { }
              <button
                type="submit"
                className="w-full py-4 bg-[#FF6B00] hover:bg-[#e66000] text-white font-black rounded-xl transition-all transform hover:scale-[1.02] shadow-xl text-center"
              >
                ENTRAR
              </button>

              <div className="relative flex py-3 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase font-bold">o</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <Link
                href="/register"
                className="w-full py-4 bg-white border-2 border-gray-200 hover:border-[#FF6B00] text-gray-700 font-bold rounded-xl text-center transition-all"
              >
                CREAR CUENTA
              </Link>
            </div>
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

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}