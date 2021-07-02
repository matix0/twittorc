import {Request, Response} from 'express'
import User from '../models/userSchema'
import * as bcrypt from 'bcryptjs'

export default class UserController {
    createUser = async(req: Request, res: Response) => {
        const {name, username, email, password} = req.body
        try {
<<<<<<< HEAD
            const userCreated = await User.create(req.body);
            res.status(200).send({userCreated});
=======
            const userExists = await User.findOne({username})
            const emailExists = await User.findOne({email})
            if(userExists) {
                return res.status(400).json({message: "Username já existe"})
            }
            if(emailExists) {
                return res.status(400).json({message: "email já existe"})
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            await User.create({
                name,
                username,
                email,
                password: hashedPassword
            });
            return res.status(200).json({message: "Usuário criado com sucesso"})
>>>>>>> main
        } catch (error) {
            return res.status(400).json({message: "Falha em criar usuário"})
        }
    }
    getAllUsers = async(req: Request, res: Response) => {
        try {
            const response = await User.find();
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({message: "Falha em listar usuários"})
        }
    }

}

