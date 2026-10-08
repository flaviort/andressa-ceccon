export type ServiceSection = {
  heading: string;
  body: string[];
  list?: string[];
};

export type Service = {
  slug: string;
  title: string;
  /** Short label used in cards, menus and breadcrumbs. */
  short: string;
  index: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  excerpt: string;
  lead: string;
  sections: ServiceSection[];
  documents: string[];
  faq: { q: string; a: string }[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "planejamento-previdenciario",
    title: "Planejamento Previdenciário",
    short: "Planejamento",
    index: "01",
    metaTitle: "Planejamento Previdenciário em Curitiba e Online",
    metaDescription:
      "Descubra qual regra de aposentadoria rende mais no seu caso antes de pedir ao INSS. Atendimento presencial em Curitiba ou online.",
    keywords: [
      "planejamento previdenciário",
      "advogada previdenciária Curitiba",
      "melhor regra de aposentadoria",
      "cálculo de aposentadoria",
      "regras de transição INSS",
    ],
    image: "/images/planejamento.jpg",
    imageAlt: "Homem idoso de óculos analisando documentos à mesa de casa",
    excerpt:
      "O estudo que mostra quando você pode se aposentar, por qual regra e com qual valor. Feito antes do pedido, quando ainda dá para escolher.",
    lead:
      "Quem contribui para o INSS costuma se encaixar em mais de uma regra de aposentadoria. Cada regra tem uma data diferente e um valor diferente. O planejamento coloca essas opções lado a lado para que a escolha seja sua, e não do sistema.",
    sections: [
      {
        heading: "O que é o planejamento previdenciário",
        body: [
          "É uma análise completa da sua vida contributiva. Revisamos o CNIS (o extrato do INSS), carteiras de trabalho, carnês, períodos especiais, rurais ou no serviço público, e projetamos cada regra de aposentadoria a que você pode ter direito.",
          "O resultado é um parecer com datas, valores estimados de renda mensal inicial e as providências necessárias para cada cenário. Você entende o que tem hoje e o que ganha se esperar mais alguns meses.",
        ],
      },
      {
        heading: "Por que fazer antes de pedir a aposentadoria",
        body: [
          "Depois que o INSS concede o benefício e você saca o primeiro pagamento, não dá para trocar de regra. Se havia uma opção mais vantajosa, ela se perde.",
          "O INSS também é rigoroso com documentação. Um período sem prova adequada pode atrasar o pedido ou gerar uma negativa. No planejamento, as falhas aparecem antes, quando ainda há tempo de corrigir o cadastro e reunir provas.",
        ],
      },
      {
        heading: "O que você recebe",
        body: [],
        list: [
          "Conferência do CNIS e identificação de vínculos ou contribuições faltantes",
          "Simulação de todas as regras de aposentadoria aplicáveis, inclusive as de transição da Reforma de 2019",
          "Estimativa da renda mensal inicial em cada cenário",
          "Indicação de períodos especiais, rurais ou de serviço público que podem ser somados",
          "Orientação sobre contribuições em atraso, complementações e o melhor momento para pedir",
          "Acompanhamento do pedido junto ao INSS, se você decidir seguir conosco",
        ],
      },
      {
        heading: "Para quem é indicado",
        body: [
          "Para quem está a poucos anos de se aposentar, para quem trabalhou em atividade insalubre ou rural, para quem teve vínculos em regimes diferentes (INSS e serviço público) e para autônomos e MEIs que querem saber se vale a pena ajustar a contribuição.",
        ],
      },
    ],
    documents: [
      "Documento de identidade e CPF",
      "Carteiras de trabalho (todas, inclusive as antigas)",
      "Senha do Meu INSS ou extrato CNIS atualizado",
      "Carnês ou guias de contribuição, se houver",
      "PPP, laudos ou documentos de atividade especial, se houver",
    ],
    faq: [
      {
        q: "Com quantos anos de antecedência devo fazer o planejamento?",
        a: "O ideal é de cinco a dez anos antes da data provável de aposentadoria, porque ainda dá tempo de corrigir o cadastro e ajustar contribuições. Mas mesmo às vésperas do pedido o estudo costuma evitar a escolha de uma regra menos vantajosa.",
      },
      {
        q: "O planejamento serve para quem já está aposentado?",
        a: "Para quem já recebe, o caminho é outro: a revisão do benefício, que verifica se o INSS calculou corretamente o valor. Consulte nossa página de revisão.",
      },
      {
        q: "Preciso ir ao escritório?",
        a: "Você escolhe. O atendimento pode ser presencial, no escritório no Centro de Curitiba, ou online, com envio de documentos digitalizados e reuniões por vídeo ou WhatsApp.",
      },
    ],
    related: ["aposentadoria-por-tempo-de-contribuicao", "calculos-previdenciarios", "revisao-de-beneficios"],
  },
  {
    slug: "aposentadoria-por-idade",
    title: "Aposentadoria por Idade",
    short: "Por idade",
    index: "02",
    metaTitle: "Aposentadoria por Idade INSS: Requisitos e Como Pedir",
    metaDescription:
      "Idade mínima, tempo de contribuição e carência da aposentadoria por idade após a Reforma. Orientação para pedir ao INSS sem erros de cadastro.",
    keywords: [
      "aposentadoria por idade",
      "aposentadoria por idade requisitos",
      "idade mínima aposentadoria mulher 62",
      "carência INSS 15 anos",
    ],
    image: "/images/idade.jpg",
    imageAlt: "Mãos de um casal de idosos entrelaçadas",
    excerpt:
      "Idade mínima, carência e o cálculo do valor depois da Reforma. Organizamos a documentação para o pedido sair certo da primeira vez.",
    lead:
      "A aposentadoria por idade é o benefício mais pedido no INSS e, ainda assim, um dos que mais recebem exigências e negativas. Quase sempre o problema é cadastro incompleto ou contribuição que não aparece no sistema.",
    sections: [
      {
        heading: "Requisitos depois da Reforma da Previdência",
        body: [
          "Para quem é segurado do INSS (Regime Geral), a regra atual exige 62 anos de idade para mulheres e 65 anos para homens, além de tempo mínimo de contribuição.",
        ],
        list: [
          "Mulheres: 62 anos de idade e 15 anos de contribuição",
          "Homens que já contribuíam antes de 13/11/2019: 65 anos e 15 anos de contribuição",
          "Homens que começaram a contribuir depois dessa data: 65 anos e 20 anos de contribuição",
        ],
      },
      {
        heading: "Como o valor é calculado",
        body: [
          "O valor parte da média de todos os salários de contribuição desde julho de 1994. Sobre essa média aplica-se 60%, com acréscimo de 2% para cada ano que ultrapassar 15 anos de contribuição (mulheres) ou 20 anos (homens).",
          "Por isso, um único vínculo esquecido pode fazer diferença no valor final. Conferir o CNIS antes do pedido é o passo que mais protege o seu benefício.",
        ],
      },
      {
        heading: "Erros comuns que levam à negativa",
        body: [],
        list: [
          "Vínculos antigos que não constam no CNIS",
          "Contribuições como autônomo pagas com código errado ou abaixo do mínimo",
          "Períodos de auxílio-doença que poderiam contar como tempo e carência",
          "Datas de admissão ou demissão divergentes entre a carteira e o sistema",
        ],
      },
    ],
    documents: [
      "Documento de identidade e CPF",
      "Comprovante de residência",
      "Carteiras de trabalho",
      "Carnês e guias de recolhimento",
      "Extrato CNIS",
    ],
    faq: [
      {
        q: "Trabalhei sem registro em carteira. Esse tempo conta?",
        a: "Pode contar, desde que haja provas do vínculo, como recibos, declarações, fotos ou testemunhas, e em geral é preciso pedir o reconhecimento ao INSS ou na Justiça. Avaliamos as provas disponíveis no seu caso.",
      },
      {
        q: "Posso continuar trabalhando depois de aposentado por idade?",
        a: "Sim. A aposentadoria por idade não impede que você continue trabalhando com carteira assinada ou como autônomo.",
      },
    ],
    related: ["planejamento-previdenciario", "aposentadoria-rural", "revisao-de-beneficios"],
  },
  {
    slug: "aposentadoria-por-tempo-de-contribuicao",
    title: "Regras de Transição e Tempo de Contribuição",
    short: "Regras de transição",
    index: "03",
    metaTitle: "Regras de Transição da Aposentadoria: Pontos, Pedágio e Idade",
    metaDescription:
      "Regras de transição da Reforma para quem já contribuía antes de 2019: pontos, idade progressiva, pedágio de 50% e de 100%. Veja qual vale para você.",
    keywords: [
      "regras de transição aposentadoria",
      "aposentadoria por tempo de contribuição",
      "regra dos pontos 2026",
      "pedágio 50%",
      "pedágio 100%",
    ],
    image: "/images/transicao.jpg",
    imageAlt: "Mão escrevendo em um caderno aberto sobre a mesa",
    excerpt:
      "Pontos, idade progressiva, pedágio de 50% e de 100%. Quem já contribuía antes de 2019 pode ter várias saídas e cada uma paga diferente.",
    lead:
      "A aposentadoria por tempo de contribuição sem idade mínima acabou com a Reforma de 2019, mas quem já contribuía antes de 13 de novembro daquele ano ganhou regras de transição. Elas convivem entre si, e a mais rápida nem sempre é a que paga melhor.",
    sections: [
      {
        heading: "As quatro regras de transição",
        body: [
          "Todas exigem pelo menos 30 anos de contribuição para mulheres e 35 anos para homens. O que muda é o requisito adicional e a forma de calcular o valor.",
        ],
        list: [
          "Pontos: soma de idade e tempo de contribuição. Em 2026, 93 pontos para mulheres e 103 para homens, com aumento de 1 ponto por ano",
          "Idade mínima progressiva: em 2026, 59 anos e meio para mulheres e 64 anos e meio para homens, subindo seis meses por ano",
          "Pedágio de 50%: para quem estava a até dois anos de completar o tempo em 2019. Aplica o fator previdenciário",
          "Pedágio de 100%: idade mínima de 57 anos (mulheres) e 60 anos (homens), mais o dobro do tempo que faltava em 2019. Valor de 100% da média",
        ],
      },
      {
        heading: "Por que comparar antes de escolher",
        body: [
          "O pedágio de 100% costuma pagar mais, mas pode exigir alguns anos a mais de trabalho. A regra dos pontos pode chegar antes e pagar menos. Em alguns casos, esperar poucos meses muda bastante a renda.",
          "Somar períodos especiais convertidos (até 2019), tempo rural ou tempo de serviço público pode antecipar a data em qualquer uma das regras.",
        ],
      },
    ],
    documents: [
      "Carteiras de trabalho",
      "Extrato CNIS",
      "PPP e laudos de atividade especial, se houver",
      "Certidão de tempo de contribuição de regime próprio, se houver",
    ],
    faq: [
      {
        q: "Comecei a contribuir depois da Reforma. Tenho direito às regras de transição?",
        a: "Não. Quem se filiou ao INSS depois de 13/11/2019 segue a regra permanente, que exige idade mínima de 62 anos (mulheres) e 65 anos (homens).",
      },
      {
        q: "Posso converter tempo especial em comum?",
        a: "A conversão é permitida para períodos trabalhados até 13/11/2019. Depois dessa data, o tempo especial não pode mais ser convertido, mas pode ser usado na aposentadoria especial.",
      },
    ],
    related: ["planejamento-previdenciario", "aposentadoria-especial", "calculos-previdenciarios"],
  },
  {
    slug: "aposentadoria-especial",
    title: "Aposentadoria Especial",
    short: "Especial",
    index: "04",
    metaTitle: "Aposentadoria Especial: Atividade Insalubre e Agentes Nocivos",
    metaDescription:
      "Trabalhou exposto a ruído, calor, químicos ou agentes biológicos? Requisitos da aposentadoria especial, como provar com PPP e laudos, e conversão.",
    keywords: [
      "aposentadoria especial",
      "atividade insalubre aposentadoria",
      "PPP aposentadoria especial",
      "aposentadoria especial requisitos",
      "conversão tempo especial",
    ],
    image: "/images/especial.jpg",
    imageAlt: "Soldador de máscara trabalhando em meio a faíscas",
    excerpt:
      "Para quem trabalhou exposto a agentes nocivos à saúde. A prova certa (PPP e laudos) é o que separa o deferimento da negativa.",
    lead:
      "Quem trabalha exposto a agentes que prejudicam a saúde tem direito a se aposentar com menos tempo. Na prática, o INSS nega boa parte desses pedidos por falhas no PPP ou por entender que o EPI eliminou o risco. É aí que a análise técnica faz diferença.",
    sections: [
      {
        heading: "Quem pode ter direito",
        body: [
          "Trabalhadores expostos de forma habitual e permanente a agentes físicos, químicos ou biológicos acima dos limites de tolerância. Alguns exemplos:",
        ],
        list: [
          "Metalúrgicos, soldadores e trabalhadores da indústria expostos a ruído",
          "Profissionais da saúde: enfermagem, técnicos de laboratório, dentistas",
          "Frentistas e trabalhadores expostos a hidrocarbonetos",
          "Eletricistas expostos a tensão acima de 250 volts",
          "Vigilantes, conforme o caso e o período",
        ],
      },
      {
        heading: "Requisitos atuais",
        body: [
          "Depois da Reforma, a aposentadoria especial passou a exigir idade mínima combinada com o tempo de exposição: 55 anos com 15 anos de atividade, 58 anos com 20 anos ou 60 anos com 25 anos, conforme o grau de risco.",
          "Para quem já trabalhava em atividade especial antes de 13/11/2019 existe uma regra de transição por pontos: 66, 76 ou 86 pontos, somando idade e tempo de contribuição, mais o tempo mínimo de exposição.",
        ],
      },
      {
        heading: "A prova: PPP e laudos técnicos",
        body: [
          "O Perfil Profissiográfico Previdenciário (PPP) é o documento central. Ele precisa descrever os agentes, a intensidade da exposição e o responsável técnico pelos registros. PPPs incompletos ou com informações genéricas são a principal causa de negativa.",
          "Quando a empresa fechou ou se recusa a fornecer o documento, há caminhos: laudos de empresas similares, perícia judicial e outras provas.",
        ],
      },
    ],
    documents: [
      "PPP de cada empresa onde houve exposição",
      "LTCAT ou laudos técnicos, quando disponíveis",
      "Carteiras de trabalho",
      "Extrato CNIS",
    ],
    faq: [
      {
        q: "O uso de EPI tira o direito à aposentadoria especial?",
        a: "Depende do agente. Para ruído acima do limite, o entendimento consolidado é de que o EPI não afasta a especialidade. Para outros agentes, é preciso analisar a eficácia do equipamento no caso concreto.",
      },
      {
        q: "Posso continuar na mesma atividade depois de aposentado?",
        a: "Quem recebe aposentadoria especial não pode continuar trabalhando exposto aos mesmos agentes nocivos. Pode trabalhar em outra função que não envolva exposição.",
      },
    ],
    related: ["aposentadoria-por-tempo-de-contribuicao", "planejamento-previdenciario", "beneficios-por-incapacidade"],
  },
  {
    slug: "aposentadoria-rural",
    title: "Aposentadoria Rural",
    short: "Rural",
    index: "05",
    metaTitle: "Aposentadoria Rural: Requisitos e Como Comprovar Atividade Rural",
    metaDescription:
      "Aposentadoria rural aos 55 e 60 anos com 15 anos de atividade no campo. Quais documentos provam o trabalho rural e quando cabe a aposentadoria híbrida.",
    keywords: [
      "aposentadoria rural",
      "aposentadoria rural requisitos",
      "segurado especial",
      "comprovar atividade rural",
      "aposentadoria híbrida",
    ],
    image: "/images/rural.jpg",
    imageAlt: "Agricultor de costas observando a plantação ao entardecer",
    excerpt:
      "Para quem trabalhou no campo, sozinho ou em regime de economia familiar. A dificuldade quase sempre está em provar o período rural.",
    lead:
      "Quem trabalhou na roça pode se aposentar cinco anos mais cedo do que o trabalhador urbano, mesmo sem nunca ter recolhido ao INSS. O desafio é provar esse trabalho, muitas vezes feito há décadas e sem nenhum registro formal.",
    sections: [
      {
        heading: "Requisitos",
        body: [],
        list: [
          "Mulheres: 55 anos de idade",
          "Homens: 60 anos de idade",
          "15 anos de atividade rural, mesmo que de forma descontínua",
          "Estar trabalhando no campo no período imediatamente anterior ao pedido ou ao completar a idade",
        ],
      },
      {
        heading: "Como provar a atividade rural",
        body: [
          "A lei exige início de prova material, que pode ser complementada por testemunhas. Documentos em nome do próprio trabalhador ou de membros da família podem servir:",
        ],
        list: [
          "Notas fiscais de venda da produção",
          "Contratos de arrendamento, parceria ou comodato",
          "Certidões de casamento, nascimento ou óbito que indiquem a profissão de lavrador",
          "Cadastro em sindicato rural, ITR, CCIR ou declaração de aptidão ao Pronaf",
          "Fichas de matrícula escolar ou de atendimento de saúde em zona rural",
        ],
      },
      {
        heading: "Aposentadoria híbrida",
        body: [
          "Quem trabalhou parte da vida no campo e parte na cidade pode somar os dois períodos na chamada aposentadoria híbrida, com a idade do trabalhador urbano (62 anos para mulheres e 65 para homens). É uma saída para quem não completa os requisitos em nenhuma das modalidades isoladamente.",
        ],
      },
    ],
    documents: [
      "Documento de identidade e CPF",
      "Documentos rurais em nome próprio ou da família",
      "Certidões de casamento e nascimento dos filhos",
      "Carteiras de trabalho, se houver vínculos urbanos",
    ],
    faq: [
      {
        q: "Preciso ter contribuído para o INSS?",
        a: "O segurado especial (pequeno produtor em regime de economia familiar) não precisa ter recolhido contribuições. Basta comprovar o tempo de atividade rural.",
      },
      {
        q: "Moro na cidade hoje. Ainda posso pedir aposentadoria rural?",
        a: "Pode ser possível pela aposentadoria híbrida, somando o tempo rural antigo com contribuições urbanas. Cada caso precisa ser analisado.",
      },
    ],
    related: ["aposentadoria-por-idade", "planejamento-previdenciario", "bpc-loas"],
  },
  {
    slug: "aposentadoria-pessoa-com-deficiencia",
    title: "Aposentadoria da Pessoa com Deficiência",
    short: "Pessoa com deficiência",
    index: "06",
    metaTitle: "Aposentadoria da Pessoa com Deficiência (LC 142/2013)",
    metaDescription:
      "Aposentadoria com tempo reduzido para deficiência leve, moderada ou grave (LC 142/2013). Requisitos e como se preparar para a avaliação do INSS.",
    keywords: [
      "aposentadoria pessoa com deficiência",
      "aposentadoria PcD",
      "LC 142",
      "aposentadoria deficiência leve moderada grave",
    ],
    image: "/images/pcd.jpg",
    imageAlt: "Homem em cadeira de rodas trabalhando no notebook junto à janela",
    excerpt:
      "Tempo de contribuição reduzido conforme o grau da deficiência, sem idade mínima na modalidade por tempo. Uma regra que a Reforma manteve.",
    lead:
      "A aposentadoria da pessoa com deficiência foi preservada pela Reforma de 2019 e continua sendo uma das mais vantajosas do sistema. O valor pode chegar a 100% da média e, na modalidade por tempo, não há idade mínima.",
    sections: [
      {
        heading: "Modalidade por tempo de contribuição",
        body: ["O tempo exigido varia conforme o grau da deficiência, definido em avaliação do INSS:"],
        list: [
          "Deficiência grave: 20 anos (mulheres) e 25 anos (homens)",
          "Deficiência moderada: 24 anos (mulheres) e 29 anos (homens)",
          "Deficiência leve: 28 anos (mulheres) e 33 anos (homens)",
        ],
      },
      {
        heading: "Modalidade por idade",
        body: [
          "55 anos para mulheres e 60 anos para homens, com pelo menos 15 anos de contribuição na condição de pessoa com deficiência, independentemente do grau.",
        ],
      },
      {
        heading: "A avaliação biopsicossocial",
        body: [
          "O grau da deficiência é definido por perícia médica e avaliação social, que consideram não só a condição de saúde, mas as barreiras enfrentadas no trabalho e na vida diária. Chegar preparado, com laudos atualizados e relatórios que descrevam essas barreiras, influencia diretamente no resultado.",
        ],
      },
    ],
    documents: [
      "Laudos médicos com CID e histórico da deficiência",
      "Exames e relatórios de acompanhamento",
      "Carteiras de trabalho e extrato CNIS",
      "Documentos que mostrem adaptações no trabalho, se houver",
    ],
    faq: [
      {
        q: "A deficiência precisa existir desde o início da vida profissional?",
        a: "Não. Se a deficiência surgiu durante a vida profissional, o tempo é calculado de forma proporcional, convertendo os períodos com e sem deficiência.",
      },
      {
        q: "Visão monocular conta como deficiência?",
        a: "Sim. A visão monocular é reconhecida por lei como deficiência sensorial, e o grau será definido na avaliação.",
      },
    ],
    related: ["beneficios-por-incapacidade", "bpc-loas", "planejamento-previdenciario"],
  },
  {
    slug: "pensao-por-morte",
    title: "Pensão por Morte",
    short: "Pensão por morte",
    index: "07",
    metaTitle: "Pensão por Morte INSS: Quem Tem Direito, Valor e Duração",
    metaDescription:
      "Quem tem direito à pensão por morte, como o valor é calculado após a Reforma e por quanto tempo é paga. Orientação para cônjuges, companheiros e filhos.",
    keywords: [
      "pensão por morte",
      "pensão por morte INSS",
      "pensão por morte união estável",
      "valor pensão por morte",
      "duração pensão por morte",
    ],
    image: "/images/pensao.jpg",
    imageAlt: "Mãos de uma pessoa idosa tocando a aliança de casamento",
    excerpt:
      "Proteção para a família que fica. Cuidamos do pedido, inclusive em casos de união estável que o INSS costuma questionar.",
    lead:
      "A pensão por morte garante renda aos dependentes de quem contribuía para o INSS ou já era aposentado. Num momento já difícil, o pedido costuma esbarrar em exigências burocráticas, principalmente quando é preciso provar união estável ou dependência econômica.",
    sections: [
      {
        heading: "Quem tem direito",
        body: [],
        list: [
          "Cônjuge, companheiro ou companheira, inclusive em união homoafetiva",
          "Filhos menores de 21 anos ou com invalidez ou deficiência",
          "Pais, se comprovarem dependência econômica e não houver dependentes anteriores",
          "Irmãos menores de 21 anos ou inválidos, nas mesmas condições",
        ],
      },
      {
        heading: "Valor do benefício",
        body: [
          "Depois da Reforma, a pensão corresponde a uma cota familiar de 50% do valor da aposentadoria (recebida ou a que o falecido teria direito), mais 10% por dependente, até o limite de 100%. Quando um dependente perde a qualidade, sua cota não é repassada aos demais.",
        ],
      },
      {
        heading: "Por quanto tempo é paga",
        body: [
          "Para cônjuges e companheiros, a duração depende da idade do dependente na data do óbito, do tempo de casamento ou união e do número de contribuições do falecido. Pode ser de quatro meses até vitalícia. Filhos recebem até completar 21 anos, salvo invalidez ou deficiência.",
        ],
      },
    ],
    documents: [
      "Certidão de óbito",
      "Certidão de casamento ou provas de união estável",
      "Documentos pessoais do falecido e dos dependentes",
      "Carteiras de trabalho e comprovantes de contribuição do falecido",
    ],
    faq: [
      {
        q: "Como provar união estável para o INSS?",
        a: "É preciso apresentar documentos como comprovante de endereço em comum, conta conjunta, declaração de imposto de renda com dependente, filhos em comum ou plano de saúde. Para uniões com mais de dois anos, há exigência de provas materiais.",
      },
      {
        q: "Qual o prazo para pedir a pensão?",
        a: "Pedidos feitos em até 90 dias do óbito garantem pagamento desde a data do falecimento (180 dias para filhos menores de 16 anos). Depois desse prazo, o pagamento conta a partir do pedido.",
      },
    ],
    related: ["bpc-loas", "revisao-de-beneficios", "planejamento-previdenciario"],
  },
  {
    slug: "bpc-loas",
    title: "BPC/LOAS",
    short: "BPC/LOAS",
    index: "08",
    metaTitle: "BPC/LOAS: Benefício para Idosos e Pessoas com Deficiência",
    metaDescription:
      "BPC/LOAS: um salário mínimo para idosos a partir de 65 anos e pessoas com deficiência de baixa renda. Requisitos, critério de renda e como pedir.",
    keywords: [
      "BPC LOAS",
      "benefício de prestação continuada",
      "LOAS idoso",
      "LOAS deficiente",
      "critério de renda BPC",
    ],
    image: "/images/bpc.jpg",
    imageAlt: "Retrato de uma senhora idosa em ambiente com pouca luz",
    excerpt:
      "Um salário mínimo por mês para idosos e pessoas com deficiência em situação de baixa renda, mesmo sem nunca ter contribuído.",
    lead:
      "O BPC é um benefício assistencial, pago pelo INSS, que não exige contribuição. É voltado a quem tem 65 anos ou mais, ou a pessoas com deficiência de qualquer idade, cuja família não tem meios de garantir o próprio sustento.",
    sections: [
      {
        heading: "Quem pode receber",
        body: [],
        list: [
          "Idosos com 65 anos ou mais",
          "Pessoas com deficiência de longo prazo, de qualquer idade, inclusive crianças",
          "Renda familiar por pessoa de até 1/4 do salário mínimo, com possibilidade de flexibilização conforme o caso",
          "Inscrição atualizada no CadÚnico",
        ],
      },
      {
        heading: "O critério de renda na prática",
        body: [
          "O INSS soma a renda das pessoas que vivem na mesma casa e divide pelo número de moradores. Algumas despesas e rendas podem ser desconsideradas, como gastos com medicamentos e tratamentos não oferecidos pelo SUS. A Justiça tem admitido a análise da situação real de vulnerabilidade, e não só o número.",
        ],
      },
      {
        heading: "O que o BPC não paga",
        body: [
          "O BPC não dá direito a 13º salário e não gera pensão por morte aos familiares. Por isso, quando há contribuições ao INSS, vale verificar antes se a pessoa já tem direito a alguma aposentadoria, que costuma ser mais vantajosa.",
        ],
      },
    ],
    documents: [
      "Documentos pessoais de todos os moradores da casa",
      "Comprovante de inscrição no CadÚnico",
      "Comprovantes de renda da família",
      "Laudos médicos, no caso de pessoa com deficiência",
      "Comprovantes de gastos com saúde",
    ],
    faq: [
      {
        q: "Quem recebe BPC pode trabalhar?",
        a: "A pessoa com deficiência pode ter o benefício suspenso ao começar a trabalhar e retomá-lo depois, se o vínculo terminar. Há também regras específicas para o auxílio-inclusão.",
      },
      {
        q: "O BPC de outro idoso da família entra no cálculo da renda?",
        a: "Não. O BPC ou a aposentadoria de até um salário mínimo recebidos por outro idoso ou pessoa com deficiência da família não entram no cálculo da renda.",
      },
    ],
    related: ["aposentadoria-pessoa-com-deficiencia", "aposentadoria-por-idade", "pensao-por-morte"],
  },
  {
    slug: "beneficios-por-incapacidade",
    title: "Benefícios por Incapacidade",
    short: "Incapacidade",
    index: "09",
    metaTitle: "Auxílio-Doença e Aposentadoria por Invalidez: Como Garantir",
    metaDescription:
      "Auxílio-doença e aposentadoria por invalidez: requisitos, carência, como se preparar para a perícia do INSS e o que fazer se o pedido for negado.",
    keywords: [
      "auxílio-doença",
      "aposentadoria por invalidez",
      "auxílio por incapacidade temporária",
      "perícia INSS negada",
      "auxílio-acidente",
    ],
    image: "/images/incapacidade.jpg",
    imageAlt: "Pulso enfaixado sendo cuidado",
    excerpt:
      "Auxílio-doença, aposentadoria por invalidez e auxílio-acidente. Preparação para a perícia e recurso em caso de negativa.",
    lead:
      "Quando uma doença ou acidente impede o trabalho, o INSS deve garantir a renda do segurado. O ponto decisivo é a perícia médica, e é ali que a maior parte dos pedidos é negada.",
    sections: [
      {
        heading: "Os benefícios",
        body: [],
        list: [
          "Auxílio por incapacidade temporária (antigo auxílio-doença): para incapacidade por mais de 15 dias",
          "Aposentadoria por incapacidade permanente (antiga aposentadoria por invalidez): quando não há perspectiva de recuperação ou reabilitação",
          "Auxílio-acidente: indenização mensal para quem ficou com sequela que reduz a capacidade de trabalho",
        ],
      },
      {
        heading: "Requisitos",
        body: [
          "Em regra, é preciso ter qualidade de segurado e 12 meses de carência. A carência é dispensada em acidentes de qualquer natureza e em doenças graves previstas em lei, como câncer, cardiopatia grave e doença de Parkinson, entre outras.",
        ],
      },
      {
        heading: "Como se preparar para a perícia",
        body: [
          "O perito avalia a incapacidade para o seu trabalho, não apenas a doença. Laudos que descrevam limitações concretas (por exemplo, não poder carregar peso ou ficar em pé por longos períodos) e a relação com a sua atividade têm muito mais força do que um atestado genérico.",
          "Se o pedido for negado, é possível recorrer administrativamente ou entrar com ação judicial, com nova perícia feita por médico nomeado pelo juiz.",
        ],
      },
    ],
    documents: [
      "Laudos, exames e atestados com CID, data de início e descrição das limitações",
      "Receitas e comprovantes de tratamento",
      "Carteiras de trabalho e extrato CNIS",
      "Comunicação de Acidente de Trabalho (CAT), se for o caso",
    ],
    faq: [
      {
        q: "Meu auxílio-doença foi cessado, mas ainda não consigo trabalhar. O que fazer?",
        a: "Você pode pedir a prorrogação antes da data de cessação ou, se já cessou, fazer novo pedido ou recurso. Em muitos casos, a ação judicial é o caminho mais efetivo.",
      },
      {
        q: "Quem recebe auxílio-acidente pode trabalhar?",
        a: "Sim. O auxílio-acidente é uma indenização e pode ser recebido junto com o salário.",
      },
    ],
    related: ["aposentadoria-pessoa-com-deficiencia", "bpc-loas", "aposentadoria-especial"],
  },
  {
    slug: "salario-maternidade",
    title: "Salário-Maternidade",
    short: "Salário-maternidade",
    index: "10",
    metaTitle: "Salário-Maternidade INSS: Quem Tem Direito e Como Pedir",
    metaDescription:
      "Salário-maternidade para empregadas, MEIs, autônomas, desempregadas, trabalhadoras rurais e em casos de adoção. Requisitos, duração e como pedir.",
    keywords: [
      "salário-maternidade",
      "salário-maternidade desempregada",
      "salário-maternidade MEI",
      "salário-maternidade rural",
      "auxílio-maternidade",
    ],
    image: "/images/maternidade.jpg",
    imageAlt: "Mãos segurando os pés de um bebê recém-nascido",
    excerpt:
      "120 dias de benefício para mães, inclusive desempregadas, autônomas, MEIs, rurais e em casos de adoção.",
    lead:
      "Muita gente acha que o salário-maternidade é só para quem tem carteira assinada. Não é. MEIs, autônomas, trabalhadoras rurais e até mulheres desempregadas que ainda mantêm a qualidade de segurada podem ter direito.",
    sections: [
      {
        heading: "Quem tem direito",
        body: [],
        list: [
          "Empregadas com carteira assinada, inclusive domésticas",
          "Contribuintes individuais, MEIs e facultativas",
          "Seguradas especiais (trabalhadoras rurais)",
          "Desempregadas que ainda estejam no período de graça",
          "Quem adota ou obtém guarda judicial para adoção, inclusive homens",
        ],
      },
      {
        heading: "Duração e valor",
        body: [
          "O benefício é pago por 120 dias. O valor depende da categoria: para empregadas, corresponde ao salário; para contribuintes individuais e MEIs, à média das últimas contribuições; para seguradas especiais, a um salário mínimo.",
        ],
      },
      {
        heading: "Prazo para pedir",
        body: [
          "O pedido pode ser feito a partir de 28 dias antes do parto e em até cinco anos depois. Quem perdeu o prazo sem saber que tinha direito ainda pode pedir os valores retroativos dentro desse período.",
        ],
      },
    ],
    documents: [
      "Certidão de nascimento da criança ou termo de guarda",
      "Documento de identidade e CPF",
      "Carteira de trabalho ou comprovantes de contribuição",
      "Documentos rurais, no caso de segurada especial",
    ],
    faq: [
      {
        q: "Estou desempregada. Ainda tenho direito?",
        a: "Pode ter, se estiver dentro do período de graça, que costuma ser de 12 meses após o último vínculo e pode ser estendido em algumas situações.",
      },
      {
        q: "Em caso de aborto espontâneo há direito ao benefício?",
        a: "Sim. Em caso de aborto não criminoso, comprovado por atestado médico, é devido o salário-maternidade por duas semanas.",
      },
    ],
    related: ["beneficios-por-incapacidade", "pensao-por-morte", "planejamento-previdenciario"],
  },
  {
    slug: "revisao-de-beneficios",
    title: "Revisão de Benefícios",
    short: "Revisão",
    index: "11",
    metaTitle: "Revisão de Aposentadoria e Benefícios do INSS",
    metaDescription:
      "Seu benefício do INSS pode ter sido calculado com erro. Quando cabe revisão de aposentadoria ou pensão, os erros mais comuns e o prazo de 10 anos.",
    keywords: [
      "revisão de aposentadoria",
      "revisão do benefício INSS",
      "erro no cálculo da aposentadoria",
      "prazo decadencial revisão",
    ],
    image: "/images/revisao.jpg",
    imageAlt: "Mãos segurando documentos impressos",
    excerpt:
      "Conferimos se o INSS calculou certo. Vínculos esquecidos, salários menores e períodos especiais ignorados são erros frequentes.",
    lead:
      "O INSS concede o benefício com base nas informações do próprio sistema, que nem sempre estão completas. Um vínculo que ficou de fora ou um período especial não reconhecido podem reduzir o valor da aposentadoria por toda a vida.",
    sections: [
      {
        heading: "Erros mais comuns",
        body: [],
        list: [
          "Vínculos ou contribuições que não constavam no CNIS",
          "Salários de contribuição registrados com valor menor que o real",
          "Períodos especiais ou rurais desconsiderados",
          "Reconhecimento de direito a uma regra mais vantajosa que não foi aplicada",
          "Verbas reconhecidas em ação trabalhista que não foram incluídas",
        ],
      },
      {
        heading: "Prazo para revisar",
        body: [
          "Em regra, o prazo é de dez anos contados a partir do mês seguinte ao primeiro pagamento. Passado esse prazo, o direito de revisar o ato de concessão se perde. Por isso, vale fazer a análise o quanto antes.",
        ],
      },
      {
        heading: "Como funciona a análise",
        body: [
          "Pedimos a carta de concessão e o processo administrativo, refazemos o cálculo e comparamos com o valor pago. Só indicamos a revisão quando há diferença concreta e fundamentada, explicando os riscos de cada caminho.",
        ],
      },
    ],
    documents: [
      "Carta de concessão do benefício",
      "Cópia do processo administrativo (pode ser obtida no Meu INSS)",
      "Carteiras de trabalho e extrato CNIS",
      "Sentença trabalhista, se houver",
    ],
    faq: [
      {
        q: "A revisão pode diminuir o valor do meu benefício?",
        a: "Em alguns casos existe esse risco, por isso o cálculo prévio é indispensável. Nenhum pedido é feito sem antes medir esse cenário com você.",
      },
      {
        q: "Recebo os valores atrasados?",
        a: "Se a revisão for reconhecida, em regra são pagas as diferenças dos últimos cinco anos, com correção.",
      },
    ],
    related: ["calculos-previdenciarios", "planejamento-previdenciario", "pensao-por-morte"],
  },
  {
    slug: "calculos-previdenciarios",
    title: "Cálculos Previdenciários",
    short: "Cálculos",
    index: "12",
    metaTitle: "Cálculos Previdenciários: Simulação de Aposentadoria e RMI",
    metaDescription:
      "Cálculo de tempo de contribuição, renda mensal inicial (RMI) e simulação de aposentadoria em todas as regras. Para segurados e advogados.",
    keywords: [
      "cálculos previdenciários",
      "cálculo de aposentadoria",
      "simulação de aposentadoria",
      "cálculo RMI",
      "tempo de contribuição",
    ],
    image: "/images/calculos.jpg",
    imageAlt: "Dedo digitando em uma calculadora sobre uma planilha",
    excerpt:
      "Tempo de contribuição, RMI e simulações em todas as regras, com relatório claro. Também atendemos colegas advogados.",
    lead:
      "Um cálculo bem feito responde às perguntas que importam: quando posso me aposentar, quanto vou receber e o que muda se eu esperar. É a base técnica de todo planejamento, pedido ou revisão.",
    sections: [
      {
        heading: "O que calculamos",
        body: [],
        list: [
          "Tempo de contribuição e carência, com conferência do CNIS",
          "Renda mensal inicial (RMI) em cada regra de aposentadoria",
          "Conversão de tempo especial e contagem de tempo rural",
          "Valores atrasados e diferenças em revisões",
          "Projeções com contribuições futuras",
        ],
      },
      {
        heading: "Para segurados e para advogados",
        body: [
          "Atendemos segurados que querem entender a própria situação antes de qualquer decisão e também colegas advogados que precisam de suporte técnico em cálculos para processos administrativos e judiciais.",
        ],
      },
    ],
    documents: ["Extrato CNIS", "Carteiras de trabalho", "Carta de concessão, para revisões"],
    faq: [
      {
        q: "O simulador do Meu INSS não basta?",
        a: "O simulador usa apenas os dados que constam no sistema e não considera períodos ainda não reconhecidos, como tempo especial ou rural. Ele é um ponto de partida, mas costuma ficar incompleto.",
      },
    ],
    related: ["planejamento-previdenciario", "revisao-de-beneficios", "aposentadoria-por-tempo-de-contribuicao"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
