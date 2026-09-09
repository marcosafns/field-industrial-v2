/**
 * Conteúdo editorial — Field Industrial
 * Fonte: site atual (fieldindustrial.com.br) + Apresentação Institucional 2027 rev.01
 */

export const company = {
  name: 'Field Industrial',
  legal: 'Fernando H de Lima Engenharia',
  cnpj: '48.922.137/0001-20',
  crea: 'CREA 2687892',
  tagline: 'Turning challenges into opportunity',
  city: 'Lençóis Paulista — SP',
  zip: 'CEP 18683-804',
  phone: '(14) 99757-5433',
  phoneHref: 'tel:+5514997575433',
  whatsapp:
    'https://wa.me/5514997575433?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20Field%20Industrial.',
  email: 'contato@fieldindustrial.com.br',
  linkedin: 'https://www.linkedin.com/company/fieldindustrial',
  instagram: 'https://www.instagram.com/fieldindustrial',
  site: 'www.fieldindustrial.com.br',
}

export const nav = [
  { id: 'empresa', label: 'Empresa', index: '01' },
  { id: 'atuacao', label: 'Atuação', index: '02' },
  { id: 'servicos', label: 'Serviços', index: '03' },
  { id: 'metodo', label: 'Método', index: '04' },
  { id: 'trajetoria', label: 'Trajetória', index: '05' },
  { id: 'contato', label: 'Contato', index: '06' },
]

export const hero = {
  eyebrow: 'Engenharia · Planejamento · Gestão',
  lines: ['Engenharia', 'aplicada à', 'tomada de decisão'],
  body: 'A Field Industrial estrutura grandes paradas de manutenção, obras industriais e projetos de engenharia — integrando conhecimento técnico, planejamento e gestão de riscos para transformar desafios complexos em resultados previsíveis.',
  meta: [
    { k: 'Desde', v: '2007 em campo' },
    { k: 'Base', v: 'Lençóis Paulista · SP' },
    { k: 'Registro', v: 'CREA 2687892' },
  ],
}

export const metrics = [
  { value: 18, suffix: '+', label: 'Anos de experiência', note: 'Do chão de fábrica ao planejamento' },
  { value: 20, suffix: '+', label: 'Projetos executados', note: 'Paradas, obras e engenharia' },
  { value: 50, suffix: '+', label: 'Clientes atendidos', note: 'Seis segmentos industriais' },
  { value: 300, suffix: '+', label: 'Profissionais coordenados', note: 'Equipes multidisciplinares' },
]

export const about = {
  index: '01',
  kicker: 'Quem somos',
  title: 'Engenharia aplicada à tomada de decisão',
  paragraphs: [
    'A Field Industrial é especializada no planejamento estratégico de empreendimentos industriais. Atuamos na estruturação de grandes paradas de manutenção, obras industriais e projetos de engenharia.',
    'Integramos conhecimento técnico, planejamento e gestão de riscos para transformar desafios complexos em resultados previsíveis e sustentáveis.',
  ],
  pillars: [
    {
      title: 'Foco em resultados',
      desc: 'Transformamos planejamento em decisões que geram impacto real no desempenho do negócio.',
    },
    {
      title: 'Experiência que faz a diferença',
      desc: 'Mais de 18 anos de atuação em grandes projetos e paradas industriais em diversos setores.',
    },
    {
      title: 'Segurança e confiabilidade',
      desc: 'Nossas soluções priorizam segurança, qualidade e conformidade em todas as etapas.',
    },
    {
      title: 'Parceria estratégica',
      desc: 'Atuamos lado a lado com nossos clientes, integrando equipes e entregando valor em cada decisão tomada.',
    },
  ],
}

export const domains = {
  index: '02',
  kicker: 'Áreas de atuação',
  title: 'Frentes estratégicas em todo o ciclo do empreendimento',
  lede: 'Atuamos em frentes que geram valor em todo o ciclo do empreendimento industrial, integrando engenharia, planejamento e gestão para entregar resultados consistentes.',
  items: [
    {
      code: 'A',
      title: 'Grandes paradas de manutenção',
      image: '/media/inspection.jpg',
      alt: 'Equipe de inspeção avaliando vaso de pressão durante parada industrial',
      items: [
        'Gestão do escopo',
        'Planejamento estratégico',
        'Levantamento e controle orçamentário',
        'Governança da parada',
        'Gestão integrada da execução',
      ],
    },
    {
      code: 'B',
      title: 'Engenharia mecânica',
      image: '/media/machined-parts.jpg',
      alt: 'Componentes mecânicos usinados — engrenagens, eixos e rolamentos',
      items: [
        'Soluções para equipamentos',
        'Estudos técnicos',
        'Engenharia reversa',
        'Projetos industriais',
      ],
    },
    {
      code: 'C',
      title: 'Obras e empreendimentos',
      image: '/media/piping.jpg',
      alt: 'Rede de tubulação de processo com válvulas e instrumentação instalada',
      items: [
        'Planejamento executivo',
        'Coordenação multidisciplinar',
        'Controle físico-financeiro',
        'Gestão de risco e contratual',
      ],
    },
  ],
}

