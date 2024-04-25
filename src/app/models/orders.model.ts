import { Autopart } from "./autopart.model";
import { Employees } from "./employees.model";
import { Forms } from "./forms.model";

export interface Orders{
    id_pedido?: string,
    id_empleado: string,
    fecha_pedido?: Date,
    num_pedido?: number,
    id_autoparte: string,
    cantidad: number | null,
    estado?: boolean,
    Autoparte? :Autopart,
    Empleado?: Employees,
    formularios?: Forms[]
}
