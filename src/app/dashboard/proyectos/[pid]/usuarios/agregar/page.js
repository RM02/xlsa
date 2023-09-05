"use client"
import AddUser from "@/components/userForm";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Agregar () {
    
    const router = useRouter();
    const [visibleModal, setVisibleModal] = useState(false);
    const [data, setData] = useState();
    const config = {
        title: "Agregar usuario",
        content: "Estás seguro que quieres agregar esta cuenta? Todos los datos serán removidos permanentemente. Esta acción no puede ser deshecha.",
        okText: "Confirmar",
        cancelText: "Cancelar",
        className: "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
    }
    const save = async () => {
        let cookie = Cookies.get("currentUser")
        let user = JSON.parse(cookie)

        const res = await fetch("http://192.168.0.203:8000/users/", {
            method: "POST",
            headers: { "Authorization": `Bearer ${user.access}` },
            body: data
        })
        if (res.status == 201) {
            router.push("/dashboard/usuarios")
        }
    }
    const handleAdd = (data) => {
        setVisibleModal(true)
        setData(data)
    }
    return (
        <div>
            { visibleModal && <Modal cancel={() => setVisibleModal(false)} ok={save} config={config}></Modal> }
            <AddUser save={handleAdd}></AddUser>
        </div>
    )
}