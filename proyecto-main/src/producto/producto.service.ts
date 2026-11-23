import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductoService {
  create(createProductoDto: any) {
    return 'This action adds a new producto';
  }

  findAll() {
    return `This action returns all producto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: any) {
    return `This action updates a #${id} producto`;
  }

  delete(id: number) {
    return `This action removes a #${id} producto`;
  }
}