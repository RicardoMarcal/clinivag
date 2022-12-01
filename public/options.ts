export const options = [
    {
      question: "Olá, desejaria fazer um atendimento na nossa clínica?",
      input: "select",
      answers: [
        {value: "Sim", goto: 1},
        {value: "Não, desejo cancelar um agendamento.", goto: 6}
      ]
    },
    {
      question: "Por qual especialista você deseja ser atendido(a)?",
      input: "select",
      answers: [
        {value: "Neurologista", goto: 2},
        {value: "Cardiologista", goto: 2},
        {value: "Psiquiatra", goto: 2},
        {value: "Fonoaudiólogo", goto: 2},
        {value: "Dermatologista", goto: 2}
      ]
    },
    {
      question: "Informe a data em que você deseja agendar.",
      input: "date",
      answers: [
        {value: "", goto: 3},
      ]
    },
    {
      question: "Informe o horário que você deseja ser atendido.",
      input: "select",
      answers: [
        {value: "7:00 da manhã", goto: 4},
        {value: "13:30 da tarde", goto: 4},
        {value: "Agendar outro dia", goto:2}
      ]
    },
    {
      question: "Ok! Informe seu CPF para identificarmos você no dia da consulta.",
      input: "cpf",
      answers: [
        {value: "", goto: 5},
      ]
    },
    {
      question: "Para finalizar, peço para que você digite seu e-mail ou número de telefone para receber o seu número de protocolo.",
      input: "emailtelefone",
      answers: [
        {value: "", goto: 9999},
      ]
    },
    {
      question: "Informe o numero de protocolo referente ao agendamento que deseja cancelar.",
      input: "protocolo",
      answers: [
        {value: "", goto: 9999},
      ]
    },
  ];