"use client"
import Modal from "/src/components/modal";
import RiskForm from "/src/components/riskForm"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AppContext } from "/src/context/appContext";

const API = `${process.env.API_v2_URL}`

export default function Form ({ params }) {

    const router = useRouter();
    const { account } = useContext(AppContext);

    const [visibleModal, setVisibleModal] = useState(false);
    const [incident, setIncident] = useState();
    const config = {
        title: "Agregar incidencia",
        content: "Estás seguro que quieres agregar este incidente? Todos los datos serán guardados. Esta acción no puede ser deshecha.",
        okText: "Confirmar",
        cancelText: "Cancelar",
        className: "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
    }
    const onsave = (data) => {
        data.append("created_by", account?.email)
        setIncident(data)
        setVisibleModal(true)
    }
    const postIncident = async () => {
        let cookie = Cookies.get("currentUser")
        let user = JSON.parse(cookie)
        const res = await fetch(`${API}/incidentapi/`, {
            method: 'POST',
            headers: { "Authorization": `Bearer ${user.access}` },
            body: incident
        })
        if (res.status == 201) {
            router.push(`/dashboard/proyectos/${params.pid}/incidencia`)
        }
    }
    return (
            <div>
                { router?.query?.id }
                { visibleModal && <Modal cancel={() => setVisibleModal(false)} ok={postIncident} config={config}></Modal> }
                <RiskForm save={onsave} cancel={() => router.back()}></RiskForm>
            </div>
        )
}