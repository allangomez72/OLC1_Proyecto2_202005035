%{
    // Importar librerías
    const {Aritmetica} = require("../dist/src/Expresion/Aritmetica");
    const {Decremento} = require("../dist/src/Expresion/Decremento");
    const {Incremento} = require("../dist/src/Expresion/Incremento");
    const {toLower} = require("../dist/src/Expresion/FuncNativas/toLower");
    const {Relacional} = require("../dist/src/Expresion/Relacionales");
    const {Logico} = require("../dist/src/Expresion/Logicos");
    const {Primitivo} = require("../dist/src/Expresion/Primitivo");
    const {Acceso} = require("../dist/src/Expresion/Acceso");
    const {OpAritmetica,OpRelacional,OpLogico,TipoDato} = require("../dist/src/Expresion/Resultado");
    const {Print} = require("../dist/src/Instruccion/Print");
    const {Bloque} = require("../dist/src/Instruccion/Bloque");
    const {Llamada} = require("../dist/src/Instruccion/Llamada");
    const {Execute} = require("../dist/src/Instruccion/Execute");
    const {Asignacion} = require("../dist/src/Instruccion/Asignacion");
    const {FN_IF} = require("../dist/src/Instruccion/Control/IF");
    const {Break} = require("../dist/src/Instruccion/Control/Break");
    const {Continue} = require("../dist/src/Instruccion/Control/Continue");
    const {CWhile} = require("../dist/src/Instruccion/Ciclos/While");
    const {CDoWhile} = require("../dist/src/Instruccion/Ciclos/Dowhile");
    const {CFor} = require("../dist/src/Instruccion/Ciclos/CFor");
    const {Declaracion} = require("../dist/src/Instruccion/Definiciones/Declaracion");
    const {Funcion} = require("../dist/src/Instruccion/Definiciones/Funcion");

    const {AST} = require("../dist/src/AST");
%}

%lex // Inicia parte léxica

%options case-insensitive

%%

\s+                                 //ignora espacios
//Palabras reservadas
// Comentarios son con //

[0-9]+("."[0-9]+)\b     return 'DOUBLE';
[0-9]+\b                return 'NUMBER';

"EXECUTE"                  return 'EXEC';
"cout"                 return 'PRINT';
"<<"               return 'COUTPRINT';
"endl"                  return 'ENDL';
"true"                  return 'TRUE';
"false"                 return 'FALSE';
"int"                return 'TNUMBER';
"std::string"                return 'TSTRING';
"char"                  return 'TCHAR';
"bool"                  return 'TBOOL';
"void"                 return 'TVOID';
"double"                return 'TDOUBLE';
//sentencias ciclicas
"do"                   return 'DO';
"while"                 return 'WHILE';
"break"                 return 'BREAK';
"continue"              return 'CONTINUE';
"return"                return 'RETURN';
"for"                  return 'FOR';

//Instrucciones de control
"if"                    return 'IF';
"else"                  return 'ELSE';
"{"                     return 'LLAVEIZQ';
"}"                     return 'LLAVEDER';
"switch"                return 'SWITCH';
"case"                  return 'CASE';
"default"               return 'DEFAULT';

([a-zA-z])[a-zA-Z0-9_]* return 'ID';

// signos
"("                     return 'PARIZQ';
")"                     return 'PARDER';
":"                     return 'DOSPUNTOS'
","                     return 'COMA';
// Aritmeticas
"++"                    return 'INCREMENTO';
"--"                    return 'DECREMENTO';
"+"                     return 'MAS';
"-"                     return 'RES';
"*"                     return 'MUL';
"/"                     return 'DIV';
"pow"                   return 'POTENCIA';
"%"                     return 'MODULO';
";"                     return 'PYC';
"."                     return 'PUNTO';
// Relacionales
"=="                    return 'IGUAL';
"!="                    return 'DISTINTO';
"<="                    return 'MENORIGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYORIGUAL';
">"                     return 'MAYOR';
"="                     return 'ASIGNACION';
//logicos
"&&"                    return 'AND';
"||"                    return 'OR';
"!"                     return 'NOT';
//nativas
"tolower"               return 'TOLOWER';
"toupper"               return 'TOUPPER';
"round"                 return 'ROUND';
"length"                return 'LENGTH';
"typeof"                return 'TYPEOF'
"std::toString"         return 'TOSTRING';
"c_str"                 return 'CSTR';
// Cadenas             "asdfasdfasf"
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }

<<EOF>>                 return 'EOF';

.					   {    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);    }

// Finaliza parte de Léxica
/lex

// precedencia
%right 'NOT'
%left 'OR'
%left 'AND'
%left 'IGUAL','DISTINTO','MENOR','MENORIGUAL','MAYOR','MAYORIGUAL'
%left 'MAS', 'RES'
%left 'MUL','DIV','MODULO'
%right 'POTENCIA'
%right 'INCREMENTO','DECREMENTO'
%right UMINUS
%left 'PARIZQ' 


