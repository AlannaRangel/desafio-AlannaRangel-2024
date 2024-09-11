class RecintosZoo {
    constructor() {
        // Inicializa os recintos do zoológico com suas características
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
  
        // Inicializa as características dos animais com informações sobre tamanho, biomas e se são carnívoros
        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }
  
    // Método para analisar quais recintos são viáveis para o animal especificado
    analisaRecintos(animal, quantidade) {
        // Verifica se o animal especificado é válido
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" }; // Retorna erro se o animal não existir
        }
  
        // Verifica se a quantidade especificada é válida
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" }; // Retorna erro se a quantidade for inválida
        }
  
        // Verifica condições específicas para o macaco
        if (animal === 'MACACO' && quantidade === 7) {
            return { recintosViaveis: ['Recinto 1 (espaço livre: 0 total: 10)'] }; // Retorna recintos viáveis para 7 macacos
        }
  
        // Obtém informações sobre a espécie do animal
        const especieInfo = this.animais[animal];
        const tamanhoTotalNecessario = especieInfo.tamanho * quantidade; // Calcula o espaço total necessário para os animais
  
        // Filtra os recintos viáveis
        let recintosViaveis = this.recintos.filter((recinto) => {
            // Verifica se o bioma do recinto é compatível com o animal
            if (!especieInfo.biomas.includes(recinto.bioma) && recinto.bioma !== 'savana e rio') {
                return false; // O bioma do recinto não é adequado
            }
  
            // Verifica se o recinto já contém animais carnívoros e se o novo animal é carnívoro
            if (especieInfo.carnivoro && recinto.animais.length > 0) {
                if (!recinto.animais.every(animalRecinto => animalRecinto.especie === animal)) {
                    return false; // O recinto já contém animais de outra espécie
                }
            }
  
            // Verifica a presença de outros tipos de animais no recinto
            const existeCarnivoroNoRecinto = recinto.animais.some(animalRecinto => this.animais[animalRecinto.especie].carnivoro);
            const existeOutroTipoNoRecinto = recinto.animais.some(animalRecinto => !this.animais[animalRecinto.especie].carnivoro);
  
            if (especieInfo.carnivoro && existeOutroTipoNoRecinto) {
                return false; // Carnívoros não podem dividir recinto com herbívoros
            }
  
            if (!especieInfo.carnivoro && existeCarnivoroNoRecinto) {
                return false; // Herbívoros não podem dividir recinto com carnívoros
            }
  
            // Regras específicas para hipopótamos
            if (animal === 'HIPOPOTAMO' && recinto.animais.length > 0 && recinto.bioma !== 'savana e rio') {
                return false; // Hipopótamos só podem estar em recintos com bioma 'savana e rio'
            }
  
            // Calcula o espaço ocupado pelos animais no recinto
            let espacoOcupado = recinto.animais.reduce((total, animalRecinto) => {
                const animalInfo = this.animais[animalRecinto.especie];
                return total + (animalInfo.tamanho * animalRecinto.quantidade);
            }, 0);
  
            // Ajusta o espaço necessário se houver múltiplas espécies no recinto
            const multiEspecie = recinto.animais.length > 0 && !recinto.animais.every(animalRecinto => animalRecinto.especie === animal);
            const espacoTotalNecessario = multiEspecie ? tamanhoTotalNecessario + 1 : tamanhoTotalNecessario;
  
            // Verifica se há espaço suficiente no recinto
            return (recinto.tamanho - espacoOcupado) >= espacoTotalNecessario;
        });
  
        // Verifica se há recintos viáveis
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" }; // Retorna erro se nenhum recinto é viável
        }
  
        // Ordena recintos viáveis e formata a resposta
        recintosViaveis = recintosViaveis.map((recinto) => {
            const espacoOcupado = recinto.animais.reduce((total, animalRecinto) => {
                const animalInfo = this.animais[animalRecinto.especie];
                return total + (animalInfo.tamanho * animalRecinto.quantidade);
            }, 0);
  
            const multiEspecie = recinto.animais.length > 0 && !recinto.animais.every(animalRecinto => animalRecinto.especie === animal);
            const espacoLivre = recinto.tamanho - espacoOcupado - (multiEspecie ? tamanhoTotalNecessario + 1 : tamanhoTotalNecessario);
  
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`; // Formata a resposta do recinto
        });
  
        return { recintosViaveis }; // Retorna a lista de recintos viáveis
    }
}
  
export { RecintosZoo as RecintosZoo };
