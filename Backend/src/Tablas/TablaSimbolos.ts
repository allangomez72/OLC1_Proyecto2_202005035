import { Simbolo, tipoSimbolo } from "../Contexto/Simbolo";
import { TipoDato } from "../Expresion/Resultado";

export class TablaSimbolo{
    private tabla:Map<string,Simbolo>

    constructor() {
        this.tabla = new Map();
    }

    public guardarSimbolo(id: string, valor: any, tipo: TipoDato, tiposimbolo: tipoSimbolo): void {
        const simbolo = new Simbolo(id, valor,tipo, tiposimbolo);
        this.tabla.set(id, simbolo);
    }

    public obtenerSimbolo(id: string): Simbolo | undefined {
        return this.tabla.get(id);
    }

    public getTabla(): Simbolo[] {
        return Array.from(this.tabla.values());
    }
}