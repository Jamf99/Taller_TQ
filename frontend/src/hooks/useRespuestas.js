import { useState, useEffect } from "react";
import axios from "axios";

export function useRespuestas() {
  const [respuestas, setRespuestas] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [cuestionarios, setCuestionarios] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    evaluacionId: "",
    cuestionarioId: "",
    calificacion: "",
    comentario: ""
  });

  useEffect(() => {
    fetchRespuestas();
    fetchEvaluaciones();
    fetchCuestionarios();
    fetchColaboradores();
    fetchGrupos();
  }, []);

  const fetchRespuestas = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/respuesta");
      setRespuestas(res.data);
    } catch (err) {
      console.error("Error al obtener respuestas", err);
    }
  };

  const fetchEvaluaciones = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/evaluacion");
      setEvaluaciones(res.data);
    } catch (err) {
      console.error("Error al obtener evaluaciones", err);
    }
  };

  const fetchCuestionarios = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/cuestionario");
      setCuestionarios(res.data);
    } catch (err) {
      console.error("Error al obtener cuestionarios", err);
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

  const fetchGrupos = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/grupoevaluativo");
      setGrupos(res.data);
    } catch (err) {
      console.error("Error al obtener grupos", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.evaluacionId || !form.cuestionarioId || form.calificacion === "") {
      alert("Todos los campos son obligatorios excepto el comentario");
      return;
    }
    if (form.calificacion < 1 || form.calificacion > 5) {
      alert("La calificación debe estar entre 1 y 5");
      return;
    }
    try {
      if (form.id) {
        await axios.put(`http://localhost:5046/api/respuesta/${form.id}`, form);
      } else {
        await axios.post(`http://localhost:5046/api/respuesta`, form);
      }
      fetchRespuestas();
      limpiarForm();
    } catch (err) {
      console.error("Error al guardar respuesta", err);
    }
  };

  const handleEdit = (respuesta) => {
    setForm({
      id: respuesta.id,
      evaluacionId: respuesta.evaluacionId,
      cuestionarioId: respuesta.cuestionarioId,
      calificacion: respuesta.calificacion,
      comentario: respuesta.comentario
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta respuesta?")) {
      try {
        await axios.delete(`http://localhost:5046/api/respuesta/${id}`);
        fetchRespuestas();
      } catch (err) {
        console.error("Error al eliminar respuesta", err);
      }
    }
  };

  const handleCancel = () => {
    limpiarForm();
  };

  const limpiarForm = () => {
    setForm({
      id: null,
      evaluacionId: "",
      cuestionarioId: "",
      calificacion: "",
      comentario: ""
    });
  };

  const cuestionariosFiltrados = () => {
    const evaluacion = evaluaciones.find((e) => e.id === parseInt(form.evaluacionId));
    if (!evaluacion) return [];
    const colaborador = colaboradores.find((c) => c.id === evaluacion.colaboradorId);
    if (!colaborador) return [];
    return cuestionarios.filter((q) => q.cargoId === colaborador.cargoId);
  };

  return {
    respuestas,
    cuestionarios,
    grupos,
    evaluaciones,
    cuestionariosFiltrados,
    colaboradores,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  };
}
