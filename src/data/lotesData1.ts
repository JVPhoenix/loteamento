export interface LotesDataInterface {
    value: number,
    label: string,
    valor: number,
    tamanho: string,
}

export const lotesData: LotesDataInterface[] = 
[
    {value: 0 , label: '---- DIGITE OU SELECIONE UM LOTE ----', valor: 0, tamanho: "0"},
    {value: 5 , label: 'Quadra 1 - Lote 8 ', valor: 20000.00, tamanho: "10x30 - 300m²"},
    {value: 6 , label: 'Quadra 1 - Lote 10 ', valor: 27751.50, tamanho: "34.5x30x6.5 - 450m²"},
    // {value: 10 , label: 'Quadra 1 - Lote 14 ', valor: 15500.00, tamanho: "10x30 - 300m²"},

    // {value: 12 , label: 'Quadra 2 - Lote 13 ', valor: 15500.00, tamanho: "10x30 - 300m²"},

    // {value: 16 , label: 'Quadra 3 - Lote 16 ', valor: 18500.00, tamanho: "10x30 - 300m²"},

    {value: 25 , label: 'Quadra 4 - Lote 7 ', valor: 15500.00, tamanho: "10x30 - 300m²"},

    {value: 37 , label: 'Quadra 5 - Lote 1 ', valor: 20000.00, tamanho: "10x30 - 300m²"},
    {value: 38 , label: 'Quadra 5 - Lote 8 ', valor: 15500.00, tamanho: "10x30 - 300m²"},

    {value: 47 , label: 'Quadra 6 - Lote 6 ', valor: 22509.55, tamanho: "VARIÁVEL - 365m²"},
    {value: 48 , label: 'Quadra 6 - Lote 12 ', valor: 15914.36, tamanho: "VARIÁVEL - 365m²"},
]