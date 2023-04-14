import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productsService.getSingleProduct(productId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productid: string,
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('price') price: number,
  ) {
    this.productsService.updateProduct(productid, title, desc, price);
    return null;
  }

  @Delete(':id')
  removeProject(@Param('id') productId: string) {
    this.productsService.deleteProduct(productId);
    return null;
  }
}
