import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './Products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const generetedId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return { id: generetedId };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
  }
}
