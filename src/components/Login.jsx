import { useCallback, useEffect, useRef, useState } from "react";
import { intentosLogin } from "../hooks/intentos-login";

import {toast} from 'react-hot-toast'

const Login = () => {

  const intentos = intentosLogin(state => state.intentos);
  const reducirIntentos = intentosLogin(state => state.actualizarIntentos);

  const [formValues, setFormValues] = useState({
    email: '',
    pass: '',
    error: false,
    loading: false,
  });
  const refInputEmail = useRef(null);
  const refInputPass = useRef(null);

  const handleChangeInput = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const obtenerHoyMañana = () => {
    const hoy = new Date();
    const diaHoy = hoy.getDate();
    const manana = new Date();
    manana.setDate(diaHoy + 1);

    return [hoy.getTime(), manana.getTime()];
  }
  const diferenciaDia=(mañana)=>{
    const hoyDia = new Date()
    const mañanaDia = new Date(mañana);
    const diferenciaEnMilisegundos = Math.abs(mañanaDia.getTime() - hoyDia.getTime());
    const diferenciaEnMinutos = Math.ceil(diferenciaEnMilisegundos / (1000 *60* 60));
    return diferenciaEnMinutos;
  }

  const onSumit = useCallback((e) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      loading: true
    })



    if (formValues.email.trim().length < 1 || formValues.pass.trim().length < 1) {
      setFormValues({
        ...formValues,
        error: true
      })
      if (formValues.email.trim().length < 1) {
        refInputEmail.current.focus()
        return;
      }
      if (formValues.pass.trim().length < 1) {
        refInputPass.current.focus()
        return;
      }

    }
    setTimeout(() => {
      setFormValues({
        ...formValues,
        error: false,
        loading: false
      })
      if (formValues.email.trim().length > 1
        && formValues.pass.trim().length > 1
        && !formValues.error) {
        console.log("LOGIN VALIDO")
        
        if (intentos!==1){
          toast.error(`No existe el usuario, tienes ${intentos-1} intentos!!`)
        }
        reducirIntentos()
        
      }
    }, 2000)

  }, [formValues, intentos,reducirIntentos])

  useEffect(() => {
    const isBlockString = localStorage.getItem('isBlock');
    
    if (isBlockString && !formValues.loading){
      const isBlock = JSON.parse(isBlockString);
      const tiempoEspera = diferenciaDia(isBlock.diaManana)
      if (tiempoEspera===0){
        localStorage.removeItem('isBlock')
        setFormValues({
          ...formValues,
          error: false,
          loading: false
        })
      }
      setFormValues({
        ...formValues,
        error: false,
        loading: true
      })
      toast.error(`No tiene intentos, vuelva a probar en ${tiempoEspera} hrs`)
    }
    if (!isBlockString && intentos === 0 && !formValues.loading){
      setFormValues({
        ...formValues,
        error: false,
        loading: true
      })
      toast.error(`No tiene intentos, vuelva a probar en 24h`)
      const [diaHoy, diaManana] = obtenerHoyMañana()
      localStorage.setItem('isBlock', JSON.stringify({ isBlock: true, diaHoy: diaHoy, diaManana: diaManana }));
      const userString = localStorage.getItem('isBlock');
      const user = JSON.parse(userString);
      console.log(user)
    }
  }, [intentos, formValues])



  return (
    <div className="form-content my-3 p-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg mt-0 mb-3">
              <div className="card-header justify-content-center">
                <h3 className="font-weight-light my-1 text-center">Sign In</h3>

              </div>
              <div className="container_img">
                <img src="unsaac.png" alt="unsaac logo" className="imagen" />
              </div>

              <div className="card-body">
                <form onSubmit={onSumit}>
                  {/* {% csrf_token %} */}
                  <div className="form-row">
                    <div className="col-10 offset-md-1">
                      <div className="">
                        <a href="#"
                          className="btn btn-link btn-lg active btn-block">Sign in with GitHub</a>
                        <a href="#"
                          className="btn btn-link btn-lg active btn-block">Sign in with Google</a>
                        <hr />
                        <p className="text-center"><strong>OR</strong></p>
                        <hr />
                        <label className="small mb-1">Username</label>
                        <input disabled={formValues.loading} ref={refInputEmail} name="email" type="email" id="form2Example1" className="form-control" onChange={handleChangeInput} placeholder="user@mail.com" />
                        {/* {{ form.username }} */}
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-10 offset-md-1">
                      <div className="form-group">
                        <label className="small mb-1">Password</label>
                        {/* {{ form.password }} */}
                        <input
                          disabled={formValues.loading}
                          ref={refInputPass}
                          name="pass"
                          type="password"
                          id="form2Example2"
                          className="form-control"
                          onChange={handleChangeInput}
                          placeholder="**********"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-10 offset-md-1">
                      <div className="form-group">
                        {/* <!-- Add a Remember me functionality --> */}
                        {/* {{ form.remember_me }} */}
                        {/* <label> Remember me</label> */}
                      </div>
                    </div>
                  </div>
                  <div className="form-row mt-4">
                    <div className="col-md-10 offset-md-1">
                      <div className="form-group mt-0 mb-1">
                        <button disabled={formValues.loading} name="login" className={`col-12 btn btn-dark ${formValues.loading && 'not-allowed-cursor'}`} id="login">Sign in</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center">
                <div className="small">
                  <a href="#"> No tienes alguna cuenta. Create una!!</a><br />
                  <a href="#"><i>Olvidaste tu contraseña</i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;