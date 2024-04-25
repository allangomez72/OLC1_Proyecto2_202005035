import { Contexto } from "../Contexto/TablaSimbolo";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Resultado";

export class Decremento extends Expresion {
    constructor(private id: string, linea: number, columna: number) {
        super(linea, columna);
    }

    public interpretar(contexto: Contexto): Resultado {
        const variable = contexto.obtenerSimbolo(this.id);

        if (!variable) {
            throw new Error(`La variable '${this.id}' no existe.`);
        }

        const tipoDato = variable.obtenertipoDato();

        if (tipoDato !== TipoDato.NUMBER && tipoDato !== TipoDato.DOUBLE) {
            throw new Error(`La variable '${this.id}' no es de tipo numérico (NUMBER o DOUBLE).`);
        }

        const valorOriginal = variable.obtenerValor() as number;

        if (isNaN(valorOriginal)) {
            throw new Error(`El valor de la variable '${this.id}' no es un número válido.`);
        }

        const valorDecrementado = valorOriginal - 1;

        variable.actualizarValor(valorDecrementado);

        console.log('Esta es la variable decremento: ', variable);

        return { valor: valorDecrementado, tipo: tipoDato };
    }
}
