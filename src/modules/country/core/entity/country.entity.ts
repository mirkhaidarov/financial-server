import { Entity, Column, PrimaryColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import type { CountryInterface } from '../interface'

@Entity()
export class Country implements CountryInterface {
  @ApiProperty({ nullable: false })
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @ApiProperty({
    nullable: true,
    description: 'Country name, e.g., "Korea", "Mongolia"',
  })
  @Column({ type: 'varchar', nullable: true })
  name?: string

  @ApiProperty({
    nullable: true,
    description: 'Country city, e.g., "Seoul", "Ulaanbaatar"',
  })
  @Column({ type: 'varchar', nullable: true })
  city?: string
}
