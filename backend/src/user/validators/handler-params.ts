import { IsMongoId, IsNotEmpty } from '@nestjs/class-validator';

export class HandlerParams {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

}
