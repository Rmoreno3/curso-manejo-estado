import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch ] = React.useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm })
  };

  const onError = () => {
    dispatch({ type: actionTypes.error });
  };

  const onWrite = (newValue) => {
    dispatch({ type: actionTypes.write, payload: newValue });
  };

  const onCheck = () => {
    dispatch({ type: actionTypes.check })
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.delete })
  };

  const onReset = () => {
    dispatch({ type: actionTypes.reset })
  };

React.useEffect(()=>{
  console.log('Empezando el efecto');

  if(state.loading){
    setTimeout(()=>{
      console.log("Haciendo la validación xd");

      if(state.value === SECURITY_CODE){
        onConfirm();
      }else{
        onError();
      }

      console.log("Terminando la validación");
    },1500);
  }
  console.log('Terminando el efecto');
},[state.loading]);


if(!state.deleted && !state.confirmed){
  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escriba el código de seguridad.</p>

      {(state.error && !state.loading ) && (
          <p>El código es es incorrecto</p>
      )}

      {state.loading && (
          <p>Cargando ...</p>
      )}

      <input 
          type='text' 
          placeholder='código de seguridad'
          value={state.value}
          onChange={(e)=>{
            onWrite(e.target.value);
          }
          }
        />
        <button
            onClick={()=>{
              onCheck();
            }}
        >Comprobar</button>
    </div>
  );
} else if (state.confirmed && !state.deleted){
  return(
    <React.Fragment>
      <p>¿Seguro que quieres eliminar UseState?</p>
      <button
          onClick={()=>{
            onDelete();
          }}
      >Si, eliminar</button>
      <button
          onClick={()=>{
            onReset();
          }}
      >No, volver</button>
    </React.Fragment>
  )
} else {
  return (
    <React.Fragment>
      <p>Eliminado con exito</p>
      <button
          onClick={()=>{
            onReset();
          }}
      >Recuperar UseState</button>
    </React.Fragment>
  )
}
}

const initialState = {
  value:'',
  error:false,
  loading:false,
  deleted: false,
  confirmed: false,
}

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',

}

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]:{ 
      ...state,
      error: false, 
      loading: false ,
      confirmed: true,
  },
  [actionTypes.error]: { 
      ...state,
      error: true, 
      loading: false 
  },
  [actionTypes.write]: { 
      ...state,
      value: payload,
  },
  [actionTypes.check]: { 
      ...state,
      loading: true 
  },
  [actionTypes.delete]: {
      ...state,
      deleted: true,
  },
  [actionTypes.reset]:{
      ...state,
      confirmed: false,
      deleted: false,
      value:'',
  }
})

 const reducer = (state, action) => {
  return (reducerObject(state, action.payload)[action.type] || state);
};

export { UseReducer }