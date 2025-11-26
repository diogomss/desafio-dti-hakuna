const express = require('express');
const bodyParser = require('body-parser');
const { GerenciadorEntregas, Pedido } = require('./src/logica');

const app = express();
app.use(bodyParser.json());

const gerenciador = new GerenciadorEntregas();

// Endpoint 1: Receber Pedidos [cite: 179]
app.post('/pedidos', (req, res) => {
    try {
        const { x, y, peso, prioridade } = req.body;
        // Validação simples
        if(!x || !y || !peso || !prioridade) {
            return res.status(400).json({ erro: "Dados incompletos" }); // [cite: 190]
        }
        
        const id = Date.now(); // ID simples baseado em tempo
        const novoPedido = new Pedido(id, x, y, peso, prioridade);
        
        gerenciador.adicionarPedido(novoPedido);
        res.status(201).json({ mensagem: "Pedido recebido", id });
    } catch (erro) {
        res.status(400).json({ erro: erro.message }); // [cite: 189] Tratamento de erro
    }
});

// Endpoint 2: Calcular/Gerar Rotas (Simulação da otimização) [cite: 180]
app.post('/entregas/processar', (req, res) => {
    const viagens = gerenciador.otimizarViagens();
    res.json({
        mensagem: "Otimização realizada",
        viagensGeradas: viagens,
        pedidosRestantesNaFila: gerenciador.filaPedidos.length
    });
});

// Endpoint 3: Status dos Drones [cite: 181]
app.get('/drones/status', (req, res) => {
    res.json(gerenciador.getStatusDrones());
});

// Endpoint Extra: Dashboard Simples (JSON) [cite: 192]
app.get('/dashboard', (req, res) => {
    res.json({
        totalViagens: gerenciador.historicoViagens.length,
        dronesDisponiveis: gerenciador.drones.length
    });
});

const PORT = 3000;
// Apenas inicia o servidor se não estiver em modo de teste
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

module.exports = app; // Exportar para testes