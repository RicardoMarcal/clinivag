export interface messageType {
    text: string
    sender: string
}

export interface userDataType {
    desejaAtendimento: string
    especialista: string
    data: Date
    horario: string
    cpf: string
    email?: string
    telefone?: string
    protocolo?: string
}