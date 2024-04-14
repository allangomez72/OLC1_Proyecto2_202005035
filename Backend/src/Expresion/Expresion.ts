import { Resultado } from "./Resultado";

export abstract class Expresion {
    public linea: number;
    public columna: number;
    constructor(linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
    }


    public abstract interpretar(): Resultado
}