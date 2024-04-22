import { Contexto } from "../Contexto/TablaSimbolo";
import { Expresion } from "../Expresion/Expresion";
import { TipoDato } from "../Expresion/Resultado";
import { Instruccion } from "./Instruccion";

export class Print extends Instruccion{
    private expresion;
    private salto;
    constructor(expresion:Expresion,salto:string,linea:number,columna:number){
        super(linea,columna)
        this.expresion=expresion
        this.salto = salto
    }
    public interpretar(contexto:Contexto,consola: string[]): null {
        const res = this.expresion.interpretar(contexto)
        let valorImpirmir = res.valor;

        valorImpirmir = valorImpirmir.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\r/g, "\r");

        if (res.tipo == TipoDato.BOOLEANO){
            res.valor == res.valor?"true":"false"
        }
        if (this.salto){
        consola.push(valorImpirmir+"\n")
        }
        else{
        consola.push(valorImpirmir+"")
        }
        return null
    }
}