export default function Footer () {
    const year = new Date().getFullYear();

    return (
        <footer className='flex flex-col pb-8 px-4 jusitfy-center'>
          <div className='self-center py-4'>
            <p className='text-neutral-950 text-4xl font-extrabold'>Bteno.</p>
          </div>
          <div className='self-center'>
            <p>© { year } Bteno - Eneru Technology - Todos los derechos reservados.</p>
          </div>
        </footer>
    )
}