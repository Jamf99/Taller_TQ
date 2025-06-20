import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import DashboardPage from './pages/DashBoardPage';
import CiclosPage from './pages/CiclosPage';
import GruposPage from './pages/GruposPage';
import ModelosPage from './pages/ModelosPage';
import CargosPage from './pages/CargosPage';
import ColaboradoresPage from './pages/ColaboradoresPage';
import CuestionariosPage from './pages/CuestionariosPage';
import EvaluacionesPage from './pages/EvaluacionesPage';
import RespuestasPage from './pages/RespuestasPage';
import ReportesPage from './pages/ReportesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="ciclos" element={<CiclosPage />} />
        <Route path="grupos" element={<GruposPage />} />
        <Route path="modelos" element={<ModelosPage />} />
        <Route path="cargos" element={<CargosPage />} />
        <Route path="colaboradores" element={<ColaboradoresPage />} />
        <Route path="cuestionarios" element={<CuestionariosPage />} />
        <Route path="evaluaciones" element={<EvaluacionesPage />} />
        <Route path="respuestas" element={<RespuestasPage />} />
        <Route path="reportes" element={<ReportesPage />} />
      </Route>
    </Routes>
  );
}

export default App;