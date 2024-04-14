export type Resultado = {
    valor: any,
    tipo: TipoDato
}

export enum TipoDato{
    NUMBER,
    DECIMAL,
    NULO
}

 export enum OpAritmetica{
    SUMA, RESTA,MULTIPLICACION,DIVISION
}
