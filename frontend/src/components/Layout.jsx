import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-4 space-y-4">
        <h1 className="text-2xl font-bold">Sistema de Evaluaciones</h1>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="hover:bg-blue-700 p-2 rounded">Inicio</Link>
          <Link to="/ciclos" className="hover:bg-blue-700 p-2 rounded">Ciclos Evaluativos</Link>
          <Link to="/grupos" className="hover:bg-blue-700 p-2 rounded">Grupos Evaluativos</Link>
          <Link to="/modelos" className="hover:bg-blue-700 p-2 rounded">Modelos Evaluativos</Link>
          <Link to="/cargos" className="hover:bg-blue-700 p-2 rounded">Cargos</Link>
          <Link to="/colaboradores" className="hover:bg-blue-700 p-2 rounded">Colaboradores</Link>
          <Link to="/cuestionarios" className="hover:bg-blue-700 p-2 rounded">Cuestionarios</Link>
          <Link to="/evaluaciones" className="hover:bg-blue-700 p-2 rounded">Evaluaciones</Link>
          <Link to="/respuestas" className="hover:bg-blue-700 p-2 rounded">Respuestas</Link>
          <Link to="/reportes" className="hover:bg-blue-700 p-2 rounded">Reportes / Calificaciones</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}