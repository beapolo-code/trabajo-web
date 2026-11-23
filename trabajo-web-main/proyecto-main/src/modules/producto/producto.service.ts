import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {

  constructor(@InjectRepository(Producto) private productoRepository: Repository<Producto>) {}

  queryBuilder(alias: string) {
    return this.productoRepository.createQueryBuilder(alias);
  }

  async create(createProductoDto: CreateProductoDto) {
    const nuevoProducto = this.productoRepository.create({
      ...createProductoDto,
      categoria: createProductoDto.categoriaId
        ? ({ id: createProductoDto.categoriaId } as any)
        : undefined,
    });
    return await this.productoRepository.save(nuevoProducto);
  }

  findAll() {
    return this.productoRepository.find();
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id }
    });
    if (!producto) {
      throw new NotFoundException(`Producto #${id} no encontrado`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    this.productoRepository.merge(producto, updateProductoDto);

    if (updateProductoDto.categoriaId) {
      producto.categoria = { id: updateProductoDto.categoriaId } as any;
    }

    return await this.productoRepository.save(producto);
  }

  remove(id: number) {
    return this.productoRepository.delete(id);
  }
}