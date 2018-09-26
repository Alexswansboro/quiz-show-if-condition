import React from 'react'
import 'bulma/css/bulma.css'
import { Title, Button } from 'bloomer'
import { NavLink } from 'react-router-dom'

const Sidebar = (props) => (
  <div className='sidebar'>
    <NavLink to='/'><Title className='sidebar-title is-size-2'>Quizzly Bear</Title></NavLink>
    { props.currentUser &&
    <div className='user-info'>
      <p>Logged in as {props.currentUser.username} </p>
      <p><Button className='is-warning' onClick={props.onLogout}>Logout</Button></p>
    </div>
    }
  </div>
)

export default Sidebar
