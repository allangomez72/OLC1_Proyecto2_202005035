import { Contexto } from "../../Contexto/TablaSimbolo";
import { Expresion } from "../Expresion";
import { Resultado, TipoDato } from "../Resultado";

export class toLower extends Expresion{
    constructor( private expresion: Expresion, linea: number, columna: number){
        super(linea, columna);
    }
    public interpretar(contexto: Contexto): Resultado {
        const resultado = this.expresion.interpretar(contexto);
        console.log(resultado);
        //verificar que es una cadena
        if(resultado.tipo !== TipoDato.STRING){
            throw new Error(`Error: se esperaba una cadena y se recibio un ${resultado.tipo}`);
        }

        const valor = resultado.valor as string;
        const minusculas = valor.toLowerCase();
        return {valor: minusculas, tipo: TipoDato.STRING};
    }
}