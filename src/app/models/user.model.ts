import { Employees } from "./employees.model";

export interface Users{
    usuario: string,
    contrasena: string,
    reintentos: number,
    estado: boolean,
    Empleado: Employees
}