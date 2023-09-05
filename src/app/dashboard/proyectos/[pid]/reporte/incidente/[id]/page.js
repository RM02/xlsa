import IncidentDetail from "../../../incidencia/[id]/page";

export default function ({ params }) {
    return (
        <div className="ml-20 max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="flex bg-white p-4 justify-between">
                <p className="text-xl font-bold text-neutral-900">Reporte</p>
            </div>
            <div>
                <IncidentDetail params={params} hideHeader={false}></IncidentDetail>
            </div>
        </div>
    )
}