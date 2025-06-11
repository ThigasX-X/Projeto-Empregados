# Back-end: API de Gerenciamento de Empregados

Este é o back-end do Projeto de Empregados, uma API RESTful completa construída para gerenciar um cadastro de funcionários. A aplicação foi desenvolvida com foco em performance utilizando **Fastify** e totalmente containerizada com **Docker** para garantir um ambiente de desenvolvimento e produção consistente e fácil de configurar.

## ✨ Features

- ✅ **CRUD Completo:** Funcionalidades para Criar, Ler, Atualizar e Deletar (CRUD) empregados.
- ✅ **Validação de Dados:** Impede a criação de empregados com CPFs duplicados, retornando um erro `409 Conflict`.
- ✅ **Validação de Campos:** Garante que todos os campos necessários são preenchidos, retornando um erro `400 Bad Request`.
- ✅ **Ambiente Dockerizado:** Configuração completa com `docker-compose` para orquestrar a API e o banco de dados MySQL.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Fastify**: Framework web de alta performance para construção da API.
- **MySQL**: Banco de dados relacional para armazenamento dos dados.
- **Docker & Docker Compose**: Para containerização da aplicação e do banco de dados.
- **`@fastify/cors`**: Plugin para gerenciamento de CORS (Cross-Origin Resource Sharing).
- **`dotenv`**: Para gerenciamento de variáveis de ambiente.
- **`mysql2`**: Driver de conexão com o banco de dados MySQL.

## 🚀 Como Rodar o Projeto (Ambiente Unificado)

Este back-end foi projetado para ser iniciado junto com o front-end através de um único arquivo `docker-compose.yml` na raiz do projeto (`/Projeto-Empregados`).

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/ThigasX-X/Projeto-Empregados.git](https://github.com/ThigasX-X/Projeto-Empregados.git)
    ```

2.  **Navegue até a raiz do projeto:**
    ```bash
    cd Projeto-Empregados
    ```

3.  **Crie o arquivo de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e preencha com as credenciais do banco de dados, como no exemplo abaixo:
    ```env
    MYSQL_DATABASE=projeto_node
    MYSQL_USER=user
    MYSQL_PASSWORD=password
    MYSQL_ROOT_PASSWORD=root_password
    DB_HOST=db
    DB_USER=user
    DB_PASSWORD=password
    DB_DATABASE=projeto_node
    ```

4.  **Inicie todos os serviços (Back-end, Front-end e Banco de Dados):**
    ```bash
    sudo docker compose up --build
    ```

5.  Pronto! A API estará rodando e acessível em `http://localhost:3232`.

## Endpoints da API

| Método | Rota               | Descrição                                         |
| :----- | :----------------- | :------------------------------------------------ |
| `GET`  | `/empregados`      | Lista todos os empregados.                        |
| `POST` | `/empregados`      | Cria um novo empregado.                           |
| `PUT`  | `/empregados/:id`  | Atualiza um empregado pelo seu ID.                |
| `DELETE`| `/empregados/:id`| Deleta um empregado pelo seu ID.                  |

**Corpo para `POST` e `PUT`:**
```json
{
  "cpf": "123.456.789-00",
  "nome": "Nome do Empregado",
  "idade": 25,
  "cargo": "Cargo do Empregado"
}