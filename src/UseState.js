import React from 'react';

function UseState(props) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
  
        setLoading(false)
  
        console.log("Terminando la validacion");
      }, 3000)
    }

    console.log("Terminando el efecto");
  }, [loading])

  return (
    <div>
      <h2>Eliminar {props.name}</h2>
      <p>Por favor, escribe el codigo de seguridad para comprobar la eliminacion.</p>

      {error && (
        <p>Error: Codigo incorrecto.</p>
      )}
      {loading && (
        <p>Cargando...</p>
      )}

      <input placeholder="Codigo de seguridad" />
      <button
        onClick={() => setLoading(true)}
      >Comprobar</button>
    </div>
  )
}

export { UseState };