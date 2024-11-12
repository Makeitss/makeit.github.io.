import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('assets/img/fondo.jpg')"}}>
      <nav className="bg-black bg-opacity-80 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src="assets/img/logo.png" alt="Logo de Make It" className="h-10 mr-2" />
            <span className="text-xl font-bold">Make It</span>
          </a>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-gray-300">HOME</a>
            <a href="https://api.whatsapp.com/send?phone=+573112329431&text=Hola%20Boutique%20Movil%20vengo%20de%20tu%20tarjeta%20digital" target="_blank" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">Contáctanos</a>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-80 py-2">
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">HOME</a>
            <a href="https://api.whatsapp.com/send?phone=+573112329431&text=Hola%20Boutique%20Movil%20vengo%20de%20tu%20tarjeta%20digital" target="_blank" className="block px-4 py-2 hover:bg-gray-700">Contáctanos</a>
          </div>
        )}
      </nav>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-white bg-opacity-50 p-6 rounded-lg shadow mb-8 md:mb-0 md:mr-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Agregar Tarea</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="task-name" className="block mb-2">Nombre de la tarea:</label>
                <input type="text" id="task-name" className="w-full p-2 rounded bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" placeholder="Type here..." />
              </div>
              <div className="mb-4">
                <label htmlFor="task-time" className="block mb-2">Tiempo estimado (horas):</label>
                <input type="number" id="task-time" className="w-full p-2 rounded bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" min="0" step="1" required placeholder="Type here..." />
              </div>
              <div className="mb-4">
                <label htmlFor="task-deadline" className="block mb-2">Fecha de entrega:</label>
                <input type="date" id="task-deadline" className="w-full p-2 rounded bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Agregar</button>
            </form>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Agregar Actividad</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="activity-name" className="block mb-2">Nombre de la actividad:</label>
                <input type="text" id="activity-name" className="w-full p-2 rounded bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" placeholder="Type here..." />
              </div>
              <div className="mb-4">
                <label htmlFor="activity-time" className="block mb-2">Tiempo semanal (horas):</label>
                <input type="number" id="activity-time" className="w-full p-2 rounded bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" min="0" step="1" required placeholder="Type here..." />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Agregar</button>
            </form>
          </section>
        </aside>
        <main className="w-full md:w-2/3 lg:w-3/4 bg-white bg-opacity-40 p-6 rounded-lg shadow">
          <section>
            <h2 className="text-2xl font-bold mb-4">Distribución de Tiempo</h2>
            <div id="task-list" className="mb-4">
              {/* Aquí se mostrarían las tareas dinámicamente */}
            </div>
            <p id="available-time" className="font-bold">
              {/* Aquí se mostraría el tiempo disponible */}
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}