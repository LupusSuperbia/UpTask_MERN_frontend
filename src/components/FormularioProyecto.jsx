import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alerta from "./Alertas";
import useProyectos from "../hooks/useProyectos";

const FormularioProyecto = () => {
  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const params = useParams()
  const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos();

useEffect(() => {
  if(params.id){
    setId(params.id)
    setNombre(proyecto.nombre)
    setDescripcion(proyecto.descripcion)
    setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
    setCliente(proyecto.cliente)

  } else {
    console.log('nuevo Proyecto')
  }
}, [params])


  const handlesubmit = async (e) => {
    e.preventDefault();
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
        mostrarAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        });
      return;
    }
    // Pasar datos a provider
    await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})

    setId(null)
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')
  };

  const {msg} = alerta


  return (
    
   
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
      onSubmit={handlesubmit}
    >
    {msg && <Alerta alerta={alerta}/>}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre proyectos
        </label>
        <input
          id="nombre"
          type={"text"}
          className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripcion Proyectos
        </label>
        <textarea
          id="descripcion"
          className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
          placeholder="Descripcion del Proyecto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha de Entrega
        </label>
        <input
          type={"date"}
          id="fecha-entrega"
          className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
          placeholder="Descripcion del Proyecto"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="cliente"
        >
          Nombre Cliente
        </label>
        <input
          id="cliente"
          type={"text"}
          className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type={"submit"}
        value={proyecto._id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
    
  );
};

export default FormularioProyecto;
