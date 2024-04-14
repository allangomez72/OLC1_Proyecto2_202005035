"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
    }
    Ejecutar() {
        //Primera pasada
        let result = "";
        this.instrucciones.forEach(instruccion => {
            result += instruccion.interpretar();
        });
        return result;
    }
}
exports.AST = AST;
