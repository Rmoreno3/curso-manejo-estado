import React from 'react';

const SECURITY_CODE = 'paradigma'; 

function UseState(props) {
  const [state, setState] = React.useState({
    value: '',
    loading: false,
    error: false,
  });

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  console.log(state.value)

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        
        if (state.value === SECURITY_CODE) {
          setState({ ...state, loading: false , error: false });
        } else {
          setState({ ...state, error: true, loading: false })
        }
  
        console.log("Terminando la validacion");
      }, 3000)
    }

    console.log("Terminando el efecto");
  }, [state.loading])

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
  )
}

export { UseState };