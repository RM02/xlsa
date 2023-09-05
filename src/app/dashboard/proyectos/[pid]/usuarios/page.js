"use client";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Cookies from 'js-cookie';

import UserList from "@/components/usersList"
import Modal from "@/components/modal";
import UserForm from "@/components/userForm";

const API = process.env.API_v1_URL;

export default function Usuarios ({ params }) {

    const [userData, setUserData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [visibleModal, setVisibleModal] = useState(false);
    const [rowData, setRowData] = useState();
    const [user, setUser] = useState();
    const [mode, setMode] = useState("users");
    const [visibleForm, setVisibleForm] = useState(false);
    const [config, setConfig] = useState();

    const userConfig = {
      table: [
        {
            label: '#',
            visible: true,
            key: 'id'
        },
        {
          label: 'Nombre',
          visible: true,
          key: 'first_name'
        },
        {
          label: 'Correo',
          visible: true,
          key: 'email'
        },
        {
          label: 'Usuario',
          visible: true,
          key: 'username'
        },
        {
            label: 'DNI',
            visible: true,
            key: 'dni'
        },
        {
            label: 'Apellido',
            visible: true,
            key: 'last_name'
        },
        {
            label: 'Correo',
            visible: true,
            key: 'email'
        },
        {
            label: 'Rol',
            visible: true,
            key: 'position'
        }
      ],
      toolbar: [
        {
          label: 'Nuevo',
          key: 'add'
        },
      ]
    }
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

    const router = useRouter()

    const getUserData = async () => {
        let cookie = Cookies.get("currentUser")
        let user = JSON.parse(cookie)
        let response = await fetch(`${API}/users/`, { method: 'GET', headers: { "Authorization": `Bearer ${user.access}` } })
        return response
      }
      const handleStatus = async (status) => {
        switch(status) {
          case 201:
          case 204:
            break
          case 401:
          case "Unauthorized":
            router.push("/auth/expire")
            break
          default:
            return
        }
      }
    const handleUser = async () => {
      setLoading(true)
      const res = await getUserData()
      await handleStatus(res.status)
      const data = await res.json()
      setUserData(data)
      setLoading(false)
    }
    const deleteUser = async () => {
      let cookie = Cookies.get("currentUser")
      let user = JSON.parse(cookie)
      const res = await fetch(`${API}/users/${rowData.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${user.access}` }
      })
      handleStatus(res.status)
    }
    const ondelete = async (row) => {
      setVisibleModal(true)
      setMode("delete")
      setRowData(row)
      setConfig(modalConfig[0])
    }
    const handleModal = async () => {
      switch (mode) {
        case 'edition':
          await edit(user)
          setVisibleForm(false)
          break
        case 'add':
          await add(user)
          setVisibleForm(false)
          break
        case 'delete':
          await deleteUser(rowData.id)
          break
      }
      setVisibleModal(false)
      await handleUser()
    }
    const onButtonClick = (event) => {
      switch(event) {
        case  'add':
          return router.push("/dashboard/proyectos/xlsa/usuarios/form")
        default:
          break
      }
    }
    const edition = (row) => {
      setMode("edition")
      setVisibleForm(true)
      setRowData(row)
      setConfig(modalConfig[2])
    }
    const cancel = () => {
      setVisibleForm(false)
      setMode("users")
    }
    const save = async (data) => {
      setVisibleModal(true)
      setUser(data)
    }
    const add = async (user) => {
      let url = new URL(`${API}/users/`)
      let cookie = Cookies.get("currentUser")
      let currentUser = JSON.parse(cookie)
      let response = await fetch(url, { method: 'POST', headers: { "Authorization": `Bearer ${currentUser.access}` }, body: user })
      await handleStatus(response.status)
    }
    const edit = async (user) => {
      let url = new URL(`${API}/users/${rowData.id}/`)
        
      let cookie = Cookies.get("currentUser")
      let currentUser = JSON.parse(cookie)

      let response = await fetch(url, { method: 'PUT', headers: { "Authorization": `Bearer ${currentUser.access}` }, body: user })
      await handleStatus(response.status)
    }
    const onsearch = async (query) => {
      if (query) {
        let url = new URL(`${API}/users/`)
        url.searchParams.append("search", query)
  
        let cookie = Cookies.get("currentUser")
        let user = JSON.parse(cookie)
        let response = await fetch(url, { method: 'GET', headers: { "Authorization": `Bearer ${user.access}` } })
        await handleStatus(response.status)
        const data = await response.json()
        setUserData(data)
      } else {
        await handleUser()
      }
    }
    const profile = (user) => {
      router.push(`/dashboard/proyectos/${params.pid}/usuarios/${user.id}`)
    }
    useEffect(() => {
      handleUser()
    }, [])

    return (
      <div className="p-6">
        
        { visibleModal && <Modal cancel={() => setVisibleModal(false)} config={config} ok={handleModal}></Modal> }
        
        { !visibleForm && <UserList data={userData} show={profile} config={userConfig} remove={ondelete} onButtonClick={onButtonClick} edit={edition} onsearch={onsearch}></UserList> }
        
        { visibleForm && <UserForm user={rowData} cancel={cancel} mode={mode} save={save}></UserForm> }
      </div>
    )
}