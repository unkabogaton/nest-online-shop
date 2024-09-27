import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { randomUUID } from 'crypto';
import { Product } from './entities/product.entity';
import { generateMockProducts } from '../mocks/products';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor() {
    this.products = generateMockProducts(30);
  }

  create(createProductDto: CreateProductDto) {
    const newProduct = { ...createProductDto, id: randomUUID() };
    this.products.push(newProduct);

    return {
      message: `${createProductDto?.name} created`,
    };
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedProduct = {
      ...this.products[productIndex],
      ...updateProductDto,
    };

    this.products[productIndex] = updatedProduct;

    return {
      message: `Product with ID ${id} updated`,
      product: updatedProduct,
    };
  }

  remove(id: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    this.products.splice(productIndex, 1);

    return {
      message: `Product with ID ${id} removed`,
    };
  }
}
