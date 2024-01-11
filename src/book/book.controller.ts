import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) { }

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.bookService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createBook(
        @Body()
        book: CreateBookDto,
        @Req() req
    ): Promise<Book> {
        return this.bookService.create(book, req.user);
    }

    @Get(':id')
    async findById(
        @Param('id')
        id: string
    ): Promise<Book> {
        return this.bookService.findById(id);
    }

    @Put(':id')
    async updateById(
        @Param('id')
        id: string,
        @Body()
        book: UpdateBookDto
    ): Promise<Book> {
        return this.bookService.updatedById(id, book)
    }

    @Delete(':id')
    async deleteById(
        @Param('id')
        id: string
    ): Promise<Book> {
        return this.bookService.deleteById(id);
    }
}
