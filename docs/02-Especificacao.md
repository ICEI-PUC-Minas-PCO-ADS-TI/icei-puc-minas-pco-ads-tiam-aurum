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
|Vendedora           |Acessar o sistema com meu login e senha|Gerenciar minhas vendas e clientes com segurança|
|Vendedora           |Preciso cadastrar, editar e excluir joias no sistema|Manter meu estoque sempre atualizado|
|Vendedora           |Preciso cadastrar e editar informações dos meus clientes|Acompanhar suas compras e pagamentos|
|Vendedora           |Visualizar os pagamentos pendentes|Lembrar quais clientes ainda precisam me pagar|
|Vendedora           |Visualizar um resumo dos meus recebimentos do mês|Acompanhar minha renda e planejar melhor minhas finanças|
|Vendedora           |Gerar um relatório de vendas com detalhes dos clientes, produtos vendidos e formas de pagamento|Entender melhor o desempenho do meu negócio|
|Vendedora           |Registrar pedidos de clientes|Garantir que eu não esqueça de solicitar ou entregar as peças que eles pediram|
|Vendedora           |Registrar devoluções ou trocas de produtos|Manter um controle correto do meu estoque e evitar erros em futuras vendas|

## Requisitos

Os requisitos funcionais e não funcionais foram priorizados com base na técnica MoSCoW, sendo avaliados a partir das entrevistas realizadas com o cliente. Os requisitos classificados como prioridade ALTA (Must Have - Deve Ter) foram definidos com base nos principais gargalos identificados nos processos atuais do cliente. Já os requisitos de prioridade MÉDIA (Should Have - Deveria Ter) foram considerados funcionalidades que poderiam agregar um valor considerável ao negócio do cliente. Por fim, os requisitos de prioridade BAIXA (Could Have - Poderia Ter) foram identificados como funcionalidades que embora não impactem diretamente os processos atuais de forma crítica, oferecem benefícios ao cliente, porém com menor urgência e importância em comparação com os outros requisitos.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |Responsavel|
|------|-----------------------------------------|----|----|
|RF-001| Permitir fazer login no sistema | ALTA | Rafael |
|RF-002| Gerenciar cadastro de joias (CRUD)   | ALTA | Guilherme  |
|RF-003| Gerenciar cadastro de clientes (CRUD)   | ALTA |Rhillary|
|RF-004| Exibir lista de pagamentos pendentes   | ALTA | Luisa|
|RF-005| Exibir dashboard com os recebimentos do mês   | MÉDIA |Rafael|
|RF-006| Permitir gerar relatórios de vendas   | BAIXA | |
|RF-007| Registrar pedidos de clientes   | BAIXA |Rhillary| 
|RF-008| Registrar devoluções ou trocas de peças  | BAIXA | Luisa |
|RF-009| Registrar venda do produto  | ALTA | Guilherme|


### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O aplicativo deve ser intuitivo e fácil de usar  | ALTA | 
|RNF-002| O aplicativo deve funcionar de forma responsiva em diferentes tamanhos de tela  |  MÉDIA | 
|RNF-003| O tempo de resposta para carregar informações não deve ultrapassar 15 segundos  |  BAIXA | 
|RNF-004| O aplicativo deve criptografar todas as senhas de usuários usando um algoritmo de criptografia  |  ALTA | 

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
