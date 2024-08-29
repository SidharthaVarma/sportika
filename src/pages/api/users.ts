import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const postValidation = Joi.object({
  fname: Joi.string().required().messages({
    'string.base': 'First name must be a string',
    'string.empty': 'First name cannot be empty',
    'any.required': 'First name is required',
  }),
  lname: Joi.string().required().messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name cannot be empty',
    'any.required': 'Last name is required',
  }),
  password: Joi.string().required().min(8).messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required',
  }),
  email: Joi.string().required().email().regex(/^\w+([\.-]?\w+)*@(gitam\.in|gitam\.edu)$/).messages({
    'any.required': 'Email is required',
    'string.pattern.base': 'Email domain must be of GITAM',
  }),
  number: Joi.number().required().messages({
    'number.min': 'Number must be 10 characters long',
    'any.required': 'Number is required',
  }),
  rednumber: Joi.string().required().messages({
    'any.required': 'Registration number is required',
  }),
  branch: Joi.string().required().messages({
    'string.base': 'Branch must be a string',
    'any.required': 'Branch is required',
  }),
});

const getValidation = Joi.object({
  email: Joi.string().required().email().regex(/^\w+([\.-]?\w+)*@(gitam\.in|gitam\.edu)$/).messages({
    'any.required': 'Email is required',
    'string.pattern.base': 'Email domain must be of GITAM',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  }),
});

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { error, value } = postValidation.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const { fname, lname, password, email, number, rednumber, branch } = value;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        res.status(409).json({ message: 'User already exists' }); //instead of message there was error
        return;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const createUser = await prisma.user.create({
        data: {
          fname,
          lname,
          email,
          password: hashedPassword,
          number,
          rednumber,
          branch,
          token: generateToken(email), // Use the generateToken function
        },
      });

      res.status(201).json({
        fname,
        lname,
        email,
        number,
        rednumber,
        branch,
        token: createUser.token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
//   } else if (req.method === 'GET') {
//     try {
//       const { error, value } = getValidation.validate(req.body);
//       if (error) {
//         res.status(400).json({ message: error.details[0].message });
//         return;
//       }

//       const { email, password } = value;

//       // Find user
//       const existingUser = await prisma.user.findUnique({ where: { email } });
//       if (!existingUser) {
//         res.status(401).json({ error: 'User not found' });
//         return;
//       }

//       // Check password
//       const passwordMatch = await bcrypt.compare(password, existingUser.password);
//       if (!passwordMatch) {
//         res.status(401).json({ message: 'Invalid password' });
//         return;
//       }

//       res.status(200).json({
//         fname: existingUser.fname,
//         lname: existingUser.lname, // Fixed typo
//         email: existingUser.email,
//         number: existingUser.number,
//         rednumber: existingUser.rednumber,
//         branch: existingUser.branch,
//         token: existingUser.token,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
} else if (req.method === 'GET') {
  try {
    const { email, password } = req.query;

    // Validate the input
    const { error } = getValidation.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find user
    const existingUser = await prisma.user.findUnique({ where: { email: String(email) } });
    if (!existingUser) {
      return res.status(401).json({ message: 'User not found' }); //before instead of message there was error
    }

    // Check password
    const passwordMatch = await bcrypt.compare(String(password), existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successful login response
    return res.status(200).json({
      fname: existingUser.fname,
      lname: existingUser.lname,
      email: existingUser.email,
      number: existingUser.number,
      rednumber: existingUser.rednumber,
      branch: existingUser.branch,
      token: existingUser.token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} else {
  return res.status(405).json({ message: 'Method not allowed' });
}
}