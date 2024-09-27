import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { Product } from '../products/entities/product.entity';

export const generateMockProducts = (count: number): Product[] => {
  return Array.from({ length: count }, () => ({
    id: randomUUID(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 0, max: 100 }),
  }));
};
