"use client"

import { useRouter } from "next/navigation"


export default function Projects () {
    
    const router = useRouter();

    return (
        <div className="mx-auto p-6">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-full my-2 lg:my-6">
                    <button className="border-gray-800 bg-neutral-800 text-neutral-200 flex items-center justify-center rounded-lg gap-x-2.5 p-2 font-medium hover:bg-gray-700 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Nuevo
                    </button>
                </div>
                <div className="col-span-full md:col-span-3 lg:col-span-2 mb-4">
                            <div class="rounded overflow-hidden shadow-lg bg-white border-gray-600">                                                    
                                <div class="flex flex-col p-4">
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <a href={"/dashboard/proyectos/xlsa/incidencia"} onClick={() => router.push("/dashboard/proyectos/xlsa/incidencia") }>
                                                <p className="text-md font-semibold text-neutral-600">Programa PDVSA</p>
                                            </a>
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-neutral-400">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                    <div className="flex flex-col font-bold text-xl mb-2">
                                        <div class="mt-2">
                                            <p className="font-normal text-sm text-neutral-400">Programa seguridad ocupacional</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                </div>
                <div className="col-span-full md:col-span-3 lg:col-span-2 mb-4">
                            <div class="rounded overflow-hidden shadow-lg bg-white border-gray-600">                                                    
                                <div class="flex flex-col p-4">
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <a href={"/dashboard/proyectos/xlsa/incidencia"} onClick={() => router.push("/dashboard/proyectos/xlsa/incidencia") }>
                                                <p className="text-md font-semibold text-neutral-600">Programa PDVSA</p>
                                            </a>
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-neutral-400">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                    <div className="flex flex-col font-bold text-xl mb-2">
                                        <div class="mt-2">
                                            <p className="font-normal text-sm text-neutral-400">Programa seguridad ocupacional</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
        </div>
    )
}