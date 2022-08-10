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

  // METODOS ACTUALIZADORES DE NUESTRO ESTADO

  const onConfirm = () => {
    setState({ 
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false
    })
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    })
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    })
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    })
  };

  const onReset = () => {
    setState({
      ...state,
      deleted: false,
      confirmed: false,
      value: '',
    })
  };

 //

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
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
            onWrite(e.target.value)
          }}
          />
        <button
          onClick={() => {
            onCheck();
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
            onDelete();
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            onReset();
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
            onReset();
          }}
        >
          recuperar
        </button>
      </>
    )
  }
}

export { UseState };