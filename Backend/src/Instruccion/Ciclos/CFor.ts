import { Contexto } from "../../Contexto/TablaSimbolo";
import { Expresion } from "../../Expresion/Expresion";
import { TipoDato } from "../../Expresion/Resultado";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";

export class CFor extends Instruccion {
    declaracion: Expresion | Instruccion;
    condicion: Expresion;
    iteracion: Expresion | Instruccion;
    bloque: Bloque;

    constructor(
        declaracion: Expresion | Instruccion,
        condicion: Expresion,
        iteracion: Expresion | Instruccion,
        bloque: Bloque,
        linea: number,
        columna: number
    ) {
        super(linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.iteracion = iteracion;
        this.bloque = bloque;
    }

    public interpretar(contexto: Contexto, consola: string[]): null {
        // Interpretar la declaración inicial del ciclo (puede ser una asignación o una declaración)
        if (this.declaracion instanceof Instruccion) {
            this.declaracion.interpretar(contexto, consola);
        }

        // Evaluar la condición del ciclo
        let condicion = this.condicion.interpretar(contexto);
        if (condicion.tipo !== TipoDato.BOOLEANO) {
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
                if (this.iteracion instanceof Instruccion) {
                    this.iteracion.interpretar(contexto, consola);
                }

                // Evaluar la condición nuevamente
                condicion = this.condicion.interpretar(contexto);
                if (condicion.tipo !== TipoDato.BOOLEANO) {
                    throw new Error("La condición no es booleana");
                }
            }
        } catch (error) {
            consola.push(error + "");
            console.log({ error });
        }

        return null;
    }
}
