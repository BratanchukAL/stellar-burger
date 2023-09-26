export interface ProfileBody {
    email: string,
    name: string
}

export interface ProfileDto {
    success: true,
    user: {
        email: string,
        name: string
    }
}