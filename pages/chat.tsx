/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Chat.module.scss'
import { options } from '../public/options'
import Link from 'next/link'

interface messageType {
    text: string
    sender: string
}

interface userDataType {
    desejaAtendimento: string
    especialista: string
    data: Date
    horario: string
    cpf: string
}

export default function Home() {
    const [current, setCurrent] = useState<number>(0)
    const [messages, setMessages] = useState<messageType[]>([{ text: "Olá, desejaria fazer um atendimento em nossa Clínica?", sender: 'bot' }])
    const [userData, setUserData] = useState<userDataType>({} as userDataType)

    useEffect(() => {
        const button = document.getElementById("sendButton") as HTMLButtonElement

        if(current >= options.length){
            setCurrent(0)
            setTimeout(() => {
                setMessages(val => [...val, {
                    text: JSON.stringify(userData),
                    sender: 'bot'
                }])
                button.disabled = false;
                goToBottom()
            }, 800)
        }

    }, [current, userData])
    

    const answer = (e: React.MouseEvent) => {
        e.preventDefault()
        const button = document.getElementById("sendButton") as HTMLButtonElement
        const input = options[current].input;
        let goto = 0
        
        if(button.disabled) return

        switch(input) {
            case "select":
                goto = answerSelect()
            break
            case "date":
                goto = answerDate()
            break
            case "cpf":
                goto = answerCpf()
            break
        }

        button.disabled = true;

        if(goto >= options.length) return

        setTimeout(() => {
            setMessages(val => [...val, {
                text: options[goto].question,
                sender: 'bot'
            }])
            button.disabled = false;
            goToBottom()
        }, 800)
    }

    const answerSelect = () => {
        const select = document.getElementById("select") as HTMLInputElement
        const goto = options[current].answers[parseInt(select.value)].goto
        const answer = options[current].answers[parseInt(select.value)].value

        switch(current){
            case 0:
                setUserData(userData => {return {...userData, desejaAtendimento: answer}})
            case 1:
                setUserData(userData => {return {...userData, especialista: answer}})
            case 3:
                setUserData(userData => {return {...userData, horario: answer}})
        }

        setCurrent(() => goto)

        setMessages(val => [...val, {
            text: answer,
            sender: 'user'
        }])
        goToBottom()

        return goto
    }

    const answerDate = () => {
        const date = document.getElementById("date") as HTMLInputElement
        const goto = options[current].answers[0].goto
        const answer = date.value

        setUserData(userData => {return {...userData, data: new Date(answer)}})

        setCurrent(() => goto)

        setMessages(val => [...val, {
            text: `Quero meu atendimento no dia ${answer}.`,
            sender: 'user'
        }])
        goToBottom()

        return goto
    }

    const answerCpf = () => {
        const cpf = document.getElementById("cpf") as HTMLInputElement
        const goto = options[current].answers[0].goto
        const answer = cpf.value

        setUserData(userData => {return {...userData, cpf: answer}})

        setCurrent(() => goto)

        setMessages(val => [...val, {
            text: `Meu cpf é "${answer}".`,
            sender: 'user'
        }])
        goToBottom()

        return goto
    }

    const goToBottom = () => {
        setTimeout(() => {
            document.getElementById("messages")?.scrollTo(0, document.getElementById("messages")!.scrollHeight)
        }, 1)
    }

    const cpfMask = (e: React.KeyboardEvent) => {
        const input = (e.target as HTMLInputElement);
        let cpf = input.value
        
        if(cpf.length >= 14) cpf = cpf.slice(0, 14)

        cpf = cpf.replace(/\D/g, "")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

        input.value = cpf
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
                    <div className={styles.top}>
                        <Link href="/"><i className="fa-solid fa-arrow-left"></i></Link>
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
                                <Link href="/">
                                <i className="fa-solid fa-house"></i>
                                <p>Página inicial</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/chat">
                                <i className="fa-solid fa-calendar"></i>
                                <p>Agendar consulta</p>
                                </Link>
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
                        { options[current]?.input === "select" ?
                            <select id="select" className={styles.input}>
                                {options[current].answers.map((item, index) => (
                                    <option key={index} value={index}>{item.value}</option>
                                ))}
                            </select>

                        : options[current]?.input === "date" ?
                            <input id="date" className={styles.input} type="date" />

                        : options[current]?.input === "cpf" ?
                            <input id="cpf" className={styles.input} onKeyUp={cpfMask} type="text" />

                        : null}  
                        <button id="sendButton" onClick={answer}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
