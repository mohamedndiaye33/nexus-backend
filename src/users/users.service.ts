import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 1. Inscription d'un utilisateur / admin (POST /users)
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;

    // Vérifier si l'email existe déjà dans la base MySQL
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    // Hacher le mot de passe avant de l'enregistrer sur WampServer
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role: role || 'client', // 'client' par défaut si aucun rôle n'est fourni
    });

    const savedUser = await this.userRepository.save(user);
    delete savedUser.password; // Masquer le mot de passe dans la réponse HTTP par sécurité
    return savedUser;
  }

  // 2. Trouver un utilisateur par son Email (Indispensable pour la future connexion)
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // 3. Récupérer tous les utilisateurs (GET /users)
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: {
        id: true,
        email: true,
        role: true,
      }, // Sécurité : exclut le mot de passe haché des résultats affichés
    });
  }

  // 4. Récupérer un utilisateur par son ID (GET /users/:id)
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id }, 
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`L'utilisateur avec l'ID #${id} n'existe pas.`);
    }
    return user;
  }

  // 5. Modifier un profil utilisateur (PATCH /users/:id)
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // Si l'utilisateur change son mot de passe, on le re-hache
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  // 6. Supprimer un compte utilisateur (DELETE /users/:id)
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}