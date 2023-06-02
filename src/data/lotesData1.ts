export type LotesDataInterface = {
    value: number,
    label: string,
    price: number,
    size: string,
}

export const lotesData: LotesDataInterface[] = 
[
    {value: 1 , label: 'Quadra 1 - Lote 8 ', price: 20000.00, size: "10x30 - 300m²"},
    {value: 2 , label: 'Quadra 1 - Lote 10 ', price: 27751.50, size: "34.5x30x6.5 - 450m²"},
    {value: 3 , label: 'Quadra 1 - Lote 14 ', price: 15500.00, size: "10x30 - 300m²"},

    // {value: 4 , label: 'Quadra 2 - Lote 13 ', price: 15500.00, size: "10x30 - 300m²"},

    // {value: 5 , label: 'Quadra 3 - Lote 16 ', price: 18500.00, size: "10x30 - 300m²"},

    {value: 6 , label: 'Quadra 4 - Lote 7 ', price: 15500.00, size: "10x30 - 300m²"},

    {value: 8 , label: 'Quadra 5 - Lote 8 ', price: 15500.00, size: "10x30 - 300m²"},

    {value: 9 , label: 'Quadra 6 - Lote 6 ', price: 22509.55, size: "VARIÁVEL - 365m²"},
    {value: 10 , label: 'Quadra 6 - Lote 12 ', price: 15914.36, size: "VARIÁVEL - 365m²"},
]