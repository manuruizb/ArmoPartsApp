import { Areas } from "./areas.model";

export interface Employees{
    id_empleado?: string,
    primer_nombre: string,
    segundo_nombre: string | null,
    primer_apellido: string,
    segundo_apellido: string | null,
    tipo_documento: string,
    num_documento: string,
    fecha_nacimiento: Date,
    direccion: string,
    correo_electronico: string,
    celular: string,
    genero: string,
    cargo: string,
    id_area: string,
    usuario?: string,
    contrasena?: string,
    Area?: Areas
}