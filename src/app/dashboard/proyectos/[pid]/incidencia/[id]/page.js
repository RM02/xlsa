"use client"
import { AppContext } from "@/context/appContext"
import { useContext, useEffect, useState } from "react"
import { useQRCode } from 'next-qrcode';


export default function IncidentDetail ({ params, title, hideHeader }) {
    
    const { token } = useContext(AppContext);
    const [data, setData] = useState();
    const { Canvas } = useQRCode();

    const API = `${process.env.API_v2_URL}/incidentapi/${params.id}`
    
    const getUrl = () => {
        return `http://${window.location.hostname}:8080/dashboard/incidencia/${data?.id}/`
    }
    const getOne = async (id) => {
        const response = await fetch(API, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        if (response.ok) {
            const item = await response.json();
            setData(item)
        }

    }
    const formatter_date = (date) => {
        let d = new Date(date)
        return d.toLocaleDateString()
    }
    useEffect(() => {
        if (token) {
            getOne()
        }
    }, [token])
    return (
        <div className="container">
            <div className="flex flex-col">
                { 
                    hideHeader && <div className="sm:col-span-full">
                                    <div className="p-6 border-b border-gray-100">
                                        <h1 className="text-base sm:text-md text-sm font-semibold">
                                            { title ? title : "Registro Información Incidencia" }
                                        </h1>
                                    </div>
                                </div>
                }
                <div className="flex flex-col sm:flex-row p-6 sm:tex-md text-sm">
                    <div className="w-full sm:w-4/6 sm:px-6">
                        <div className="flex flex-col pb-4 sm:pb-0 sm:flex-row mb-4 space-y-2 border-b border-gray-100 sm:border-0">
                            <div className="font-semibold sm:w-2/4">
                                Código
                            </div>
                            <div className="sm:w-2/4">
                                { data?.id }
                            </div>
                        </div>
                        <div className="flex flex-col pb-4 sm:pb-0 sm:flex-row mb-4 space-y-2 border-b border-gray-100 sm:border-0">
                            <div className="font-semibold w-2/4">
                                Incidencia
                            </div>
                            <div className="w-2/4">
                                { data?.incident }
                            </div>
                        </div>

                        <div className="flex flex-col pb-4 sm:pb-0 sm:flex-row mb-4 space-y-2 border-b border-gray-100 sm:border-0">
                            <div className="font-semibold w-2/4">
                                Tipo
                            </div>
                            <div className="w-2/4">
                                { data?.incident_type }
                            </div>
                        </div>
                        <div className="flex flex-col pb-4 sm:pb-0 sm:flex-row mb-4 space-y-2 border-b border-gray-100 sm:border-0">
                            <div className="font-semibold w-2/4">
                                Reportado por
                            </div>
                            <div className="w-2/4">
                                { data?.created_by }
                            </div>
                        </div>

                        <div className="flex flex-col pb-4 sm:pb-0 sm:flex-row mb-4 space-y-2 border-b border-gray-100 sm:border-0">
                            <div className="font-semibold w-2/4">
                                Fecha de creación
                            </div>
                            <div className="sm:w-2/4">
                                { data?.created_date }
                            </div>
                        </div>

                        <div className="flex flex-col pb-4 sm:pb-0 sm:flex-row mb-4 space-y-2 border-b border-gray-100 sm:border-0">
                            <div className="font-semibold w-2/4">
                                Fecha de actualización
                            </div>
                            <div className="sm:w-2/4">
                                { data?.updated_date }
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-2/5 self-center mt-4 sm:mt-0">
                        <div className="flex justify-center mx-auto">
                            <Canvas
                            text={getUrl()}
                            options={{
                                errorCorrectionLevel: 'M',
                                margin: 3,
                                scale: 4,
                                width: 200,
                                color: {
                                    dark: '#000',
                                    light: '#fff',
                                },
                            }}
                            ></Canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}