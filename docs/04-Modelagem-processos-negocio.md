# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

## Modelagem da situação atual (Modelagem AS IS)

1° Problema: Registrar Venda 

Devido à predominância de processos manuais, identificou-se que um dos procedimentos com maior incidência de retrabalho é o de registro de vendas. Atualmente, a cliente Patrícia precisa repassar todas as informações da venda ao comprador, seja presencialmente ou por meio do aplicativo WhatsApp. Posteriormente, realiza manualmente o registro das peças associadas à venda e emite as promissórias de confirmação para fins de pagamento. Após o pagamento, é necessário coletar a assinatura do cliente. Somente após a entrega da peça e a assinatura da promissória é que Patrícia realiza, também de forma manual, o registro da venda em uma agenda de controle. Esse fluxo, por ser majoritariamente manual e demorado, pode ocasionar gargalos no atendimento, em casos em que o atendimento é presencial, além de deixar o processo mais suscetível a falhas decorrentes de erro humano, comprometendo a eficiência do processo.   

2° Problema: Cadastrar cliente 

Outro processo no qual se identificou elevada incidência de retrabalho e ineficiências é o de cadastramento de novos clientes. Atualmente, a cliente Patrícia realiza esse procedimento de forma predominantemente presencial, sendo que, em casos excepcionais, as informações são coletadas por meio das redes sociais. Os dados dos novos clientes são primeiramente anotados manualmente em uma agenda física, e posteriormente o contato é salvo em seu celular. Após esse registro inicial, realiza-se a verificação do CPF do cliente em um sistema específico para essa finalidade. Somente após essa etapa é que é elaborada uma ficha individual para o cliente. A conferência da existência de um cadastro prévio é feita apenas quando a ficha está prestes a ser arquivada, o que acarreta o risco de duplicidade de registros. 

Esse fluxo, assim como o processo de registro de vendas, é essencialmente manual e, por vezes, realizado de forma presencial, o que pode comprometer a agilidade no atendimento. Além disso, tal abordagem está sujeita a erros, retrabalho e inconsistências nos cadastros, impactando negativamente a organização e a eficiência do gerenciamento de clientes. 


## Modelagem dos processos (As-Is)


## Descrição geral da proposta (Modelagem TO BE)

Tendo em vista os gargalos e retrabalhos identificados nos processos atuais (modelos AS-IS), propõe-se a implementação de um sistema de agenda digital, desenvolvido sob medida para a realidade da cliente Patrícia, com o objetivo de promover maior eficiência, padronização e controle nos processos de registro de vendas e cadastro de novos clientes. 

A proposta de solução contempla a automação desses processos por meio da implementação de um sistema de agenda digital, mantendo a estrutura operacional atual, mas transferindo sua execução para um ambiente digital mais seguro, organizado e confiável. Essa abordagem respeita a dinâmica já consolidada pela usuária, facilitando sua adaptação ao novo sistema sem necessidade de mudanças bruscas na rotina de trabalho. 

No processo de registro de vendas, a agenda digital permitirá que Patrícia insira os dados da venda diretamente em um formulário padronizado. O sistema possibilitará o vínculo automático entre os produtos e suas respectivas vendas. Além disso, o histórico de vendas será armazenado de forma estruturada, permitindo consultas rápidas e atualizações de status (como entrega e pagamento), o que proporciona maior controle e rastreabilidade sobre cada transação. 

Já no processo de cadastro de novos clientes, a automação também trará avanços importantes. Os dados coletados continuarão sendo obtidos presencialmente ou via redes sociais, conforme a prática atual, porém serão inseridos diretamente no sistema, evitando o uso de anotações físicas. O sistema permitirá que a criação da ficha do cliente seja feita com base nas informações previamente registradas. Além disso, o sistema realizará uma checagem automática de cadastros existentes, reduzindo significativamente o risco de duplicidade e aumentando a confiabilidade da base de dados. 

Dessa forma, a solução não altera profundamente os fluxos já estabelecidos, mas utiliza a tecnologia para otimizar, organizar e sistematizar os processos que antes eram realizados de forma manual. A expectativa é de que essa transição promova maior produtividade, reduzindo o tempo dedicado a tarefas operacionais e contribuindo para um gerenciamento mais eficiente do negócio. 

Apesar dos benefícios evidentes da automação, é necessário reconhecer os limites da solução proposta. O sucesso da implementação dependerá da familiarização da cliente com o novo sistema, o que pode exigir um período de adaptação e aprendizado. Além disso, certas funcionalidades podem depender de conexão com a internet, o que representa um desafio em ambientes com acesso limitado. Outro fator a considerar é que a automação, embora reduza consideravelmente os erros, não os elimina completamente, exigindo atenção no preenchimento dos dados por parte da usuária. 

No entanto, mesmo com essas limitações, a solução proposta está alinhada aos objetivos estratégicos do negócio. A cliente Patrícia tem como meta tornar seu processo de vendas mais organizado, confiável e profissional. A agenda digital atende diretamente a essa expectativa ao oferecer maior controle sobre suas atividades, reduzir o retrabalho e garantir uma gestão mais eficiente das informações de vendas e clientes. Ao adotar essa solução tecnológica sem modificar radicalmente sua forma de trabalho, respeita-se a natureza do negócio e facilita-se a aceitação da mudança. 

## Modelagem dos processos

[PROCESSO 1 - Registro de Venda](./processes/processo-1-nome-do-processo.md "Detalhamento do processo 1.")

[PROCESSO 2 - Cadastro de Clientes](./processes/processo-2-nome-do-processo.md "Detalhamento do processo 2.")

[PROCESSO 3 - Processo de Estoque](./processes/processo-3-Estoque.md "Detalhamento do processo 3.")

## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Percentual de reclamações | Avaliar quantitativamente as reclamações | Percentual de reclamações em relação ao total de atendimentos | Tabela Reclamações | número total de reclamações / número total de atendimentos |
| Taxa de requisições atendidas | Melhorar a prestação de serviços medindo a porcentagem de requisições atendidas| Mede a % de requisições atendidas na semana | Tabela Solicitações | (número de requisições atendidas / número total de requisições) * 100 |
| Taxa de entrega de material | Manter controle sobre os materiais que estão sendo entregues | Mede % de material entregue dentro do mês | Tabela Pedidos | (número de pedidos entregues / número total de pedidos) * 100 |


Obs.: todas as informações necessárias para gerar os indicadores devem estar no diagrama de classe a ser apresentado posteriormente.
