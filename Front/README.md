# Front-end: Interface de Gerenciamento de Empregados

Este é o front-end do Projeto de Empregados, uma interface de usuário (UI) moderna construída com **React** para consumir a API de gerenciamento de empregados. A aplicação permite visualizar, cadastrar, editar e deletar empregados de forma intuitiva e reativa.

## ✨ Features

- ✅ **Interface Reativa:** Construída com React e seus hooks (`useState`, `useEffect`, `useRef`).
- ✅ **Formulário Completo:** Permite o cadastro e a edição de empregados.
- ✅ **Máscara de CPF:** O campo de CPF é formatado automaticamente durante a digitação para melhorar a experiência do usuário, utilizando `react-imask`.
- ✅ **Listagem em Tempo Real:** Exibe todos os empregados cadastrados e atualiza a lista automaticamente após qualquer alteração (criação, edição ou deleção).
- ✅ **Tratamento de Erros:** Exibe alertas para o usuário em caso de erros, como ao tentar cadastrar um CPF que já existe.

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Ferramenta de build de alta performance para desenvolvimento.
- **JavaScript (JSX)**: Sintaxe para escrever componentes React.
- **CSS**: Para estilização completa dos componentes.
- **`axios`**: Para realizar as chamadas HTTP à API do back-end.
- **`react-imask`**: Para a criação da máscara de input do CPF.

## 🚀 Como Rodar o Projeto (Ambiente Unificado)

Este front-end foi projetado para ser iniciado junto com o back-end através de um único arquivo `docker-compose.yml` na raiz do projeto (`/Projeto-Empregados`).

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/ThigasX-X/Projeto-Empregados.git](https://github.com/ThigasX-X/Projeto-Empregados.git)
    ```

2.  **Verifique os Pré-requisitos do Back-end:**
    Certifique-se que o back-end está configurado conforme as instruções no `README.md` da pasta `Back`.

3.  **Navegue até a raiz do projeto:**
    ```bash
    cd Projeto-Empregados
    ```

4.  **Inicie todos os serviços (Back-end, Front-end e Banco de Dados):**
    ```bash
    sudo docker compose up --build
    ```

5.  Pronto! A aplicação estará disponível em `http://localhost:5173` (ou na porta que aparecer no seu terminal).