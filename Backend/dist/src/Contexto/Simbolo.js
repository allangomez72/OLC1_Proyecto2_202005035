"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoSimbolo = exports.Simbolo = void 0;
class Simbolo {
    constructor(id, valor, tipo, tipoSimbolo) {
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.tipoSimbolo = tipoSimbolo;
    }
    obtenerValor() {
        return this.valor;
    }
    actualizarValor(valor) {
        this.valor = valor;
    }
}
exports.Simbolo = Simbolo;
var tipoSimbolo;
(function (tipoSimbolo) {
    tipoSimbolo[tipoSimbolo["VARIABLE"] = 0] = "VARIABLE";
})(tipoSimbolo || (exports.tipoSimbolo = tipoSimbolo = {}));
