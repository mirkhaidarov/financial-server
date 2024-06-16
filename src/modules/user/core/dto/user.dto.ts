import { ApiProperty } from '@nestjs/swagger'

export class AddUserDto {
  @ApiProperty({
    nullable: false,
    description: 'User uniq identifier',
  })
  id: number

  @ApiProperty({
    nullable: false,
    description: 'User first name, e.g., "John", "Jane',
  })
  firstName: string

  @ApiProperty({
    nullable: false,
    description: 'User last name, e.g., "Doe", "Smith"',
  })
  lastName?: string

  @ApiProperty({
    nullable: false,
    description: 'User nick name, e.g., "JD", "JS"',
  })
  nickName: string

  @ApiProperty({
    nullable: false,
    description: 'User language code, e.g., "en", "es"',
  })
  language: string
}
