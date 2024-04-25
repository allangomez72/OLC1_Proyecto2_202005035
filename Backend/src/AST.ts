import { Contexto } from "./Contexto/TablaSimbolo";
import { Expresion } from "./Expresion/Expresion";
import { Primitivo } from "./Expresion/Primitivo";
import { TipoDato } from "./Expresion/Resultado";
import { Declaracion } from "./Instruccion/Definiciones/Declaracion";
import { Funcion } from "./Instruccion/Definiciones/Funcion";
import { Execute } from "./Instruccion/Execute";
import { Instruccion } from "./Instruccion/Instruccion";
import { Print } from "./Instruccion/Print";

export class AST {
    public instrucciones: Instruccion[]
    public consola:string[]
    public contextoGlobal: Contexto
    public contadorExec: number
    constructor(instrucciones: Instruccion[]){
        this.instrucciones = instrucciones
        this.consola = []
        this.contextoGlobal = new Contexto(null)
        this.contadorExec = 0;
    }

    public Ejecutar() {
        // Primera pasada: Ejecutar funciones y declaraciones
        this.instrucciones.forEach(instruccion => {
            if (instruccion instanceof Funcion || instruccion instanceof Declaracion) {
                instruccion.interpretar(this.contextoGlobal, this.consola);
            }
        });
    
        // Segunda pasada: Ejecutar Execute
        this.instrucciones.forEach(instruccion => {
            if (instruccion instanceof Execute) {
                instruccion.interpretar(this.contextoGlobal, this.consola);
                this.contadorExec++;
            }
        });
    
        // Tercera pasada: Ejecutar instrucciones fuera de las funciones
        this.instrucciones.forEach(instruccion => {
            if (!(instruccion instanceof Funcion)
                && !(instruccion instanceof Declaracion)
                && !(instruccion instanceof Execute)) {
                instruccion.interpretar(this.contextoGlobal, this.consola);
            }
        });
    }
    
    public getConsola(){
        console.log(this.consola)
        let salid = ""
        for (let index = 0; index < this.consola.length; index++) {
            salid += this.consola[index].toString();
        }
        console.log(salid)
        return salid
    }
}