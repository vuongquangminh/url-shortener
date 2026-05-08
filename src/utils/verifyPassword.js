import bcrypt from 'bcrypt';

export const verifyPassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
        console.log('Login successful!');
        return isMatch;
    } else {
        throw new Error('Invalid password');
    }
}