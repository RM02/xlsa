"use client"
import { AppContext } from "/src/context/appContext";
import { useContext, useEffect, useState } from "react"

export default function Profile ({ params }) {
    
    const API = process.env.API_v1_URL;

    const { account, token } = useContext(AppContext);
    const [user, setData] = useState();

    const getUser = async (id) => {
        const response = await fetch(`${API}/users/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        const user = await response.json();
        setData(user)
    }
    useEffect(() => {
        if (params?.id) {
            getUser(params.id)
        }
    }, [])
    return (
        <div className="container p-6">
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-full bg-white rounded-md">
                        <div className="p-6 border-b border-gray-100">
                            <h1 className="text-base text-md font-semibold">
                                Información Personal
                            </h1>
                        </div>
                        <div className="p-6">
                            <div className="columns-4 space-x-6 mb-4">
                                <div className="flex col-2">Nombre</div>
                                <div> { user?.first_name } </div>
                            </div>
                            <div className="columns-4 space-x-6 mb-4">
                                <div className="flex col-2">Apellido</div>
                                <div> { user?.last_name } </div>
                            </div>
                            <div className="columns-4 space-x-6 mb-4">
                                <div className="flex col-2">Correo</div>
                                <div> { user?.email } </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full bg-white rounded-md">
                        <div className="p-6 border-b border-gray-100">
                            <h1 className="text-base text-md font-semibold">
                                Información Adicional
                            </h1>
                        </div>
                        <div className="p-6">
                            <div className="columns-4 space-x-6 mb-4">
                                <div className="flex col-2">Dirección</div>
                                <div className=""> { account?.address } </div>
                            </div>
                            <div className="columns-4 space-x-6 mb-4">
                                <div className="flex col-2">Telefono</div>
                                <div> { account?.primary_phone_number } </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full bg-white rounded-md">
                        <div className="p-6 border-b border-gray-100">
                            <h1 className="text-base text-md font-semibold">
                                Información Laboral
                            </h1>
                        </div>
                        <div className="p-6">
                            <div className="columns-4 space-x-6 mb-4">
                                <div className="flex col-2">Role</div>
                                <div className=""> { account?.position } </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}