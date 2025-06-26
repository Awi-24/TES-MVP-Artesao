# Documento de Arquitetura de Software: Plataforma de Artesãos (MVP)

**Equipe:** Adrian Widmer; André Lucas; Gabriel; Rodrigo Macêdo




## 1. Introdução

A arquitetura adotada é o padrão de Arquitetura Hexagonal, também conhecido como Portas e Adaptadores. A escolha deste padrão visa criar um sistema robusto, flexível, testável e de fácil manutenção, isolando a lógica de negócio central das dependências externas, como interface do usuário, banco de dados e serviços de terceiros. O objetivo é garantir que o núcleo da aplicação permaneça estável e independente das tecnologias específicas utilizadas na infraestrutura, facilitando futuras evoluções e adaptações do sistema.

Este documento servirá como guia para a equipe de desenvolvimento, delineando a estrutura geral, os componentes principais, suas responsabilidades e interações. Ele se baseia diretamente nos requisitos e no escopo definidos no documento de visão, focando nas funcionalidades essenciais para o MVP: cadastro e autenticação de artesãos, gerenciamento básico de produtos e visualização de catálogo com filtros.




## 2. Contexto e Requisitos (Baseado no Documento de Visão)

O documento de visão estabelece a necessidade de uma plataforma digital para conectar artesãos locais de Salvador a consumidores interessados em seus produtos. O problema central identificado é a limitada visibilidade online dos artesãos e a dificuldade dos consumidores em encontrar e adquirir produtos artesanais locais de forma centralizada. A oportunidade de negócio reside em criar uma vitrine digital que supra essa lacuna.

O escopo definido para o MVP, conforme o modelo real descrito no documento de visão, concentra-se nas seguintes funcionalidades essenciais:

*   **Cadastro e Autenticação de Artesãos:** Permitir que artesãos criem contas seguras na plataforma, fornecendo informações básicas como nome, e-mail, telefone e localização, e possam autenticar-se para gerenciar seus perfis e produtos.
*   **Gerenciamento Básico de Produtos:** Capacitar os artesãos autenticados a adicionar, editar e remover produtos de seu catálogo, incluindo atributos como nome, descrição, preço, quantidade, categoria e imagens.
*   **Visualização de Catálogo com Filtros:** Oferecer aos clientes (visitantes da plataforma) um catálogo navegável dos produtos cadastrados, com funcionalidades de busca por palavra-chave e filtros por categoria, faixa de preço e cidade do artesão.

Funcionalidades como carrinho de compras, checkout, sistema de avaliações e comentários foram explicitamente deixadas fora do escopo deste MVP inicial. A plataforma será acessível via navegadores web em desktops e dispositivos móveis, exigindo uma interface responsiva, embora o foco principal seja a funcionalidade de catálogo e cadastro.

Os usuários primários são os Artesãos e os Clientes, enquanto os stakeholders principais são os fundadores da startup. A arquitetura deve suportar essas funcionalidades e usuários, mantendo a flexibilidade para futuras expansões.




## 3. Arquitetura Hexagonal Detalhada

A arquitetura adotada segue o padrão Hexagonal, estruturando a aplicação em torno de um Núcleo de domínio isolado, interagindo com o mundo exterior através de Portas e Adaptadores.

### 3.1. O Núcleo da Aplicação (Core Domain / Hexágono)

O coração da plataforma reside no Núcleo, que encapsula toda a lógica de negócio e as regras de domínio essenciais, permanecendo completamente independente de tecnologias externas como frameworks web ou bancos de dados. Dentro deste núcleo, identificamos as Entidades de Domínio, que representam os conceitos fundamentais com identidade e ciclo de vida. Para este MVP, as entidades primárias são o Artesão (Artisan), contendo informações como identificação, nome, contato, localização e credenciais de acesso, além de uma referência aos seus produtos; e o Produto (Product), detalhando informações como identificação, referência ao artesão, nome, descrição, preço, quantidade, categoria e imagens associadas. Complementando as entidades, temos os Value Objects, que representam conceitos descritivos sem identidade própria, como Email, Endereco, Preco, Categoria e Imagem Info, garantindo consistência e validação de dados no domínio.

A orquestração da lógica de negócio é realizada pelos Casos de Uso (Application Services). Estes serviços implementam as funcionalidades requeridas pelo sistema e atuam como a principal interface para interagir com o Núcleo (implementando as Portas de Entrada). Para o MVP, definimos o Serviço de Cadastro e Autenticação de Artesãos, com operações para RegistrarArtesao e AutenticarArtesao; o Serviço de Gerenciamento de Produtos, permitindo AdicionarProduto, EditarProduto e RemoverProduto por artesãos autenticados; e o Serviço de Visualização de Catálogo, responsável por ListarProdutos, FiltrarProdutos e BuscarProdutos para os clientes. Estes serviços coordenam as interações entre as entidades, value objects e as abstrações de infraestrutura.

### 3.2. Ports

As Portas funcionam como contratos formais (interfaces) que definem como o Núcleo interage com o exterior, garantindo o desacoplamento. As Portas de Entrada (Driving Ports) definem a API do Núcleo, especificando como ele pode ser invocado por agentes externos. Para nossa aplicação, temos a ArtisanRegistrationInputPort (para registro e autenticação), a ProductManagementInputPort (para gerenciamento de produtos) e a CatalogViewingInputPort (para visualização do catálogo). Estas interfaces são implementadas pelos Casos de Uso dentro do Núcleo.

Por outro lado, as Portas de Saída (Driven Ports) definem as dependências que o Núcleo possui em relação a serviços externos, como persistência ou armazenamento. São interfaces definidas pelo Núcleo, mas implementadas fora dele, pelos Adaptadores. Exemplos cruciais para o MVP são a ArtisanRepositoryPort e a ProductRepositoryPort, que definem as operações necessárias para persistir e recuperar dados de artesãos e produtos, respectivamente, e a StorageServicePort, que abstrai as operações de salvamento e recuperação de imagens de produtos.

