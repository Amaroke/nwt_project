import { ApiProperty } from "@nestjs/swagger";
import {Exclude,Expose,Type} from "@nestjs/class-transformer";
import { User } from "../schemas/user.schema";
@Exclude()
export class UserEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '5763cd4dc378a38ecd387737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'firstname',
    description: 'Firstname',
    example: 'Louis',
  })
  @Expose()
  @Type(() => String)
  firstname: string;

  @ApiProperty({
    name: 'lastname',
    description: 'Lastname',
    example: 'Jacques',
  })
  @Expose()
  @Type(() => String)
  lastname: string;

  @ApiProperty({
    name: 'email',
    description: 'Email',
    example: 'Mclaughlin.Cochran@undefined.com',
  })
  @Expose()
  @Type(() => String)
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'Password',
    example: 'louJac',
  })
  @Expose()
  @Type(() => String)
  password: string;

  @ApiProperty({
    name: 'phone',
    description: 'Phone',
    example: '+33600000000',
    pattern: '/^(+d{11})$/',
  })
  @Expose()
  @Type(() => String)
  phone: string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}