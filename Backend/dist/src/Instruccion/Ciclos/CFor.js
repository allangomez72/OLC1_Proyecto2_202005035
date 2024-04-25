"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFor = void 0;
const Resultado_1 = require("../../Expresion/Resultado");
const Instruccion_1 = require("../Instruccion");
class CFor extends Instruccion_1.Instruccion {
    constructor(declaracion, condicion, iteracion, bloque, linea, columna) {
        super(linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.iteracion = iteracion;
        this.bloque = bloque;
    }
    interpretar(contexto, consola) {
        // Interpretar la declaración inicial del ciclo (puede ser una asignación o una declaración)
        if (this.declaracion instanceof Instruccion_1.Instruccion) {
            this.declaracion.interpretar(contexto, consola);
        }
        // Evaluar la condición del ciclo
        let condicion = this.condicion.interpretar(contexto);
        if (condicion.tipo !== Resultado_1.TipoDato.BOOLEANO) {
            throw new Error("La condición no es booleana");
        }
        try {
            while (condicion.valor) {
                // Ejecutar el bloque del ciclo
                const retorno = this.bloque.interpretar(contexto, consola);
                if (retorno === "break") {
                    console.log("break");
                    break;
                }
                // Ejecutar la iteración
                if (this.iteracion instanceof Instruccion_1.Instruccion) {
                    this.iteracion.interpretar(contexto, consola);
                }
                // Evaluar la condición nuevamente
                condicion = this.condicion.interpretar(contexto);
                if (condicion.tipo !== Resultado_1.TipoDato.BOOLEANO) {
                    throw new Error("La condición no es booleana");
                }
            }
        }
        catch (error) {
            consola.push(error + "");
            console.log({ error });
        }
        return null;
    }
}
exports.CFor = CFor;
