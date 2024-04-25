"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contexto = void 0;
const Simbolo_1 = require("./Simbolo");
class Contexto {
    constructor(padre) {
        this.padre = padre;
        this.tablaSimbolos = new Map;
    }
    guardarSimbolo(id, valor, tipo, tipoSimbolo) {
        const existe = this.tablaSimbolos.has(id);
        if (!existe) {
            this.tablaSimbolos.set(id, new Simbolo_1.Simbolo(id, valor, tipo, tipoSimbolo));
            console.log("Variable guardada-----", valor);
            return;
        }
        throw new Error("La variable ya fue declarada");
    }
    obtenerSimbolo(id) {
        let contexto_actual = this;
        while (contexto_actual != null) {
            const existe = contexto_actual.tablaSimbolos.has(id);
            if (existe) {
                // Obtenemos valor y retornamos
                return contexto_actual.tablaSimbolos.get(id);
            }
            // Siguiente contexto
            contexto_actual = contexto_actual.padre;
        }
        return undefined;
    }
    actualizarSimbolo(id, valor) {
        this.tablaSimbolos.set(id, valor);
    }
    obtenerGlobal() {
        let contexto = this;
        while (contexto.padre != null) {
            contexto = contexto.padre;
        }
        return contexto;
    }
    obtenerTablaSimbolos() {
        return Array.from(this.tablaSimbolos.values());
    }
}
exports.Contexto = Contexto;
