export default function Layout ({children}) {
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                        <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img>
                        </div>
                    </div>
                    </div>
                </div>
            </nav>
        
            <main>
                <div>
                    { children }
                </div>
            </main>
        </div>
    )
}