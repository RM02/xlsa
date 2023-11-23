"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { AppContext } from "../../../context/appContext";

export default function () {

    
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        mode: 'onChange'
    })

    const { createUser, login } = useContext(AppContext)

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, SetPass] = useState()
    const [confirm, setConfirm] = useState()
    const [isConfirmed, setIsConfirmed] = useState(false)
    
    const router = useRouter()

    const submit = async () => {
        const response = await createUser(name, email, password)
        if (response.ok) {
            await login(email, password)
            router.push("/dashboard/org/nuevo")
        }
    }

    return (
        <section className="flex flex-col bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-100 to-teal-100">

            <form onSubmit={handleSubmit(submit)} action="#" method="POST" className="flex flex-col self-center lg:w-2/5 w-3/4 bg-white sm:p-16 p-12 rounded-[2rem] my-20 md:mx-4 sm:mx-10 mx-2 space-y-4 border border-neutral-200">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-neutral-900">Crear Cuenta</h1>
                    <p className="text-xl text-neutral-600 py-4">Al crear una cuenta, aceptas nuestros terminos y <Link href={"/politicas/politicas-privacidad"} className="font-bold">politicas de privacidad.</Link></p>
                </div>
                <div className="pt-8 justify-end">
                    <div className="py-2">
                        <input placeholder="Nombre" onChange={(e) => setName(e.target.value)} className="px-4 py-4 w-full border border-neutral-200 rounded-md hover:bg-neutral-100"/>
                    </div>
                    <div className="py-2">
                        <input onChange={(e) => setEmail(e.target.value)} className="px-4 py-4 w-full border border-neutral-200 rounded-md hover:bg-neutral-100" placeholder="Correo"/>
                    </div>
                    <div className="py-2">
                        <input onChange={(e) => SetPass(e.target.value)} className="px-4 py-4 w-full border border-neutral-200 rounded-md hover:bg-neutral-100" placeholder="Contraseña"/>
                    </div>
                    <div className="py-2">
                        <input onChange={(e) => setConfirm(e.target.value)} className="px-4 py-4 w-full border border-neutral-200 rounded-md hover:bg-neutral-100" placeholder="Confirmar contraseña"/>
                    </div>
                </div>

                <div className="flex text-xl text-neutral-600 space-x-4">
                    <div className="self-center">
                        <input onInput={(value) => setIsConfirmed(value) } id="disabled-checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div>
                        <p>Aceptar términos y politicas de privacidad.</p>
                    </div>
                </div>
                <div className="flex flex-col py-2">
                    <button disabled={!isConfirmed} type="submit" className="bg-neutral-900 text-neutral-50 px-4 py-2 rounded-md font-semibold">
                        Crear
                    </button>
                </div>
                <div className="self-center">
                    <div className="self-center">
                        <p className="text-neutral-600 text-md">Ya tienes una cuenta? <Link href="/auth" className="mx-6 font-bold text-neutral-900">Ingresar</Link> </p>
                    </div>
                </div>
            </form>
        </section> 
    )
}