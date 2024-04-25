"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLower = void 0;
const Expresion_1 = require("../Expresion");
const Resultado_1 = require("../Resultado");
class toLower extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    interpretar(contexto) {
        const resultado = this.expresion.interpretar(contexto);
        console.log(resultado);
        //verificar que es una cadena
        if (resultado.tipo !== Resultado_1.TipoDato.STRING) {
            throw new Error(`Error: se esperaba una cadena y se recibio un ${resultado.tipo}`);
        }
        const valor = resultado.valor;
        const minusculas = valor.toLowerCase();
        return { valor: minusculas, tipo: Resultado_1.TipoDato.STRING };
    }
}
exports.toLower = toLower;