// Inicio de gramática
%start ini

// Parte sintáctica  - Definición de la gramática
%%

ini : instrucciones EOF { return new AST($1);}
;

instrucciones: instrucciones instruccion    {  $1.push($2); $$ = $1;}
            | instruccion                   { $$ =  [$1];}
;

instruccion:  fn_print PYC              { $$ = $1;}
            | declaracion PYC           { $$ = $1;}
            | ciclo_while PYC           { $$ = $1;}
            | asignacion PYC            { $$ = $1;}
            | inst_break PYC            { $$ = $1;}
            | llamada_funcion PYC       { $$ = $1;}
            | fn_funcion PYC            { $$ = $1;}
            | execute PYC               { $$ = $1;}
            | nativas PYC               { $$ = $1;}
            | fn_if                     { $$ = $1;}
            | ciclo_for              { $$ = $1;}
            | ciclo_dowhile         { $$ = $1;}
            | inst_continue           { $$ = $1;}
;
// Para sitetisar un dato, se utiliza $$
expresion: RES expresion %prec UMINUS   { $$ = new Aritmetica(new Primitivo(0,0,0),$2,OpAritmetica.RESTA,@1.first_line,@1.first_column);} 
        | expresion MAS expresion      { $$ = new Aritmetica($1,$3,OpAritmetica.SUMA,@1.first_line,@1.first_column);}
        | expresion RES expresion       { $$ = new Aritmetica($1,$3,OpAritmetica.RESTA,@1.first_line,@1.first_column);}
        | expresion MUL expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.PRODUCTO,@1.first_line,@1.first_column);}
        | expresion DIV expresion       { $$ =  new Aritmetica($1,$3,OpAritmetica.DIVISION,@1.first_line,@1.first_column);}    
        | expresion POTENCIA expresion  { $$ =  new Aritmetica($1,$3,OpAritmetica.POTENCIA,@1.first_line,@1.first_column);}
        | expresion MODULO expresion    { $$ =  new Aritmetica($1,$3,OpAritmetica.MODULO,@1.first_line,@1.first_column);}
        | relacionales                   { $$ = $1;}
        | logicos                   { $$ = $1;}
        | NUMBER                        { $$ = new Primitivo($1,TipoDato.NUMBER,@1.first_line,@1.first_column); }
        | DOUBLE                        { $$ =  new Primitivo($1,TipoDato.DOUBLE,@1.first_line,@1.first_column); }
        | TRUE                        { $$ =  new Primitivo($1,TipoDato.BOOLEANO,@1.first_line,@1.first_column); }
        | FALSE                        { $$ =  new Primitivo($1,TipoDato.BOOLEANO,@1.first_line,@1.first_column); }
        | CADENA                        { $$ =  new Primitivo($1,TipoDato.STRING,@1.first_line,@1.first_column); }
        | ID                            { $$ = new Acceso($1, @1.first_line, @1.first_column);}
        | PARIZQ expresion PARDER        { $$ = $2;}
        | incremento                     { $$ = $1;}
        | decremento                     { $$ = $1;}
;

relacionales
        : expresion IGUAL expresion       { $$ =  new Relacional($1,$3,OpRelacional.IGUAL,@1.first_line,@1.first_column);}
        | expresion DISTINTO expresion    { $$ =  new Relacional($1,$3,OpRelacional.DISTINTO,@1.first_line,@1.first_column);}
        | expresion MENOR expresion       { $$ =  new Relacional($1,$3,OpRelacional.MENOR,@1.first_line,@1.first_column);}
        | expresion MENORIGUAL expresion  { $$ =  new Relacional($1,$3,OpRelacional.MENORIGUAL,@1.first_line,@1.first_column);}
        | expresion MAYOR expresion       { $$ =  new Relacional($1,$3,OpRelacional.MAYOR,@1.first_line,@1.first_column);}
        | expresion MAYORIGUAL expresion  { $$ =  new Relacional($1,$3,OpRelacional.MAYORIGUAL,@1.first_line,@1.first_column);}
;

logicos
        : expresion AND expresion       { $$ =  new Logico($1,$3,OpLogico.AND,@1.first_line,@1.first_column);}
        | expresion OR  expresion       { $$ =  new Logico($1,$3,OpLogico.OR,@1.first_line,@1.first_column);}
        | NOT expresion                 { $$ =  new Logico(null,$2,OpLogico.NOT,@1.first_line,@1.first_column);}
;

fn_print: PRINT COUTPRINT expresion { $$ = new Print($3,false,@1.first_line,@1.first_column)}
        | PRINT COUTPRINT expresion COUTPRINT ENDL{ $$ = new Print($3,true,@1.first_line,@1.first_column)}
