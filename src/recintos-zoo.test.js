import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoológico', () => {
    
    // Teste para verificar que o método rejeita um animal inválido
    test('Deve rejeitar animal inválido', () => {
        const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    // Teste para verificar que o método rejeita uma quantidade inválida
    test('Deve rejeitar quantidade inválida', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
        expect(resultado.erro).toBe("Quantidade inválida");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    // Teste para verificar que não há recinto viável para 10 macacos
    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    // Teste para verificar que há recinto viável para 1 crocodilo
    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    // Teste para verificar que há recintos viáveis para 2 macacos
    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis).toContain('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    // Teste para verificar que não há recinto viável para 3 leões
    test('Não deve encontrar recintos para 3 leões', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEAO', 3);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    // Teste para verificar que a inclusão de um lote de 12 macacos em 2 recintos não é permitida
    test('Não deve permitir separar um lote de 12 macacos em 2 recintos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 12);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    // Teste para verificar que hipopótamos não são alocados em recintos que não sejam savana e rio
    test('Deve rejeitar hipopótamos em recintos que não sejam savana e rio', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).not.toContain('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis).not.toContain('Recinto 4 (espaço livre: 5 total: 8)');
    });

    // Teste para verificar que há recintos viáveis para 1 hipopótamo
    test('Deve encontrar recintos para 1 hipopótamo', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 4 (espaço livre: 4 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    // Teste para verificar que há recintos viáveis para 1 gazela
    test('Deve encontrar recintos para 1 gazela', () => {
        const resultado = new RecintosZoo().analisaRecintos('GAZELA', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 4 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 3 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });
});
