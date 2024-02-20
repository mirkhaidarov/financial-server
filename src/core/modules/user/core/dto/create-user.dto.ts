export class CreateUserDto {
  id: number
  createdAt: Date
  firstName: string
  userName: string
  role: string
  lastName?: string
}
