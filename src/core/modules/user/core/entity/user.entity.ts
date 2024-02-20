import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Role } from '@core/enums/role'
import { UserInterface } from '../interface'

@Entity()
export class User implements UserInterface {
  @PrimaryColumn({ type: 'integer' })
  id: number

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updateAt: Date

  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @Column({ type: 'varchar', nullable: true })
  lastName?: string

  @Column({ type: 'varchar', nullable: false })
  userName: string

  @Column({ type: 'varchar', nullable: true, default: Role.User })
  role: string
}
