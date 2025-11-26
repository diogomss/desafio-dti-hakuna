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

⚙️ Regras de Negócio Implementadas
Algoritmo de Otimização: Utiliza uma estratégia "Greedy" que prioriza pedidos por Prioridade (Alta > Média > Baixa) e, em seguida, por Peso (Maior para o Menor), para otimizar o espaço e minimizar o número total de viagens.

Validação de Capacidade: Checa se o peso do pacote e a distância total da rota (ida e volta) estão dentro da capacidade e alcance do drone.

Gerenciamento de Estado: Os drones mudam de estado (ex: de IDLE para EM_VOO) após serem alocados para uma viagem.

🤖 Uso de IA
A estrutura inicial, a arquitetura da API e os modelos de testes unitários foram desenvolvidos com o auxílio de um modelo de linguagem (LLM), garantindo a aderência aos requisitos e boas práticas.
