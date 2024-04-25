import { Simbolo } from "../Contexto/Simbolo";

export class TablaSimbolo{
    private tabla:Map<string,Simbolo>

    constructor() {
        this.tabla = new Map();
    }

    public guardarSimbolo(id: string, valor: any, tipo: string, tipoSimbolo: tipoSimbolo): void {
        const simbolo = new Simbolo(id, valor, tipo, tipoSimbolo);
        this.tabla.set(id, simbolo);
    }

    public obtenerSimbolo(id: string): Simbolo | undefined {
        return this.tabla.get(id);
    }

    public getTabla(): Simbolo[] {
        return Array.from(this.tabla.values());
    }
}