import { Response } from "express";
import { AuthRequest } from "../../types/request";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {
    async register(req: AuthRequest, res: Response) {
        const token = await service.register(req.body)
        return res.json({ token })
    }

    async login(req: AuthRequest, res: Response) {
        const token = await service.login(req.body)
        return res.json({ token })
    }

    async me(req: AuthRequest, res: Response) {
        const user = await service.me(req.user!.id)
        return res.json(user)
    }

    async getAllUsers(req: AuthRequest, res: Response) {
        try {
            const users = await service.getAllUsers();
            return res.json(users);
        } catch (error: any) {
            console.error("DEBUG Error in getAllUsers:", error);
            return res.status(500).json({
                success: false,
                error: error.message,
                stack: error.stack // valid for dev debugging
            });
        }
    }

    async changeUserRole(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const { userType } = req.body;

        if (!id || !userType) {
            return res.status(400).json({ msg: "User ID and User Type are required" });
        }

        const updatedUser = await service.changeUserRole(id as string, userType);
        return res.json(updatedUser);
    }
}