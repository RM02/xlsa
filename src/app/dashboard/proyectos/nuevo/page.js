"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function () {
    const [organization, setOrg] = useState()
    const [name, setname] = useState()
    const router = useRouter();

    const save = async () => {
        const project = new FormData();
        project.append("data", JSON.stringify({ name, organization }))
        const response = await fetch("http://localhost:8003/projectapi/", {
            method: 'POST',
            body: project
        })
        const data = await response.json()
        if (response.ok) {
            router.push("/dashboard/proyectos")
        }
    }
    return (
        <div className="flex py-12 sm:p-20 justify-center">
            <div className="bg-white border border-neutral-200 w-3/4">
                <div className="flex flex-col bg-white border-b border-neutral-200 p-4 px-6">
                    <p className="font-extrabold text-md text-neutral-600 w-full">Programa de seguridad laboral (PSST)</p>
                    <p className="font-medium text-md text-neutral-600 my-2">Este proyecto solo tiene una instancia. La información es distribuida a los integrantes de este espacio.</p>
                </div>
                <div className="sm:flex sm:flex-row justify-between bg-white border-b border-neutral-200 p-4 px-6">
                    <div>
                        <p className="font-medium text-md text-neutral-600 py-2">Nombre del proyecto</p>
                    </div>
                    <div className="flex flex-cols w-3/4 h-12 self-center space-x-2">
                        <input className="border border-neutral-200 rounded-lg w-full p-2" onChange={(e) => setname(e.target.value)}></input>
                    </div>
                </div>
                <div className="sm:flex sm:flex-row justify-between bg-white border-b border-neutral-200 p-4 px-6">
                    <div>
                        <p className="font-medium text-md text-neutral-600 py-2">Puestos de trabajos</p>
                    </div>
                    <div className="flex flex-cols w-3/4 h-12 self-center space-x-2">
                        <input className="border border-neutral-200 rounded-lg w-full p-2" onChange={(e) => setname(e.target.value)}></input>
                    </div>
                </div>
                <div className="sm:flex sm:flex-row justify-between bg-white border-b border-neutral-200 p-4 px-6">
                    <div>
                        <p className="font-medium text-md text-neutral-600 py-2">Politicas de seguridad</p>
                    </div>
                    <div className="flex flex-cols w-3/4 h-12 self-center space-x-2">
                        <input className="border border-neutral-200 rounded-lg w-full p-2" onChange={(e) => setname(e.target.value)}></input>
                    </div>
                </div>
                <div className="flex flex-row justify-between p-4">
                    <div>
                        <button className="border rounded-lg border-neutral-200 px-4 py-2">Cancelar</button>
                    </div>
                    <div>
                        <button onClick={() => save()} className="bg-neutral-900 text-neutral-50 rounded-lg px-4 py-2 font-extrabold">Crear proyecto</button>
                    </div>
                </div>
            </div>
        </div>
    )
}