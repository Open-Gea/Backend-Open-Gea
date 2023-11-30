import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { TokenPayload } from '../../models/auth/authentication';
import { User, UserRole, UserStatus } from '../../models/user/user';
import { UserRepository } from '../../repositories/user/user.repository';
import { ServerError, YvYError } from '../../utils/error';
import { forgotPasswordEmail } from '../../utils/email/email';
import { CooperativeRepository } from '../../repositories/userCooperative/cooperative.repository';
import { Cooperatives } from '../../models/userCooperative/cooperatives';
import { emailVerification } from '../../utils/email/emailVerification';
import { contactEmail } from '../../utils/email/contactEmail';


export class AuthenticationService {
  constructor(
    private repository: UserRepository,
    private cooperativeRepository: CooperativeRepository
  ) { }

  async signup(user: User, profilePictureFile: Express.Multer.File | undefined): Promise<boolean | undefined> {
    if (await this.repository.findByEmail(user.email)) {
      throw new YvYError(
        'Email already in use',
        StatusCodes.BAD_REQUEST,
        'Email already in use'
      );
    }
    user.password = bcrypt.hashSync(user.password!, 10);
    user.role = UserRole.USER;
    user.status = UserStatus.INACTIVE; //must verify email
    user.email = user.email.toLowerCase();

    if (profilePictureFile) {
      user.profile_picture = profilePictureFile.buffer;

    }

    const userCreated = await this.repository.create(user);
    if (userCreated) {
      delete userCreated.password;
      return await this.sendVerificationEmail(userCreated.email, userCreated.id);
    }
    throw new YvYError(
      'Can not register the user',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Can not register the user'
    );
  }

  async login(email: string, password: string, checkAdmin: boolean): Promise<User | undefined> {
    const user = await this.repository.findByEmail(email);

    if(!user) throw new YvYError('User not found', StatusCodes.NOT_FOUND, 'User not found');
    else{
      if(user.status !== UserStatus.ACTIVE) throw new YvYError('User not active', StatusCodes.UNAUTHORIZED, 'Verify your email first');
      if (user && bcrypt.compareSync(password, user.password!)) {
  
        if (checkAdmin && user.role != UserRole.ADMIN) {
  
          throw new YvYError('User unauthorized', StatusCodes.UNAUTHORIZED, "User unauthorized");
  
        }
        delete user.role;
        delete user.password;
        const token = this.generateToken(user);
        Object.assign(user, { token: token });
        return user;
      }
      throw new YvYError('Invalid email or password', StatusCodes.UNAUTHORIZED,"Invalid email or password");
    }
  }

