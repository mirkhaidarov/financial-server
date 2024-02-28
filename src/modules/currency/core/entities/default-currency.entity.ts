import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import type { DefaultCurrencyInterface } from '../interface/default-currency.interface'

@Entity()
export class DefaultCurrency implements DefaultCurrencyInterface {
  @ApiProperty({ nullable: false })
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date

  @ApiProperty({
    nullable: false,
    example: 'USD',
    description: 'Currency name, e.g., "usd", "eur"',
  })
  @Column({ type: 'varchar', nullable: false })
  name: string
}
