import { tipoSimbolo } from "../Contexto/Simbolo";
import { Contexto } from "../Contexto/TablaSimbolo";
import { Instruccion } from "../Instruccion/Instruccion";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Resultado";

export class Incremento extends Instruccion {
    constructor(private id: string, linea: number, columna: number) {
        super(linea, columna);
    }

    public interpretar(contexto: Contexto, consola: string[]): string | null {
        const simbolo = contexto.obtenerSimbolo(this.id);

        if(simbolo){
            if(simbolo.tipoSimbolo == tipoSimbolo.VARIABLE){
                const nuevoValor = simbolo.obtenerValor() as Resultado;
                if(nuevoValor.tipo != simbolo.obtenertipoDato()) throw new Error("Tipo de asignación no válida");
                simbolo.actualizarValor(nuevoValor.valor+1);
                console.log('Esta es la variable incremento: ', simbolo);
                contexto.actualizarSimbolo(this.id,simbolo);
                return null;
            }
            throw new Error("No es tipo variable");
        }
        throw new Error("La variable no existe");
    }
}
