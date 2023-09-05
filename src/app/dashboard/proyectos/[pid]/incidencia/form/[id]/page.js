"use client"
import Modal from "@/components/modal";
import RiskForm from "@/components/riskForm";
import { AppContext } from "@/context/appContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const API = `${process.env.API_v2_URL}`

export default function Risk ({ params }) {

    const router = useRouter()

    const [visibleModal, setVisibleModal] = useState(false);
    const [incident, setIncident] = useState();
    const { account, token } = useContext(AppContext);

    const config = {
        title: "Editar incidencia",
        content: "Estás seguro que quieres editar este incidente? Todos los datos serán guardados. Esta acción no puede ser deshecha.",
        okText: "Confirmar",
        cancelText: "Cancelar",
        className: "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
    }

    const getOne = async (id) => {
        const response = await fetch(`${API}/incidentapi/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        setIncident(data)
    }
    const putRisk = async (incident) => {
        incident.append("updated_by", account.email)
        const response = await fetch(`${API}/incidentapi/${params.id}/`, {
            method: "PUT",
            headers: { 'Authorization': `Bearer ${token}` },
            body: incident
        })
        await response.json();
        return response
    }
    const onsave = async (data) => {
        setIncident(data)
        setVisibleModal(true)
    }
    const handleModal = async () => {
        const response = await putRisk(incident)
        response.ok ? router.push("/dashboard/riesgos") : setVisibleModal(false)
    }
    useEffect(() => {
        if (params) {
            getOne(params?.id)
        }
    }, [])
    return (
        <div>
            { visibleModal && <Modal config={config} ok={handleModal} cancel={() => setVisibleModal(false)}></Modal> }
            { incident && <RiskForm incident={incident} save={onsave} cancel={() => router.back()}></RiskForm> }
        </div>
    )
}