export const services = {
  index: '03',
  kicker: 'Serviços',
  title: 'O que entregamos',
  lede: 'Cada serviço nasce da mesma disciplina: entender o ativo, dimensionar o risco e devolver ao cliente uma decisão sustentada por evidência técnica.',
  items: [
    {
      n: '01',
      title: 'Engenharia reversa',
      image: '/media/machined-parts.jpg',
      alt: 'Peças mecânicas usinadas em aço sobre bancada',
      desc: 'Transformamos equipamentos existentes em soluções completas de engenharia, mesmo na ausência de documentação técnica original. Levantamos componentes e sistemas em campo — dimensões, materiais, funcionamento e condições operacionais — e devolvemos modelos 3D, desenhos técnicos e a documentação necessária para reprodução, substituição ou melhoria.',
      bullets: [
        'Reprodução de peças sem desenho original',
        'Substituição de componentes obsoletos',
        'Nacionalização de equipamentos',
        'Levantamento dimensional in loco',
        'Modelagem 3D e detalhamento técnico',
      ],
    },
    {
      n: '02',
      title: 'Fabricação, montagem, soldagem e inspeção',
      image: '/media/cnc.jpg',
      alt: 'Torno CNC usinando eixo de aço em ambiente fabril',
      desc: 'Monitoramento técnico e supervisão especializada durante fabricação, montagem mecânica e soldagem, garantindo conformidade com especificações de projeto e normas técnicas em cada etapa.',
      bullets: [
        'Inspeção de materiais e certificados',
        'Qualificação de procedimentos de soldagem (WPS/PQR)',
        'Supervisão de montagem mecânica e soldas',
        'Verificação dimensional e geométrica',
        'Testes de estanqueidade e pressão',
        'Conformidade com ASME, AWS e ABNT',
      ],
    },
    {
      n: '03',
      title: 'Estudo e desenvolvimento de equipamentos',
      image: '/media/blueprint.jpg',
      alt: 'Prancha de desenho técnico de módulo de bomba com detalhamento',
      desc: 'Desenvolvimento completo de projetos de equipamentos industriais, do memorial de cálculo ao projeto detalhado para fabricação.',
      bullets: [
        'Memorial de cálculo estrutural e de pressão',
        'Projeto detalhado conforme ASME VIII',
        'Seleção de materiais e componentes',
        'Desenhos técnicos e especificações',
        'Análise de integridade e vida útil',
      ],
    },
    {
      n: '04',
      title: 'Laudos de integridade mecânica',
      image: '/media/integrity-report.jpg',
      alt: 'Relatório técnico de integridade estrutural assinado',
      desc: 'Avaliação técnica e emissão de laudos conforme normas regulamentadoras pertinentes, códigos ASME e demais requisitos regulatórios.',
      bullets: [
        'Laudo de vasos de pressão (NR-13)',
        'Laudo de caldeiras e tubulações',
        'Avaliação de segurança de máquinas (NR-12)',
        'Inspeção com ART/RRT',
        'Plano de inspeção e manutenção',
      ],
    },
    {
      n: '05',
      title: 'Gestão de paradas de manutenção',
      image: '/media/team-blueprint.jpg',
      alt: 'Engenheiros analisando prancha técnica em planta industrial',
      desc: 'Planejamento, gestão e auditoria de paradas de manutenção e obras industriais, com foco em segurança, eficiência e cumprimento de prazos.',
      bullets: [
        'Planejamento e cronograma de parada',
        'Coordenação de equipes multidisciplinares',
        'Controle de escopo, prazo e custo',
        'Auditorias de segurança e qualidade',
        'Relatórios de desempenho e lições aprendidas',
      ],
    },
    {
      n: '06',
      title: 'Fabricação e suporte metalúrgico',
      image: '/media/piping.jpg',
      alt: 'Rede de tubulação industrial com válvulas e instrumentação',
      desc: 'Serviços especializados em caldeiraria e soldagem, com suporte técnico metalúrgico para fabricação e reparo de equipamentos industriais.',
      bullets: [
        'Caldeiraria pesada e leve',
        'Soldagem estrutural e de pressão',
        'Suporte técnico metalúrgico',
        'Reparo e recuperação de equipamentos',
        'Controle de qualidade na fabricação',
      ],
    },
  ],
}

