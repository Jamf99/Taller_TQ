import { useState, useEffect } from "react";
import axios from "axios";

export function useCiclos() {
  const [ciclos, setCiclos] = useState([]);
  const [form, setForm] = useState({ id: null, anio: "", fechaInicio: "", fechaFin: "" });

  useEffect(() => {
    fetchCiclos();
  }, []);

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
    let newForm = { ...form, [name]: value };

    if (name === "anio") {
      if (/^\\d{4}$/.test(value) && Number(value) > 0) {
        if (form.fechaInicio) {
          const fIni = new Date(form.fechaInicio);
          fIni.setFullYear(value);
          newForm.fechaInicio = fIni.toISOString().split("T")[0];
        }
        if (form.fechaFin) {
          const fFin = new Date(form.fechaFin);
          fFin.setFullYear(value);
          newForm.fechaFin = fFin.toISOString().split("T")[0];
        }
      }
    }

    if (name === "fechaInicio" || name === "fechaFin") {
      if (value) {
        const year = new Date(value).getFullYear();
        if (year > 0) {
          newForm.anio = year.toString();
        }
      }
    }

    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { anio, fechaInicio, fechaFin } = form;

    if (!anio || parseInt(anio) <= 0) {
      alert("Por favor ingrese un año válido (mayor que 0).");
      return;
    }

    if (!fechaInicio || !fechaFin) {
      alert("Debe ingresar las fechas de inicio y fin.");
      return;
    }

    if (
      new Date(`${anio}-01-01`) > new Date(fechaInicio) ||
      new Date(`${anio}-12-31`) < new Date(fechaInicio) ||
      new Date(`${anio}-01-01`) > new Date(fechaFin) ||
      new Date(`${anio}-12-31`) < new Date(fechaFin)
    ) {
      alert(`Las fechas deben estar dentro del año ${anio}.`);
      return;
    }

    if (fechaInicio > fechaFin) {
      alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
      return;
    }

    if (!form.id && ciclos.some(c => c.anio === parseInt(anio))) {
      alert(`Ya existe un ciclo para el año ${anio}.`);
      return;
    }

    try {
      if (form.id) {
        await axios.put(`http://localhost:5046/api/cicloevaluativo/${form.id}`, {
          id: form.id,
          anio: parseInt(anio, 10),
          fechaInicio,
          fechaFin
        });
      } else {
        await axios.post("http://localhost:5046/api/cicloevaluativo", {
          anio: parseInt(anio, 10),
          fechaInicio,
          fechaFin
        });
      }
      fetchCiclos();
      limpiarForm();
    } catch (err) {
      console.error("Error al guardar ciclo", err);
    }
  };

  const handleEdit = (ciclo) => {
    setForm({
      id: ciclo.id,
      anio: ciclo.anio.toString(),
      fechaInicio: ciclo.fechaInicio.split("T")[0],
      fechaFin: ciclo.fechaFin.split("T")[0]
    });
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este ciclo?")) {
      try {
        await axios.delete(`http://localhost:5046/api/cicloevaluativo/${id}`);
        fetchCiclos();
      } catch (err) {
        console.error("Error al eliminar ciclo", err);
      }
    }
  };

  const handleCancel = () => {
    limpiarForm();
  };

  const limpiarForm = () => {
    setForm({ id: null, anio: "", fechaInicio: "", fechaFin: "" });
  };

  return {
    ciclos,
    form,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancel
  };
}
