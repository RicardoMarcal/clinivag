export const options = [
    {
      question: "Olá, desejaria fazer um atendimento na nossa clínica?",
      input: "select",
      answers: [
        {value: "Sim", goto: 1}
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
      question: "Ok! Informe seu CPF para finalizar seu agendamento.",
      input: "cpf",
      answers: [
        {value: "", goto: 5},
      ]
    },
  ];