"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaSimbolo = void 0;
const Simbolo_1 = require("../Contexto/Simbolo");
class TablaSimbolo {
    constructor() {
        this.tabla = new Map();
    }
    guardarSimbolo(id, valor, tipo, tiposimbolo) {
        const simbolo = new Simbolo_1.Simbolo(id, valor, tipo, tiposimbolo);
        this.tabla.set(id, simbolo);
    }
    obtenerSimbolo(id) {
        return this.tabla.get(id);
    }
    getTabla() {
        return Array.from(this.tabla.values());
    }
}
exports.TablaSimbolo = TablaSimbolo;
