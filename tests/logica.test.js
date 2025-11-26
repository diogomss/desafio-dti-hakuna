const { GerenciadorEntregas, Pedido } = require('../src/logica');

describe('Logística de Drones', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorEntregas();
    });

    test('Deve adicionar um pedido na fila com sucesso', () => {
        const pedido = new Pedido(1, 10, 10, 2, 'media');
        gerenciador.adicionarPedido(pedido);
        expect(gerenciador.filaPedidos.length).toBe(1);
    });

    test('Deve rejeitar pedido com peso acima do suportado (Regra de Erro)', () => { // [cite: 189]
        const pedido = new Pedido(2, 10, 10, 50, 'alta'); // 50kg é muito pesado
        expect(() => gerenciador.adicionarPedido(pedido)).toThrow();
    });

    test('Deve priorizar entregas de alta prioridade na otimização', () => { // [cite: 171]
        // Pedido leve mas baixa prioridade
        gerenciador.adicionarPedido(new Pedido(1, 1, 1, 1, 'baixa'));
        // Pedido leve com alta prioridade
        gerenciador.adicionarPedido(new Pedido(2, 1, 1, 1, 'alta'));

        // Drone tem capacidade, deve pegar o de alta prioridade primeiro na ordenação interna
        const viagens = gerenciador.otimizarViagens();
        
        // Verifica se o primeiro item da primeira viagem é o de alta prioridade
        expect(viagens[0].pedidos[0].prioridade).toBe('alta');
    });
});