export interface UserInterface {
  readonly id: number
  readonly createdAt: Date
  readonly firstName: string
  readonly userName: string
  readonly role: string
  readonly lastName?: string
}
