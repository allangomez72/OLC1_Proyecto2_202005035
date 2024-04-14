"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Primitivo extends Expresion_1.Expresion {
    constructor(exp1, tipo, linea, columna) {
        super(linea, columna);
        this.expresion1 = exp1;
        this.tipo = tipo;
    }
    interpretar() {
        //Ejecutamos los no terminales
        //comparamos el tipo
        if (Resultado_1.TipoDato.NUMBER == this.tipo || Resultado_1.TipoDato.DECIMAL == this.tipo) {
            //Convertimos el tipo para que al ejecutar el valor ya tenga el tipo correcto
            //con this.tipo no nos preocupamos en verificar si es number o double
            return { valor: Number(this.expresion1), tipo: this.tipo };
        }
        return { valor: null, tipo: Resultado_1.TipoDato.NULO };
    }
}
exports.Primitivo = Primitivo;
