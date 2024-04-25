"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada = void 0;
const Simbolo_1 = require("../Contexto/Simbolo");
const TablaSimbolo_1 = require("../Contexto/TablaSimbolo");
const Instruccion_1 = require("./Instruccion");
class Llamada extends Instruccion_1.Instruccion {
    constructor(id, argumentos, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.argumentos = argumentos;
    }
    interpretar(contexto, consola) {
        // 1. Obtener la función
        const simbolo = contexto.obtenerSimbolo(this.id);
        if ((simbolo === null || simbolo === void 0 ? void 0 : simbolo.tipoSimbolo) != Simbolo_1.tipoSimbolo.FUNCION)
            throw new Error("Este id no es de una funcion");
        // Comparar parámetros - cantidad y tipo
        const funcion = simbolo.obtenerValor();
        const global = contexto.obtenerGlobal();
        const contextoFuncion = new TablaSimbolo_1.Contexto(global);
        if (this.argumentos.length != funcion.getParametros().length)
            throw new Error("Verifique la cantidad de argumentos");
        funcion.getParametros().forEach((parametro, index) => {
            const exp = this.argumentos[index].interpretar(contexto);
            if (exp.tipo != parametro.tipo)
                throw new Error("Tipo de parámetro no coincide");
            // Declarar variable                
            contextoFuncion.guardarSimbolo(parametro.id, exp, exp.tipo, Simbolo_1.tipoSimbolo.VARIABLE);
        });
        // Ejecutar lista de instrucciones
        const instrucciones = funcion.getInstrucciones();
        instrucciones.interpretar(contextoFuncion, consola);
        return null;
    }
}
exports.Llamada = Llamada;