### 3.3. Adapters

Os Adaptadores são os componentes responsáveis por conectar o Núcleo ao mundo tecnológico real, traduzindo as interações entre as tecnologias específicas e as Portas. Os Adaptadores de Entrada (Driving Adapters) recebem estímulos externos e os convertem em chamadas às Portas de Entrada. O principal adaptador de entrada para o MVP é o Adaptador Web (API REST). Ele consiste em controladores que recebem requisições HTTP, validam os dados de entrada (frequentemente usando Data Transfer Objects - DTOs), invocam os Casos de Uso apropriados através das Portas de Entrada e formatam as respostas (geralmente em JSON) para serem enviadas de volta ao cliente (navegador). Embora não planejados para o MVP, outros adaptadores de entrada poderiam ser desenvolvidos no futuro, como uma interface de linha de comando (CLI) ou adaptadores para testes automatizados.

Os Adaptadores de Saída (Driven Adapters) implementam as Portas de Saída, fornecendo as funcionalidades de infraestrutura necessárias ao Núcleo. O Adaptador de Persistência implementa as interfaces ArtisanRepositoryPort e ProductRepositoryPort, utilizando uma tecnologia de banco de dados específica (como PostgreSQL com um ORM tipo JPA/Hibernate, ou um banco NoSQL como MongoDB) para realizar as operações de CRUD (Create, Read, Update, Delete) e consultas. Ele é responsável por mapear as Entidades de Domínio para o esquema do banco de dados. Similarmente, o Adaptador de Armazenamento implementa a StorageServicePort, interagindo com um sistema de arquivos local ou um serviço de armazenamento em nuvem (como AWS S3 ou Google Cloud Storage) para gerenciar as imagens dos produtos. Estes adaptadores encapsulam os detalhes da tecnologia, permitindo que sejam trocados sem impactar o Núcleo.




## 4. Fluxo de Interação Exemplo: Cadastro de Artesão

Para ilustrar a interação entre os componentes, consideremos o fluxo de cadastro de um novo artesão através da interface web. Primeiramente, o usuário preenche e submete o formulário de cadastro no navegador. Esta ação dispara uma requisição HTTP POST para a API. O Adaptador Web (Driving Adapter) recebe esta requisição. Seu controlador valida os dados recebidos e os converte em um formato adequado (um DTO, por exemplo). Em seguida, o controlador invoca o método register da Porta de Entrada ArtisanRegistrationInputPort. A impleentação desta porta, o Caso de Uso RegistrarArtesao localizado no Núcleo, é então executado. Este caso de uso aplica a lógica de negócio necessária, como validações adicionais e a criação da entidade Artesao. Para persistir o novo artesão, o caso de uso chama o método save definido na Porta de Saída ArtisanRepositoryPort. O Adaptador de Persistência (Driven Adapter), que implementa esta porta, recebe a chamada contendo a entidade Artesao. Este adaptador traduz a entidade para o formato esperado pelo banco de dados e executa a operação de inserção. Finalmente, o resultado da operação (sucesso ou falha) retorna pelo mesmo caminho, atravessando as camadas até o Adaptador Web, que então formata e envia a resposta HTTP apropriada de volta ao navegador do usuário. Este fluxo demonstra claramente como a lógica de negócio no Núcleo permanece isolada das tecnologias de interface e persistência.




## 5. Justificativas Arquiteturais

A escolha da Arquitetura Hexagonal para a Plataforma de Artesãos se justifica por diversos fatores alinhados aos objetivos do projeto e às boas práticas de desenvolvimento de software. Primeiramente, o isolamento da lógica de negócio no Núcleo garante que as regras mais importantes e estáveis do sistema não sejam afetadas por mudanças em tecnologias externas, como a troca de um banco de dados ou a adoção de um novo framework de UI. Isso aumenta a manutenibilidade e a longevidade da aplicação.

Em segundo lugar, a testabilidade é significativamente aprimorada. O Núcleo pode ser testado de forma unitária e de integração sem a necessidade de iniciar um servidor web ou conectar-se a um banco de dados real, utilizando mocks ou stubs para as Portas de Saída. Os Adaptadores também podem ser testados isoladamente. Isso acelera o ciclo de desenvolvimento e aumenta a confiança na qualidade do código.

Adicionalmente, a arquitetura promove a flexibilidade e extensibilidade. Novos Adaptadores podem ser adicionados para suportar diferentes formas de interação (ex: uma API pública, um aplicativo móvel nativo, importação de dados em lote) ou diferentes tecnologias de infraestrutura (ex: um novo serviço de busca, outro provedor de armazenamento em nuvem) sem modificar o Núcleo, apenas implementando as interfaces das Portas existentes ou, se necessário, definindo novas Portas. Isso é crucial para um MVP que se espera evoluir com base no feedback e nas necessidades futuras.

Por fim, a clareza na separação de responsabilidades imposta pela estrutura Hexagonal facilita o entendimento do sistema pela equipe de desenvolvimento e a colaboração entre diferentes membros ou times, cada um podendo focar em uma camada específica (Núcleo, Adaptadores Web, Adaptadores de Persistência).




## Referências

*   [1] Cockburn, Alistair. "Hexagonal architecture". *alistair.cockburn.us*, 2005. Acessado em [https://alistair.cockburn.us/hexagonal-architecture/](https://alistair.cockburn.us/hexagonal-architecture/)
*   [2] Palermo, Jeffrey. "The Onion Architecture : part 1". *jeffreypalermo.com*, 2008. Acessado em [https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)


