import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import type { CityInterface } from '../interface'
import { Country } from './country.entity'

@Entity()
export class City implements CityInterface {
  @ApiProperty({ nullable: false })
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date

  @ApiProperty({
    nullable: false,
    description: 'City name, e.g., "Seoul", "Ulaanbaatar"',
  })
  @Column({ type: 'varchar', nullable: false })
  name: string

  @ManyToOne(() => Country, ({ cities }) => cities)
  country: Country
}
