import { Expresion } from "./Expresion";
import { OpAritmetica, Resultado, TipoDato } from "./Resultado";

export class Aritmetica extends Expresion{
    public expresion1 : Expresion;
    public expresion2 : Expresion;
    public operacion: OpAritmetica;
    constructor(exp1: Expresion, exp2: Expresion, op: OpAritmetica, linea: number, columna: number){
        super(linea, columna);
        this.expresion1 = exp1;
        this.expresion2 = exp2;
        this.operacion = op;
    }


    public interpretar(): Resultado {
        const resultadoIzq = this.expresion1.interpretar()
        const resultadoDer = this.expresion2.interpretar()
        if(this.operacion == OpAritmetica.SUMA){
            return {valor: resultadoIzq.valor + resultadoDer.valor, tipo: TipoDato.NUMBER}
        } else if(this.operacion == OpAritmetica.RESTA){
            return {valor: resultadoIzq.valor - resultadoDer.valor, tipo: TipoDato.NUMBER}
        } else if(this.operacion == OpAritmetica.MULTIPLICACION){
            return {valor: resultadoIzq.valor * resultadoDer.valor, tipo: TipoDato.NUMBER}
        } else if(this.operacion == OpAritmetica.DIVISION){
            return {valor: resultadoIzq.valor / resultadoDer.valor, tipo: TipoDato.NUMBER}
        }
        return {valor: null, tipo: TipoDato.NULO}
    }
}