  async loginCooperative(email: string, password: string): Promise<Cooperatives | undefined> {
    const cooperative = await this.cooperativeRepository.findByEmail(email);
    if(!cooperative) throw new YvYError('Organization not found', StatusCodes.NOT_FOUND, 'Organization not found');
    else{
      
      if(cooperative.status !== UserStatus.ACTIVE) throw new YvYError('User not active', StatusCodes.UNAUTHORIZED, 'Verify your email first');
      if (cooperative && bcrypt.compareSync(password, cooperative.password!)) {
        delete cooperative.password;
        const token = this.generateTokenForCooperative(cooperative);
        console.log("TOKEN: ", token);
  
        Object.assign(cooperative, { token: token });
        return cooperative;
      }
      throw new YvYError('Invalid email or password', StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private generateToken(u: User): string {
    if (!process.env.JWT_SECRET) {
      throw new ServerError('Cannot generate token');
    }
    return jwt.sign(
      { userId: u.id, role: u.role } as TokenPayload,
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
  }

  private generateTokenForCooperative(c: Cooperatives): string {
    if (!process.env.JWT_SECRET) {
      throw new ServerError('Cannot generate token');
    }
    return jwt.sign(
      { cooperativeId: c.id } as TokenPayload,
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.repository.findByEmail(email);
    const resetTokenExpires = new Date();
    resetTokenExpires.setHours(resetTokenExpires.getHours() + 3);

    if (!user) {
      throw new YvYError('User not found', StatusCodes.NOT_FOUND, 'User not found');
    }

    const response = await forgotPasswordEmail(user);
    if (typeof response !== 'string') {
      throw new ServerError(response.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }

    return await this.repository.update(user.id, {

      resetToken: response,

      resetTokenExpires: resetTokenExpires

    } as User);
  }

  async recoverPassword(token: string, password: string): Promise<boolean> {

    const user = await this.repository.findByResetToken(token);
    const currentTime = new Date();


    if (!user || (user.resetTokenExpires && user.resetTokenExpires.getTime() < currentTime.getTime())) {

      throw new YvYError('User not found or token expired', StatusCodes.NOT_FOUND, 'User not found or token expired');

    }

    return await this.repository.update(user.id, {
      password: bcrypt.hashSync(password!, 10),
      resetToken: null,
      resetTokenExpires: null

    } as unknown as User);

  }

  async verifyEmail(token: string, email:string, isCoop: boolean): Promise<boolean> {

    const currentTime = new Date();
    console.log(Boolean(isCoop));
    
    if(!Boolean(isCoop)){
      const user = await this.repository.findByEmail(email);
      console.log(user);
      if (!user) throw new YvYError('User not found', StatusCodes.NOT_FOUND, 'User not found');

      if(user){
        if(user.status === UserStatus.ACTIVE) return true;
        if(user.resetToken !== token || (user.resetTokenExpires && user.resetTokenExpires.getTime() < currentTime.getTime()))
        throw new YvYError('Token invalid or expired', StatusCodes.UNAUTHORIZED, 'Token invalid or expired');
        
        return await this.repository.update(user.id, {
          resetToken: null,
          resetTokenExpires: null,
          status: UserStatus.ACTIVE
        } as unknown as User);
      }
      return false;

    }else{
      const coop = await this.cooperativeRepository.findByEmail(email);
      if (!coop) throw new YvYError('User not found', StatusCodes.NOT_FOUND, 'User not found');
      if(coop){
        if(coop.status === UserStatus.ACTIVE) return true;
        if(coop.resetToken !== token || (coop?.resetTokenExpires && coop?.resetTokenExpires.getTime() < currentTime.getTime()))
        throw new YvYError('Token invalid or expired', StatusCodes.UNAUTHORIZED, 'Token invalid or expired');

        return await this.cooperativeRepository.update(coop?.id, {
          resetToken: null,
          resetTokenExpires: null,
          status: UserStatus.ACTIVE
        } as unknown as User);
      }
      return false
    }
    
      
  }

  async sendVerificationEmail(email: string, userId? : string, isCoop?: boolean): Promise<any> {

    const resetTokenExpires = new Date();
    resetTokenExpires.setHours(resetTokenExpires.getHours() + 24);
      
    const resetToken = await emailVerification(email, isCoop);
    console.log('resetToken', resetToken);
    if (typeof resetToken !== 'string') { 
      throw new YvYError(
        'Cant send email verification. Check the email adress',
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Cant send email verification. Check the email adress'
      );
    }

    let user : User | Cooperatives | undefined;
    if(!userId && !isCoop) user = await this.repository.findByEmail(email);
    else if(!userId && isCoop) user = await this.cooperativeRepository.findByEmail(email);

    const id = userId || user?.id;
    if(id){
      if(!isCoop) return await this.repository.update(id, { resetToken, resetTokenExpires} as User);
      return await this.cooperativeRepository.update(id, { resetToken, resetTokenExpires} as Cooperatives);
    }
    throw new YvYError(
      'User not found with that email',
      StatusCodes.NOT_FOUND,
      'User not found with that email'
    );
  }

  async sendContactEmail(email: string, body: {name: string, message: string, country: string}){
    return await contactEmail(email,body)
  }
}
