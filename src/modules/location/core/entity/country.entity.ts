import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { FinancialRecord } from '@modules/transaction/core/entity'
import type { CountryInterface } from '../interface'
import { City } from './city.entity'

@Entity()
export class Country implements CountryInterface {
  @ApiProperty({ nullable: false })
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date

  @ApiProperty({
    nullable: false,
    description: 'Country name, e.g., "Korea", "Mongolia"',
  })
  @Column({ type: 'varchar', nullable: false })
  name: string

  @OneToMany(() => City, ({ country }) => country)
  cities?: City[]

  @ManyToOne(() => FinancialRecord, ({ countries }) => countries)
  financialRecord: FinancialRecord
}
