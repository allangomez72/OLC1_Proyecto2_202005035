"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Primitivo extends Expresion_1.Expresion {
    // Estos parámetros deben pasarlo en el archivo de JISON
    // En jison ustedes saber qué tipo de dato es el terminal según su gramática de expresiones
    constructor(e1, tipo, linea, columna) {
        super(linea, columna);
        this.exp1 = e1;
        this.tipo = tipo;
    }
    interpretar() {
        // Ejecutamos los noterminales
        // Comparamos el tipo
        if (Resultado_1.TipoDato.NUMBER == this.tipo || Resultado_1.TipoDato.DOUBLE == this.tipo) {
            //Convertimos el tipo para que al ejecutar el valor ya tenga el tipo correcto
            //con this.tipo no nos preocupamos en verificar si es number o double
            return { valor: Number(this.exp1), tipo: this.tipo };
        }
        else if (Resultado_1.TipoDato.BOOLEANO == this.tipo) {
            return { valor: this.exp1.toLowerCase() == "true" ? true : false, tipo: this.tipo };
        }
        else if (Resultado_1.TipoDato.STRING == this.tipo) {
            return { valor: this.exp1.toString(), tipo: this.tipo };
        }
        // en caso que no sea ninguno
        return { valor: null, tipo: Resultado_1.TipoDato.NULO };
    }
}
exports.Primitivo = Primitivo;
