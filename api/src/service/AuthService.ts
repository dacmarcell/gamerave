import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_in_production";

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async register(email: string, passwordRaw: string) {
        if (!email || !passwordRaw) {
            throw new Error("Email and password are required");
        }

        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error("Email already in use");
        }

        const passwordHash = await bcrypt.hash(passwordRaw, 10);

        const newUser = this.userRepository.create({
            email,
            passwordHash
        });

        await this.userRepository.save(newUser);

        return { message: "User created successfully" };
    }

    async login(email: string, passwordRaw: string) {
        if (!email || !passwordRaw) {
            throw new Error("Email and password are required");
        }

        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const passwordMatches = await bcrypt.compare(passwordRaw, user.passwordHash);
        if (!passwordMatches) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "1d"
        });

        return {
            token,
            user: {
                id: user.id,
                email: user.email
            }
        };
    }
}
