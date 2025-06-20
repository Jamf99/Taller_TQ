import { useState, useEffect } from "react";
import axios from "axios";

export default function useGrupos() {
  const [grupos, setGrupos] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombreGrupo: "",
    fechaInicio: "",
    fechaFin: "",
    cicloEvaluativoId: ""
  });

  useEffect(() => {
    fetchGrupos();
    fetchCiclos();
  }, []);

  const fetchGrupos = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/grupoevaluativo");
      setGrupos(res.data);
    } catch (err) {
      console.error("Error al obtener grupos", err);
    }
  };

  const fetchCiclos = async () => {
    try {
      const res = await axios.get("http://localhost:5046/api/cicloevaluativo");
      setCiclos(res.data);
    } catch (err) {
      console.error("Error al obtener ciclos", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };

    if (name === "cicloEvaluativoId") {
      const ciclo = ciclos.find(c => c.id.toString() === value);

      if (ciclo) {
        newForm.fechaInicio = `${ciclo.anio}-01-01`;
        newForm.fechaFin = `${ciclo.anio}-12-31`;
      } else {
        newForm.fechaInicio = "";
        newForm.fechaFin = "";
      }
    }

    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombreGrupo || !form.cicloEvaluativoId || !form.fechaInicio || !form.fechaFin) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (form.id) {
        await axios.put(`http://localhost:5046/api/grupoevaluativo/${form.id}`, form);
      } else {
        await axios.post("http://localhost:5046/api/grupoevaluativo", form);
      }
      setForm({
        id: null,
        nombreGrupo: "",
        fechaInicio: "",
        fechaFin: "",
        cicloEvaluativoId: ""
      });
      fetchGrupos();
    } catch (err) {
      console.error("Error al guardar grupo", err);
    }
  };

  const handleEdit = (grupo) => {
    setForm({
      id: grupo.id,
      nombreGrupo: grupo.nombreGrupo,
      fechaInicio: grupo.fechaInicio.slice(0, 10),
      fechaFin: grupo.fechaFin.slice(0, 10),
      cicloEvaluativoId: grupo.cicloEvaluativoId.toString()
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este grupo?")) {
      try {
        await axios.delete(`http://localhost:5046/api/grupoevaluativo/${id}`);
        fetchGrupos();
      } catch (err) {
        console.error("Error al eliminar grupo", err);
      }
    }
  };

  const handleCancel = () => {
    setForm({
      id: null,
      nombreGrupo: "",
      fechaInicio: "",
      fechaFin: "",
      cicloEvaluativoId: ""
    });
  };

  return {
    grupos,
    ciclos,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  };

}
