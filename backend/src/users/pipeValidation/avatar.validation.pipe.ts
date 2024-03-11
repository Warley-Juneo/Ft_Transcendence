
// import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

// @Injectable()
// export class AvatarSizeValidationPipe implements PipeTransform {
  
//   protected readonly validationOptions: Record<string, any>;

//   constructor(validationOptions?: Record<string, any>) {
//     this.validationOptions = validationOptions;
//   }

//   isValid(file?: any): boolean | Promise<boolean> {
//     return true;
//   }
  
//   buildErrorMessage(file: any): string {
//     return "ok";
//   }  
  
//   transform(value: any, metadata: ArgumentMetadata) {
//     // "value" is an object containing the file's attributes and metadata
//     const oneKb = 1000;
//     return value.size < oneKb;
//   }
  
  
// }
