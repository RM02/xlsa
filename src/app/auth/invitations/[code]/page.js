"use client"
import { useEffect, useState } from "react"

export default function Invitation ({ params }) {
    
    const [invitation, setInv] = useState()
    const [user, setUser] = useState()

    const getInvitation = async (code) => {
        const response = await fetch(`${process.env.API_v1_URL}/invitations/${code}`, {
            method: "GET"
        })
        if (response.ok) {
            const data = await response.json()
            setInv(data)
            await getUser(data.created_by)
        }

    }
    const getUser = async (query) => {

        const url = new URL(`${process.env.API_v1_URL}/users`)
        url.searchParams.append("search", query)

        const response = await fetch(url)

        if (response.ok) {
            const user = await response.json();
            setUser(user?.results?.['0'])
        }
    }
    useEffect(() => {
        getInvitation(params?.code)
    }, [])
    return (
        <section className="flex flex-col bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-100 to-teal-100">

            <form action="#" method="POST" className="flex flex-col self-center w-2/4 bg-white p-8 rounded-[2rem] my-20 mx-10 space-y-4 border border-neutral-200">
                <div className="h-28 space-y-2">
                    <h1 className="text-2xl font-extrabold text-neutral-900"> {user?.first_name} te ha invitado a unirte a Bteno</h1>
                    <p className="text-xl text-neutral-600">Al aceptar unirte, aceptas nuestros terminos y politicas de privacidad.</p>
                </div>
                <div className="py-8 justify-end">
                    <div className="py-2">
                        <input placeholder="Nombre" className="px-4 py-4 w-full border border-neutral-200 rounded-md hover:bg-neutral-100"/>
                    </div>
                    <div className="py-2">
                        <input className="px-4 py-4 w-full border border-neutral-200 rounded-md hover:bg-neutral-100" placeholder="Correo"/>
                    </div>
                    <div className="py-2">
                        <input className="px-4 py-4 w-full border border-neutral-200 rounded-md hover:bg-neutral-100" placeholder="Contraseña"/>
                    </div>
                    <div className="py-2">
                        <input className="px-4 py-4 w-full border border-neutral-200 rounded-md hover:bg-neutral-100" placeholder="Confirmar contraseña"/>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-neutral-900 text-neutral-50 px-4 py-2 rounded-md font-semibold">
                        Aceptar
                    </button>
                </div>
            </form>
        </section> 
    )
}