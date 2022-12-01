/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import styles from '../styles/components/HeaderSidebar.module.scss'
import React from 'react'

function HeaderSidebar() {
  return (
    <>
    <div className={styles.top}>
        <Link href="/home"><i className="fa-solid fa-arrow-left"></i></Link>
        <img src="univag.png" alt="Logo da UNIVAG" />
        <p>Clinivag</p>
        <label htmlFor="sidebarCheckbox"><i className="fa-solid fa-ellipsis-vertical"></i></label>
    </div>

    <input type="checkbox" id="sidebarCheckbox" className={styles.sidebarCheckbox} />

    <div className={styles.blackFilter}></div>
    <nav id="sidebar" className={styles.sidebar}>
        <label htmlFor="sidebarCheckbox"><i className={`fa-solid fa-xmark ${styles.close}`}></i></label>
        <ul>
            <li>
                <Link href="/home">
                <i className="fa-solid fa-house"></i>
                <p>Página inicial</p>
                </Link>
            </li>
            <li>
                <Link href="/">
                <i className="fa-solid fa-calendar"></i>
                <p>Agendar consulta</p>
                </Link>
            </li>
            <li>
                <Link href="/gerenciar">
                <i className="fa-solid fa-plus"></i>
                <p>Gerenciar agendamentos</p>
                </Link>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default HeaderSidebar