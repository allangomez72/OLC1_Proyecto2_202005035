"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpAritmetica = exports.TipoDato = void 0;
var TipoDato;
(function (TipoDato) {
    TipoDato[TipoDato["NUMBER"] = 0] = "NUMBER";
    TipoDato[TipoDato["DECIMAL"] = 1] = "DECIMAL";
    TipoDato[TipoDato["NULO"] = 2] = "NULO";
})(TipoDato || (exports.TipoDato = TipoDato = {}));
var OpAritmetica;
(function (OpAritmetica) {
    OpAritmetica[OpAritmetica["SUMA"] = 0] = "SUMA";
    OpAritmetica[OpAritmetica["RESTA"] = 1] = "RESTA";
    OpAritmetica[OpAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    OpAritmetica[OpAritmetica["DIVISION"] = 3] = "DIVISION";
})(OpAritmetica || (exports.OpAritmetica = OpAritmetica = {}));