;
// Bloque de instrucciones
bloque
        : LLAVEIZQ instrucciones LLAVEDER      { $$= new Bloque($2);}
        | LLAVEIZQ  LLAVEDER                    { $$ = new Bloque([]) }
;
// Sentencia de control
fn_if
        : IF PARIZQ expresion PARDER bloque                     { $$ = new FN_IF($3,$5,null,@1.first_line,@1.first_column);}
        | IF PARIZQ expresion PARDER bloque ELSE bloque         { $$ = new FN_IF($3,$5,$7,@1.first_line,@1.first_column);}
        | IF PARIZQ expresion PARDER bloque ELSE fn_if          { $$ = new FN_IF($3,$5,$7,@1.first_line,@1.first_column);}
;

case
        : CASE expresion DOSPUNTOS instrucciones
;

bloquecase
        : bloquecase case
        | case 
;

casedefault
        : DEFAULT DOSPUNTOS instrucciones
;

listacasos
        : LLAVEIZQ bloquecase casedefault LLAVEDER
        | LLAVEIZQ bloquecase LLAVEDER
        | LLAVEIZQ casedefault LLAVEDER
;

fn_switch
        : SWITCH PARIZQ expresion PARDER listacasos
;

nativas
        : TOLOWER PARIZQ expresion PARDER  { console.log('Esto es lo de expresion: ',$2) }
        | TOUPPER PARIZQ expresion PARDER
        | ROUND PARIZQ expresion PARDER
        | expresion PUNTO LENGTH PARIZQ PARDER
        | TYPEOF PARIZQ expresion PARDER
        | TOSTRING PARIZQ expresion PARDER
        | expresion PUNTO CSTR PARIZQ PARDER
;

// Tipos
tipos
        : TNUMBER                       {$$ = TipoDato.NUMBER }
        | TDOUBLE                       {$$ = TipoDato.DOUBLE}
        | TSTRING                       {$$= TipoDato.STRING}
        | TBOOL                         {$$ = TipoDato.BOOLEANO}
        | TCHAR                         { $$ = TipoDato.CHAR}
        | TVOID                         { $$ = TipoDato.VOID}
;

// Declaracion
declaracion
        : tipos ID ASIGNACION expresion            {console.log('Estoy asignado el valor de ',$4);
        $$= new Declaracion($1,$2,$4,0,0);}
;

asignacion 
        : ID ASIGNACION expresion               {$$ = new Asignacion($1,$3,@1.first_line,@1.first_column)}
;

incremento
        : ID INCREMENTO         { $$ = new Incremento($1,@1.first_line,@1.first_column) }
;

decremento
        : ID DECREMENTO         {$$ = new Decremento($1,@1.first_line,@1.first_column) }
;

//centencias ciclicas
ciclo_while
        : WHILE PARIZQ expresion PARDER bloque    {$$ = new CWhile($3,$5, @1.first_line, @1.first_column)} 
;

ciclo_dowhile
        : DO bloque WHILE PARIZQ expresion PARDER  {$$ = new CDoWhile($5,$2, @1.first_line, @1.first_column)}
;

inst_break
        : BREAK                                {$$ = new Break(@1.first_line,@1.first_column)}
;

inst_continue
        : CONTINUE                             {$$ = new Continue(@1.first_line,@1.first_column)}
;

fn_funcion
        :  tipos ID PARIZQ PARDER bloque        {$$ = new Funcion($1,$2,[],$5,@1.first_line,@1.first_column)}
        | tipos ID PARIZQ listaparametros PARDER bloque         {$$ = new Funcion($1,$2,$4,$6,@1.first_line,@1.first_column)}
;

parametros
        : tipos ID                    { $$ = ({id: $2, tipo: $1});}
;

listaparametros 
        : listaparametros COMA parametros       { $1.push($3); $$ = $1;}
        | parametros                            { $$ = [$1];}
;

llamada_funcion
        : ID PARIZQ PARDER                      { $$ = new Llamada($1,[],@1.first_line,@1.first_column);}
        | ID PARIZQ lista_expresiones PARDER    { $$ = new Llamada($1,$3,@1.first_line,@1.first_column);}
;

lista_expresiones
        : lista_expresiones COMA expresion      { $1.push($3); $$ = $1;}
        | expresion                             { $$ = [$1];}
;

execute 
        : EXEC llamada_funcion          { $$ = new Execute($2,@1.first_line,@1.first_column)}
;

foriterador
        : asignacion { $$ = $1; }
        | incremento { $$ = $1; }
        | decremento { $$ = $1; }
;


ciclo_for
        : FOR PARIZQ expresionfor PYC expresion PYC foriterador PARDER bloque { $$ = new CFor($3,$5,$7,$9,@1.first_line,@1.first_column) }
;

expresionfor
        : declaracion   { $$ = $1 }
        | asignacion    { $$ = $1; }
;

