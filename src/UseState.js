import React from 'react';

const SECURITY_CODE = 'paradigma'; 

function UseState(props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  console.log(value)

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        
        if (value !== SECURITY_CODE) {
          setError(true);
        } else {
          setError(false);
        }
        setLoading(false);
  
        console.log("Terminando la validacion");
      }, 3000)
    }

    console.log("Terminando el efecto");
  }, [loading])

  return (
    <div>
      <h2>Eliminar {props.name}</h2>
      <p>Por favor, escribe el codigo de seguridad para comprobar la eliminacion.</p>

      {(error && !loading) && (
        <p>Error: Codigo incorrecto.</p>
      )}
      {loading && (
        <p>Cargando...</p>
      )}

      <input 
        placeholder="Codigo de seguridad"
        value={value}
        onChange={(e) => {
          //setError(false);
          setValue(e.target.value)
        }}
        />
      <button
        onClick={() => {
          setLoading(true)
          //setError(false)
        }}
      >Comprobar</button>
    </div>
  )
}

export { UseState };