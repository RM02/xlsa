"use client"
import { AppContext } from "/src/context/appContext"
import { useContext } from "react"


export default function () {
    
    const { account } = useContext(AppContext);

    return (
        <div className="container p-6">
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-full border border-neutral-200 bg-white rounded-md dark:bg-neutral-800 dark:border-gray-600 dark:text-neutral-400">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                        <h1 className="text-base text-sm sm:text-md font-semibold dark:text-neutral-400">
                            Credenciales
                        </h1>
                    </div>
                    <div className="p-6">
                        <div className="columns-4 space-x-6 mb-4">
                            <div className="flex col-2 text-sm sm:text-md">Email</div>
                            <div className="text-sm sm:text-md"> { account?.email } </div>
                        </div>
                        <div className="columns-4 space-x-6 mb-4">
                            <div className="flex col-2 text-sm sm:text-md">Usuario</div>
                            <div className="text-sm sm:text-md"> { account?.username } </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-full border border-neutral-200 bg-white rounded-md dark:bg-neutral-800 dark:border-gray-600">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                        <h1 className="text-base text-sm sm:text-md font-semibold dark:text-neutral-400">
                            Perfil
                        </h1>
                    </div>
                    <div className="p-6">
                        <div className="columns-4 space-x-6 mb-4">
                            <div className="flex col-2 text-sm sm:text-md dark:text-neutral-400">Nombre</div>
                            <div className="text-sm sm:text-md"> { account?.first_name } </div>
                        </div>
                        <div className="columns-4 space-x-6 mb-4">
                            <div className="flex col-2 text-sm sm:text-md dark:text-neutral-400">Apellido</div>
                            <div className="text-sm sm:text-md"> { account?.last_name } </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}