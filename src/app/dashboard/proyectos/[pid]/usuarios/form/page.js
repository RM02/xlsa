"use client"
import Modal from "@/components/modal"
import UserForm from "@/components/userForm"
import { AppContext } from "@/context/appContext"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


const API_v1_URL = process.env.API_v1_URL;

export default function Form ({params}) {
    
    const { token } = useContext(AppContext);
    const router = useRouter();

    const [user, setData] = useState()
    const [visibleModal, setModal] = useState(false)
    const [config, setConfig] = useState(false)


    const modalConfig= [
        {
          title: "Eliminar usuario",
          content: "Estás seguro que quieres eliminar esta cuenta? Todos los datos serán removidos permanentemente. Esta acción no puede ser deshecha.",
          okText: "Eliminar",
          cancelText: "Cancelar",
          className: "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        },
        {
          title: "Agregar usuario",
          content: "Estás seguro que quieres agregar esta cuenta? Todos los datos serán removidos permanentemente. Esta acción no puede ser deshecha.",
          okText: "Confirmar",
          cancelText: "Cancelar",
          className: "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
        },
        {
          title: "Editar usuario",
          content: "Estás seguro que quieres editar esta cuenta? Todos los datos serán guardados permanentemente. Esta acción no puede ser deshecha.",
          okText: "Confirmar",
          cancelText: "Cancelar",
          className: "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
        }
      ]

    const onsave = (model) => {
        setData(model)
        setModal(true)
    }
    const add = async () => {
        const response = await fetch(`${API_v1_URL}/users/`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: user
        })
        const data = await response.json()
        if (response.ok) {
            router.push(`/dashboard/proyectos/${params.pid}/usuarios`)
        }
      }
    useEffect(() => {
        params?.id ? setConfig(modalConfig[2]) : setConfig(modalConfig[1])
    }, [params])
    return (
        <div>
            { visibleModal && <Modal cancel={() => setModal(false)} config={config} ok={add}></Modal>}
            <UserForm save={onsave} cancel={() => router.back()}></UserForm>
        </div>
    )
}