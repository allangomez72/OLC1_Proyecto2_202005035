"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Simbolo_1 = require("../Contexto/Simbolo");
const Instruccion_1 = require("./Instruccion");
class Asignacion extends Instruccion_1.Instruccion {
    constructor(id, expresion, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.expresion = expresion;
    }
    interpretar(contexto, consola) {
        const simbolo = contexto.obtenerVariable(this.id);
        if (simbolo) {
            if (simbolo.tipoSimbolo == Simbolo_1.tipoSimbolo.VARIABLE) {
                const nuevoValor = this.expresion.interpretar(contexto);
                simbolo.actualizarValor(nuevoValor);
                contexto.actualizarSimbolo(this.id, simbolo);
                return null;
            }
            throw new Error("No es tipo variable");
        }
        throw new Error("La variable no existe");
    }
}
exports.Asignacion = Asignacion;