export const method = {
  index: '04',
  kicker: 'Como transformamos estratégia em execução',
  title: 'Seis movimentos, uma disciplina',
  lede: 'Convertemos objetivos estratégicos em planos sólidos e executáveis, integrando pessoas, processos e tecnologia para garantir resultados com segurança, prazo e custo sob controle.',
  steps: [
    {
      n: '01',
      title: 'Entender',
      items: ['Alinhamos objetivos', 'Mapeamos desafios', 'Identificamos riscos e oportunidades'],
    },
    {
      n: '02',
      title: 'Planejar',
      items: [
        'Definimos escopo e estratégia',
        'Estruturamos o plano de execução',
        'Planejamos recursos, prazos e orçamento',
      ],
    },
    {
      n: '03',
      title: 'Integrar',
      items: [
        'Engajamos equipes e stakeholders',
        'Integramos disciplinas e fornecedores',
        'Garantimos comunicação e governança',
      ],
    },
    {
      n: '04',
      title: 'Executar',
      items: [
        'Acompanhamos a execução em tempo real',
        'Gerenciamos mudanças e imprevistos',
        'Asseguramos segurança e qualidade',
      ],
    },
    {
      n: '05',
      title: 'Controlar',
      items: [
        'Monitoramos indicadores e desempenho',
        'Controlamos custos, prazos e escopo',
        'Atuamos com foco em prevenção e correção',
      ],
    },
    {
      n: '06',
      title: 'Entregar e gerar valor',
      items: [
        'Entregamos resultados consistentes',
        'Geramos aprendizado e melhoria contínua',
        'Transformamos cada projeto em referência',
      ],
    },
  ],
  commitments: [
    {
      title: 'Planejamento inteligente',
      desc: 'Dados, experiência e método para decisões mais assertivas e redução de incertezas.',
    },
    {
      title: 'Gestão integrada e transparente',
      desc: 'Visão completa do projeto e comunicação clara entre todas as partes.',
    },
    {
      title: 'Foco em resultados e valor',
      desc: 'Metodologia orientada para gerar valor real ao negócio e impacto positivo na operação.',
    },
    {
      title: 'Segurança e sustentabilidade',
      desc: 'Compromisso inegociável com pessoas, meio ambiente e o futuro da indústria.',
    },
  ],
}

export const why = {
  index: '05',
  kicker: 'Por que a Field',
  title: 'Mais do que entregar projetos, entregamos previsibilidade',
  lede: 'Unimos experiência prática, conhecimento técnico e visão estratégica para transformar desafios complexos em valor real para o seu negócio.',
  items: [
    {
      title: 'Experiência que gera impacto',
      desc: 'Mais de 18 anos de atuação em projetos e paradas industriais em diferentes segmentos e complexidades.',
    },
    {
      title: 'Conhecimento que antecipa',
      desc: 'Visão técnica e estratégica para prever riscos, identificar oportunidades e tomar decisões com segurança.',
    },
    {
      title: 'Equipes que entregam',
      desc: 'Profissionais experientes, comprometidos e integrados, que atuam como extensão do seu time.',
    },
    {
      title: 'Segurança e confiabilidade',
      desc: 'Compromisso inegociável com a vida, com o meio ambiente e com a excelência em cada etapa do projeto.',
    },
    {
      title: 'Foco em resultados e valor',
      desc: 'Atuação orientada à geração de valor, com disciplina em custos, prazos e performance operacional.',
    },
    {
      title: 'Parceria de verdade',
      desc: 'Transparência, ética e comunicação clara para construir relações duradouras e de confiança.',
    },
  ],
  banner: {
    lead: 'A Field não apenas executa.',
    strong: 'A Field transforma estratégia em',
    accent: 'resultados sustentáveis.',
  },
}

