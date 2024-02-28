import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { TransactionType } from '@core/enums/transaction-type'
import { FinancialRecord } from './financial-record.entity'
import type { TransactionInterface } from '../interface'

@Entity()
export class Transaction implements TransactionInterface {
  @ApiProperty({ nullable: false })
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @ApiProperty({
    nullable: false,
    description: 'Transaction name, e.g., "health", "education"',
  })
  @Column({ type: 'varchar', nullable: false })
  name: string

  @ApiProperty({
    nullable: false,
    description: `Transaction type, e.g., "${TransactionType.EXPENSE}" or "${TransactionType.INCOME}"`,
  })
  @Column({ type: 'varchar', nullable: false })
  type: TransactionType

  @ApiProperty({
    nullable: false,
    type: () => FinancialRecord,
    isArray: true,
    description: "Transaction' records",
  })
  @OneToMany(() => FinancialRecord, ({ transaction }) => transaction)
  financialRecords: FinancialRecord[]
}
