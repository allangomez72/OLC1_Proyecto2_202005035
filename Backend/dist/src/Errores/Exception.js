"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
class Exception {
    constructor(titulo, descripcion, linea, columna) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Exception = Exception;
