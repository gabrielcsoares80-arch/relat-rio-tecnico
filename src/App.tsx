import React, { useState, useRef } from 'react';
import { Save, FileText, Building2, Users, MapPin, ChevronDown, Check, Activity, Clock, Trash2, FileSignature, Info, Route, UploadCloud, AlertCircle, X, Hammer, PaintBucket, DoorOpen, Square, Plus, LayoutGrid, Droplets, Download, Image as ImageIcon } from 'lucide-react';

// ============================================================================
// CONSTANTES BASE
// ============================================================================

const LOGO_SABIN_HEADER = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sabin_Diagn%C3%B3stico_e_Sa%C3%BAde_logo.svg/512px-Sabin_Diagn%C3%B3stico_e_Sa%C3%BAde_logo.svg.png";
const IMAGEM_EMBALAGENS_FIXA = "https://placehold.co/600x300/e2e8f0/cc0000?text=Imagem+das+Embalagens";

const ATIVIDADES_OPCOES = [
  'Selecione a atividade...',
  'Posto de atendimento e coleta para análises clínicas.',
  'Posto de atendimento, coleta para análises clínicas e laboratório de análises clínicas.',
  'Posto de atendimento, serviço de imunização e coleta para análises clínicas.',
  'Posto de atendimento, exames de diagnóstico por imagens e posto de coleta para análises clínicas.',
  'Posto de atendimento, exames de diagnóstico por imagens, posto de coleta para análises clínicas e laboratório de análises clínicas.',
  'Laboratório de análises clínicas.',
  'Posto de atendimento, coleta para análises clínicas, laboratório de análises clínicas e serviços de imunização',
  'Outro (Especificar)'
];

const CNAE_OPCOES = [
  '8640-2/02 - Laboratórios Clínicos',
  '8640-2/01 - Laboratórios de Anatomia Patológica e Citológica',
  '8630-5/02 - Atividades de reprodução humana assistida',
  '8630-5/06 - Serviços de vacinação e imunização humana',
  'Outro (Especificar)'
];

const BOMBONAS_OPCOES = [
  { litros: '100', peso: '10 kg', dim: '530x750 mm', carga: '40 kg' },
  { litros: '200', peso: '10 kg', dim: '550x890 mm', carga: 'XX kg' },
  { litros: '240', peso: '19,4 kg', dim: '600x1110 mm', carga: '96 kg' }
];

const EMAILS_EQUIPE = [
  'claudia.avelar@sabin.com.br',
  'gabriel.soares@sabin.com.br',
  'julia.andrade@sabin.com.br',
  'luana.lucchini@sabin.com.br',
  'lucas.ribeiro@sabin.com.br',
  'marcelo.silva@sabin.com.br',
  'mayza.lima@sabin.com.br',
  'miraglayce.nunes@sabin.com.br',
  'rafael.sa@sabin.com.br'
];

const ENGENHEIROS = [
  { nome: 'Selecione o responsável...', crea: '' },
  { nome: 'Miraglayce dos Santos Nunes', crea: '26559/D-DF' },
  { nome: 'Lucas Raphael Batista Ribeiro', crea: '32668/D-DF' },
  { nome: 'Marcelo de Paula Silva', crea: '147838/D-MG'},
  { nome: 'Outro (Digitar manualmente)', crea: '' }
];

const OPCOES_MATERIAIS = {
  fechamentosInt: ['Gesso Acartonado', 'Divisória Naval', 'Alvenaria', 'Existente'],
  acabamentosInt: ['Pintura Acrílica (Branco Neve)', 'Pintura Acrílica (Branco Neve / Azul Del Rey)', 'Revestimento Cerâmico Branco', '1 parede com revestimento', 'Existente'],
  fechamentosExt: ['Alvenaria', 'Fachada de Vidro', 'Existente'],
  acabamentosExt: ['Pintura (Sol & Chuva Premium)', 'Existente'],
  pisos: ['Porcelanato Eliane (80x80cm)', 'Porcelanato Elizabeth (60x60cm)', 'Piso Intertravado', 'Existente'],
  rodapes: ['Rodapé Eliane (80x10cm)', 'Rodapé Elizabeth (60x10cm)', 'Existente'],
  forros: ['Gesso Acartonado', 'Fibra Mineral', 'Laje de Concreto Existente'],
  esquadrias: [
    'Porta Pivotante em vidro temperado', 'Porta de correr em vidro', 'Porta de correr "mão amiga"',
    'Kit Porta Pronta Pormade', 'Kit porta de correr Pormade', 'Porta de giro em madeira (Dalcomad)', 'Porta tipo veneziana metálica',
    'Porta sanfonada', 'Porta de enrolar em aço galvanizado', 'Existente'
  ]
};

const DICIONARIO_TEXTOS = {
  'Gesso Acartonado': 'Estrutura em aço galvanizado com perfil montante de 90 (90x30 mm); Fechamento com chapas gesso acartonado – tipo Standard quando em ambientes secos e tipo Verde (resistente à umidade) quando em ambientes que apresentem área molhada. Acabamentos com fita para junta e emassamento.',
  'Divisória Naval': 'Divisória Eucatex ou similar, montada com painéis de miolo tipo colmeia com 35mm de espessura; Perfis de sustentação em chapa de aço com pintura eletrostática.',
  'Alvenaria': 'Bloco cerâmico 19x19x9 cm, 8 furos, assentado com argamassa, emboço/reboco em argamassa, camada de regularização.',
  'Fachada de Vidro': 'Estrutura de montantes e guias em alumínio, com vidro temperado transparente de 10 mm e aplicação de película de segurança.',
  'Pintura Acrílica (Branco Neve)': 'Pintura com Tinta Acrílica para parede interna, com acabamento acetinado, liso, lavável e impermeável, na cor Branco Neve – marca Coral. Resistente à lavagem e ao uso de desinfetante.',
  'Pintura Acrílica (Branco Neve / Azul Del Rey)': 'Paredes pintadas com tinta acrílica Branco Neve e uma parede especial pintada na cor Azul Del Rey - marca Coral. Resistente à lavagem e ao uso de desinfetante.',
  'Revestimento Cerâmico Branco': 'Revestimento cerâmico marca Eliane/Incesa, modelo Branco Brilhante Retificado. Material monolítico (homogêneo e impermeável), vitrificado e com juntas de assentamento de 1mm.',
  '1 parede com revestimento': 'Paredes pintadas com tinta acrílica na cor Branco Neve e uma parede em revestimento cerâmico branco (completar com informação do revestimento que já conversamos).',
  'Pintura (Sol & Chuva Premium)': 'Pintura com Tinta Acrílica PVA/Látex Fosco Proteção Sol & Chuva Premium, cor Branco – Coral.',
  'Porcelanato Eliane (80x80cm)': 'Porcelanato marca Eliane bege, polido, brilhante e retificado – 80x80cm, espessura de 9mm, Linha BIANCO PLUS PO. Acabamento em rejunte cimentício acrílico Quartzolit Weber, cor Corda. Absorção de água menor de 4%.',
  'Porcelanato Elizabeth (60x60cm)': 'Porcelanato marca Elizabeth bege, polido, brilhante e retificado – 60x60cm, espessura de 9mm, Linha BIANCO MASTER PO. Acabamento em rejunte cimentício acrílico Quartzolit. Absorção de água menor de 4%.',
  'Piso Intertravado': 'Piso Intertravado de concreto para áreas externas.',
  'Rodapé Eliane (80x10cm)': 'Rodapé embutido Eliane bege com dimensões de 80x10cm, espessura de 9mm, junta de 1mm; rejunte na cor Corda.',
  'Rodapé Elizabeth (60x10cm)': 'Rodapé embutido Elizabeth bege com dimensões de 60x10cm, junta de 1mm; rejunte na cor Corda.',
  'Fibra Mineral': 'Forro de fibra mineral 625 mm x 625 mm x 17 mm. Acabamento da superfície: tinta vinílica à base de látex. Detalhe da borda: lay-in e regular.',
  'Laje de Concreto Existente': 'Laje de concreto existente no local com pintura em tinta látex cor branco fosca.',
  'Porta Pivotante em vidro temperado': 'Porta Pivotante em vidro temperado transparente. Vidro com 10 mm de espessura e película de segurança contra estilhaços; mola de piso; puxadores em aço inox.',
  'Porta de correr em vidro': 'Porta de correr em vidro temperado, espessura de 8mm, película de segurança contra estilhaços com acabamento jateado, trilho superior em alumínio.',
  'Porta de correr "mão amiga"': 'Porta de correr tipo "mão amiga" em vidro temperado transparente. Vidro com 8mm e película de segurança; trilho superior em alumínio.',
  'Kit Porta Pronta Pormade': 'Kit Porta Pronta Pormade branca lisa semioca, corpo do alizar branco de PVC Wood, fechaduras Pado Concept cromada.',
  'Kit porta de correr Pormade': 'Kit porta de correr Pormade branca lisa semi oca, com marco e alizar em PVC Wood branco, ferragens cromadas e sistema de correr compatível.',
  'Porta de giro em madeira (Dalcomad)': 'Porta de giro em madeira - Kit Porta Branca lisa Dalcomad, com revestimento melanímico, semi-sólida.',
  'Porta tipo veneziana metálica': 'Porta tipo veneziana metálica em aço carbono #nº 16, com pintura branco neve metalatex; fechadura tipo tetra.',
  'Porta sanfonada': 'Porta tipo sanfonada lisa em plástico de ambos os lados na cor Branca. Marca Plasbil ou similar.',
  'Porta de enrolar em aço galvanizado': 'Porta de enrolar em aço galvanizado de perfil liso, com pintura eletrostática prata cinza RAL 9006.'
};

const OPCOES_RDC = [
  { id: 'coleta', label: 'Posto de Coleta e Laboratório (Patologia Clínica)', content: `<i>4.1.3- Fazer análise e procedimentos laboratoriais de substâncias ou materiais biológicos com finalidade diagnóstica e de pesquisa;<br>4.1.4- Fazer o preparo de reagentes/soluções;<br>4.1.5- Fazer a desinfecção do material analisado a ser descartado;<br>4.1.6- Fazer a lavagem e preparo do material utilizado; e<br>4.1.7- Emitir laudo das análises realizadas.<br>4.4-Anatomia patológica e citopatologia:<br>4.4.1-Receber e registrar o material para análise (peças, esfregaços, líquidos, secreções e cadáveres);<br>4.4.2-Fazer a triagem do material recebido;</i>` },
  { id: 'imagem', label: 'Diagnóstico por Imagem e Métodos Gráficos', content: `<i>4.2-Imagenologia:<br>4.2.1-Proceder à consulta e exame clínico de pacientes;<br>4.2.2-Preparar o paciente;<br>4.2.3-Assegurar a execução de procedimentos pré-anestésicos e realizar procedimentos anestésicos;<br>4.2.4-Proceder a lavagem cirúrgica das mãos;<br>4.2.5-Realizar exames diagnósticos e intervenções terapêuticas:<br>&nbsp;&nbsp;&nbsp;&nbsp;a) Por meio da radiologia através dos resultados de estudos fluoroscópicos ou radiográficos;<br>&nbsp;&nbsp;&nbsp;&nbsp;b) Por meio da radiologia cardiovascular, usualmente recorrendo a cateteres e injeções de contraste. Executam-se também procedimentos terapêuticos como angioplastia, drenagens e embolizações terapêuticas;<br>&nbsp;&nbsp;&nbsp;&nbsp;c) Por meio da tomografia- através do emprego de radiações ionizantes;<br>&nbsp;&nbsp;&nbsp;&nbsp;d) Por meio da ultrassonografia- através dos resultados dos estudos ultrassonográficos;<br>&nbsp;&nbsp;&nbsp;&nbsp;e) Por meio da ressonância magnética- através de técnica que utiliza campos magnéticos;<br>&nbsp;&nbsp;&nbsp;&nbsp;f) Por meio de endoscopia digestiva e respiratória;<br>&nbsp;&nbsp;&nbsp;&nbsp;g) Por outros meios;<br>4.2.6-Elaborar relatórios médicos e de enfermagem e registros dos procedimentos realizados;<br>4.2.7-Proporcionar cuidados pós-anestésicos e pós procedimentos;<br>4.2.8-Assegurar atendimento de emergência;<br>4.2.9-Realizar o processamento da imagem;<br>4.2.10-Interpretar as imagens e emitir o laudo dos exames realizados;<br>4.2.11-Guardar e preparar chapas, filmes e contrastes;<br>4.2.12-Zelar pela proteção e segurança de pacientes e operadores; e<br>4.2.13-Assegurar o processamento do material biológico coletado nas endoscopias.<br>4.3-Métodos gráficos:<br>4.3.1-Preparar o paciente;<br>4.3.2-Realizar os exames que são representados por traçados gráficos aplicados em papel ou em filmes especiais, tais como: eletrocardiograma, eco cardiograma, ergometria, fonocardiograma, veto cardiograma, eletroencefalograma, potenciais evocados, etc.; e<br>4.3.3-Emitir laudo dos exames realizados.</i>` },
  { id: 'atencao', label: 'Atenção Primária e Imunização', content: `<i>1.1 - Promoção e Prevenção à Saúde:<br>Prestação de atendimento de apoio; Proceder a aplicação de imunobiológicos (vacinas); Acompanhamento e observação pós-vacinal; Armazenar e controlar a temperatura dos imunobiológicos.</i>` }
];

