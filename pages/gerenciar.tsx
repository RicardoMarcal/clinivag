/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
import HeaderSidebar from '../components/HeaderSidebar'
import styles from '../styles/Gerenciar.module.scss'
import { AgendamentosContext } from './_app'

export default function Home() {
    const { agendamentos, setAgendamentos } = useContext(AgendamentosContext)

    const excluirAgendamento = (i: number) => {
        setAgendamentos([...agendamentos.filter((item, index) => index != i)])
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Clinivag</title>
                <meta name="description" content="App para agendameto de consultas." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.wrapper}>
                    <HeaderSidebar back="chat" />
                    <h2>Gerenciar agendamentos</h2>
                    <section>
                        {agendamentos.map((item, index) => (
                            <div className={styles.card} key={index}>
                                <div className={styles.top}>
                                    <i className="fa fa-trash" aria-hidden="true" onClick={() => excluirAgendamento(index)}></i>
                                </div>
                                <ul>
                                    <li><span className={styles.bold}>CPF:</span> {item.cpf}</li>
                                    <li><span className={styles.bold}>Data:</span> {item.data.toLocaleDateString()}</li>
                                    <li><span className={styles.bold}>Horário:</span> {item.horario}</li>
                                </ul>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    )

}