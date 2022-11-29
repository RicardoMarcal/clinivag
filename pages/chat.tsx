/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/Chat.module.scss'
import { options } from '../public/options'
import Link from 'next/link'
import HeaderSidebar from '../components/HeaderSidebar'
import { messageType, userDataType } from '../types/types'
import { AgendamentosContext } from './_app'

export default function Home() {
    const [current, setCurrent] = useState<number>(0)
    const [messages, setMessages] = useState<messageType[]>([{ text: "Olá, desejaria fazer um agendamento em nossa Clínica?", sender: 'bot' }])
    const [userData, setUserData] = useState<userDataType>({} as userDataType)
    const { agendamentos, setAgendamentos } = useContext(AgendamentosContext)

    useEffect(() => {
        const button = document.getElementById("sendButton") as HTMLButtonElement

        const messageStartWords = ["Ótimo", "Excelente", "Perfeito", "Maravilha"]
        const messageStartWord = messageStartWords[Math.floor(Math.random()*messageStartWords.length)]
        if(current >= options.length){
            setCurrent(0)
            setTimeout(() => {
                setMessages(val => [...val, {
                    text: `${messageStartWord}! Foi agendada uma consulta com um ${userData.especialista} 
                            no dia ${new Date(userData.data).toLocaleDateString()} às ${userData.horario}. 
                            Lembre-se de verificar o check-in com 1 dia de antecedência para confiar a sua presença.`,
                    sender: 'bot'
                }])

                setAgendamentos([...agendamentos, userData])
                goToBottom()

                setTimeout(() => {
                    setMessages(val => [...val, {
                        text: "Desejaria fazer outro agendamento em nossa Clínica?",
                        sender: 'bot'
                    }])
                    button.disabled = false;
    
                    goToBottom()
                }, 800)

            }, 800)
        }

    }, [current, userData, agendamentos, setAgendamentos])
    

    const answer = (e: React.MouseEvent) => {
        e.preventDefault()
        const button = document.getElementById("sendButton") as HTMLButtonElement
        const input = options[current].input;
        const past = current;
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


        if(goto >= options.length || goto == past) return

        button.disabled = true;

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
        const answer = date.value.replace(/-/g, '\/').replace(/T.+/, '')

        if(answer.trim().length == 0) {
            alert("Escolha uma data.");
            return current
        }

        setUserData(userData => {return {...userData, data: new Date(answer)}})

        setCurrent(() => goto)

        setMessages(val => [...val, {
            text: `Quero meu atendimento no dia ${new Date(answer).toLocaleDateString()}.`,
            sender: 'user'
        }])
        goToBottom()

        return goto
    }

    const answerCpf = () => {
        const cpf = document.getElementById("cpf") as HTMLInputElement
        const goto = options[current].answers[0].goto
        const answer = cpf.value

        if(answer.trim().length != 14) {
            alert("Digite o seu CPF completo.");
            return current
        }

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
                    <HeaderSidebar />

                    <div id="messages" className={styles.messages}>
                        {messages.map((message, key) =>
                            <div key={key} className={`${styles.message} ${styles[message.sender]}`}>
                                <p>{message.text}</p>
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
