import { useEffect, useRef, useState } from "react";

const Login = () => {
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

  const onSumit = (e) => {
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
      }
    }, 2000)


  }

  useEffect(() => {
    // toast.succes('Tienes 3 intentos')
  }, [])



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