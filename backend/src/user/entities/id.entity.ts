import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "@nestjs/class-transformer";
import { User } from "../schemas/user.schema";

@Exclude()
export class IdEntity {
    @ApiProperty({
        name: 'id',
        description: 'Unique identifier in the database',
        example: '5763cd4dc378a38ecd387737',
    })
    @Expose()
    @Type(() => String)
    id: string;

    /**
     * Class constructor
     *
     * @param partial data to insert in object instance
     */
    constructor(partial: Partial<User>) {
        this.id = partial._id?.toString();
    }
}