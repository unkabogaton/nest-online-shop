import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: any) {
    try {
      // Validate the data using the provided Zod schema
      return this.schema.parse(value);
    } catch (e) {
      if (e instanceof ZodError) {
        // Throw a BadRequestException with validation errors
        throw new BadRequestException({
          message: 'Validation failed',
          errors: e.errors,
        });
      }
      throw e;
    }
  }
}
