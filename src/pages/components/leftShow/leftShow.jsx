import React, { useEffect } from 'react'
import styles from './leftShow.module.scss'
const text = `“Yoga is a mirror to look at ourselves from within.“`;
function LeftShow(props) {
  console.log(props)
  return (
    <div className={styles.leftShow}>
       <span className={styles.Hi}>Hi,</span> &nbsp;
       <span className={styles.firstname}>{props.firstName}</span>
       <blockquote cite='#' >
       {text}
       </blockquote>
    </div>
  )
}

export default LeftShow
