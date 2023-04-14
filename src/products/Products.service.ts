import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(id: string) {
    const [product] = this.findProduct(id);
    return { ...product };
  }

  updateProduct(
    productId,
    title?: string,
    description?: string,
    price?: number,
  ) {
    const [product, index] = this.findProduct(productId);

    this.products[index] = {
      ...product,
      title: title ?? product.title,
      description: description ?? product.description,
      price: price ?? product.price,
    };
  }

  deleteProduct(id: string) {
    const [_, index] = this.findProduct(id);
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];

    if (product) {
      return [product, productIndex];
    }
    throw new NotFoundException('Product does not exists!');
  }
}
