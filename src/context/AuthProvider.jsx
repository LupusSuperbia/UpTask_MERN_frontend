import { useState, useEffect, createContext } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import clientesAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false)
        return;
      }
      // Configuracion token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clientesAxios("/usuarios/perfil", config);
        setAuth(data);
        if(data._id && location.pathname === '/'){
          navigate('/proyectos')
        }
      } catch (error) {
        setAuth({})
      } finally {
        setCargando(false);
      }
    };
    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({})
  }
  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        cargando,
        cerrarSesionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
