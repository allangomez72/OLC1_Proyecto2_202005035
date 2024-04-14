"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Aritmetica extends Expresion_1.Expresion {
    constructor(exp1, exp2, op, linea, columna) {
        super(linea, columna);
        this.expresion1 = exp1;
        this.expresion2 = exp2;
        this.operacion = op;
    }
    interpretar() {
        const resultadoIzq = this.expresion1.interpretar();
        const resultadoDer = this.expresion2.interpretar();
        if (this.operacion == Resultado_1.OpAritmetica.SUMA) {
            return { valor: resultadoIzq.valor + resultadoDer.valor, tipo: Resultado_1.TipoDato.NUMBER };
        }
        else if (this.operacion == Resultado_1.OpAritmetica.RESTA) {
            return { valor: resultadoIzq.valor - resultadoDer.valor, tipo: Resultado_1.TipoDato.NUMBER };
        }
        else if (this.operacion == Resultado_1.OpAritmetica.MULTIPLICACION) {
            return { valor: resultadoIzq.valor * resultadoDer.valor, tipo: Resultado_1.TipoDato.NUMBER };
        }
        else if (this.operacion == Resultado_1.OpAritmetica.DIVISION) {
            return { valor: resultadoIzq.valor / resultadoDer.valor, tipo: Resultado_1.TipoDato.NUMBER };
        }
        return { valor: null, tipo: Resultado_1.TipoDato.NULO };
    }
}
exports.Aritmetica = Aritmetica;
