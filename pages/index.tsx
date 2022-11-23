/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useState } from 'react';
import styles from '../styles/Home.module.scss'

interface messageType {
  text: string
  sender: string
}

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [messages, setMessages] = useState<messageType[]>([{text: "Olá, desejaria fazer um atendimento em nossa Clínica?", sender: 'bot'}])

  const options = [
    {
      question: "Olá, desejaria fazer um atendimento na nossa clínica?",
      answers: ["Sim", "Não"]
    }
  ];

  const answer = (e: React.MouseEvent) => {
    e.preventDefault();

    const select = document.getElementById("select") as HTMLInputElement

    setMessages(val => [...val, {
      text: options[current].answers[parseInt(select.value)],
      sender: 'user'
    }])

    setTimeout(() => {
      setMessages(val => [...val, {
        text: "O app está em desenvolvimento.",
        sender: 'bot'
      }])
      goToBottom()
  }, 800)
    

    setCurrent(val => val++)
    goToBottom()
  }

  const goToBottom = () => {
    setTimeout(() => {
      document.getElementById("messages")?.scrollTo(0, document.getElementById("messages")!.scrollHeight)
    }, 1)
  }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Clinivag</title>
        <meta name="description" content="App para agendameto de consultas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.chat}>
          <div className={styles.top}>
            <i className="fa-solid fa-arrow-left"></i>
            <img src="univag.png" alt="Logo da UNIVAG" />
            <p>Univag Clínica</p>
            <label htmlFor="sidebarCheckbox"><i className="fa-solid fa-ellipsis-vertical"></i></label>
          </div>

          <input type="checkbox" id="sidebarCheckbox" className={styles.sidebarCheckbox} />

          <div className={styles.blackFilter}></div>
          <nav id="sidebar" className={styles.sidebar}>
            <label htmlFor="sidebarCheckbox"><i className={`fa-solid fa-xmark ${styles.close}`}></i></label>
              <ul>
                <li>
                  <i className="fa-solid fa-house"></i>
                  <p>Página inicial</p>
                </li>
                <li>
                  <i className="fa-solid fa-calendar"></i>
                  <p>Agendar consulta</p>
                </li>
                <li>
                  <i className="fa-solid fa-plus"></i>
                  <p>Gerenciar agendamentos</p>
                </li>
              </ul>
          </nav>
          
          <div id="messages" className={styles.messages}>
            {messages.map((message, key) => 
              <div key={key} className={`${styles.message} ${styles[message.sender]}`}>
                {message.text}
              </div>
            )}
          </div>

          <img src="univag.png" alt="Logo da UNIVAG" className={styles.logo} />

          <div className={styles.inputs}>
            <select id="select">
              {options[current].answers.map((item, index) => (
                <option key={index} value={index}>{item}</option>
              ))}
            </select>
            <button onClick={answer}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
