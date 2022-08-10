import React from 'react';

const SECURITY_CODE = 'paradigma'; 

function UseState(props) {
  const [state, setState] = React.useState({
    value: '',
    loading: false,
    error: false,
    deleted: false,
    confirmed: false,
  });

  console.log(state.value)

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        
        if (state.value === SECURITY_CODE) {
          setState({ 
            ...state,
            loading: false,
            error: false,
            confirmed: true,
          });
        } else {
          setState({ ...state, error: true, loading: false })
        }
  
        console.log("Terminando la validacion");
      }, 3000)
    }

    console.log("Terminando el efecto");
  }, [state.loading])

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {props.name}</h2>
        <p>Por favor, escribe el codigo de seguridad para comprobar la eliminacion.</p>
  
        {(state.error && !state.loading) && (
          <p>Error: Codigo incorrecto.</p>
        )}
        {state.loading && (
          <p>Cargando...</p>
        )}
  
        <input 
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(e) => {
            setState({ ...state, value: e.target.value})
          }}
          />
        <button
          onClick={() => {
            setState({ ...state, loading: true,})
          }}
        >Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>¿Estas seguro de la eliminacion?</p>
        <button
          onClick={() => {
            setState({
              ...state,
              deleted: true,
            })
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              value: '',
            })
          }}
        >
          No, volver
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con exito.</p>

        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              deleted: false,
              value: '',
            })
          }}
        >
          recuperar
        </button>
      </>
    )
  }
}

export { UseState };