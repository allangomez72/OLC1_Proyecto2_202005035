
export type Resultado = {
    valor: any,
    tipo: TipoDato
}

export enum TipoDato{
    NUMBER = 0,
    DOUBLE = 1,
    BOOLEANO = 2,
    CHAR = 3,
    STRING = 4,
    NULO,
    VOID
}

export enum OpAritmetica{
    SUMA, RESTA, PRODUCTO,DIVISION,POTENCIA,MODULO
}

export enum OpRelacional{
    IGUAL,DISTINTO,MENOR,MENORIGUAL,MAYOR,MAYORIGUAL
}

export enum OpLogico{
    AND,OR,NOT
}