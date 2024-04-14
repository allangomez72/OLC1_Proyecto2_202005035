import { Expresion } from "./Expresion/Expresion";

export class AST {
    public instrucciones: Expresion[]
    constructor(instrucciones: Expresion[]){
        this.instrucciones = instrucciones
   }
   public Ejecutar(){
    //Primera pasada
    let result = ""
    this.instrucciones.forEach(instruccion => {
        result += instruccion.interpretar()
    });
    return result
   }
}
