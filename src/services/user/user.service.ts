import { User } from '../../models/user/user';
import { UserRepository } from '../../repositories/user/user.repository';
import { YvYError } from '../../utils/error';

export class UserService {
  constructor(
    private repository: UserRepository
  ) {}

  async read(id: string): Promise<User | undefined> {
    const result = await this.repository.read(id);
    delete result?.password;
    return result;
  }

  async update(id: string, item: User, profilePictureFile: Express.Multer.File | undefined): Promise<boolean> {
    if (await this.repository.read(id)) {

      if (profilePictureFile) {
        // Store the binary data of the image as a Buffer
        item.profile_picture = profilePictureFile.buffer;
      }
      return this.repository.update(id, item);
    }
    throw new YvYError('User not found', 404,'User not found');
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async search(query?: string): Promise<User[]> {
    return (await this.repository.search(query)).map((user) => {
      delete user.password;
      return user;
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.repository.findByEmail(email);
    delete result?.password;
    return result;
  }

  // async findById(id: string): Promise<User | undefined> {
  //   return this.repository.findById(id);
  // }

  // async findByIdNoRelations(id: string): Promise<User | undefined> {
  //   return this.repository.findByIdNoRelations(id);
  // }

  async disable(id: string): Promise<boolean> {
    const user = await this.repository.read(id);
    if (!user) {
      throw new YvYError('User not found', 404,'User not found');
    }
    return this.repository.disable(id);
  }

  async acceptTermsConditions(id: string): Promise<boolean> {
    const foundUser = await this.read(id);
    if (!foundUser) {
      throw new YvYError('User not found', 404,'User not found');
    }
    const updatedUser = { ...foundUser, acceptedTermsConditions: true };

    return this.repository.update(id, updatedUser);
  }
  
  async updateAcceptedTermsConditionsForActiveUsers(): Promise<boolean> {
    return this.repository.updateAcceptedTermsConditionsForActiveUsers();
  }
  

}
