# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

## Personas

1. Beatriz Rocha tem 27 anos e é uma artesã empreendedora que começou recentemente a criar e vender suas próprias joias. Talentosa na produção de peças únicas, ela já conquistou alguns clientes, mas ainda enfrenta desafios na organização do seu pequeno negócio. Beatriz divulga seus produtos nas redes sociais e anota pedidos no bloco de notas do celular, mas muitas vezes se perde no controle de estoque, na precificação correta das peças e no acompanhamento de pagamentos. Ela busca uma ferramenta que a ajude a registrar pedidos, organizar seus clientes e visualizar suas vendas, permitindo que ela foque no que mais ama que é criar suas joias.
2. Maria Silva tem 42 anos e trabalha como revendedora de joias há mais de 10 anos. Construiu uma boa carteira de clientes e mantém um bom relacionamento com eles. Seu dia a dia é corrido e consiste em visitar clientes, apresenta as peças e anotar pedidos, sempre carregando sua agenda e algumas notas promissórias na bolsa. Para lembrar de pagamentos e encomendas, usa o WhatsApp e tira fotos dos comprovantes, mas nem sempre consegue encontrar as informações quando precisa. Maria às vezes esquece quais clientes ainda têm pendências para receber e quem já pediu uma peça específica que não havia em seu estoque no momento. Ela gostaria de uma solução prática para centralizar as informações de seus clientes e vendas, sem precisar depender de anotações espalhadas e fotos na galeria. Assim, poderia vender com mais tranquilidade e focar no que faz de melhor que é atender bem suas clientes e aumentar suas vendas.
3. Ana Paula tem 30 anos e começou a revender joias recentemente para complementar a renda. Por ser uma pessoa que sempre gostou de acessórios, viu na revenda uma oportunidade de ter mais independência financeira. Já conquistou alguns clientes, mas ainda está aprendendo a lidar com a parte administrativa do negócio. Para se organizar, anota as vendas em um caderno e tenta lembrar das parcelas que precisa receber, mas devido a outras reponsabilidades de sua rotina, como seu outro emprego, acaba se perdendo nos prazos. Já aconteceu de esquecer um pagamento, perder o contato de uma cliente ou não lembrar exatamente as peças que havia em seu estoque. Além disso, ela precisa controlar as devoluções ou trocas de peças, o que tem sido um desafio, já que nem sempre lembra de registrar essas ocorrências. Ana Paula precisa de uma ferramenta simples e fácil de usar, que a ajude a registrar suas vendas, acompanhar pagamentos, e organizar as devoluções ou trocas de peças, para que ela possa focar em crescer no seu novo negócio com mais confiança. 

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuários que são relevantes para o projeto da sua solução. As histórias de usuários consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuários por contexto, para facilitar consultas recorrentes a esta parte do documento.

> **Links úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (user stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 common user story mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |

### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em dispositivos móveis | MÉDIA | 
|RNF-002| Deve processar as requisições do usuário em no máximo 3 segundos |  BAIXA | 

Com base nas histórias de usuários, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos não funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).

Lembre-se de que cada requisito deve corresponder a uma e somente uma característica-alvo da sua solução. Além disso, certifique-se de que todos os aspectos capturados nas histórias de usuários foram cobertos.

> **Links úteis**:
> - [O que são requisitos funcionais e requisitos não funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [Entenda o que são requisitos de software, a diferença entre requisito funcional e não funcional, e como identificar e documentar cada um deles](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|RE-01 | O aplicativo deve ser compatível com as versões mais recentes de Android e iOS.  |
|RE-02| O aplicativo deve ser desenvolvido utilizando tecnologias que possibilitem a manutenção e atualização simultânea nas versões Android e iOS, preferencialmente utilizando plataformas como Flutter ou React Native.        |
|RE-03| O aplicativo precisa ser desenvolvido dentro de um prazo de 6 meses.  |
|RE-04| O cliente será responsável pelos custos de manutenção e renovação do aplicativo nas lojas (Google Play e App Store). |

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “diagrama de casos de uso”.

> **Links úteis**:
> - [Criando casos de uso](https://www.ibm.com/docs/pt-br/engineering-lifecycle-management-suite/design-rhapsody/10.0?topic=cases-creating-use)
> - [Como criar diagrama de caso de uso: tutorial passo a passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
