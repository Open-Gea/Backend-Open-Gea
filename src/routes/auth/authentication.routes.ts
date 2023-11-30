import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Validator from 'jsonschema';

import { userSchema } from '../../schemas/user/user.schema';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { BaseError, isAnError } from '../../utils/error';

import { UserRole } from '../../models/user/user';

import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });


export default function authenticationRouter(service: AuthenticationService): Router {
  return Router()
    .post('/signup', upload.single('profile_picture'), async (req: Request, res: Response, next: NextFunction) => {
      const validation = Validator.validate(req.body, userSchema);
      if (!validation.valid) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          errors: validation.errors.map((error) => error.stack),
        });
      } else {
        const result = await service.signup(req.body, req.file).catch((error: BaseError) => error);

        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.OK).json(result);
      }
    })
    .post('/login', async (req: Request, res: Response, next) => {
      const validation = Validator.validate(
        req.body,
        {
          type: 'object',
          required: ['email', 'password'],
        }
      );
      if (!validation.valid) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          errors: validation.errors.map((error) => error.stack),
        });
      } else {
        const { email, password } = req.body;
        const result = await service.login(email, password, false).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.OK).json(result);
      }
    })
    .post('/loginCooperative', async (req: Request, res: Response, next) => {
      const validation = Validator.validate(
        req.body,
        {
          type: 'object',
          required: ['email', 'password'],
        }
      );
      if (!validation.valid) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          errors: validation.errors.map((error) => error.stack),
        });
      } else {
        const { email, password } = req.body;
        const result = await service.loginCooperative(email, password).catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        console.log("Result: ", result);

        res.status(StatusCodes.OK).json(result);
      }
    })
    .post('/forgot-password', async (req: Request, res: Response, next: NextFunction) => {
      const email = req.body.email;
      const result = await service.forgotPassword(email).catch((error: BaseError) => error);
      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json({
        message: 'Password reset email sent'
      });
    })
    .post('/recover-password', async (req: Request, res: Response, next: NextFunction) => {

      const { token, password } = req.body;

      const validation = Validator.validate(
        req.body,
        {
          type: 'object',
          required: ['password', 'token'],
        }
      );
      if (!validation.valid) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          errors: validation.errors.map((error) => error.stack),
        });
      } else {
        const result = await service.recoverPassword(token, password).catch((error: Error) => error);

        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.OK).json(result);
      }
    })
    .post('/loginAdmin', async (req: Request, res: Response, next) => {
      const validation = Validator.validate(
        req.body,
        {
          type: 'object',
          required: ['email', 'password'],
        }
      );
      if (!validation.valid) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          errors: validation.errors.map((error) => error.stack),
        });
      } else {
        const { email, password } = req.body;

        try {
          const user = await service.login(email, password, true);
          console.log("Result: ", user);
          res.status(StatusCodes.OK).json(user);
        } catch (error) {
          res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(error.toJSON());
        }
      }
    })
    .post('/verify-email',async (req: Request, res: Response, next: NextFunction) => {

      const { token, email ,isCoop} = req.body;
      const validation = Validator.validate(
        req.body,
        {
          type: 'object',
          required: ['token'],
        }
      );
      if (!validation.valid) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          errors: validation.errors.map((error) => error.stack),
        });
      } else {
        const result = await service.verifyEmail(token, email, isCoop ).catch((error: Error) => error);

        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.OK).json(result);
      }
    })
    .post('/resend-verification-email',async (req: Request, res: Response, next: NextFunction) => {

      const { email, isCoop = false } = req.body;

      const result = await service.sendVerificationEmail(email,undefined, isCoop).catch((error: Error) => error);

      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    
    })
    .post('/contact-us',async (req: Request, res: Response, next: NextFunction) => {

      const { email, ...body } = req.body;

      const result = await service.sendContactEmail(email,body).catch((error: Error) => error);

      if (isAnError(result)) {
        next(result);
        return;
      }
      res.status(StatusCodes.OK).json(result);
    
    })

}
