import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { userDataType } from '../types/types'
import { createContext, useState } from 'react'

interface AgendamentosContextType {
  agendamentos: userDataType[],
  setAgendamentos: React.Dispatch<React.SetStateAction<userDataType[]>>
}

export const AgendamentosContext = createContext<AgendamentosContextType>({} as AgendamentosContextType)

export default function App({ Component, pageProps }: AppProps) {
  const [agendamentos, setAgendamentos] = useState<userDataType[]>([
    {desejaAtendimento: "Sim", especialista: "Dermatologista", data: new Date("01/01/2023"), horario: "7:00 da manhã", cpf: "111.111.111-11"},
    {desejaAtendimento: "Sim", especialista: "Neurologista", data: new Date("02/02/2023"), horario: "13:30 da tarde", cpf: "222.222.222-22"},
    {desejaAtendimento: "Sim", especialista: "Psiquiatra", data: new Date("03/03/2023"), horario: "7:00 da manhã", cpf: "333.333.333-33"},
  ])

  return (
    <AgendamentosContext.Provider value={{agendamentos, setAgendamentos}}>
      <Component {...pageProps} />
    </AgendamentosContext.Provider>
  )
}
