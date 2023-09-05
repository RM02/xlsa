export default function Expire () {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto">
                <h1>Su sessión ha expirado, por favor <a href="/auth" className="text-blue-500">click</a> para volver a ingresar.</h1>            
            </div>
        </div>
    )
}