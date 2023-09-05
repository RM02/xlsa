"use client"
import Modal from "@/components/modal";
import ListComponent from "@/components/usersList"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import { useQRCode } from 'next-qrcode';
import { AppContext } from "@/context/appContext";

const API = `${process.env.API_v2_URL}/incidentapi`

export default function Riesgos ({ params }) {
    
    const { Canvas } = useQRCode();

    const { token } = useContext(AppContext);

    const [data, setData] = useState();

    const router = useRouter()

    const [visibleModal, setVisibleModal] = useState(false);
    const [showTicket, setShowTicket] = useState(false);

    const [rowData, setRowData] = useState();
    const [config, setConfig] = useState();
    const [mode, setMode] = useState("list");

    const tableConfig = {
        table: [
          {
              label: '#',
              visible: true,
              key: 'id'
          },
          {
              label: 'Incidente',
              visible: true,
              key: 'incident'
          },
          {
            label: 'Estado',
            visible: true,
            key: 'status'
          },
          {
              label: 'Descripción',
              visible: true,
              key: 'description'
          },
          {
            label: 'Fecha de creación',
            visible: true,
            key: 'created_date'
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
          title: "Eliminar",
          content: "Estás seguro que quieres eliminar este incidente? Todos los datos serán removidos permanentemente. Esta acción no puede ser deshecha.",
          okText: "Eliminar",
          cancelText: "Cancelar",
          className: "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        },
        {
          title: "Agregar",
          content: "Estás seguro que quieres agregar este incidente? Todos los datos serán removidos permanentemente. Esta acción no puede ser deshecha.",
          okText: "Confirmar",
          cancelText: "Cancelar",
          className: "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
        },
        {
          title: "Editar",
          content: "Estás seguro que quieres editar esta cuenta? Todos los datos serán guardados permanentemente. Esta acción no puede ser deshecha.",
          okText: "Confirmar",
          cancelText: "Cancelar",
          className: "inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
        }
      ]

    const getData = async () => {
        let response = await fetch(API, { method: 'GET', headers: { "Authorization": `Bearer ${token}` } })

        return response
    }

    const handleRisk = async () => {
        const response = await getData()
        const data = await response.json()
        setData(data)
    }

    const onRemove = (row) => {
        setMode("delete")
        setRowData(row)
        setVisibleModal(true)
        setConfig(modalConfig[0])
    }
    
    const deleteIncident = async (id) => {
        const response = await fetch(`${API}/${id}`, { method: 'DELETE', headers: { "Authorization": `Bearer ${token}` } })
        return response
    }
    const handleModal = async () => {
        switch (mode) {
          case 'edition':
            break
          case 'add':
            break
          case 'delete':
            await deleteIncident(rowData.id)
            break
        }
        setVisibleModal(false)
        await handleRisk()
    }
    const onToolbar = (event) => {
      switch(event) {
        case 'add':
          router.push(`/dashboard/proyectos/${params.pid}/incidencia/form`)
        default:
          break
      }
    }
    const onsearch = async (query) => {
      if (query) {
        let url = new URL(API)
        url.searchParams.append("search", query)
  
        let response = await fetch(url, { method: 'GET', headers: { "Authorization": `Bearer ${token}` } })
        const data = await response.json()
        setData(data)
      } else {
        await handleRisk()
      }
    }
    const onedit = (data) => {
      router.push(`/dashboard/proyectos/${params.pid}/incidencia/form/${data.id}`)
    }
    const show = (data) => {
      router.push(`http://${window.location.hostname}:3000/dashboard/proyectos/${params.pid}/incidencia/${data.id}/`)
    }
    const getUrl = () => {
      return `http://${window.location.hostname}:3000/dashboard/incidencia/${rowData.id}/`
    }
    const ticketElement = () => {
      function ok () {

      }
      function cancel () {
        setShowTicket(false)
      }
      return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10">
              <div className="flex min-h-full items-end justify-center py-6 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                  <div className="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM4 3 3 2M2 7H1m15-4 1-1m1 5h1M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z"/>
                          </svg>
                      </div> */}
                      
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <p className="text-sm text-gray-500 flex justify-end">Código # {rowData.id}</p>
                      <h3 className="text-base mt-4 font-semibold leading-6 text-gray-900" id="modal-title">Incidente</h3>
                      <div className="mt-2">
                          <p className="text-sm text-gray-500">{rowData.incident}</p>
                          <hr></hr>
                          <br></br>
                          <div className="text-sm text-gray-500">
                            <p className="text-sm font-semibold text-gray-500">Creado por</p>
                            <p className="text-sm text-gray-500">{rowData.created_by}</p>
                          </div>
                          <hr></hr>
                          <br></br>
                          <div className="text-sm text-gray-500">
                            <p className="text-sm font-semibold text-gray-500">Fecha</p>
                            <p className="text-sm text-gray-500">{rowData.created_date}</p>
                          </div>

                      </div>
                      <div className="my-4 py-6 flex items-center">
                        <Canvas
                            text={getUrl(rowData.id)}
                            options={{
                              level: 'M',
                              margin: 3,
                              scale: 4,
                              width: 200,
                              color: {
                                dark: '#000',
                                light: '#fff',
                              },
                            }}
                          />
                      </div>
                      </div>
                  </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button onClick={() => ok()} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">Ok</button>
                  <button onClick={() => cancel()} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                  </div>
              </div>
              </div>
          </div>
        </div>
      )
    }
    useEffect(() => {
      if (token) {
        handleRisk()
      }
    },[token])
    return (
        <div className="p-6 self-centercd">
            { showTicket && ticketElement() }
            { visibleModal && <Modal cancel={() => setVisibleModal(false)} config={config} ok={handleModal}></Modal> }
            <ListComponent show={show} edit={onedit} data={data} config={tableConfig} remove={onRemove} onButtonClick={onToolbar} onsearch={onsearch}></ListComponent>
        </div>
    )
}