import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Transaction } from './transaction.entity'
import type { FinancialRecordInterface } from '../interface'

@Entity()
export class FinancialRecord implements FinancialRecordInterface {
  @ApiProperty({ nullable: false })
  @PrimaryColumn({ type: 'uuid' })
  id: number

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: Date

  @ApiProperty({
    nullable: false,
    description: 'Financial record title, e.g., "January", "February"',
  })
  @Column({ type: 'varchar', nullable: false })
  recordTitle: string

  @ApiProperty({
    nullable: false,
    description: 'Financial record amount',
  })
  @Column({ type: 'float', nullable: false })
  amount: number

  @ManyToOne(() => Transaction, ({ financialRecords }) => financialRecords)
  transaction: Transaction
}
