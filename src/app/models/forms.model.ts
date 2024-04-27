import { Employees } from "./employees.model";

export interface Forms {
    id_formulario?: string,
    id_empleado: string,
    id_pedido: string,
    entrada: string,
    salida: string,
    Empleado: Employees
}