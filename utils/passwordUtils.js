import bcrypt from 'bcryptjs'

export const comparePassword = async(candidatePassword, password) => {
    const isPasswordCorrect = await bcrypt.compare(candidatePassword, password);
    return isPasswordCorrect;
}

export const hashPassword = async(password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword
}