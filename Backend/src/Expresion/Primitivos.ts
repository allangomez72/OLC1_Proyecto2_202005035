import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Resultado";

export class Primitivo extends Expresion{
    public expresion1 : string
    tipo: TipoDato;
    constructor(exp1: string,tipo:TipoDato,linea: number, columna: number){
        super(linea, columna);
        this.expresion1 = exp1;
        this.tipo = tipo;
    }


    public interpretar(): Resultado {
        //Ejecutamos los no terminales
        //comparamos el tipo
        if (TipoDato.NUMBER == this.tipo || TipoDato.DECIMAL == this.tipo){
            //Convertimos el tipo para que al ejecutar el valor ya tenga el tipo correcto
            //con this.tipo no nos preocupamos en verificar si es number o double
            return {valor: Number(this.expresion1), tipo: this.tipo}
        } 
        return {valor: null, tipo: TipoDato.NULO}
    }
}
