import { Schema, models, model } from "mongoose"
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters'],
    }

}, { timestamps: true })

UserSchema.post('validate', (user) => {
    const pw = user.password
    const salt = bcrypt.genSaltSync(10)
    const hashedPw = bcrypt.hashSync(pw, salt)
    user.password = hashedPw
})

export const User = models?.User || model('User', UserSchema)
