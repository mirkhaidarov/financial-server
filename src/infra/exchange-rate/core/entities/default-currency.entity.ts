import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class DefaultCurrency {
  @PrimaryColumn()
  id: string

  @Column()
  name: string
}
