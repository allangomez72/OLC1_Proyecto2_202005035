"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDoWhile = void 0;
const Resultado_1 = require("../../Expresion/Resultado");
const Instruccion_1 = require("../Instruccion");
class CDoWhile extends Instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    interpretar(contexto, consola) {
        try {
            do {
                // Se ejecutan las instrucciones al menos una vez
                const retorno = this.instrucciones.interpretar(contexto, consola);
                if (retorno == "break") {
                    console.log("break");
                    break;
                }
                // Se calcula la condicion al final del bucle
                const condicion = this.condicion.interpretar(contexto);
                if (condicion.tipo != Resultado_1.TipoDato.BOOLEANO) {
                    throw new Error("La condicion no es booleana");
                }
            } while (this.condicion.interpretar(contexto).valor);
        }
        catch (error) {
            consola.push(error + "");
            console.log({ error });
        }
        return null;
    }
}
exports.CDoWhile = CDoWhile;
