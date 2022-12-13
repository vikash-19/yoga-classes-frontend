import axios from 'axios'
import React from 'react'
import { useMutation } from 'react-query'
import {Link, useNavigate} from 'react-router-dom'
import  styles from './header.module.scss'
function Header({username}) {
  const navigate = useNavigate()

  const {mutate: logout } = useMutation(()=>{
    return axios.get("/logout").then(res=>res.data)
  })

  function handleLogout(){
    console.log("done")
    logout(null,{
      onError: console.log("unable to logout"),
      onSuccess: navigate('/login')
    })
  }
  return (
    <nav className={styles.header}>
        <ul>
            <li><Link className={styles.aboutUs}>About us</Link></li>
            <li><Link className={styles.contactUs}>Contacts</Link></li>
            <li className={styles.logout} onClick={handleLogout}>Logout ({username})</li>
        </ul>
    </nav>
  )
}

export default Header
