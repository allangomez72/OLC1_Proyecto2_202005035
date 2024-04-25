export class Exception{
    constructor(
        public titulo:string,
        public descripcion:string,
        public linea:number,
        public columna:number
    ){}
}