export const history = {
  index: '06',
  kicker: 'Nossa história',
  title: 'Uma trajetória construída em campo',
  paragraphs: [
    'A Field Industrial nasceu da experiência construída por **Fernando Henrique de Lima** ao longo de mais de 18 anos de atuação na indústria.',
    'Da execução no chão de fábrica ao planejamento de grandes empreendimentos, essa trajetória demonstrou que os maiores desafios de uma obra ou parada são definidos muito antes da execução: **no planejamento**.',
  ],
  quote: {
    text: 'Planejar é reduzir as incertezas a um nível aceitável para a tomada de decisão.',
    author: 'Fernando Henrique de Lima',
    role: 'Fundador e Diretor Técnico',
  },
  timeline: [
    {
      year: '2007',
      title: 'Início da trajetória',
      desc: 'Primeiros passos na indústria atuando na execução e montagem mecânica, construindo uma base sólida de conhecimento prático.',
    },
    {
      year: '2014',
      title: 'Evolução técnica',
      desc: 'Consolidação da experiência em manutenção industrial, assumindo posições de liderança e gestão de equipes.',
    },
    {
      year: '2020',
      title: 'Foco em planejamento',
      desc: 'Atuação dedicada ao planejamento de grandes paradas e projetos, integrando estratégia, engenharia e controle de execução.',
    },
    {
      year: '2023',
      title: 'Nasce a Field Industrial',
      desc: 'Surge a Field Industrial para transformar experiência em soluções estratégicas, ajudando indústrias a tomarem decisões melhores e mais seguras.',
    },
    {
      year: 'Hoje',
      title: 'Olhando para o futuro',
      desc: 'Seguimos evoluindo, inovando e gerando valor para nossos clientes, com o compromisso de transformar desafios em oportunidades.',
    },
  ],
}

export const philosophy = {
  kicker: 'Nossa filosofia',
  title: 'O que nos move e nos diferencia',
  lede: 'Nossa filosofia orienta cada decisão, cada plano e cada entrega.',
  cards: [
    {
      label: 'Missão',
      text: 'Transformar conhecimento técnico em decisões que aumentem a segurança, a previsibilidade e o desempenho dos empreendimentos industriais.',
    },
    {
      label: 'Visão',
      text: 'Ser reconhecida como referência em engenharia e planejamento estratégico para a indústria, gerando valor sustentável para clientes, pessoas e sociedade.',
    },
    {
      label: 'Propósito',
      text: 'Impulsionar resultados e criar oportunidades, transformando desafios em soluções que fortalecem o futuro da indústria.',
    },
  ],
  values: [
    { title: 'Segurança', desc: 'Prioridade inegociável em todas as ações.' },
    { title: 'Ética', desc: 'Conduta íntegra em cada relação e contrato.' },
    { title: 'Excelência técnica', desc: 'Zero tolerância a desvios de qualidade.' },
    { title: 'Compromisso com resultados', desc: 'Disciplina em custos, prazos e escopo.' },
    { title: 'Transparência', desc: 'Comunicação clara e responsável com o cliente.' },
    { title: 'Inovação', desc: 'Busca contínua por métodos melhores.' },
    { title: 'Respeito às pessoas', desc: 'Equipes tratadas como parte do resultado.' },
  ],
}

export const compliance = [
  { code: 'NR-13', desc: 'Vasos de pressão, caldeiras e tubulações' },
  { code: 'NR-12', desc: 'Segurança em máquinas e equipamentos' },
  { code: 'ASME', desc: 'Projeto e inspeção conforme código' },
  { code: 'AWS', desc: 'Qualificação de procedimentos de soldagem' },
  { code: 'ABNT', desc: 'Normas técnicas brasileiras' },
  { code: 'ART/RRT', desc: 'Responsabilidade técnica registrada' },
]

export const segments = [
  'Celulose e papel',
  'Alimentos e bebidas',
  'Bioenergia',
  'Energia',
  'Siderurgia',
  'Óleo e gás',
]

export const clients = [
  { name: 'Bracell', logo: '/media/clients/bracell.png' },
  { name: 'Bracell Papéis', logo: '/media/clients/bracell-papeis.png' },
  { name: 'Barbieri', logo: '/media/clients/barbieri.png' },
  { name: 'Micro Metal', logo: '/media/clients/micrometal.png' },
  { name: 'Grupo Água Bonita', logo: '/media/clients/aguabonita.png' },
  { name: 'Mills', logo: '/media/clients/mills.png' },
  { name: 'Quality Seg', logo: '/media/clients/qualityseg.png' },
  { name: 'Wolmec', logo: '/media/clients/wolmec.png' },
]

export const contact = {
  kicker: 'Contato',
  title: "Let's build what's next, together.",
  lede: 'Conte o desafio. Devolvemos um caminho técnico — escopo, riscos e ordem de grandeza — em até 24 horas úteis.',
  assurances: ['Resposta em até 24h', 'Sem compromisso', 'Equipe especializada'],
}
