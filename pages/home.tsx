/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import HeaderSidebar from '../components/HeaderSidebar'
import styles from '../styles/Home.module.scss'

export default function Home() {

    return (
        <div className={styles.container}>
            <Head>
                <title>Clinivag</title>
                <meta name="description" content="App para agendameto de consultas." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.wrapper}>
                    <HeaderSidebar />
                    <img src="clinic.webp" alt="Clinic" className={styles.backgroundImage} />
                    <div className={styles.content}>
                        <img src="univag.png" alt="Univag" className={styles.logo} />
                        <div className={styles.buttons}>
                            <Link href="/">Agendar consulta</Link>
                            <Link href="/gerenciar">Gerenciar agendamentos</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )

}