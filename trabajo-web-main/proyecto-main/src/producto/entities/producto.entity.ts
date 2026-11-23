import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../modules/categoria/entities/categoria.entity";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    nombre: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'text', nullable: true })
    imagen: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'boolean', default: true })
    estado: boolean;

    @Column({ name: 'categoria_id', nullable: true })
    categoriaId: number;

    @ManyToOne(() => Categoria, { eager: true })
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;
}