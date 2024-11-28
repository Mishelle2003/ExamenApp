export interface Carros {
    carros: Carro[];
}

export interface Carro {
    _id?:    string;
    marca:  string;
    modelo: string;
    fecha:  number;
    precio: number;
    color:  string;
    km:     number;
}
