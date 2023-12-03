import { useState, useEffect } from 'react';
import Invite_user from './Invite_user';

function Invite() {
  const [ invitees, cambio_invitees ] = useState(1);

  function check_zero(value){
    if (value < 1){return 1}
    else {return value}
  }

  function show(n_invites){
    //esta funcion recupera los inputs, no los muestra debido a que tendra uso con backend
    const Input_N = document.getElementById('Invite_list').children
    for (let i = 0; i < n_invites; i++){
      console.log(Input_N[i].children[0].children[1].value)
    }
  }

  return (
    <div id="Invite_list">
      {Array.from({ length: invitees }, (_, i) => <span key={i}><Invite_user /></span>)}
      <button onClick={() => cambio_invitees(invitees + 1)}>
        Invite More
      </button>
      <button onClick={() => cambio_invitees(check_zero(invitees - 1))}>
        Invite Less
      </button>
      <button onClick={() => show(invitees)}>
        Send
      </button>
    </div>
  )
}

export default Invite;