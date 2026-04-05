export interface User {
  userId: number,
  username: string,
  email: string,
  password: string,
  profile: UserProfile
}

export interface UserProfile {
    profession: string,
    city: string,
    country: string
}