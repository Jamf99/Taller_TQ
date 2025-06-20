import { useState, useEffect } from "react";
import axios from "axios";

export function useEvaluaciones() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [form, setForm] = useState({
    id: null,
    grupoEvaluativoId: "",
    colaboradorId: "",
    evaluadorId: "",
    fecha: ""
  });

  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

  useEffect(() => {
    fetchEvaluaciones();
    fetchGrupos();
    fetchColaboradores();
  }, []);

  const fetchEvaluaciones = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/evaluacion");
      setEvaluaciones(res.data);
    } catch (err) {
      console.error("Error al obtener evaluaciones", err);
    }
  };

  const fetchGrupos = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/grupoevaluativo");
      setGrupos(res.data);
    } catch (err) {
      console.error("Error al obtener grupos", err);
    }
  };

  const fetchColaboradores = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/colaborador");
      setColaboradores(res.data);
    } catch (err) {
      console.error("Error al obtener colaboradores", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGrupoChange = (e) => {
    const grupoId = e.target.value;
    const grupo = grupos.find((g) => g.id === parseInt(grupoId));
    setGrupoSeleccionado(grupo || null);

    setForm((prev) => ({
      ...prev,
      grupoEvaluativoId: grupoId,
      fecha: grupo ? grupo.fechaInicio.substring(0, 10) : ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.grupoEvaluativoId || !form.colaboradorId || !form.evaluadorId || !form.fecha) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (grupoSeleccionado) {
      const fecha = new Date(form.fecha);
      const inicio = new Date(grupoSeleccionado.fechaInicio);
      const fin = new Date(grupoSeleccionado.fechaFin);

      if (fecha < inicio || fecha > fin) {
        alert(`La fecha debe estar entre ${inicio.toISOString().substring(0, 10)} y ${fin.toISOString().substring(0, 10)}`);
        return;
      }
    }

    try {
      if (form.id) {
        await axios.put(`http://localhost:5046/api/evaluacion/${form.id}`, form);
      } else {
        await axios.post("http://localhost:5046/api/evaluacion", form);
      }
      fetchEvaluaciones();
      limpiarForm();
    } catch (err) {
      console.error("Error al guardar evaluación", err);
    }
  };

  const handleEdit = (evaluacion) => {
    const grupo = grupos.find((g) => g.id === evaluacion.grupoEvaluativoId) || null;
    setGrupoSeleccionado(grupo);

    setForm({
      id: evaluacion.id,
      grupoEvaluativoId: evaluacion.grupoEvaluativoId,
      colaboradorId: evaluacion.colaboradorId,
      evaluadorId: evaluacion.evaluadorId,
      fecha: evaluacion.fecha?.substring(0, 10)
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta evaluación?")) {
      try {
        await axios.delete(`http://localhost:5046/api/evaluacion/${id}`);
        fetchEvaluaciones();
      } catch (err) {
        console.error("Error al eliminar evaluación", err);
      }
    }
  };

  const handleCancel = () => {
    limpiarForm();
  };

  const limpiarForm = () => {
    setForm({
      id: null,
      grupoEvaluativoId: "",
      colaboradorId: "",
      evaluadorId: "",
      fecha: ""
    });
    setGrupoSeleccionado(null);
  };

  return {
    evaluaciones,
    grupos,
    colaboradores,
    form,
    grupoSeleccionado,
    handleChange,
    handleGrupoChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  };
}
