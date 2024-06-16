import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import type { UserInterface } from '../interface'

@Entity()
export class User implements UserInterface {
  @ApiProperty({ nullable: false })
  @PrimaryColumn({ type: 'integer' })
  id: number

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date

  @ApiProperty({
    nullable: false,
    description: 'User first name, e.g., "John", "Jane',
  })
  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @ApiProperty({
    nullable: false,
    description: 'User last name, e.g., "Doe", "Smith"',
  })
  @Column({ type: 'varchar', nullable: true })
  lastName?: string

  @ApiProperty({
    nullable: false,
    description: 'User nick name, e.g., "JD", "JS"',
  })
  @Column({ type: 'varchar', nullable: false })
  nickName: string

  @ApiProperty({
    nullable: false,
    description: 'User language code, e.g., "en", "es"',
  })
  @Column({ type: 'varchar', nullable: false })
  language: string

  @ApiProperty({
    nullable: false,
    example: 'USD',
    description: 'Currency name, e.g., "usd", "eur"',
  })
  @Column({ type: 'varchar', nullable: false })
  currency: string
}
