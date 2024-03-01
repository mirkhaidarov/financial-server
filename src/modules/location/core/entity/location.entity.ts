import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { FinancialRecord } from '@modules/transaction/core/entity'
import type { LocationInterface } from '../interface'

@Entity()
export class Location implements LocationInterface {
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

  @ApiProperty({
    nullable: false,
    description: 'City name, e.g., "Seoul", "Ulaanbaatar"',
  })
  @Column({ type: 'varchar', nullable: false })
  city: string

  @ManyToOne(() => FinancialRecord, ({ locations }) => locations)
  financialRecord: FinancialRecord
}
