"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const TablaSimbolo_1 = require("./Contexto/TablaSimbolo");
const Declaracion_1 = require("./Instruccion/Definiciones/Declaracion");
const Funcion_1 = require("./Instruccion/Definiciones/Funcion");
const Execute_1 = require("./Instruccion/Execute");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = [];
        this.contextoGlobal = new TablaSimbolo_1.Contexto(null);
        this.contadorExec = 0;
    }
    Ejecutar() {
        // Primera pasada: Ejecutar funciones y declaraciones
        this.instrucciones.forEach(instruccion => {
            if (instruccion instanceof Funcion_1.Funcion || instruccion instanceof Declaracion_1.Declaracion) {
                instruccion.interpretar(this.contextoGlobal, this.consola);
            }
        });
        // Segunda pasada: Ejecutar Execute
        this.instrucciones.forEach(instruccion => {
            if (instruccion instanceof Execute_1.Execute) {
                instruccion.interpretar(this.contextoGlobal, this.consola);
                this.contadorExec++;
            }
        });
        // Tercera pasada: Ejecutar instrucciones fuera de las funciones
        this.instrucciones.forEach(instruccion => {
            if (!(instruccion instanceof Funcion_1.Funcion)
                && !(instruccion instanceof Declaracion_1.Declaracion)
                && !(instruccion instanceof Execute_1.Execute)) {
                instruccion.interpretar(this.contextoGlobal, this.consola);
            }
        });
    }
    getConsola() {
        console.log(this.consola);
        let salid = "";
        for (let index = 0; index < this.consola.length; index++) {
            salid += this.consola[index].toString();
        }
        console.log(salid);
        return salid;
    }
}
exports.AST = AST;
