// Questions of the pre-analysis form. The form renders them and the server
// action checks every answer against these options.
export const preAnaliseQuestions = [
  {
    name: "contribuicao",
    label: "Quanto tempo de contribuição você tem, aproximadamente?",
    options: ["Homem, menos de 35 anos", "Homem, 35 anos ou mais", "Mulher, menos de 30 anos", "Mulher, 30 anos ou mais"],
  },
  {
    name: "idade",
    label: "Qual a sua idade?",
    options: ["Homem, menos de 65 anos", "Homem, 65 anos ou mais", "Mulher, menos de 62 anos", "Mulher, 62 anos ou mais"],
  },
  { name: "rural", label: "Já trabalhou em atividade rural?", options: ["Sim", "Não"] },
  { name: "especial", label: "Já trabalhou exposto a algum agente nocivo à saúde?", options: ["Sim", "Não"] },
  { name: "deficiencia", label: "Já trabalhou com alguma deficiência?", options: ["Sim", "Não"] },
] as const;
