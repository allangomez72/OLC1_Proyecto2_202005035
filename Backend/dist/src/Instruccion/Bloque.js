"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const TablaSimbolo_1 = require("../Contexto/TablaSimbolo");
const Instruccion_1 = require("./Instruccion");
class Bloque extends Instruccion_1.Instruccion {
    constructor(instrucciones) {
        super(0, 0);
        this.instrucciones = instrucciones;
    }
    interpretar(contexto, consola) {
        const nuevoContexto = new TablaSimbolo_1.Contexto(contexto);
        for (const instruccion of this.instrucciones) {
            const retorno = instruccion.interpretar(nuevoContexto, consola);
            console.log({ retorno });
            if (retorno)
                return retorno;
        }
        return null;
    }
}
exports.Bloque = Bloque;
