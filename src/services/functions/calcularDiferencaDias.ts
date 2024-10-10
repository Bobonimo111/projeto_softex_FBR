function calcularDiferencaDias(dataEntrada: string): number {
    const dataAtual = new Date(); // Data atual
    const dataEntradaConvertida = new Date(dataEntrada); // Converter a string para data
    const umDia = 1000 * 60 * 60 * 24; // Quantidade de milissegundos em um dia

    // Zerar horas, minutos, segundos e milissegundos para comparar só a data
    dataAtual.setHours(0, 0, 0, 0);
    dataEntradaConvertida.setHours(0, 0, 0, 0);

    // Comparar a data de entrada com a data atual
    if (dataEntradaConvertida < dataAtual) {
        return -1; // Se a data de entrada for anterior à data atual
    }

    // Calcular a diferença de tempo (em milissegundos)
    const diferencaEmMilissegundos = dataEntradaConvertida.getTime() - dataAtual.getTime();

    // Converter a diferença de milissegundos para dias
    const diferencaEmDias = Math.ceil(diferencaEmMilissegundos / umDia);

    return diferencaEmDias; // Retorna a diferença de dias como inteiro
}

export default calcularDiferencaDias;
// Exemplo de uso
// const data = "2024-10-13"; // Digite sua data no formato YYYY-MM-DD
// console.log(calcularDiferencaDias(data))