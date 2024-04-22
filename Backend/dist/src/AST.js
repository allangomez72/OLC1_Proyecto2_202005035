"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const TablaSimbolo_1 = require("./Contexto/TablaSimbolo");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = [];
        this.contextoGlobal = new TablaSimbolo_1.Contexto(null);
    }
    Ejecutar() {
        // Primera pasada
        this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(this.contextoGlobal, this.consola);
        });
    }
    getConsola() {
        console.log(this.consola, "Consola");
        let salid = "";
        for (let index = 0; index < this.consola.length; index++) {
            salid += this.consola[index].toString();
        }
        console.log(salid, "Salida");
        return salid;
    }
}
exports.AST = AST;
