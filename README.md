# Simulador de Entregas com Drones - Desafio dti

Este projeto é uma API RESTful desenvolvida em **Node.js** para gerenciar e otimizar a logística de entregas por drones, focando na **minimização do número de viagens**.

---

## 🛠️ Tecnologias Utilizadas
* Node.js
* Express (Framework para a API)
* Jest (Testes Unitários)

---

## 🚀 Como Executar

1.  **Clone o repositório.**
2.  Abra o terminal na pasta raiz do projeto.
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Execute o servidor:**
    ```bash
    npm start
    ```
    O servidor rodará em `http://localhost:3000`.

---

## 🔗 Endpoints Principais (API)

Utilize ferramentas como cURL, Insomnia ou Thunder Client (no VS Code) para testar os endpoints:

* **POST /pedidos**: Cadastra um novo pedido.
    * **Exemplo Body:** `{"x": 10, "y": 20, "peso": 2.5, "prioridade": "alta"}`
* **POST /entregas/processar**: Dispara o algoritmo de otimização para alocar pedidos em drones disponíveis, minimizando viagens.
* **GET /drones/status**: Retorna o status atual dos drones (IDLE, EM_VOO, etc.).

---

## ✅ Testes Automatizados (Requisito Obrigatório)

Para executar os testes unitários que validam a lógica de negócio (capacidade e priorização):
```bash
npm test
