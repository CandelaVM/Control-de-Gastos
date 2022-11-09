import React from "react";

function Error({children, tipo}){

  return (
      <div className="alerta">
          {children}
      </div>
  )
}

export default Error;