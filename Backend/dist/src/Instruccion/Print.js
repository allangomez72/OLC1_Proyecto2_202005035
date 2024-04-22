"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Resultado_1 = require("../Expresion/Resultado");
const Instruccion_1 = require("./Instruccion");
class Print extends Instruccion_1.Instruccion {
    constructor(expresion, salto, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.salto = salto;
    }
    interpretar(contexto, consola) {
        const res = this.expresion.interpretar(contexto);
        let valorImpirmir = res.valor;
        valorImpirmir = valorImpirmir.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\r/g, "\r");
        if (res.tipo == Resultado_1.TipoDato.BOOLEANO) {
            res.valor == res.valor ? "true" : "false";
        }
        if (this.salto) {
            consola.push(valorImpirmir + "\n");
        }
        else {
            consola.push(valorImpirmir + "");
        }
        return null;
    }
}
exports.Print = Print;
