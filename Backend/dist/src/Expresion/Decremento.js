"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decremento = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Decremento extends Expresion_1.Expresion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    interpretar(contexto) {
        const variable = contexto.obtenerSimbolo(this.id);
        if (!variable) {
            throw new Error(`La variable '${this.id}' no existe.`);
        }
        const tipoDato = variable.obtenertipoDato();
        if (tipoDato !== Resultado_1.TipoDato.NUMBER && tipoDato !== Resultado_1.TipoDato.DOUBLE) {
            throw new Error(`La variable '${this.id}' no es de tipo numérico (NUMBER o DOUBLE).`);
        }
        const valorOriginal = variable.obtenerValor();
        if (isNaN(valorOriginal)) {
            throw new Error(`El valor de la variable '${this.id}' no es un número válido.`);
        }
        const valorDecrementado = valorOriginal - 1;
        variable.actualizarValor(valorDecrementado);
        console.log('Esta es la variable decremento: ', variable);
        return { valor: valorDecrementado, tipo: tipoDato };
    }
}
exports.Decremento = Decremento;