const AMBIENTES_DB = [
  { tipoId: 'recepcao', nomeTemplate: 'Recepção', definicao: 'Área climatizada, ampla, destinada a recepcionar, atender e orientar pacientes, acompanhantes, recebimento de materiais de exames, além de identificar e registrar dados de acesso.', atividades: 'Acolhimento;\nOrientação do Fluxo de circulação;\nAdmissão de Pacientes;\nIdentificação no acesso;\nIdentificação do material biológico;\nInformações gerais;\nResultado de exames;\nEspaço Infantil.', equipamentos: 'XX Televisões de 43 polegadas para a senha;\nXX Computadores;\nXX Impressora a laser multiprofissional;\n01 Aparelho telefônico;\nXX Máquinas de cartão;\nXX Etiquetadora zebra;\n01 Dispensador de senhas;\nXX Plataforma elevatória para cadeirantes.', mobiliarios: 'XX Cadeiras ergonômicas com braços;\nXX Cadeiras para atendimento (Cadeira pipe - marca alberflex);\nXX Longarina pipe três lugares sem mesa - marca Alberflex;\nXX Longarina pipe dois lugares sem mesa - marca alberflex;\nXX Cadeiras em madeira (infantil).', movelarias: 'XX Guichês de atendimento em MDF branco com painel de vidro temperado;\nXX Guichê P.C.D.;\nXX Painel para TV em MDF;\nXX Bancada de apoio;\nXX Gaveteiro;\nXX Painéis com brinquedos.', acessorios: 'XX Dispensadores de álcool gel;\nXX Lixeiras infectantes com pedal;\nXX Lixeiras para papel e plástico.', marmoraria: 'Não se aplica', infraestrutura: '01 Cuba de encaixe;\n01 Torneira com fechamento automático;\nXX Ar-condicionado Split;\nXX Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'boxColeta', nomeTemplate: 'Box de Coleta', definicao: 'Área destinada à coleta de sangue e raspagens;', atividades: 'Coleta de amostras.', equipamentos: 'Não se aplica', mobiliarios: '01 Cadeira fixa de 4 pés, com assento em polipropileno, com base sem braço cromada.', movelarias: '01 Armário em MDF branco impermeável com pia acoplada;\n01 Colmeia para tubos em MDF branco.', acessorios: '01 Dispensador de álcool gel;\n01 Dispensador de papel toalha;\n01 Dispensador de sabonete líquido;\n01 Recipiente para descarte de materiais perfuro cortantes em suporte com ventosas;\n01 Lixeira para resíduos comuns;\n01 Lixeira infectante com pedal;\n01 Cabideiro inox;\n01 Braçadeira em aço inox.', marmoraria: 'Não se aplica', infraestrutura: '01 Cuba redonda de aço inox;\n01 Torneira com fechamento automático;\n01 Ar-condicionado Split;\n01 Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'salaColeta', nomeTemplate: 'Sala de Coleta', definicao: 'Área destinada à coleta de curvas de tolerância a glicose e lactose, e repouso para realização de exames.', atividades: 'Coleta de amostras e repouso.', equipamentos: 'Não se aplica', mobiliarios: '01 Cadeira fixa de 4 pés, com assento em polipropileno;\nXX Poltrona reclinável para repouso.', movelarias: '01 Armário em MDF branco impermeável com pia acoplada;\n01 Colmeia para tubos em MDF branco.', acessorios: '01 Dispensador de álcool gel;\n01 Dispensador de papel toalha;\n01 Dispensador de sabonete líquido;\n01 Recipiente para descarte de materiais perfuro cortantes em suporte com ventosas;\n01 Lixeira para resíduos comuns;\n01 Lixeira infectante com pedal;\n01 Cabideiro inox;\n01 Braçadeira em aço inox.', marmoraria: 'Não se aplica', infraestrutura: '01 Cuba redonda de aço inox;\n01 Torneira com fechamento automático;\n01 Ar-condicionado Split;\n01 Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'coletaFeminina', nomeTemplate: 'Coleta Feminina (Ginecológica)', definicao: 'Área destinada a coleta ginecológica.', atividades: 'Coleta biológica.', equipamentos: '01 Foco clínico.', mobiliarios: '01 Banqueta giratória;\n01 Maca ginecológica com armação tubular, cabeceira e pés articuláveis, apoio para coxas estofado.', movelarias: '01 Gaveteiro em MDF branco.', acessorios: '01 Dispensador de álcool gel;\n01 Dispensador de papel toalha;\n01 Dispensador de sabonete líquido;\n01 Recipiente para descarte de materiais perfuro cortantes em suporte;\n01 Lixeira comum;\n01 Lixeira infectante com pedal;\n01 Cabideiro inox.', marmoraria: 'Não se aplica', infraestrutura: '01 Lavatório de canto;\n01 Torneira com fechamento automático;\nXX Ar-condicionado Split;\nXX Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'coletaMaca', nomeTemplate: 'Box de Coleta com Maca', definicao: 'Área destinada à coleta de sangue e raspagens para pacientes que exigem repouso.', atividades: 'Coleta de amostras.', equipamentos: 'Não se aplica', mobiliarios: '01 Cadeira fixa de 4 pés cromada;\n01 Maca móvel articulável em 3 partes com leito estofado.', movelarias: '01 Armário em MDF branco impermeável com pia acoplada;\n01 Colmeia para tubos em MDF branco.', acessorios: '01 Dispensador de álcool gel;\n01 Dispensador de papel toalha;\n01 Dispensador de sabonete líquido;\n01 Recipiente para descarte de materiais perfuro cortantes;\n01 Lixeira comum;\n01 Lixeira infectante com pedal;\n01 Cabideiro inox;\n01 Braçadeira inox.', marmoraria: 'Não se aplica', infraestrutura: '01 Cuba redonda inox;\n01 Torneira automática;\n01 Ar-condicionado Split;\n01 Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'coletaMasculina', nomeTemplate: 'Coleta Masculina', definicao: 'Área destinada à coleta do exame Espermograma.', atividades: 'Coleta biológica;', equipamentos: '01 Televisão de 32 polegadas;', mobiliarios: '01 Cadeira fixa de 4 pés, com assento em polipropileno, com base sem braço cromada;', movelarias: '01 Nicho de apoio em MDF;', acessorios: '01 Dispensador de álcool gel;\n01 Dispensador de sabonete líquido;\n01 Dispensador de papel toalha;\n01 Lixeira para resíduos comuns;\n01 Lixeira com acionamento por pedal para resíduos infectantes;', marmoraria: 'Não se aplica', infraestrutura: '01 Ar-condicionado Split;\n01 Ventilação mecânica;\n01 Lavatório de canto;\n01 Torneira com fechamento automático;\n01 Ralo sifonado;', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'consultorio', nomeTemplate: 'Consultório Indiferenciado', definicao: 'Ambiente destinado às ações de prevenção à saúde relacionado ao processo de imunização.', atividades: 'Prevenção e consulta pré-imunização.', equipamentos: '01 Balança antropométrica mecânica;\n01 Computador;\n01 Negatoscópio.', mobiliarios: 'XX Cadeiras ergonômicas com braços;\nXX Cadeiras para atendimento (Bambu Artesian TEA);\n01 Puff Redondo.', movelarias: '01 Maca em MDF com colchão em couro ecológico;\n01 Bancada em MDF para computador;\n01 Armário em MDF para brinquedos (TEA).', acessorios: '01 Dispensador de álcool gel;\n01 Dispensador de papel toalha;\n01 Dispensador de sabonete líquido;\n01 Recipiente para descarte de materiais perfuro cortantes;\n01 Lixeira comum;\n01 Lixeira papel;\n01 Lixeira plástico;\n01 Escada metálica para maca;\n01 Manta Ponderada Preta (TEA).', marmoraria: 'Não se aplica', infraestrutura: '01 Lavatório de canto;\n01 Torneira de enxágue;\n01 Ar-condicionado Split;\n01 Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'imunizacao', nomeTemplate: 'Sala de Imunização', definicao: 'Área destinada à aplicação de um imunobiológico dentro de todos os padrões corretos de conservação, armazenagem e indicações clínicas.', atividades: 'Armazenamento e Aplicação de Vacinas.', equipamentos: 'XX Refrigerador expositor com circuito independente;\nXX Freezer vertical Frost Free;\n02 Caixas térmicas de 45 litros;\n01 Kit de oxigênio de 5 litros;\n01 Computador.', mobiliarios: '02 Cadeiras fixa de 4 pés cromada;\n01 Braçadeira em aço inox;\n01 Cadeira ergonômica com braços.', movelarias: '01 Armário em MDF embutido na bancada;\n01 Maca em MDF com colchão em couro ecológico;\n01 Mesa em MDF para computador.', acessorios: '01 Dispensador de álcool gel;\n01 Dispensador de papel toalha;\n01 Dispensador de sabonete líquido;\n01 Recipiente para descarte de materiais perfuro cortantes;\n01 Lixeira comum;\n01 Lixeira infectante com pedal;\n01 Cabideiro inox;\n01 Escada metálica.', marmoraria: 'Não se aplica', infraestrutura: '01 Pia de aço inox;\n01 Torneira com fechamento automático;\nXX Ar-condicionado Split;\nXX Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'desjejum', nomeTemplate: 'Área para desjejum', definicao: 'Área destinada ao desjejum após a coleta de sangue.', atividades: 'Acolhimento;\nDesjejum;', equipamentos: '01 Filtro purificador de água potável;\n01 Máquina de café;', mobiliarios: 'XX Banquetas médias com estrutura em alumínio e assento branco;', movelarias: '01 Armário inferior modulado em MDF;', acessorios: '01 Dispensador de copos descartáveis;\n01 Dispensador de álcool em gel;\n01 Lixeira com acionamento por pedal para resíduos orgânicos;\n01 Lixeira em coluna para copos de plástico;\n01 Lixeira para resíduos comuns;', marmoraria: 'XX Bancadas em granito Especificar Cor;', infraestrutura: '01 Pia de aço inox;\n01 Torneira de enxágue;\nXX Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'copa', nomeTemplate: 'Copa', definicao: 'Área destinada ao preparo de alimentos para o desjejum dos clientes.', atividades: 'Preparo de alimentos e bebidas;', equipamentos: '01 Refrigerador de 310 litros duplex;\n01 Freezer vertical de 110 litros;\n01 Liquidificador;\n01 Forno elétrico profissional;', mobiliarios: 'Não se aplica', movelarias: 'XX Armário em MDF branco embutido na bancada de granito;\n01 Armário superior em MDF branco e nicho para microondas;', acessorios: '01 Dispensador de álcool gel;\n01 Dispensador de papel toalha;\n01 Lixeira para resíduos de plástico;\n01 Lixeira de acionamento por pedal para resíduos orgânicos;', marmoraria: 'XX Bancada em granito Especificar Cor;', infraestrutura: '01 Pia de aço inox;\n01 Torneira de enxague;\nXX Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'classificacao', nomeTemplate: 'Sala de Classificação e Distribuição de Amostras', definicao: 'Área destinada a recebimento, classificação, centrifugação das amostras coletadas diariamente e medição das amostras de urina de 24 horas.', atividades: 'Recebimento e processamento primário de amostras.', equipamentos: '01 Refrigerador;\n01 Banho Maria;\n01 Centrífuga;\n01 Computador;\n01 Leitor de código de barras.', mobiliarios: 'XX Cadeira ergonômica alta.', movelarias: 'XX Armário em MDF branco embutido na bancada;\nXX Bancada em MDF para computador;\nXX Armário superior em MDF.', acessorios: '01 Dispensador de álcool gel;\n01 Dispensador de sabonete líquido;\n01 Dispensador de papel toalha;\n01 Lixeira comum;\n01 Lixeira infectante com pedal;\n01 Recipiente para descarte de materiais perfuro cortantes.', marmoraria: 'Não se aplica', infraestrutura: 'XX Pia em aço inox;\nXX Torneira de enxágue automática;\nXX Ar-condicionado Split;\nXX Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'sanitario_pcd', nomeTemplate: 'Sanitário P.C.D.', definicao: 'Área destinada exclusivamente aos pacientes.', atividades: 'Higiene pessoal.', equipamentos: 'Não se aplica', mobiliarios: 'Não se aplica', movelarias: 'Não se aplica', acessorios: '02 Barras de apoio horizontais;\n01 Barra de apoio na vertical;\n02 Barras de apoio verticais para o lavatório;\n01 Lixeira para RSS;\n01 Porta protetor para assento;\n01 Dispensador de papel higiênico;\n01 Dispensador papel toalha;\n01 Dispensador sabonete;\n01 Espelho bisotado.', marmoraria: 'Não se aplica', infraestrutura: '01 Bacia sanitária;\n01 Cuba de encaixe;\n01 Torneira automática;\n01 Ducha higiênica;\n01 Ralo sifonado;\n01 Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'sanitario', nomeTemplate: 'Sanitário Padrão', definicao: 'Área destinada exclusivamente aos pacientes.', atividades: 'Higiene pessoal.', equipamentos: 'Não se aplica', mobiliarios: 'Não se aplica', movelarias: 'Não se aplica', acessorios: '01 Lixeira para RSS;\n01 Dispensador de protetor para assento;\n01 Dispensador de papel higiênico;\n01 Dispensador papel toalha;\n01 Dispensador sabonete;\n01 Espelho bisotado.', marmoraria: 'Não se aplica', infraestrutura: '01 Bacia sanitária;\n01 Cuba de encaixe;\n01 Torneira automática;\n01 Ducha higiênica;\n01 Ralo sifonado;\n01 Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'sanitarioFunc', nomeTemplate: 'Sanitário de Funcionários', definicao: 'Área destinada exclusivamente aos funcionários.', atividades: 'Higiene pessoal.', equipamentos: 'Não se aplica', mobiliarios: 'Não se aplica', movelarias: 'Não se aplica', acessorios: '01 Lixeira para RSS;\n01 Dispensador de protetor para assento;\n01 Dispensador de papel higiênico;\n01 Dispensador papel toalha;\n01 Dispensador sabonete;\n01 Espelho bisotado.', marmoraria: 'Não se aplica', infraestrutura: '01 Bacia sanitária;\n01 Cuba de encaixe;\n01 Torneira automática;\n01 Ducha higiênica;\n01 Ralo sifonado;\n01 Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'dml', nomeTemplate: 'D.M.L. (Depósito de Material de Limpeza)', definicao: 'Área destinada à guarda de equipamentos designados para limpeza, assim como lavagem de panos, desprezo de água e produtos de limpeza.', atividades: 'Higienização;\nArmazenamento.', equipamentos: 'Não se aplica', mobiliarios: 'Não se aplica', movelarias: '01 Armário superior em MDF;\n01 Armário em MDF para guarda de rodos e vassouras.', acessorios: 'Não se aplica', marmoraria: 'Não se aplica', infraestrutura: '01 Tanque para lavagem de panos;\n01 Torneira de enxágue;\n01 Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'salaRack', nomeTemplate: 'Sala Rack', definicao: 'Local destinado à guarda do rack de dados.', atividades: 'Não se aplica', equipamentos: 'XX Equipamento de Rack;', mobiliarios: 'Não se aplica', movelarias: 'Não se aplica', acessorios: 'Não se aplica', marmoraria: 'Não se aplica', infraestrutura: 'XX Ar-condicionado Split;', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'atr_inf', nomeTemplate: 'A.T.R. - Resíduos Infectantes', definicao: 'Área destinada à guarda de resíduos temporários, sendo esses infectantes. As bombonas são recolhidas por empresa especializada.', atividades: 'Armazenamento temporário.', equipamentos: 'Não se aplica', mobiliarios: 'Não se aplica', movelarias: 'Não se aplica', acessorios: 'XX Bombonas tipo container com pedal;\nXX Pallets plástico preto com carga estimada de 500 kg.', marmoraria: 'Não se aplica', infraestrutura: '01 Torneira de enxágue;\n01 Ralo sifonado;\n01 Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'atr_comum', nomeTemplate: 'A.T.R. - Resíduos Comuns', definicao: 'Área destinada à guarda temporária dos recipientes contendo resíduos comuns. As bombonas são recolhidas por empresa especializada.', atividades: 'Armazenamento temporário.', equipamentos: 'Não se aplica', mobiliarios: 'Não se aplica', movelarias: 'Não se aplica', acessorios: 'XX Bombonas tipo container com pedal;\nXX Pallets plástico preto.', marmoraria: 'Não se aplica', infraestrutura: '01 Torneira de enxágue;\n01 Ralo sifonado;\n01 Ventilação mecânica.', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } },
  { tipoId: 'generico', nomeTemplate: 'Ambiente Genérico (Manual)', definicao: '', atividades: '', equipamentos: 'Não se aplica', mobiliarios: 'Não se aplica', movelarias: 'Não se aplica', acessorios: 'Não se aplica', marmoraria: 'Não se aplica', infraestrutura: '', area: '', acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' } }
];

const formatMask = (name, value) => {
  let v = value.replace(/\D/g, ''); 
  if (name === 'cnpj' || name === 'rssCnpj' || name === 'rss2Cnpj') {
    v = v.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2');
    return v.substring(0, 18);
  }
  if (name === 'cpfRespLegal' || name === 'cpf') {
    v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return v.substring(0, 14);
  }
  if (name === 'cep' || name === 'rssCep' || name === 'rss2Cep') {
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    return v.substring(0, 9);
  }
  if (name === 'telefoneEngenharia') {
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2');
    return v.substring(0, 15);
  }
  return value;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('identificacao');
  const [emailDropdownOpen, setEmailDropdownOpen] = useState(false);
  const [cnaeDropdownOpen, setCnaeDropdownOpen] = useState(false);
  const [isEngenheiroManual, setIsEngenheiroManual] = useState(false);
  const [isCnaeManual, setIsCnaeManual] = useState(false);
  const [showRevitInfo, setShowRevitInfo] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  const [identificacao, setIdentificacao] = useState({
    tipoProjeto: 'PBA – Projeto Básico de Arquitetura',
    razaoSocial: '', nomeFantasia: '', nomeUnidade: '', cidade: '', uf: '', endereco: '', cep: '', cnpj: '',
    cnaesSelecionados: [], cnaeManual: '', telefoneEngenharia: '', emailsSelecionados: [],
    
    possuiSubsolo: false, qtdSubsolos: '1', subsolos: [{ area: '', ambientes: '' }],
    possuiTerreo: true, terreo: { area: '', ambientes: '' },
    possuiAndares: false, qtdAndares: '1', andares: [{ area: '', ambientes: '' }],
    
    respTecnicos: [{ nome: '', conselho: '' }],
    isRespLegalManual: false,
    respLegal: 'Lídia Freire Abdalla Nery', cpfRespLegal: '693.909.246-34',
    
    respProjeto: '', creaCauProjeto: '',
    imagemCapa: null
  });

  const [atendimento, setAtendimento] = useState({
    atividade: ATIVIDADES_OPCOES[0],
    atividadeManual: '',
    capacidadeDia: '',
    horarioSemana: 'De segunda-feira a sexta-feira das 6:30 às 17:00 com coleta até as 16:00.',
    horarioSabado: 'Sábado das 7:00 às 12:00 com coleta até as 11:00.',
    qtdBombonasTotal: '', tipoBombona: '100',
    qtdComum: '', qtdInfectante: '', qtdQuimico: '', qtdPerfurocortante: '',
    rssRazaoSocial: '', rssNomeFantasia: '', rssCnpj: '', rssInscricaoMunicipal: '', rssEndereco: '', rssCep: '',
    possuiFornecedor2: false, rss2RazaoSocial: '', rss2NomeFantasia: '', rss2Cnpj: '', rss2InscricaoMunicipal: '', rss2Endereco: '', rss2Cep: '',
    imagemEmbalagens: null
  });

  const [fluxos, setFluxos] = useState({
    clientes: { prancha: '', escala: '', imagens: {} },
    funcionarios: { prancha: '', escala: '', imagens: {} },
    amostras: { prancha: '', escala: '', imagens: {} },
    residuos: { prancha: '', escala: '', imagens: {} }
  });

  const [materiais, setMateriais] = useState({
    selecoes: { fechamentosInt: [], acabamentosInt: [], fechamentosExt: [], acabamentosExt: [], pisos: [], rodapes: [], forros: [], esquadrias: [] },
    textosExistentes: { fechamentosInt: '', acabamentosInt: '', fechamentosExt: '', acabamentosExt: '', pisos: '', rodapes: '', esquadrias: '' },
    acessoriosToldo: '', outrosPisos: '', marmorariaCor: '' 
  });

  const [ambientesProjeto, setAmbientesProjeto] = useState([]);
  const [expandedRoomId, setExpandedRoomId] = useState(null);

  const [instalacoes, setInstalacoes] = useState({
    concessionariaAgua: 'concessionária pública local', concessionariaEnergia: 'concessionária de energia local', indiceEsgoto: '91', coletaResiduos: 'empresa de saneamento local', servicosRdc: [] 
  });

  const handleChange = (e) => setIdentificacao({ ...identificacao, [e.target.name]: e.target.value });
  const handleCheckboxChange = (e) => setIdentificacao({ ...identificacao, [e.target.name]: e.target.checked });
  const handleAtendimentoChange = (e) => setAtendimento({ ...atendimento, [e.target.name]: e.target.value });
  const handleInstalacoesChange = (e) => setInstalacoes({ ...instalacoes, [e.target.name]: e.target.value });
  
  const handleChangeWithMask = (e, stateSetter) => {
    const { name, value } = e.target;
    const maskedValue = formatMask(name, value);
    stateSetter(prev => ({ ...prev, [name]: maskedValue }));
  };

  const handleBase64Upload = (stateSetter, key, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        stateSetter(prev => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmailToggle = (email) => {
    setIdentificacao(prev => ({
      ...prev,
      emailsSelecionados: prev.emailsSelecionados.includes(email) ? prev.emailsSelecionados.filter(e => e !== email) : [...prev.emailsSelecionados, email]
    }));
  };

  const handleCnaeToggle = (cnae) => {
    setIdentificacao(prev => {
      const isSelected = prev.cnaesSelecionados.includes(cnae);
      return { ...prev, cnaesSelecionados: isSelected ? prev.cnaesSelecionados.filter(c => c !== cnae) : [...prev.cnaesSelecionados, cnae] };
    });
  };

  const handleAddRT = () => setIdentificacao(prev => ({ ...prev, respTecnicos: [...prev.respTecnicos, { nome: '', conselho: '' }] }));
  const handleRemoveRT = (index) => setIdentificacao(prev => ({ ...prev, respTecnicos: prev.respTecnicos.filter((_, i) => i !== index) }));
  const handleRTChange = (index, field, value) => {
    setIdentificacao(prev => {
      const arr = [...prev.respTecnicos];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, respTecnicos: arr };
    });
  };

  const handlePavimentoCount = (tipo, nameVal, value) => {
    const num = parseInt(value, 10) || 0;
    setIdentificacao(prev => {
      const newArr = [...prev[tipo]];
      while(newArr.length < num) newArr.push({ area: '', ambientes: '' });
      while(newArr.length > num) newArr.pop();
      return { ...prev, [nameVal]: value, [tipo]: newArr };
    });
  };

  const handlePavimentoData = (tipo, index, field, value) => {
    setIdentificacao(prev => {
      const newArr = [...prev[tipo]];
      newArr[index] = { ...newArr[index], [field]: value };
      return { ...prev, [tipo]: newArr };
    });
  };

  const handleTerreoData = (field, value) => setIdentificacao(prev => ({ ...prev, terreo: { ...prev.terreo, [field]: value } }));

  const handleFluxoTextChange = (categoria, campo, valor) => setFluxos(prev => ({ ...prev, [categoria]: { ...prev[categoria], [campo]: valor } }));
  const handleImageUpload = (categoria, floor, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFluxos(prev => ({ ...prev, [categoria]: { ...prev[categoria], imagens: { ...prev[categoria].imagens, [floor]: reader.result } } }));
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = (categoria, floor) => setFluxos(prev => { const newImagens = { ...prev[categoria].imagens }; delete newImagens[floor]; return { ...prev, [categoria]: { ...prev[categoria], imagens: newImagens } }; });
  
  const handleMaterialToggle = (categoria, item) => setMateriais(prev => {
      const list = prev.selecoes[categoria];
      const isSelected = list.includes(item);
      return { ...prev, selecoes: { ...prev.selecoes, [categoria]: isSelected ? list.filter(i => i !== item) : [...list, item] } };
  });
  const handleTextosMateriais = (categoria, valor) => setMateriais(prev => ({ ...prev, textosExistentes: { ...prev.textosExistentes, [categoria]: valor } }));
  const handleMateriaisExtra = (e) => setMateriais({ ...materiais, [e.target.name]: e.target.value });
  const handleRdcToggle = (id) => setInstalacoes(prev => ({ ...prev, servicosRdc: prev.servicosRdc.includes(id) ? prev.servicosRdc.filter(item => item !== id) : [...prev.servicosRdc, id] }));

  const normalizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
  const handleRevitImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').filter(line => line.trim() !== '');
      if (lines.length < 2) return alert("O arquivo parece estar vazio ou inválido.");
      let delimiter = '\t';
      if (lines[0].includes(';')) delimiter = ';';
      else if (lines[0].includes(',')) delimiter = ',';

      let headerRowIndex = 0;
      for (let i = 0; i < Math.min(lines.length, 5); i++) {
        if (normalizeString(lines[i]).includes('nome')) { headerRowIndex = i; break; }
      }
      const headers = lines[headerRowIndex].split(delimiter).map(h => normalizeString(h));
      const colMap = {
        nome: headers.findIndex(h => h.includes('nome')), area: headers.findIndex(h => h.includes('area')),
        piso: headers.findIndex(h => h.includes('piso')), rodape: headers.findIndex(h => h.includes('rodape') || h.includes('base')),
        parede: headers.findIndex(h => h.includes('parede')), teto: headers.findIndex(h => h.includes('teto') || h.includes('forro'))
      };

      if (colMap.nome === -1) return alert("Não foi possível encontrar a coluna 'Nome' na tabela.");

      const novosAmbientes = [];
      for (let i = headerRowIndex + 1; i < lines.length; i++) {
        const row = lines[i].split(delimiter).map(cell => cell.replace(/^["']|["']$/g, '').trim()); 
        if (!row[colMap.nome]) continue;
        const roomNameRaw = row[colMap.nome];
        let areaRaw = colMap.area !== -1 ? row[colMap.area] : '';
        areaRaw = areaRaw.replace(/[^\d.,]/g, '').trim(); 
        let matchedTemplate = AMBIENTES_DB.find(t => normalizeString(t.nomeTemplate) === normalizeString(roomNameRaw)) || AMBIENTES_DB.find(t => normalizeString(roomNameRaw).includes(normalizeString(t.nomeTemplate))) || AMBIENTES_DB.find(t => t.tipoId === 'generico');

        novosAmbientes.push({
          id: Date.now().toString() + i, tipoId: matchedTemplate.tipoId, nomePersonalizado: roomNameRaw,
          definicao: matchedTemplate.definicao, atividades: matchedTemplate.atividades, equipamentos: matchedTemplate.equipamentos,
          mobiliarios: matchedTemplate.mobiliarios, movelarias: matchedTemplate.movelarias, acessorios: matchedTemplate.acessorios, marmoraria: matchedTemplate.marmoraria, infraestrutura: matchedTemplate.infraestrutura,
          area: areaRaw, acabamentos: { 
            piso: colMap.piso !== -1 && row[colMap.piso] ? row[colMap.piso] : '', rodape: colMap.rodape !== -1 && row[colMap.rodape] ? row[colMap.rodape] : '', 
            parede: colMap.parede !== -1 && row[colMap.parede] ? row[colMap.parede] : '', teto: colMap.teto !== -1 && row[colMap.teto] ? row[colMap.teto] : '', 
            porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' 
          }
        });
      }
      setAmbientesProjeto(prev => [...prev, ...novosAmbientes]);
      if (novosAmbientes.length > 0) setExpandedRoomId(novosAmbientes[0].id);
      e.target.value = null; 
    };
    reader.readAsText(file);
  };

  const adicionarAmbiente = (tipoId) => {
    const template = AMBIENTES_DB.find(a => a.tipoId === tipoId);
    if (!template) return;
    const novoId = Date.now().toString();
    setAmbientesProjeto([...ambientesProjeto, {
      id: novoId, tipoId: template.tipoId, nomePersonalizado: template.nomeTemplate, definicao: template.definicao, atividades: template.atividades, equipamentos: template.equipamentos, mobiliarios: template.mobiliarios, movelarias: template.movelarias, acessorios: template.acessorios, marmoraria: template.marmoraria, infraestrutura: template.infraestrutura, area: '',
      acabamentos: { piso: '', rodape: '', parede: '', teto: '', porta: '', portaFolhas: '1', portaLargura: '', portaVao: '' }
    }]);
    setExpandedRoomId(novoId);
  };

  const removerAmbiente = (id) => setAmbientesProjeto(ambientesProjeto.filter(a => a.id !== id));
  const atualizarAmbiente = (id, campo, valor) => {
    setAmbientesProjeto(prev => prev.map(amb => {
      if (amb.id === id) {
        if (campo.includes('.')) { const [parent, child] = campo.split('.'); return { ...amb, [parent]: { ...amb[parent], [child]: valor } }; }
        return { ...amb, [campo]: valor };
      }
      return amb;
    }));
  };

  const p = (v) => parseFloat(v.toString().replace(/\./g, '').replace(',', '.')) || 0;
  
  const calcularPavimentos = () => {
    let total = 0;
    if (identificacao.possuiSubsolo) total += parseInt(identificacao.qtdSubsolos || 0);
    if (identificacao.possuiTerreo) total += 1;
    if (identificacao.possuiAndares) total += parseInt(identificacao.qtdAndares || 0);
    return total;
  };

  const getActiveFloors = () => {
    const floors = [];
    if (identificacao.possuiSubsolo) {
      const c = parseInt(identificacao.qtdSubsolos, 10) || 1;
      if(c === 1) floors.push('Subsolo'); else for(let i=1; i<=c; i++) floors.push(`Subsolo ${i}`);
    }
    if (identificacao.possuiTerreo) floors.push('Térreo');
    if (identificacao.possuiAndares) {
      const c = parseInt(identificacao.qtdAndares, 10) || 1;
      if(c === 1) floors.push('1º Andar'); else for(let i=1; i<=c; i++) floors.push(`${i}º Andar`);
    }
    return floors;
  };
  const activeFloors = getActiveFloors();
  const tituloAndaresFluxo = activeFloors.join(' / ') || 'TÉRREO';

  const areaTotalCalculada = (() => {
    let sum = 0;
    if (identificacao.possuiSubsolo) identificacao.subsolos.forEach(s => sum += p(s.area));
    if (identificacao.possuiTerreo) sum += p(identificacao.terreo.area);
    if (identificacao.possuiAndares) identificacao.andares.forEach(a => sum += p(a.area));
    return sum.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  })();

  const ambientesTotalCalculado = (() => {
    let sum = 0;
    if (identificacao.possuiSubsolo) identificacao.subsolos.forEach(s => sum += parseInt(s.ambientes)||0);
    if (identificacao.possuiTerreo) sum += parseInt(identificacao.terreo.ambientes)||0;
    if (identificacao.possuiAndares) identificacao.andares.forEach(a => sum += parseInt(a.ambientes)||0);
    return sum;
  })();

  const traduzirMaterial = (itemNome, categoria) => {
    if (itemNome === 'Existente') return materiais.textosExistentes[categoria] || 'Existente no local (Não especificado).';
    return DICIONARIO_TEXTOS[itemNome] || itemNome;
  };

  const handleSaveData = () => {
    const dataToSave = { identificacao, atendimento, fluxos, materiais, ambientesProjeto, instalacoes, isEngenheiroManual, isCnaeManual };
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url;
    link.download = `backup_memorial_${identificacao.nomeFantasia ? identificacao.nomeFantasia.replace(/\s+/g, '_').toLowerCase() : 'sabin'}.json`;
    link.click(); URL.revokeObjectURL(url);
  };

  const handleLoadData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loadedData = JSON.parse(e.target.result);
        if (loadedData.identificacao) {
          const idData = loadedData.identificacao;
          if (idData.areaSubsolo !== undefined && !idData.subsolos) idData.subsolos = [{ area: idData.areaSubsolo, ambientes: idData.ambientesSubsolo }];
          if (idData.areaTerreo !== undefined && !idData.terreo) idData.terreo = { area: idData.areaTerreo, ambientes: idData.ambientesTerreo };
          if (idData.areaXAndar !== undefined && !idData.andares) idData.andares = [{ area: idData.areaXAndar, ambientes: idData.ambientesXAndar }];
          if (idData.respTecnicoUnidade !== undefined && !idData.respTecnicos) idData.respTecnicos = [{ nome: idData.respTecnicoUnidade, conselho: idData.conselhoRespTecnico }];
          setIdentificacao(idData);
        }
        if (loadedData.atendimento) setAtendimento(loadedData.atendimento);
        if (loadedData.fluxos) setFluxos(loadedData.fluxos);
        if (loadedData.materiais) setMateriais(loadedData.materiais);
        if (loadedData.ambientesProjeto) setAmbientesProjeto(loadedData.ambientesProjeto.map(a => ({ marmoraria: a.marmoraria || 'Não se aplica', ...a })));
        if (loadedData.instalacoes) setInstalacoes(loadedData.instalacoes);
        if (loadedData.isEngenheiroManual !== undefined) setIsEngenheiroManual(loadedData.isEngenheiroManual);
        if (loadedData.isCnaeManual !== undefined) setIsCnaeManual(loadedData.isCnaeManual);
        alert("Dados importados com sucesso! Você pode continuar seu projeto.");
      } catch (error) { alert("Erro ao ler o arquivo. Certifique-se de que é um arquivo de backup válido (.json)."); }
    };
    reader.readAsText(file);
    event.target.value = null; 
  };

  const gerarDocumentoWord = (tipoRelatorio) => {
    if (tipoRelatorio === 'todos') {
      gerarDocumentoWord('descritivo');
      setTimeout(() => gerarDocumentoWord('organizacao'), 1000);
      setTimeout(() => gerarDocumentoWord('tecnico'), 2000);
      return;
    }

    const config = {
      descritivo: { title: 'MEMORIAL DESCRITIVO DE ARQUITETURA', fileName: 'Memorial_Descritivo' },
      organizacao: { title: 'MEMORIAL DE ORGANIZAÇÃO FÍSICA', fileName: 'Memorial_Org_Fisica' },
      tecnico: { title: 'RELATÓRIO TÉCNICO (PBA)', fileName: 'Relatorio_Tecnico_PBA' }
    };

    const { title: docTitle, fileName: fileNameStr } = config[tipoRelatorio];
    const isDescritivo = tipoRelatorio === 'descritivo';
    
    const secAmb = isDescritivo ? 10 : 9;
    const secSrv = isDescritivo ? 11 : 10;
    const secInst = isDescritivo ? 12 : 11;
    const secRef = isDescritivo ? 13 : 12;

    const meses = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
    const hoje = new Date();
    
    const cidadeFormatada = identificacao.cidade ? identificacao.cidade : '[Cidade]';
    const dataFormatada = `${cidadeFormatada}, ${meses[hoje.getMonth()]} de ${hoje.getFullYear()}.`;
    const dataCapa = `${cidadeFormatada.toUpperCase()}, ${meses[hoje.getMonth()]} DE ${hoje.getFullYear()}`;
    const ufFormatado = identificacao.uf ? identificacao.uf : '[UF]';
    const nomeUnidadeFormatado = identificacao.nomeUnidade ? identificacao.nomeUnidade : '[NOME DA UNIDADE]';
    const nomeUnidadeCapa = `${nomeUnidadeFormatado.toUpperCase()} - ${cidadeFormatada.toUpperCase()} / ${ufFormatado.toUpperCase()}`;

    let cnaesHtml = '';
    if (identificacao.cnaesSelecionados.length > 0) {
      cnaesHtml += `<b>CNAE Principal:</b> ${identificacao.cnaesSelecionados[0]}<br>`;
      if (identificacao.cnaesSelecionados.length > 1) {
        cnaesHtml += `<b>CNAEs Secundários:</b> ${identificacao.cnaesSelecionados.slice(1).join('; ')}<br>`;
      }
    }
    if (identificacao.cnaeManual.trim() !== '') cnaesHtml += `<b>Outro CNAE:</b> ${identificacao.cnaeManual}<br>`;
    if (cnaesHtml === '') cnaesHtml = `<b>CNAE:</b> [Selecione o CNAE]<br>`;

    const tiposMap = { coleta: 'Posto de Coleta', imagem: 'Diagnóstico por Imagens', atencao: 'Imunização e Atenção Primária' };
    const servicosSelecionados = instalacoes.servicosRdc.map(id => tiposMap[id]).filter(Boolean);
    const textoServicosObjetivo = servicosSelecionados.length > 0 ? servicosSelecionados.join(' e ') : '[Selecione os serviços na Fase 6]';

    const materiaisArr = [];
    materiaisArr.push({ title: 'ESTRUTURA EM CONCRETO', text: 'Estrutura em concreto já existente, tipo convencional em concreto armado e lajes pré-moldadas.' });
    materiaisArr.push({ title: 'IMPERMEABILIZAÇÃO', text: 'Será realizada impermeabilização nos seguintes ambientes: Sanitários, Copa, D.M.L., Sala de Classificação e Distribuição de Amostras e A.T.R.' });

    if (materiais.selecoes.fechamentosInt.length > 0) materiaisArr.push({ title: 'FECHAMENTOS INTERNOS', text: materiais.selecoes.fechamentosInt.map(i => traduzirMaterial(i, 'fechamentosInt')).join(' ') });
    if (materiais.selecoes.acabamentosInt.length > 0) materiaisArr.push({ title: 'ACABAMENTOS INTERNOS', text: materiais.selecoes.acabamentosInt.map(i => traduzirMaterial(i, 'acabamentosInt')).join(' ') });
    if (materiais.selecoes.fechamentosExt.length > 0) materiaisArr.push({ title: 'FECHAMENTOS EXTERNOS', text: materiais.selecoes.fechamentosExt.map(i => traduzirMaterial(i, 'fechamentosExt')).join(' ') });
    if (materiais.selecoes.acabamentosExt.length > 0) materiaisArr.push({ title: 'ACABAMENTOS EXTERNOS', text: materiais.selecoes.acabamentosExt.map(i => traduzirMaterial(i, 'acabamentosExt')).join(' ') });
    if (materiais.acessoriosToldo.trim() !== '') materiaisArr.push({ title: 'ACESSÓRIOS EXTERNOS (TOLDO)', text: materiais.acessoriosToldo });
    if (materiais.selecoes.pisos.length > 0) materiaisArr.push({ title: 'PISOS INTERNOS', text: materiais.selecoes.pisos.map(i => traduzirMaterial(i, 'pisos')).join(' ') });
    if (materiais.selecoes.rodapes.length > 0) materiaisArr.push({ title: 'RODAPÉS', text: materiais.selecoes.rodapes.map(i => traduzirMaterial(i, 'rodapes')).join(' ') });
    if (materiais.outrosPisos.trim() !== '') materiaisArr.push({ title: 'OUTROS PISOS', text: materiais.outrosPisos });
    if (materiais.selecoes.forros.length > 0) materiaisArr.push({ title: 'FORROS', text: materiais.selecoes.forros.map(i => traduzirMaterial(i, 'forros')).join(' ') });
    if (materiais.selecoes.esquadrias.length > 0) materiaisArr.push({ title: 'ESQUADRIAS', text: materiais.selecoes.esquadrias.map(i => traduzirMaterial(i, 'esquadrias')).join(' ') });
    materiaisArr.push({ title: 'FERRAGENS E VIDROS', text: 'Ferragens da marca La Fonte, Papaiz ou similar, acabamento superior cromado ou pintura branca. Vidros lisos, transparentes, temperados (8 ou 10mm) com película de segurança.' });
    materiaisArr.push({ title: 'LOUÇAS E METAIS', text: 'Padrões normativos Deca (Linhas Vogue Plus, Izy, Decamatic ECO), Tramontina (Cubas inox), Tigre (Ralos sifonados titânio) e Viqua (Duchas Marujá).' });
    if (materiais.marmorariaCor.trim() !== '') materiaisArr.push({ title: 'MARMORARIA', text: `As bancadas dos Sanitários, Sala de Classificação, Área para desjejum são executadas em granito de cor: ${materiais.marmorariaCor}.` });
    materiaisArr.push({ title: 'REFRIGERAÇÃO E EXAUSTÃO', text: 'Aparelhos de Ar-Condicionado tipo Split (Hi-Wall, Cassete ou Piso-teto) sistema Inverter. Nos ambientes sem ventilação natural, haverá exaustores mecânicos (ventiladores axiais Multivac), atendendo à RDC 50, Resolução RE nº 09 e NBR 7256/2021.' });

    const htmlMateriais = materiaisArr.map((m, idx) => `
      <div class="keep-with-next">
        <h3 class="left-align" style="color:#000;">9.${idx+1}. ${m.title}</h3>
        <p>${m.text}</p>
      </div>`).join('');

    let figCounter = 1;
    const figEmbalagens = (figCounter++).toString().padStart(2, '0');

    const buildFluxoHtml = (configBaseId, titlePrefix) => {
      let html = '';
      activeFloors.forEach(floor => {
        const imgBase64 = fluxos[configBaseId].imagens[floor];
        const prancha = fluxos[configBaseId].prancha || 'XX';
        const escala = fluxos[configBaseId].escala || 'XX';
        const figNum = imgBase64 ? (figCounter++).toString().padStart(2, '0') : 'XX';
        html += `
          <br clear=all style='mso-special-character:line-break;page-break-before:always'>
          <div class="keep-with-next">
            <h3 class="left-align" style="color: #000; text-transform: uppercase;">${titlePrefix} – ${floor.toUpperCase()}</h3>
            <p>O tráfego contínuo na unidade está indicado na <b>Figura ${figNum}</b> abaixo (sem escala – apenas para análise) representado por tracejados indicativos dos percursos possíveis. No projeto de arquitetura a planta está apresentada na <b>Prancha ${prancha}</b>, com <b>escala ${escala}</b>.</p>
          </div>
          ${imgBase64 ? `
          <table align="center" width="600" style="width: 16cm; margin: 15px auto; border-collapse: collapse; border: none;">
            <tr><td align="center" style="border: 1px solid #ccc; padding: 10px;"><img src="${imgBase64}" width="600" style="width: 16cm; max-width: 100%; height: auto;" alt="Fluxo" /></td></tr>
            <tr><td align="center" style="border: none; padding-top: 8px;"><i style="font-size: 10pt;">Figura ${figNum} - Mapa de Fluxo (${floor}).</i></td></tr>
          </table>
          ` : `<p><i>[Inserir Planta Baixa de Fluxo - ${floor} aqui]</i></p>`}
        `;
      });
      return html;
    };

    const htmlAmbientes = ambientesProjeto.length > 0 ? ambientesProjeto.map((amb, i) => {
      const folhaStr = amb.acabamentos.portaFolhas == 1 ? '1 folha' : `${amb.acabamentos.portaFolhas} folhas`;
      let descPorta = '';
      if(amb.acabamentos.porta && amb.acabamentos.porta !== 'Sem porta (Vão livre)' && amb.acabamentos.porta !== 'Não se aplica') {
         descPorta = `${amb.acabamentos.porta} com ${folhaStr} de ${amb.acabamentos.portaLargura || 'XX'} cm cada. Vão livre de ${amb.acabamentos.portaVao || 'XX'} cm.`;
      } else if (amb.acabamentos.porta === 'Sem porta (Vão livre)') {
         descPorta = `Sem porta (Vão livre).`;
      } else {
         descPorta = 'Não se aplica';
      }

      let subIdx = 1;
      let roomHTML = `<div class="avoid-break" style="margin-bottom: 20px;">`;
      roomHTML += `<h3 class="left-align" style="color:#000; text-transform: uppercase;">${secAmb}.${i+1}. ${amb.nomePersonalizado.toUpperCase()}</h3>`;

      const addLine = (label, value) => {
        if(value && value !== 'Não se aplica' && value !== '') {
           const lines = value.toString().split('\n').filter(l => l.trim() !== '');
           let formattedValue = value;
           if (lines.length > 1) {
              formattedValue = '<br>' + lines.map(l => `&bull; ${l.trim()}`).join('<br>');
           }
           roomHTML += `<p><b>${secAmb}.${i+1}.${subIdx}. ${label}:</b> ${formattedValue}</p>`;
           subIdx++;
        }
      };

      if (tipoRelatorio === 'organizacao' || tipoRelatorio === 'tecnico') {
        addLine('Definição', amb.definicao);
        addLine('Atividades relacionadas', amb.atividades);
        addLine('Equipamentos', amb.equipamentos);
        addLine('Mobiliários', amb.mobiliarios);
        addLine('Movelarias', amb.movelarias);
        addLine('Acessórios', amb.acessorios);
        addLine('Marmoraria', amb.marmoraria);
        addLine('Infraestrutura', amb.infraestrutura);
      }

      addLine('Área', amb.area ? `${amb.area} m²` : 'A definir');

      if (tipoRelatorio === 'descritivo' || tipoRelatorio === 'tecnico') {
        addLine('Piso', traduzirMaterial(amb.acabamentos.piso, 'pisos'));
        addLine('Rodapé', traduzirMaterial(amb.acabamentos.rodape, 'rodapes'));
        addLine('Paredes', traduzirMaterial(amb.acabamentos.parede, 'acabamentosInt'));
        addLine('Teto', traduzirMaterial(amb.acabamentos.teto, 'forros'));
        addLine('Porta', descPorta);
      }

      roomHTML += `</div>`;
      return roomHTML;
      
    }).join('') : '<p><i>Nenhum ambiente adicionado ao projeto.</i></p>';

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${docTitle}</title>
        <style>
          body { font-family: 'Calibri', sans-serif; font-size: 11pt; line-height: 1.5; color: #000; text-align: justify; }
          h1, h2, h3 { page-break-after: avoid; }
          .keep-with-next { page-break-after: avoid; }
          .avoid-break { page-break-inside: avoid; }
          h1 { font-size: 14pt; font-weight: bold; text-align: center; margin-top: 24px; text-transform: uppercase; }
          h2 { font-size: 12pt; font-weight: bold; margin-top: 24px; margin-left: 10px; background-color: #f3f4f6; padding: 5px; text-transform: uppercase; }
          h3 { font-size: 11pt; font-weight: bold; margin-top: 15px; margin-left: 20px; color: #cc0000; }
          p { margin-bottom: 8px; margin-top: 0; }
          .left-align { text-align: left; }
          .right-align { text-align: right; }
          .assinaturas { text-align: center; margin-top: 60px; page-break-inside: avoid; }
          .linha-assinatura { margin-top: 50px; margin-bottom: 5px; }
          .toc { margin-left: 20px; font-weight: bold; }
        </style>
      </head>
      <body>
        
        <table width="100%" height="900" style="border: none; margin: 0; padding: 0;">
          <tr>
            <td valign="top" align="right">
              <div style="font-size: 12pt; margin-bottom: 100px;">${dataCapa}</div>
              
              <table align="center" width="400" style="width: 10cm; margin: 0 auto 100px auto; border-collapse: collapse; border: none;">
                <tr>
                  <td align="center" style="border: none; padding: 0;">
                    <img src="${identificacao.imagemCapa || LOGO_SABIN_HEADER}" width="400" style="width: 100%; max-width: 10cm; height: auto;" alt="Logotipo / Capa" />
                  </td>
                </tr>
              </table>

              <div style="margin-bottom: 80px;">
                <p style="font-size: 26pt; font-weight: bold; color: #000; margin: 0; padding: 0;">${docTitle}</p>
                <p style="font-size: 14pt; font-weight: bold; color: #cc0000; margin: 5px 0 0 0; padding: 0;">${nomeUnidadeCapa}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td valign="bottom" align="right">
              <p style="font-size: 11pt; margin: 0; text-transform: uppercase;">${identificacao.respProjeto || '[Nome do Engenheiro(a)]'}</p>
              <p style="font-size: 8pt; margin: 0 0 15px 0;">CREA/CAU: ${identificacao.creaCauProjeto || '[000000/D-UF]'}</p>
              
              ${identificacao.respTecnicos.map(rt => `
                <p style="font-size: 11pt; margin: 0; text-transform: uppercase;">${rt.nome || '[Nome do Resp. Técnico]'}</p>
                <p style="font-size: 8pt; margin: 0 0 15px 0;">${rt.conselho || '[CRX: 0000]'}</p>
              `).join('')}

              <p style="font-size: 9pt; color: #cc0000; font-weight: bold; margin: 0;">SABIN DIAGNÓSTICO E SAÚDE</p>
            </td>
          </tr>
        </table>
        
        <br clear=all style='mso-special-character:line-break;page-break-before:always'>

        <h2 class="left-align" style="background-color: transparent; border-bottom: 1px solid #ccc;">SUMÁRIO</h2>
        <p class="toc">1. OBJETIVO</p>
        <p class="toc">2. IDENTIFICAÇÃO DO ESTABELECIMENTO</p>
        <p class="toc">3. DADOS FÍSICOS DA UNIDADE</p>
        <p class="toc">4. EQUIPE TÉCNICA</p>
        <p class="toc">5. INFORMAÇÕES DE ATENDIMENTO E ATIVIDADES</p>
        <p class="toc">6. RELAÇÃO DE CONTRATOS E CONVÊNIOS</p>
        <p class="toc">7. RELAÇÃO DE PRODUTOS E SERVIÇOS TERCEIRIZADOS</p>
        <p class="toc">8. FLUXO DE PRODUÇÃO E PESSOAL</p>
        ${isDescritivo || tipoRelatorio === 'tecnico' ? '<p class="toc">9. MATERIAIS E SERVIÇOS</p>' : ''}
        <p class="toc">${secAmb}. ESPECIFICAÇÃO DOS AMBIENTES</p>
        <p class="toc">${secSrv}. RELAÇÃO DE SERVIÇOS REALIZADOS NO ESTABELECIMENTO</p>
        <p class="toc">${secInst}. DESCRIÇÃO SUCINTA DA SOLUÇÃO ADOTADA PARA AS INSTALAÇÕES</p>
        <p class="toc">${secRef}. REFERÊNCIAS</p>

        <br clear=all style='mso-special-character:line-break;page-break-before:always'>

        <div class="keep-with-next">
          <h2>1. OBJETIVO</h2>
          <p>Este documento tem como finalidade apresentar os ambientes, assim como seus mobiliários, equipamentos, acessórios, a especificação dos materiais construtivos, acabamentos, acessórios e outros componentes, sendo todos eles partes envolvidas no empreendimento da unidade de <b>${textoServicosObjetivo}</b> do <b>${identificacao.nomeFantasia || '[Nome Fantasia]'}</b>.</p>
        </div>
        <p>É um complemento para a avaliação do projeto de edificações e emissão do <b>${identificacao.tipoProjeto}</b>, considerando a necessidade de organizar o processo de análise e aprovação de projetos de Estabelecimentos Assistenciais de Saúde e de Interesse à Saúde.</p>

        <div class="keep-with-next">
          <h2>2. IDENTIFICAÇÃO DO ESTABELECIMENTO</h2>
          <p><b>Razão Social:</b> ${identificacao.razaoSocial || '[Razão Social]'}</p>
        </div>
        <p><b>Nome Fantasia:</b> ${identificacao.nomeFantasia || '[Nome Fantasia]'}</p>
        <p><b>Nome da Unidade:</b> ${identificacao.nomeUnidade || '[Nome da Unidade]'}</p>
        <p><b>Endereço:</b> ${identificacao.endereco || '[Endereço]'}</p>
        <p><b>CEP:</b> ${identificacao.cep || '[00000-000]'}</p>
        <p><b>CNPJ:</b> ${identificacao.cnpj || '[00.000.000/0000-00]'}</p>
        ${cnaesHtml}
        <p><b>Telefone Engenharia:</b> ${identificacao.telefoneEngenharia || '[Telefone]'}</p>
        <p><b>E-mails (Engenharia e Projetos):</b> ${identificacao.emailsSelecionados.length > 0 ? identificacao.emailsSelecionados.join('; ') : '[E-mails]'}</p>

        <div class="keep-with-next">
          <h2>3. DADOS FÍSICOS DA UNIDADE</h2>
          <p>A unidade é composta por ${calcularPavimentos()} pavimentos, divididos estruturalmente da seguinte forma:</p>
        </div>
        <p>
          ${identificacao.possuiSubsolo ? identificacao.subsolos.map((s, i) => `<b>Subsolo ${identificacao.subsolos.length > 1 ? i+1 : ''}:</b> Área de ${s.area || '[0]'} m², contemplando ${s.ambientes || '[0]'} ambientes.<br>`).join('') : ''}
          ${identificacao.possuiTerreo ? `<b>Térreo:</b> Área de ${identificacao.terreo.area || '[0]'} m², contemplando ${identificacao.terreo.ambientes || '[0]'} ambientes.<br>` : ''}
          ${identificacao.possuiAndares ? identificacao.andares.map((a, i) => `<b>Andar ${i+1}:</b> Área de ${a.area || '[0]'} m², contemplando ${a.ambientes || '[0]'} ambientes.<br>`).join('') : ''}
        </p>
        <p><b>Área Total Construída:</b> ${areaTotalCalculada} m²</p>
        <p><b>Quantidade Total de Ambientes:</b> ${ambientesTotalCalculado}</p>

        <div class="keep-with-next">
          <h2>4. EQUIPE TÉCNICA</h2>
          ${identificacao.respTecnicos.map(rt => `<p><b>Responsável Técnico pela Unidade:</b> ${rt.nome || '[Nome]'} - ${rt.conselho || '[Conselho]'}</p>`).join('')}
        </div>
        <p><b>Responsável Legal:</b> ${identificacao.respLegal || '[Nome]'} - CPF: ${identificacao.cpfRespLegal || '[000.000.000-00]'}</p>

        <h2>5. INFORMAÇÕES DE ATENDIMENTO E ATIVIDADES</h2>
        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">5.1. ATIVIDADES RELACIONADAS:</h3>
          <p>${atendimento.atividade !== 'Selecione a atividade...' ? (atendimento.atividade === 'Outro (Especificar)' ? atendimento.atividadeManual : atendimento.atividade) : '[Atividade]'}</p>
        </div>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">5.2. CAPACIDADE MÉDIA DE ATENDIMENTO:</h3>
          <p>${atendimento.capacidadeDia || '[0]'} clientes por dia.</p>
        </div>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">5.3. TIPOS DE MATERIAIS COLETADOS:</h3>
          <p>Sangue, secreções (para realização de cultura, exame a fresco, bacterioscópico, entre outros), urina, curvas glicêmicas/insulinêmicas, curva de lactose, tempo de sangramento e tempo de coagulação, secreção nasofaríngea.</p>
        </div>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">5.4. HORÁRIO DE FUNCIONAMENTO:</h3>
          <p>${atendimento.horarioSemana || '[Horário de Segunda a Sexta]'}<br>${atendimento.horarioSabado || '[Horário de Sábado]'}</p>
        </div>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">5.5. CARGOS DOS COLABORADORES:</h3>
          <p>Agente de Recepção, Colhedor (a) (Técnico/Auxiliar de Enfermagem e/ou Técnico de Análises Clínicas), Supervisor (a) de Unidade e Agentes de Apoio.</p>
        </div>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">5.6. PERCURSO DOS CLIENTES NO POSTO DE COLETA:</h3>
          <p>Ao entrar no posto de coleta, o cliente retira uma senha e aguarda na recepção. O equipamento de televisão instalado em local visível à todas as cadeiras da espera, mostrará a senha e o correspondente guichê para atendimento. Durante o processo de admissão do cliente, o funcionário Sabin colhe informações pessoais, o pedido médico e identifica os exames que serão realizados.</p>
        </div>
        <p>Após conclusão do atendimento inicial, o cliente é direcionado à sala onde serão colhidas as amostras biológicas – o tipo de sala de coleta varia de acordo com o exame a ser realizado. No caso de coletas de urina, fezes e secreções, o cliente recebe do atendente o frasco estéril e as orientações de coleta para realizá-las em casa.</p>
        <p>Após serem concluídas as coletas no posto, o cliente é direcionado à Área para desjejum, onde é oferecido o desjejum opcional. São disponibilizadas refeições rápidas como: sucos, biscoitos, pães de queijo, frutas, café, chocolate quente, água potável, entre outros.</p>
        <p>Os ambientes Sanitário, Sanitário P.C.D., Recepção e Área para desjejum são de livre circulação para os pacientes e acompanhantes. O acesso e permanência do cliente nas salas de coleta deve acontecer sempre acompanhado por um funcionário do laboratório. Os demais ambientes possuem acesso restrito aos funcionários do Laboratório Sabin;</p>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">5.7. TRANSPORTE DE AMOSTRAS BIOLÓGICAS:</h3>
          <p>Todas as amostras biológicas provenientes do posto de coleta são transportadas em recipiente isotérmico, higienizável, impermeável e com controle de temperatura que garante a estabilidade das amostras biológicas desde a coleta até a realização da análise dos exames.</p>
        </div>
        <p>O deslocamento das amostras pode acontecer em 03 tipos de percurso diferentes:<br>
        <b>CURTO:</b> Quando o N.T.O. (Núcleo Técnico Operacional) é dentro da unidade;<br>
        <b>MÉDIO:</b> Quando o N.T.O. (Núcleo Técnico Operacional) se localiza em outro estabelecimento na mesma cidade;<br>
        <b>LONGO:</b> Quando se faz necessário algum exame específico e o equipamento próprio para analisá-lo está locado em outra cidade ou país;</p>
        <p>O recipiente descrito garante total segurança no deslocamento das amostras, evitando que os colaboradores envolvidos no transporte tenham contato com o material coletado. As caixas térmicas são armazenadas no porta-malas dos veículos ou no baú das motocicletas. No caso das motocicletas, o baú é trancado para evitar uma possível abertura da tampa durante o percurso. O recipiente é devidamente encaixado de modo que não deslize durante o transporte, as temperaturas dos recipientes são monitoradas por leitura em termômetro digital e anotadas na saída de cada unidade e no setor de triagem da Matriz, onde é realizado a análise dos exames. As amostras são armazenadas em geladeiras ou temperatura ambiente conforme descrito no procedimento, de acordo com a amostra coletada, com o monitoramento de temperatura no ambiente e no refrigerador;</p>
        <p>As amostras biológicas são acondicionadas conforme a instrução de embalagem da ANVISA, Resolução nº 504, de maio de 2021:</p>
        <p>Embalagem primária, dotada de dispositivo que garante a vedação à prova de vazamento e impermeável para amostras líquidas, e no caso de amostras sólidas ou semissólidas, recipientes resistentes e dotados de mecanismo de fechamento que impede o extravasamento do material.</p>
        <p>Embalagem secundária de material resistente de forma a conter a embalagem primária, à prova de vazamentos.</p>
        <p>Embalagem terciária rígida, resistente, com dimensão adequada ao material biológico transportado e dotado de dispositivo de fechamento, observando-se que os materiais laváveis e resistentes a desinfetantes utilizáveis.</p>
        <p>Modelo do recipiente utilizado: Caixa térmica de 32 litros; Cor: azul; Material: polipropileno; Peso: 2,7 kg (variação 5% medidas / Unidade: 32x40x45). Conforme figura abaixo:</p>
        
        <table align="center" width="500" style="width: 14cm; margin: 20px auto; border-collapse: collapse; border: none;">
          <tr>
            <td align="center" style="border: none; padding: 0;">
              <img src="${atendimento.imagemEmbalagens || IMAGEM_EMBALAGENS_FIXA}" width="500" style="width: 100%; max-width: 14cm; height: auto;" alt="Embalagens e recipientes de transporte" />
            </td>
          </tr>
          <tr>
            <td align="center" style="border: none; padding-top: 8px;">
              <i style="font-size: 10pt;">Figura ${figEmbalagens} - Embalagens e recipientes de transporte.</i>
            </td>
          </tr>
        </table>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">5.8. ARMAZENAMENTO DE INSUMOS:</h3>
          <p>Todos os insumos do posto de coleta são armazenados em armários locados nos ambientes onde seus usos são habituais e são rastreados em cumprimento da norma PALC.</p>
        </div>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">5.9. FORMA DE APRESENTAÇÃO DOS RESÍDUOS SÓLIDOS PARA COLETA:</h3>
          <p>A unidade possui ${atendimento.qtdBombonasTotal || '[0]'} bombonas de lixo de ${atendimento.tipoBombona} litros fabricadas em polietileno de alta densidade (PEAD). Tendo a distribuição para recolhimento e pesagem:</p>
        </div>
        <ul style="margin-top: 5px;">
           <li><b>Comuns (Grupo D):</b> ${atendimento.qtdComum || '[0]'} contentores</li>
           <li><b>Infectantes (Grupo A):</b> ${atendimento.qtdInfectante || '[0]'} contentores</li>
           <li><b>Químicos (Grupo B):</b> ${atendimento.qtdQuimico || '[0]'} contentores</li>
           <li><b>Perfurocortantes (Grupo E):</b> ${atendimento.qtdPerfurocortante || '[0]'} contentores</li>
        </ul>
        
        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">5.10. LOGÍSTICA DE ARMAZENAMENTO E COLETA EXTERNA DOS RESÍDUOS:</h3>
          <p>A unidade caracteriza-se como geradora de pequeno volume de Resíduos de Serviços de Saúde (RSS), mantendo o acondicionamento dos contentores descritos no item anterior de forma temporária e exclusiva em Abrigo Interno de Resíduos.</p>
        </div>
        <p>Para atestar a segurança sanitária, mitigar riscos ocupacionais e garantir a total ausência de contaminação cruzada, a retirada definitiva dos resíduos pela empresa terceirizada especializada ocorre mediante roteirização e agendamento prévio, estritamente em horário alternativo e contrário ao fluxo de atendimento.</p>
        <p>Desta forma, a operação de transbordo das bombonas do abrigo interno até o veículo coletor é executada com a unidade fechada para o público externo (ou em atestada ausência de pacientes). Este controle operacional padrão assegura que não haverá cruzamento simultâneo e físico entre a rota de saída do lixo biológico/comum e a circulação de áreas limpas, entrada de usuários, ou rotas de recebimento de insumos e malotes.</p>

        <div class="keep-with-next">
          <h2>6. RELAÇÃO DE CONTRATOS E CONVÊNIOS</h2>
          <p>Disponível na matriz do Sabin Medicina Diagnóstica – Brasília SAAN Trecho 03 lotes 165 a 245.</p>
        </div>

        <div class="keep-with-next">
          <h2>7. RELAÇÃO DE PRODUTOS E SERVIÇOS TERCEIRIZADOS</h2>
          <p>O único serviço terceirizado do estabelecimento é a coleta e destinação final dos resíduos infectantes e perfuro-cortantes gerados nos serviços de saúde – RSS.<br>Abaixo seguem as informações do referido prestador de serviço:</p>
        </div>
        <br>
        <div class="left-align">
          <p><b>Fornecedor 1 (Principal):</b><br>
          Razão Social: ${atendimento.rssRazaoSocial || '[Não informado]'}<br>
          Nome Fantasia: ${atendimento.rssNomeFantasia || '[Não informado]'}<br>
          CNPJ: ${atendimento.rssCnpj || '[Não informado]'}<br>
          Inscrição Municipal: ${atendimento.rssInscricaoMunicipal || '[Não informado]'}<br>
          Endereço: ${atendimento.rssEndereco || '[Não informado]'}<br>
          CEP: ${atendimento.rssCep || '[Não informado]'}</p>
          
          ${atendimento.possuiFornecedor2 ? `
          <br>
          <p><b>Fornecedor 2 (Secundário):</b><br>
          Razão Social: ${atendimento.rss2RazaoSocial || '[Não informado]'}<br>
          Nome Fantasia: ${atendimento.rss2NomeFantasia || '[Não informado]'}<br>
          CNPJ: ${atendimento.rss2Cnpj || '[Não informado]'}<br>
          Inscrição Municipal: ${atendimento.rss2InscricaoMunicipal || '[Não informado]'}<br>
          Endereço: ${atendimento.rss2Endereco || '[Não informado]'}<br>
          CEP: ${atendimento.rss2Cep || '[Não informado]'}</p>
          ` : ''}
        </div>

        <h2>8. FLUXO DE PRODUÇÃO E PESSOAL</h2>
        ${buildFluxoHtml('clientes', '8.1. FLUXO DE CLIENTES')}
        ${buildFluxoHtml('funcionarios', '8.2. FLUXO DE FUNCIONÁRIOS')}
        ${buildFluxoHtml('amostras', '8.3. FLUXO DE AMOSTRAS')}
        ${buildFluxoHtml('residuos', '8.4. FLUXO DE RESÍDUOS')}

        ${isDescritivo || tipoRelatorio === 'tecnico' ? `<h2>9. MATERIAIS E SERVIÇOS</h2>\n${htmlMateriais}` : ''}

        <h2>${secAmb}. ESPECIFICAÇÃO DOS AMBIENTES</h2>
        ${htmlAmbientes}

        <div class="keep-with-next">
          <h2>${secSrv}. RELAÇÃO DE SERVIÇOS REALIZADOS NO ESTABELECIMENTO</h2>
          <p>Serão apresentadas a seguir as listagens das atividades e subatividades do EAS – Estabelecimento Assistencial de Saúde de acordo com as respectivas atribuições constantes na RDC Nº 50, de 21 fevereiro de 2002.</p>
        </div>
        <p>Evidentemente que estão listadas apenas as atividades e subatividades próprias e pertinentes à operação do estabelecimento ${identificacao.nomeFantasia || '[Nome Fantasia]'} – ${identificacao.nomeUnidade || '[Unidade]'}.</p>
        <p>RDC Nº 50 P. 27 e 28.</p>
        <br>
        
        <div class="left-align">
          <p><i>ATRIBUIÇÃO 4: PRESTAÇÃO DE ATENDIMENTO DE APOIO AO DIAGNÓSTICO E TERAPIA <br>
          ATIVIDADES: <br>
          4.1-Patologia clínica: <br>
          &nbsp;&nbsp;&nbsp;&nbsp;4.1.1- Receber ou proceder a coleta de material (no próprio laboratório ou descentralizada); <br>
          &nbsp;&nbsp;&nbsp;&nbsp;4.1.2- Fazer a triagem do material;</i></p>
          ${OPCOES_RDC.filter(op => instalacoes.servicosRdc.includes(op.id)).map(opcao => `
            <p>${opcao.content}</p>
          `).join('')}
        </div>

        <h2>${secInst}. DESCRIÇÃO SUCINTA DA SOLUÇÃO ADOTADA PARA AS INSTALAÇÕES</h2>
        
        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">${secInst}.1. ABASTECIMENTO DE ÁGUA POTÁVEL</h3>
          <p>O estabelecimento é abastecido de água tratada pela ${instalacoes.concessionariaAgua}, que realiza o tratamento e distribuição de água na região.</p>
        </div>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">${secInst}.2. ENERGIA ELÉTRICA</h3>
          <p>O abastecimento de energia elétrica é provido pela ${instalacoes.concessionariaEnergia}. A unidade possui uma instalação elétrica independente, constituída por diversos elementos:</p>
        </div>
        <ul style="margin-left: 20px;">
           <li>Quadro elétrico de distribuição e proteção, com disjuntores e dispositivos DR para proteger e controlar as sobrecargas dos circuitos;</li>
           <li>Tomadas de energia, para ligações de equipamentos de uso corrente;</li>
           <li>Pontos de iluminação, para ligação de lâmpadas e luminárias;</li>
           <li>Interruptores para acionamento dos pontos de iluminação.</li>
        </ul>
        <p>O quadro elétrico é composto por disjuntor geral de 100A e dispositivo diferencial residual (DR) que desliga todos os circuitos, e por diversos disjuntores secundários, que desligam os seus respectivos circuitos.<br>
        Esse dispositivo diferencial DR tem ainda a função de segurança de todos os circuitos elétricos contra as correntes de fuga provocadas por equipamentos eletroeletrônicos. Os disjuntores são acionados pela simples movimentação de suas alavancas, em caso de sobrecarga momentânea, o disjuntor do circuito atingido se desligará automaticamente.</p>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">${secInst}.3. ILUMINAÇÃO DE EMERGÊNCIA</h3>
          <p>O empreendimento contempla a iluminação de emergência, através de um circuito de 16A, dedicado, no quadro de distribuição, de acordo com a ABNT 10.898/2013 - Sistema de Iluminação de Emergency e NPT – Norma de Procedimento Técnico 018 -11.</p>
        </div>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">${secInst}.4. COLETA E DESTINAÇÃO DE ESGOTO</h3>
          <p>A ${instalacoes.concessionariaAgua} realiza, respectivamente, a coleta e tratamento de esgoto sanitário de forma rápida e segura.<br>A empresa realiza o tratamento e destinação adequados dos resíduos líquidos, com índice de ${instalacoes.indiceEsgoto}% de coleta e tratamento de esgoto.</p>
        </div>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">${secInst}.5. RESÍDUOS SÓLIDOS</h3>
          <p>Os resíduos sólidos do estabelecimento são coletados pela ${instalacoes.coletaResiduos}, que realiza a gestão de resíduos sólidos urbanos através dos serviços de coleta domiciliar, destinação final dos resíduos sólidos urbanos e programa de coleta seletiva.</p>
        </div>

        <div class="keep-with-next">
          <h3 class="left-align" style="color: #000;">${secInst}.6. ÁGUAS PLUVIAIS</h3>
          <p>A água da chuva é coletada por dispositivos de captação instalados no edifício. Logo em seguida, a centralização é direcionada para rede pública de águas pluviais. Não há utilização de águas pluviais para reuso.</p>
        </div>

        <div class="keep-with-next">
          <h2>${secRef}. REFERÊNCIAS</h2>
          <p class="left-align">
            Resolução nº 0389/2006 – Publicada no DOE – 7148, de 16/06/06<br>
            RDC Nº 50, de 21 de fevereiro de 2002<br>
            RDC Nº 51, de 06 de outubro de 2011<br>
            RDC Nº 222, de 28 de março de 2018<br>
            RDC Nº 978, de 06 de junho de 2025<br>
            NBR 9050, de 03 de agosto de 2020
          </p>
        </div>

        <div class="assinaturas" style="page-break-inside: avoid;">
          <br><br><br><br><br><br><br>
          <div class="linha-assinatura">______________________________________________</div>
          <b>${identificacao.respProjeto || '[Nome do Engenheiro(a)]'}</b><br>
          Engenheiro(a) Responsável Pelo Projeto<br>
          CREA/CAU: ${identificacao.creaCauProjeto || '[XXXXX/D-UF]'}<br>
          
          ${identificacao.respTecnicos.map(rt => `
            <br><br><br><br><br><br><br>
            <div class="linha-assinatura">______________________________________________</div>
            <b>${rt.nome || '[Nome do Resp. Técnico]'}</b><br>
            Responsável Técnico da unidade Laboratório Sabin/${identificacao.nomeFantasia || '[Nome Fantasia]'}<br>
            ${rt.conselho || '[CRX:XXXX-UF]'}<br>
          `).join('')}
          
          <br><br><br><br><br><br><br>
          <div class="linha-assinatura">______________________________________________</div>
          <b>${identificacao.respLegal || '[Nome do Resp. Legal]'}</b><br>
          Responsável Legal pelo Grupo Sabin<br>
          CPF: ${identificacao.cpfRespLegal || '[000.000.000-00]'}<br>
          
          <br><br><br>
          <p class="right-align">${dataFormatada}</p>
        </div>

      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileNameStr}_${identificacao.nomeFantasia ? identificacao.nomeFantasia.replace(/\s+/g, '_').toLowerCase() : 'Sabin'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const MaterialCheckboxGroup = ({ title, icon: Icon, category, options }) => (
    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mb-5">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
        <Icon size={18} className="text-red-600"/> {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map(opt => (
          <label key={opt} className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center pt-0.5">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer"
                checked={materiais.selecoes[category].includes(opt)}
                onChange={() => handleMaterialToggle(category, opt)}
              />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-red-700 transition-colors leading-tight">{opt}</span>
          </label>
        ))}
      </div>
      {materiais.selecoes[category].includes('Existente') && (
        <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Especificar Material Existente</label>
          <input 
            type="text" 
            value={materiais.textosExistentes[category]} 
            onChange={(e) => handleTextosMateriais(category, e.target.value)}
            className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none text-sm placeholder-gray-400" 
            placeholder="Digite a especificação do item existente..." 
          />
        </div>
      )}
    </div>
  );

  const fluxosConfig = [
    { id: 'clientes', title: '8.1. Fluxo de Clientes' },
    { id: 'funcionarios', title: '8.2. Fluxo de Funcionários' },
    { id: 'amostras', title: '8.3. Fluxo de Amostras' },
    { id: 'residuos', title: '8.4. Fluxo de Resíduos' },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-gray-800 font-sans p-6 pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER GERAL */}
        <div className="flex flex-col mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-t-xl shadow-sm border-b border-gray-200">
            <div>
              <h1 className="text-2xl font-bold text-red-700">Gerador de memorial</h1>
              <p className="text-sm text-gray-500 mt-1">Sabin Medicina Diagnóstica</p>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <label className="cursor-pointer flex justify-center items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                <UploadCloud size={16} /> Importar dados
                <input type="file" className="hidden" accept=".json" onChange={handleLoadData} />
              </label>
              <button onClick={handleSaveData} className="flex justify-center items-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                <Save size={16} /> Salvar
              </button>
              
              <div className="relative">
                <button onClick={() => setExportDropdownOpen(!exportDropdownOpen)} className="flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  <FileSignature size={16} /> Gerar relatórios <ChevronDown size={14} />
                </button>
                
                {exportDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-xl z-50 overflow-hidden">
                    <button onClick={() => { gerarDocumentoWord('descritivo'); setExportDropdownOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 border-b border-gray-100 flex items-center gap-2">
                      <Hammer size={14} className="text-red-600"/> Memorial Descritivo Arq.
                    </button>
                    <button onClick={() => { gerarDocumentoWord('organizacao'); setExportDropdownOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 border-b border-gray-100 flex items-center gap-2">
                      <Users size={14} className="text-red-600"/> Memorial Org. Física
                    </button>
                    <button onClick={() => { gerarDocumentoWord('tecnico'); setExportDropdownOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 border-b border-gray-100 flex items-center gap-2">
                      <FileText size={14} className="text-red-600"/> Relatório Técnico
                    </button>
                    <button onClick={() => { gerarDocumentoWord('todos'); setExportDropdownOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50 flex items-center gap-2">
                      <Download size={14} /> Gerar Todos os 3
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex bg-white shadow-sm rounded-b-xl px-2 md:px-4 overflow-x-auto hide-scrollbar">
            <button onClick={() => setActiveTab('identificacao')} className={`whitespace-nowrap py-4 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'identificacao' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>1. Identificação</button>
            <button onClick={() => setActiveTab('atendimento')} className={`whitespace-nowrap py-4 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'atendimento' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>2. Atendimento</button>
            <button onClick={() => setActiveTab('fluxos')} className={`whitespace-nowrap py-4 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'fluxos' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>3. Fluxos</button>
            <button onClick={() => setActiveTab('materiais')} className={`whitespace-nowrap py-4 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'materiais' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>4. Materiais Básicos</button>
            <button onClick={() => setActiveTab('ambientesEspecificos')} className={`whitespace-nowrap py-4 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'ambientesEspecificos' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>5. Ambientes</button>
            <button onClick={() => setActiveTab('instalacoes')} className={`whitespace-nowrap py-4 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'instalacoes' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>6. Instalações</button>
          </div>
        </div>

        {/* ================= FASE 1: IDENTIFICAÇÃO ================= */}
        <div className={activeTab === 'identificacao' ? "space-y-6 animate-in fade-in" : "hidden"}>

          {/* NOVO UPLOAD PARA IMAGEM DA CAPA */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm mb-6">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2 mb-2"><ImageIcon size={18}/> Imagem da Capa (Logomarca)</h3>
            <p className="text-xs text-blue-800 mb-4"><strong>Nota:</strong> Esta é uma solução temporária para inclusão da logomarca na capa do documento gerado.</p>
            {!identificacao.imagemCapa ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-white hover:bg-blue-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-2 text-blue-500" />
                  <p className="text-sm text-gray-600"><span className="font-semibold text-blue-600">Clique para anexar</span> imagem da capa - Pasta memoriais (imagens memorial)</p>
                </div>
                <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={(e) => handleBase64Upload(setIdentificacao, 'imagemCapa', e)} />
              </label>
            ) : (
              <div className="relative w-full rounded-lg border border-gray-200 overflow-hidden bg-white p-2 flex items-center justify-center h-40">
                <img src={identificacao.imagemCapa} alt="Capa" className="max-h-full max-w-full object-contain rounded" />
                <button onClick={() => setIdentificacao(prev => ({...prev, imagemCapa: null}))} className="absolute top-2 right-2 p-1.5 bg-gray-800 text-white rounded-full hover:bg-gray-900 shadow-lg"><Trash2 size={14} /></button>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2"><Building2 size={20} className="text-red-600"/> 1. Identificação do Estabelecimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tipo de Aprovação</label>
                <select name="tipoProjeto" value={identificacao.tipoProjeto} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none bg-red-50 text-red-800 font-medium">
                  <option value="PBA – Projeto Básico de Arquitetura">PBA – Projeto Básico de Arquitetura</option>
                  <option value="LTA – Laudo Técnico de Arquitetura">LTA – Laudo Técnico de Arquitetura</option>
                </select>
              </div>

              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Razão Social</label><input type="text" name="razaoSocial" value={identificacao.razaoSocial} onChange={handleChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nome Fantasia (Conforme CNPJ)</label><input type="text" name="nomeFantasia" value={identificacao.nomeFantasia} onChange={handleChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nome da Unidade</label><input type="text" name="nomeUnidade" value={identificacao.nomeUnidade} onChange={handleChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Ex: Unidade Buritis" /></div>
              <div className="md:col-span-2 border-b border-gray-100 my-2"></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Cidade</label><input type="text" name="cidade" value={identificacao.cidade} onChange={handleChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Ex: Planaltina" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">UF (Estado)</label><input type="text" name="uf" value={identificacao.uf} onChange={handleChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Ex: DF" /></div>
              <div className="md:col-span-2"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Endereço Completo</label><input type="text" name="endereco" value={identificacao.endereco} onChange={handleChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
              
              {/* Máscaras de Autoformatação Aplicadas Aqui */}
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CEP</label><input type="text" name="cep" value={identificacao.cep} onChange={(e) => handleChangeWithMask(e, setIdentificacao)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="00000-000" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CNPJ</label><input type="text" name="cnpj" value={identificacao.cnpj} onChange={(e) => handleChangeWithMask(e, setIdentificacao)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="00.000.000/0000-00" /></div>
              
              <div className={isCnaeManual ? "md:col-span-2 relative" : "relative"}>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CNAEs</label>
                <div className="w-full border border-gray-300 rounded-md p-2 bg-[#f8fafc] flex justify-between items-center cursor-pointer" onClick={() => setCnaeDropdownOpen(!cnaeDropdownOpen)}>
                  <span className="text-sm text-gray-900 truncate">
                    {identificacao.cnaesSelecionados.length > 0 
                      ? `${identificacao.cnaesSelecionados[0]} ${identificacao.cnaesSelecionados.length > 1 ? `(+${identificacao.cnaesSelecionados.length - 1})` : ''}`
                      : 'Selecione os CNAEs...'}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
                {cnaeDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
                    {CNAE_OPCOES.map((cnae) => (
                      <div key={cnae} className="flex items-center px-3 py-2 hover:bg-red-50 cursor-pointer border-b border-gray-50 last:border-0" onClick={() => handleCnaeToggle(cnae)}>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${identificacao.cnaesSelecionados.includes(cnae) ? 'bg-red-600 border-red-600' : 'border-gray-300 bg-white'}`}>
                          {identificacao.cnaesSelecionados.includes(cnae) && <Check size={12} className="text-white" strokeWidth={3} />}
                        </div>
                        <span className="text-sm text-gray-900">{cnae} {identificacao.cnaesSelecionados[0] === cnae ? '(Principal)' : ''}</span>
                      </div>
                    ))}
                    <div className="px-3 py-2 border-t border-gray-100">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={isCnaeManual} onChange={(e) => setIsCnaeManual(e.target.checked)} className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <span className="text-sm font-medium text-red-700">Outro (Digitar Manualmente)</span>
                      </label>
                    </div>
                  </div>
                )}
                {isCnaeManual && (
                  <input type="text" name="cnaeManual" value={identificacao.cnaeManual} onChange={handleChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none mt-2" placeholder="Digite o CNAE personalizado..." />
                )}
              </div>

              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Telefone Engenharia</label><input type="text" name="telefoneEngenharia" value={identificacao.telefoneEngenharia} onChange={(e) => handleChangeWithMask(e, setIdentificacao)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="(00) 0000-0000" /></div>
              
              <div className="md:col-span-2 relative">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">E-mails</label>
                <div className="w-full border border-gray-300 rounded-md p-2 bg-[#f8fafc] flex justify-between items-center cursor-pointer" onClick={() => setEmailDropdownOpen(!emailDropdownOpen)}>
                  <span className="text-sm text-gray-900 truncate">{identificacao.emailsSelecionados.length > 0 ? identificacao.emailsSelecionados.join('; ') : 'Selecione os e-mails...'}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
                {emailDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
                    {EMAILS_EQUIPE.map((email) => (
                      <div key={email} className="flex items-center px-3 py-2 hover:bg-red-50 cursor-pointer border-b border-gray-50 last:border-0" onClick={() => handleEmailToggle(email)}>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${identificacao.emailsSelecionados.includes(email) ? 'bg-red-600 border-red-600' : 'border-gray-300 bg-white'}`}>
                          {identificacao.emailsSelecionados.includes(email) && <Check size={12} className="text-white" strokeWidth={3} />}
                        </div>
                        <span className="text-sm text-gray-900">{email}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2"><MapPin size={20} className="text-red-600"/> 3. Dados Físicos da Unidade</h2>
            <div className="mb-6 bg-red-50/50 p-4 rounded-lg border border-red-100">
              <h3 className="font-semibold text-sm text-red-900 mb-3">Selecione os pavimentos existentes:</h3>
              <div className="flex flex-wrap gap-6 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="possuiSubsolo" checked={identificacao.possuiSubsolo} onChange={handleCheckboxChange} className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                  <span className="text-sm font-medium text-gray-800">Subsolo</span>
                </label>
                {identificacao.possuiSubsolo && (
                  <div className="flex items-center gap-2 ml-2 bg-white px-2 py-1 rounded border border-gray-200">
                    <span className="text-xs font-semibold text-gray-600">Qtd:</span>
                    <input type="number" min="1" value={identificacao.qtdSubsolos} onChange={(e) => handlePavimentoCount('subsolos', 'qtdSubsolos', e.target.value)} className="w-12 border-none p-0 text-sm focus:ring-0 outline-none text-center text-red-700 font-bold bg-[#f8fafc]" />
                  </div>
                )}

                <div className="h-6 w-px bg-red-200 mx-2"></div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="possuiTerreo" checked={identificacao.possuiTerreo} onChange={handleCheckboxChange} className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                  <span className="text-sm font-medium text-gray-800">Térreo</span>
                </label>
                
                <div className="h-6 w-px bg-red-200 mx-2"></div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="possuiAndares" checked={identificacao.possuiAndares} onChange={handleCheckboxChange} className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                  <span className="text-sm font-medium text-gray-800">Andares Superiores</span>
                </label>
                {identificacao.possuiAndares && (
                  <div className="flex items-center gap-2 ml-2 bg-white px-2 py-1 rounded border border-gray-200">
                    <span className="text-xs font-semibold text-gray-600">Qtd:</span>
                    <input type="number" min="1" value={identificacao.qtdAndares} onChange={(e) => handlePavimentoCount('andares', 'qtdAndares', e.target.value)} className="w-12 border-none p-0 text-sm focus:ring-0 outline-none text-center text-red-700 font-bold bg-[#f8fafc]" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="md:col-span-4"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nº Total de Pavimentos</label><div className="w-1/4 border border-gray-300 bg-[#e5e7eb] rounded-md p-2 text-gray-900 font-bold text-center">{calcularPavimentos()}</div></div>
              
              <div className="col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col gap-4 max-h-80 overflow-y-auto">
                <h3 className="font-semibold text-sm text-gray-800">Áreas Construídas (m²)</h3>
                <div className="grid grid-cols-1 gap-3">
                  {identificacao.possuiSubsolo && identificacao.subsolos.map((s, i) => (
                    <div key={`sub-area-${i}`}><label className="block text-xs text-gray-500 mb-1">Subsolo {identificacao.subsolos.length > 1 ? i+1 : ''}</label><input type="text" value={s.area} onChange={(e) => handlePavimentoData('subsolos', i, 'area', e.target.value)} className="w-full border border-gray-300 bg-white text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                  ))}
                  {identificacao.possuiTerreo && <div><label className="block text-xs text-gray-500 mb-1">Térreo</label><input type="text" value={identificacao.terreo.area} onChange={(e) => handleTerreoData('area', e.target.value)} className="w-full border border-gray-300 bg-white text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>}
                  {identificacao.possuiAndares && identificacao.andares.map((a, i) => (
                    <div key={`and-area-${i}`}><label className="block text-xs text-gray-500 mb-1">Andar {i+1}</label><input type="text" value={a.area} onChange={(e) => handlePavimentoData('andares', i, 'area', e.target.value)} className="w-full border border-gray-300 bg-white text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                  ))}
                  <div className="mt-2 pt-4 border-t border-gray-200"><label className="block text-xs font-bold text-red-700 mb-1">Área Total (Calculada)</label><input type="text" value={areaTotalCalculada} className="w-full border border-red-300 bg-[#e5e7eb] rounded-md p-2 outline-none font-bold text-gray-900 cursor-not-allowed" readOnly /></div>
                </div>
              </div>

              <div className="col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col gap-4 max-h-80 overflow-y-auto">
                <h3 className="font-semibold text-sm text-gray-800">Quantidade de Ambientes</h3>
                <div className="grid grid-cols-1 gap-3">
                  {identificacao.possuiSubsolo && identificacao.subsolos.map((s, i) => (
                    <div key={`sub-amb-${i}`}><label className="block text-xs text-gray-500 mb-1">Subsolo {identificacao.subsolos.length > 1 ? i+1 : ''}</label><input type="number" value={s.ambientes} onChange={(e) => handlePavimentoData('subsolos', i, 'ambientes', e.target.value)} className="w-full border border-gray-300 bg-white text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                  ))}
                  {identificacao.possuiTerreo && <div><label className="block text-xs text-gray-500 mb-1">Térreo</label><input type="number" value={identificacao.terreo.ambientes} onChange={(e) => handleTerreoData('ambientes', e.target.value)} className="w-full border border-gray-300 bg-white text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>}
                  {identificacao.possuiAndares && identificacao.andares.map((a, i) => (
                    <div key={`and-amb-${i}`}><label className="block text-xs text-gray-500 mb-1">Andar {i+1}</label><input type="number" value={a.ambientes} onChange={(e) => handlePavimentoData('andares', i, 'ambientes', e.target.value)} className="w-full border border-gray-300 bg-white text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                  ))}
                  <div className="mt-2 pt-4 border-t border-gray-200"><label className="block text-xs font-bold text-red-700 mb-1">Total Ambientes (Calculado)</label><input type="text" value={ambientesTotalCalculado} className="w-full border border-red-300 bg-[#e5e7eb] rounded-md p-2 outline-none font-bold text-gray-900 cursor-not-allowed" readOnly /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2"><Users size={20} className="text-red-600"/> 4. Equipe Técnica</h2>
            
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sm text-gray-800">Responsáveis Técnicos pela Unidade</h3>
                <button onClick={handleAddRT} className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded hover:bg-red-100 flex items-center gap-1"><Plus size={14}/> Adicionar RT</button>
              </div>
              {identificacao.respTecnicos.map((rt, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 mb-3 relative bg-white p-3 rounded border border-gray-200">
                  <div className="flex-1"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nome do Responsável</label><input type="text" value={rt.nome} onChange={(e) => handleRTChange(i, 'nome', e.target.value)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 text-sm focus:ring-1 focus:ring-red-500 outline-none" placeholder="Nome completo" /></div>
                  <div className="flex-1"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Conselho - UF</label><input type="text" value={rt.conselho} onChange={(e) => handleRTChange(i, 'conselho', e.target.value)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 text-sm focus:ring-1 focus:ring-red-500 outline-none" placeholder="Ex: CRF: 4633 - DF" /></div>
                  {identificacao.respTecnicos.length > 1 && (
                    <button onClick={() => handleRemoveRT(i)} className="md:mt-5 text-gray-400 hover:text-red-600 transition-colors" title="Remover"><Trash2 size={18} /></button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className={isEngenheiroManual ? "md:col-span-2" : ""}>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Engenheiro(a) do Projeto</label>
                <select 
                  value={isEngenheiroManual ? 'Outro (Digitar manualmente)' : identificacao.respProjeto}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'Outro (Digitar manualmente)') {
                      setIsEngenheiroManual(true);
                      setIdentificacao({ ...identificacao, respProjeto: '', creaCauProjeto: '' });
                    } else {
                      setIsEngenheiroManual(false);
                      const eng = ENGENHEIROS.find(en => en.nome === val);
                      setIdentificacao({ ...identificacao, respProjeto: eng.nome, creaCauProjeto: eng.crea });
                    }
                  }}
                  className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  {ENGENHEIROS.map(eng => <option key={eng.nome} value={eng.nome}>{eng.nome}</option>)}
                </select>
              </div>
              {!isEngenheiroManual && <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CREA / CAU</label><input type="text" value={identificacao.creaCauProjeto} className="w-full border border-gray-300 bg-[#e5e7eb] rounded-md p-2 outline-none text-gray-900 font-medium cursor-not-allowed" readOnly /></div>}
              {isEngenheiroManual && (
                <>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nome do Responsável (Outro)</label><input type="text" name="respProjeto" value={identificacao.respProjeto} onChange={handleChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CREA / CAU</label><input type="text" name="creaCauProjeto" value={identificacao.creaCauProjeto} onChange={handleChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-gray-200">
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input type="checkbox" checked={!identificacao.isRespLegalManual} onChange={(e) => {
                    const isDefault = e.target.checked;
                    setIdentificacao(prev => ({
                      ...prev, isRespLegalManual: !isDefault, respLegal: isDefault ? 'Lídia Freire Abdalla Nery' : '', cpfRespLegal: isDefault ? '693.909.246-34' : ''
                    }));
                  }} className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                  <span className="text-sm font-medium text-gray-800">Usar Responsável Legal Padrão (Lídia Freire Abdalla Nery)</span>
                </label>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Responsável Legal</label>
                <input type="text" name="respLegal" value={identificacao.respLegal} onChange={handleChange} readOnly={!identificacao.isRespLegalManual} className={`w-full border border-gray-300 rounded-md p-2 outline-none text-gray-900 focus:ring-2 focus:ring-red-500 ${!identificacao.isRespLegalManual ? 'bg-[#e5e7eb] font-medium cursor-not-allowed' : 'bg-[#f8fafc]'}`} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CPF</label>
                <input type="text" name="cpfRespLegal" value={identificacao.cpfRespLegal} onChange={(e) => handleChangeWithMask(e, setIdentificacao)} readOnly={!identificacao.isRespLegalManual} className={`w-full border border-gray-300 rounded-md p-2 outline-none text-gray-900 focus:ring-2 focus:ring-red-500 ${!identificacao.isRespLegalManual ? 'bg-[#e5e7eb] font-medium cursor-not-allowed' : 'bg-[#f8fafc]'}`} placeholder="000.000.000-00" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= FASE 2: ATENDIMENTO E RESÍDUOS ================= */}
        <div className={activeTab === 'atendimento' ? "space-y-6 animate-in fade-in" : "hidden"}>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2"><Activity size={20} className="text-red-600"/> 5. Informações de Atendimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-800 mt-2 mb-3 flex items-center gap-2">Atividades Relacionadas</label>
                <select name="atividade" value={atendimento.atividade} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none mb-2">
                  {ATIVIDADES_OPCOES.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                </select>
                {atendimento.atividade === 'Outro (Especificar)' && (
                  <input type="text" name="atividadeManual" value={atendimento.atividadeManual} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Digite a atividade relacionada..." />
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800 mt-2 mb-3 flex items-center gap-2">Capacidade Média (Múltiplos de 25)</label>
                <div className="flex items-center gap-2">
                  <input type="number" step="25" min="25" name="capacidadeDia" value={atendimento.capacidadeDia} onChange={handleAtendimentoChange} className="w-1/2 border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none text-center" />
                  <span className="text-sm text-gray-800 font-medium">clientes/dia</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-800 mt-2 mb-3 flex items-center gap-2"><Clock size={16}/> Horário de Funcionamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-xs text-gray-500 mb-1">Segunda a Sexta</label><textarea name="horarioSemana" value={atendimento.horarioSemana} onChange={handleAtendimentoChange} rows={2} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none text-sm resize-none" /></div>
                  <div><label className="block text-xs text-gray-500 mb-1">Sábados</label><textarea name="horarioSabado" value={atendimento.horarioSabado} onChange={handleAtendimentoChange} rows={2} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none text-sm resize-none" /></div>
                </div>
              </div>
            </div>

            {/* NOVO UPLOAD PARA IMAGEM DA CAIXA DE TRANSPORTE */}
            <div className="border-t border-gray-200 mt-6 pt-6 mb-8">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2"><ImageIcon size={16}/> Imagem da Caixa de Transporte</h3>
              {!atendimento.imagemEmbalagens ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-red-200 rounded-lg cursor-pointer bg-red-50/30 hover:bg-red-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-2 text-red-400" />
                    <p className="text-sm text-gray-600"><span className="font-semibold text-red-600">Clique para anexar</span> imagem das embalagens</p>
                  </div>
                  <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={(e) => handleBase64Upload(setAtendimento, 'imagemEmbalagens', e)} />
                </label>
              ) : (
                <div className="relative w-full rounded-lg border border-gray-200 overflow-hidden bg-gray-50 p-2 flex items-center justify-center h-40">
                  <img src={atendimento.imagemEmbalagens} alt="Embalagens" className="max-h-full max-w-full object-contain rounded" />
                  <button onClick={() => setAtendimento(prev => ({...prev, imagemEmbalagens: null}))} className="absolute top-2 right-2 p-1.5 bg-gray-800 text-white rounded-full hover:bg-gray-900 shadow-lg"><Trash2 size={14} /></button>
                </div>
              )}
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2 mt-8"><Trash2 size={20} className="text-red-600"/> 6. Resíduos Sólidos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-gray-50 p-5 rounded-lg border border-gray-200">
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Total de Bombonas</label><input type="number" name="qtdBombonasTotal" value={atendimento.qtdBombonasTotal} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-white text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tipo de Bombona</label>
                <select name="tipoBombona" value={atendimento.tipoBombona} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-white text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none text-sm">
                  {BOMBONAS_OPCOES.map((b) => <option key={b.litros} value={b.litros}>{b.litros} Litros (Peso: {b.peso} | Dimensões: {b.dim})</option>)}
                </select>
              </div>
              <div className="md:col-span-3 border-t border-gray-200 my-2 pt-4">
                <span className="text-sm font-semibold text-gray-800 mb-3 block">Distribuição por Categoria:</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col"><label className="text-xs text-gray-500">Comuns (Grp D)</label><input type="number" name="qtdComum" value={atendimento.qtdComum} onChange={handleAtendimentoChange} className="border border-gray-300 bg-white text-gray-900 rounded-md p-1.5 focus:ring-2 focus:ring-red-500 outline-none text-center" /></div>
                  <div className="flex flex-col"><label className="text-xs text-gray-500">Infectantes (Grp A)</label><input type="number" name="qtdInfectante" value={atendimento.qtdInfectante} onChange={handleAtendimentoChange} className="border border-gray-300 bg-white text-gray-900 rounded-md p-1.5 focus:ring-2 focus:ring-red-500 outline-none text-center" /></div>
                  <div className="flex flex-col"><label className="text-xs text-gray-500">Químicos (Grp B)</label><input type="number" name="qtdQuimico" value={atendimento.qtdQuimico} onChange={handleAtendimentoChange} className="border border-gray-300 bg-white text-gray-900 rounded-md p-1.5 focus:ring-2 focus:ring-red-500 outline-none text-center" /></div>
                  <div className="flex flex-col"><label className="text-xs text-gray-500">Perfuro. (Grp E)</label><input type="number" name="qtdPerfurocortante" value={atendimento.qtdPerfurocortante} onChange={handleAtendimentoChange} className="border border-gray-300 bg-white text-gray-900 rounded-md p-1.5 focus:ring-2 focus:ring-red-500 outline-none text-center" /></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2"><FileSignature size={20} className="text-red-600"/> 7. Serviços Terceirizados (RSS)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="md:col-span-2"><h3 className="font-bold text-gray-800">Fornecedor Principal</h3></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Razão Social</label><input type="text" name="rssRazaoSocial" value={atendimento.rssRazaoSocial} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nome Fantasia</label><input type="text" name="rssNomeFantasia" value={atendimento.rssNomeFantasia} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CNPJ</label><input type="text" name="rssCnpj" value={atendimento.rssCnpj} onChange={(e) => handleChangeWithMask(e, setAtendimento)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="00.000.000/0000-00" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Inscrição Municipal</label><input type="text" name="rssInscricaoMunicipal" value={atendimento.rssInscricaoMunicipal} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CEP</label><input type="text" name="rssCep" value={atendimento.rssCep} onChange={(e) => handleChangeWithMask(e, setAtendimento)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="00000-000" /></div>
              <div className="md:col-span-2"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Endereço Completo</label><input type="text" name="rssEndereco" value={atendimento.rssEndereco} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <label className="flex items-center gap-2 cursor-pointer mb-4">
                <input type="checkbox" checked={atendimento.possuiFornecedor2} onChange={(e) => setAtendimento({...atendimento, possuiFornecedor2: e.target.checked})} className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                <span className="text-sm font-bold text-gray-800">Adicionar 2º Fornecedor (Opcional)</span>
              </label>
              
              {atendimento.possuiFornecedor2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Razão Social</label><input type="text" name="rss2RazaoSocial" value={atendimento.rss2RazaoSocial} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nome Fantasia</label><input type="text" name="rss2NomeFantasia" value={atendimento.rss2NomeFantasia} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CNPJ</label><input type="text" name="rss2Cnpj" value={atendimento.rss2Cnpj} onChange={(e) => handleChangeWithMask(e, setAtendimento)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="00.000.000/0000-00" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Inscrição Municipal</label><input type="text" name="rss2InscricaoMunicipal" value={atendimento.rss2InscricaoMunicipal} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CEP</label><input type="text" name="rss2Cep" value={atendimento.rss2Cep} onChange={(e) => handleChangeWithMask(e, setAtendimento)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="00000-000" /></div>
                  <div className="md:col-span-2"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Endereço Completo</label><input type="text" name="rss2Endereco" value={atendimento.rss2Endereco} onChange={handleAtendimentoChange} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= FASE 3: FLUXOS ================= */}
        <div className={activeTab === 'fluxos' ? "space-y-6 animate-in fade-in" : "hidden"}>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
            <Route className="text-red-600 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-900 text-sm">Automação de Títulos - {tituloAndaresFluxo}</h3>
              <p className="text-sm text-red-800 mt-1">Insira as imagens dos fluxos correspondentes a cada um dos pavimentos selecionados na aba 1. Cada imagem ocupará uma nova página no documento gerado.</p>
            </div>
          </div>

          {fluxosConfig.map((config) => (
            <div key={config.id} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2 uppercase tracking-wide">
                <span className="text-red-600 font-bold">{config.title}</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nº da Prancha (Geral)</label><input type="text" value={fluxos[config.id].prancha} onChange={(e) => handleFluxoTextChange(config.id, 'prancha', e.target.value)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Escala da Planta</label><input type="text" value={fluxos[config.id].escala} onChange={(e) => handleFluxoTextChange(config.id, 'escala', e.target.value)} className="w-full border border-gray-300 bg-[#f8fafc] text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none text-sm" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeFloors.map(floor => (
                  <div key={floor} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <label className="block text-sm font-bold text-gray-700 uppercase mb-3 text-center">{floor}</label>
                    {!fluxos[config.id].imagens[floor] ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-red-200 rounded-lg cursor-pointer bg-white hover:bg-red-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-8 h-8 mb-2 text-red-400" />
                          <p className="text-xs text-gray-600"><span className="font-semibold text-red-600">Anexar</span> imagem</p>
                        </div>
                        <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={(e) => handleImageUpload(config.id, floor, e)} />
                      </label>
                    ) : (
                      <div className="relative w-full rounded-lg border border-gray-200 overflow-hidden bg-white p-2 flex items-center justify-center h-32">
                        <img src={fluxos[config.id].imagens[floor]} alt="Fluxo" className="max-h-full max-w-full object-contain rounded" />
                        <button onClick={() => removeImage(config.id, floor)} className="absolute top-2 right-2 p-1.5 bg-gray-800 text-white rounded-full hover:bg-gray-900 shadow-lg"><Trash2 size={14} /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ================= FASE 4: MATERIAIS ================= */}
        <div className={activeTab === 'materiais' ? "space-y-6 animate-in fade-in" : "hidden"}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <MaterialCheckboxGroup title="9.3. Fechamentos Internos" icon={Hammer} category="fechamentosInt" options={OPCOES_MATERIAIS.fechamentosInt} />
              <MaterialCheckboxGroup title="9.4. Acabamentos Internos" icon={PaintBucket} category="acabamentosInt" options={OPCOES_MATERIAIS.acabamentosInt} />
              <MaterialCheckboxGroup title="9.5. Fechamentos Externos" icon={Building2} category="fechamentosExt" options={OPCOES_MATERIAIS.fechamentosExt} />
              <MaterialCheckboxGroup title="9.6. Acabamentos Externos" icon={PaintBucket} category="acabamentosExt" options={OPCOES_MATERIAIS.acabamentosExt} />
            </div>
            <div>
              <MaterialCheckboxGroup title="9.8. Pisos Internos" icon={Square} category="pisos" options={OPCOES_MATERIAIS.pisos} />
              <MaterialCheckboxGroup title="9.9. Rodapés" icon={Square} category="rodapes" options={OPCOES_MATERIAIS.rodapes} />
              <MaterialCheckboxGroup title="9.11. Forros" icon={Hammer} category="forros" options={OPCOES_MATERIAIS.forros} />
              <MaterialCheckboxGroup title="9.12. Esquadrias e Portas" icon={DoorOpen} category="esquadrias" options={OPCOES_MATERIAIS.esquadrias} />
            </div>
          </div>
        </div>

        {/* ================= FASE 5: AMBIENTES ================= */}
        <div className={activeTab === 'ambientesEspecificos' ? "space-y-6 animate-in fade-in" : "hidden"}>
          
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mb-6 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2"><UploadCloud size={18} className="text-red-600"/> Integração BIM (Revit)</h3>
              <p className="text-sm text-gray-500 mt-1">Importe uma "Tabela de Ambientes" (Room Schedule) em formato .csv ou .txt exportada do Revit.</p>
            </div>
            <div className="flex gap-3 items-center">
              <button onClick={() => setShowRevitInfo(true)} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Como exportar do Revit?">
                <Info size={20} />
              </button>
              <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
                <UploadCloud size={16} /> Importar Tabela do Revit
                <input type="file" className="hidden" accept=".csv, .txt" onChange={handleRevitImport} />
              </label>
            </div>
          </div>

          {showRevitInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 shadow-sm relative">
              <button onClick={() => setShowRevitInfo(false)} className="absolute top-3 right-3 text-blue-400 hover:text-blue-600"><X size={18}/></button>
              <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2"><AlertCircle size={18}/> Como preparar a Tabela no Revit</h4>
              <p className="text-sm text-blue-900 mb-2">Crie uma <b>Tabela de Ambientes</b> contendo exatamente os seguintes cabeçalhos (a ordem não importa):</p>
              <ul className="list-disc list-inside text-sm text-blue-800 ml-2 mb-3">
                <li><b>Nome</b></li>
                <li><b>Área</b></li>
                <li><b>Piso</b> (ou Acabamento do Piso)</li>
                <li><b>Rodapé</b> (ou Acabamento da Base)</li>
                <li><b>Parede</b> (ou Acabamento da Parede)</li>
                <li><b>Teto</b> (ou Acabamento do Teto)</li>
              </ul>
              <p className="text-sm text-blue-900">Vá em <i>Arquivo {'>'} Exportar {'>'} Relatórios {'>'} Tabela</i>. Salve o arquivo de texto (Delimitado por Tabulação) e importe-o no botão acima.</p>
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
            <h2 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2"><LayoutGrid size={20} className="text-red-600"/> Adicionar Ambientes Manualmente</h2>
            <div className="flex flex-wrap gap-3">
              {AMBIENTES_DB.map(template => (
                <button key={template.tipoId} onClick={() => adicionarAmbiente(template.tipoId)} className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                  <Plus size={16} /> {template.nomeTemplate}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {ambientesProjeto.length === 0 ? (
               <div className="text-center py-10 bg-white rounded-xl border-2 border-dashed border-gray-300">
                <LayoutGrid size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Nenhum ambiente adicionado ao projeto ainda.</p>
              </div>
            ) : (
              <h3 className="font-semibold text-gray-700 border-b pb-2">Ambientes do Projeto ({ambientesProjeto.length})</h3>
            )}

            {ambientesProjeto.map((amb, index) => {
              const isExpanded = expandedRoomId === amb.id;
              const hasDoor = amb.acabamentos.porta && amb.acabamentos.porta !== '' && amb.acabamentos.porta !== 'Sem porta (Vão livre)' && amb.acabamentos.porta !== 'Não se aplica';

              return (
                <div key={amb.id} className={`bg-white rounded-xl shadow-sm border transition-all ${isExpanded ? 'border-red-400 ring-1 ring-red-100' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50" onClick={() => setExpandedRoomId(isExpanded ? null : amb.id)}>
                    <div className="flex items-center gap-4 w-2/3">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">{index + 1}</div>
                      {isExpanded ? (
                        <input type="text" value={amb.nomePersonalizado} onChange={(e) => atualizarAmbiente(amb.id, 'nomePersonalizado', e.target.value)} className="font-bold text-lg text-gray-900 border-b border-gray-300 focus:border-red-500 outline-none w-full bg-transparent px-1" onClick={(e) => e.stopPropagation()} />
                      ) : (
                        <div><span className="font-bold text-lg text-gray-900 block">{amb.nomePersonalizado}</span></div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-500 w-20 text-right">{amb.area ? `${amb.area} m²` : '-- m²'}</span>
                      <button onClick={(e) => { e.stopPropagation(); removerAmbiente(amb.id); }} className="text-gray-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                      {isExpanded ? <ChevronDown size={20} className="text-gray-400 transform rotate-180"/> : <ChevronDown size={20} className="text-gray-400"/>}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                      
                      {/* Textos Padrão Editáveis */}
                      <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-2 mb-2 text-red-800 font-semibold"><Info size={16}/> Textos Padrão do Ambiente (Edite se necessário)</div>
                        <div><label className="text-xs font-bold text-gray-500">Definição:</label><textarea value={amb.definicao} onChange={(e) => atualizarAmbiente(amb.id, 'definicao', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 bg-[#f8fafc] text-gray-900 resize-y" rows={2} /></div>
                        <div><label className="text-xs font-bold text-gray-500">Atividades:</label><textarea value={amb.atividades} onChange={(e) => atualizarAmbiente(amb.id, 'atividades', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 bg-[#f8fafc] text-gray-900 resize-y" rows={2} /></div>
                        <div><label className="text-xs font-bold text-gray-500">Equipamentos:</label><textarea value={amb.equipamentos} onChange={(e) => atualizarAmbiente(amb.id, 'equipamentos', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 bg-[#f8fafc] text-gray-900 resize-y" rows={2} /></div>
                        <div><label className="text-xs font-bold text-gray-500">Mobiliários:</label><textarea value={amb.mobiliarios} onChange={(e) => atualizarAmbiente(amb.id, 'mobiliarios', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 bg-[#f8fafc] text-gray-900 resize-y" rows={2} /></div>
                        <div><label className="text-xs font-bold text-gray-500">Movelarias:</label><textarea value={amb.movelarias} onChange={(e) => atualizarAmbiente(amb.id, 'movelarias', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 bg-[#f8fafc] text-gray-900 resize-y" rows={2} /></div>
                        <div><label className="text-xs font-bold text-gray-500">Acessórios:</label><textarea value={amb.acessorios} onChange={(e) => atualizarAmbiente(amb.id, 'acessorios', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 bg-[#f8fafc] text-gray-900 resize-y" rows={2} /></div>
                        <div><label className="text-xs font-bold text-gray-500">Marmoraria:</label><textarea value={amb.marmoraria || 'Não se aplica'} onChange={(e) => atualizarAmbiente(amb.id, 'marmoraria', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 bg-[#f8fafc] text-gray-900 resize-y" rows={2} /></div>
                        <div><label className="text-xs font-bold text-gray-500">Infraestrutura:</label><textarea value={amb.infraestrutura} onChange={(e) => atualizarAmbiente(amb.id, 'infraestrutura', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 bg-[#f8fafc] text-gray-900 resize-y" rows={2} /></div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Área do Ambiente (m²)</label><input type="text" value={amb.area} onChange={(e) => atualizarAmbiente(amb.id, 'area', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none bg-white text-gray-900 font-medium" /></div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Piso</label>
                          <select value={amb.acabamentos.piso} onChange={(e) => atualizarAmbiente(amb.id, 'acabamentos.piso', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white text-gray-900">
                            <option value="">Selecione...</option><option value="Não se aplica">Não se aplica</option>{materiais.selecoes.pisos.map(op => <option key={op} value={op}>{op}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Rodapé</label>
                          <select value={amb.acabamentos.rodape} onChange={(e) => atualizarAmbiente(amb.id, 'acabamentos.rodape', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white text-gray-900">
                            <option value="">Selecione...</option><option value="Não se aplica">Não se aplica</option>{materiais.selecoes.rodapes.map(op => <option key={op} value={op}>{op}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Paredes</label>
                          <select value={amb.acabamentos.parede} onChange={(e) => atualizarAmbiente(amb.id, 'acabamentos.parede', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white text-gray-900">
                            <option value="">Selecione...</option><option value="Não se aplica">Não se aplica</option>{materiais.selecoes.acabamentosInt.map(op => <option key={op} value={op}>{op}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Teto (Forro)</label>
                          <select value={amb.acabamentos.teto} onChange={(e) => atualizarAmbiente(amb.id, 'acabamentos.teto', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white text-gray-900">
                            <option value="">Selecione...</option><option value="Não se aplica">Não se aplica</option>{materiais.selecoes.forros.map(op => <option key={op} value={op}>{op}</option>)}
                          </select>
                        </div>
                        
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-gray-200 pt-4 mt-2">
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Porta / Esquadria</label>
                            <select value={amb.acabamentos.porta} onChange={(e) => atualizarAmbiente(amb.id, 'acabamentos.porta', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white text-gray-900">
                              <option value="">Selecione...</option><option value="Não se aplica">Não se aplica</option><option value="Sem porta (Vão livre)">Sem porta (Vão livre)</option>{materiais.selecoes.esquadrias.map(op => <option key={op} value={op}>{op}</option>)}
                            </select>
                          </div>
                          
                          {hasDoor && (
                            <>
                              <div className="flex gap-3">
                                <div className="w-1/3">
                                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Folhas</label>
                                  <input type="number" min="1" value={amb.acabamentos.portaFolhas} onChange={(e) => atualizarAmbiente(amb.id, 'acabamentos.portaFolhas', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 text-center bg-white text-gray-900" />
                                </div>
                                <div className="w-2/3">
                                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Largura (Folha)</label>
                                  <div className="flex items-center gap-1">
                                    <input type="number" value={amb.acabamentos.portaLargura} onChange={(e) => atualizarAmbiente(amb.id, 'acabamentos.portaLargura', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 text-center bg-white text-gray-900" placeholder="Ex: 80" />
                                    <span className="text-xs text-gray-500">cm</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Vão Livre</label>
                                <div className="flex items-center gap-1">
                                  <input type="number" value={amb.acabamentos.portaVao} onChange={(e) => atualizarAmbiente(amb.id, 'acabamentos.portaVao', e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-red-500 text-center bg-white text-gray-900" placeholder="Ex: 75" />
                                  <span className="text-xs text-gray-500">cm</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= FASE 6: INSTALAÇÕES FINAIS E SERVIÇOS ================= */}
        <div className={activeTab === 'instalacoes' ? "space-y-6 animate-in fade-in" : "hidden"}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2"><Activity size={20} className="text-red-600"/> Tipos de Serviços (RDC Nº 50)</h2>
                <div className="space-y-3">
                  {OPCOES_RDC.map(opcao => (
                    <label key={opcao.id} className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center pt-0.5">
                        <input type="checkbox" className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer" checked={instalacoes.servicosRdc.includes(opcao.id)} onChange={() => handleRdcToggle(opcao.id)} />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{opcao.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><Droplets size={20} className="text-red-600"/> Textos Fixos de Instalações</h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs text-gray-700 space-y-3">
                  <p><strong>Água Potável:</strong> Abastecido de água tratada pela concessionária pública local.</p>
                  <p><strong>Energia Elétrica:</strong> Provido pela concessionária local. Disjuntor geral 100A e DR.</p>
                  <p><strong>Esgoto e Resíduos:</strong> A concessionária local coleta e trata o esgoto. Resíduos recolhidos via saneamento local.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><FileSignature size={20} className="text-red-600"/> Assinaturas do Documento</h2>
                <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar" style={{ maxHeight: '400px' }}>
                  <div className="text-center text-sm text-gray-800 bg-gray-50 p-6 rounded border border-gray-200">
                    <div className="mb-8 mt-4">
                      <div className="border-b border-gray-400 w-64 mx-auto mb-1"></div>
                      <p className="font-bold uppercase">{identificacao.respProjeto || '[Engenheiro(a)]'}</p>
                      <p>Engenheira/o Responsável Pelo Projeto</p>
                      <p>CREA/CAU: {identificacao.creaCauProjeto || '[000000]'}</p>
                    </div>
                    {identificacao.respTecnicos.map((rt, i) => (
                      <div key={i} className="mb-8">
                        <div className="border-b border-gray-400 w-64 mx-auto mb-1"></div>
                        <p className="font-bold uppercase">{rt.nome || '[Responsável Técnico]'}</p>
                        <p>Responsável Técnico Laboratório Sabin</p>
                        <p>{rt.conselho || '[0000]'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
