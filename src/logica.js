class Drone {
    constructor(id, capacidadeKg, alcanceKm) {
        this.id = id;
        this.capacidadeKg = capacidadeKg;
        this.alcanceKm = alcanceKm;
        this.status = 'IDLE'; //  Estados: IDLE, CARREGANDO, VOANDO...
        this.bateria = 100;
        this.cargaAtual = 0;
    }
}

class Pedido {
    constructor(id, x, y, peso, prioridade) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.peso = peso;
        this.prioridade = prioridade; // Alta, Media, Baixa
    }
}

class GerenciadorEntregas {
    constructor() {
        this.drones = [
            new Drone(1, 10, 20), // Ex: Drone 1 suporta 10kg
            new Drone(2, 8, 15)   // Ex: Drone 2 suporta 8kg
        ];
        this.filaPedidos = [];
        this.historicoViagens = [];
    }

    adicionarPedido(pedido) {
        // Validação básica [cite: 189]
        if (pedido.peso > 12) { // Exemplo de limite máximo absoluto
            throw new Error("Peso excede a capacidade de qualquer drone disponível.");
        }
        this.filaPedidos.push(pedido);
    }

    // Algoritmo de Otimização 
    // Estratégia: Agrupar pedidos por prioridade e tentar encher o drone (Bin Packing simples)
    otimizarViagens() {
        // Ordena: 1º Prioridade (Alta > Baixa), 2º Peso (Maior > Menor) para otimizar espaço
        const prioridadeMap = { 'alta': 3, 'media': 2, 'baixa': 1 };
        
        let pendentes = this.filaPedidos.sort((a, b) => {
            if (prioridadeMap[b.prioridade] !== prioridadeMap[a.prioridade]) {
                return prioridadeMap[b.prioridade] - prioridadeMap[a.prioridade];
            }
            return b.peso - a.peso;
        });

        const viagens = [];

        // Tenta alocar nos drones disponíveis
        this.drones.forEach(drone => {
            let cargaDaViagem = [];
            let pesoAtual = 0;

            // Percorre os pedidos pendentes para encher o drone
            for (let i = 0; i < pendentes.length; i++) {
                let p = pendentes[i];
                
                // Verifica Capacidade e Distância (Simplificado: Distância Manhattan ida e volta)
                // Assumindo base em (0,0)
                const distIdaVolta = (Math.abs(p.x) + Math.abs(p.y)) * 2;

                if ((pesoAtual + p.peso <= drone.capacidadeKg) && (distIdaVolta <= drone.alcanceKm)) {
                    cargaDaViagem.push(p);
                    pesoAtual += p.peso;
                    // Remove pedido da lista de pendentes e ajusta o índice
                    pendentes.splice(i, 1);
                    i--; 
                }
            }

            if (cargaDaViagem.length > 0) {
                drone.status = 'EM_VOO'; //  Mudança de estado
                viagens.push({
                    droneId: drone.id,
                    pedidos: cargaDaViagem,
                    pesoTotal: pesoAtual
                });
            }
        });

        this.historicoViagens.push(...viagens);
        this.filaPedidos = pendentes; // O que sobrou fica na fila
        return viagens;
    }

    getStatusDrones() {
        return this.drones;
    }
}

module.exports = { Drone, Pedido, GerenciadorEntregas };