"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incremento = void 0;
const Simbolo_1 = require("../Contexto/Simbolo");
const Instruccion_1 = require("../Instruccion/Instruccion");
class Incremento extends Instruccion_1.Instruccion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    interpretar(contexto, consola) {
        const simbolo = contexto.obtenerSimbolo(this.id);
        if (simbolo) {
            if (simbolo.tipoSimbolo == Simbolo_1.tipoSimbolo.VARIABLE) {
                const nuevoValor = simbolo.obtenerValor();
                if (nuevoValor.tipo != simbolo.obtenertipoDato())
                    throw new Error("Tipo de asignación no válida");
                simbolo.actualizarValor(nuevoValor.valor + 1);
                console.log('Esta es la variable incremento: ', simbolo);
                contexto.actualizarSimbolo(this.id, simbolo);
                return null;
            }
            throw new Error("No es tipo variable");
        }
        throw new Error("La variable no existe");
    }
}
exports.Incremento = Incremento;
