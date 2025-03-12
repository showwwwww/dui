import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import bcrypt from 'bcryptjs';
import { USERNAME, PASSWORD } from '../const-global/index.mjs';

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const setUserInfo = async () => {
  const questions = [
    {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
      validate: (input) => {
        if (!input) {
          return 'Username cannot be empty';
        }
        return true;
      },
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:',
      validate: (input) => {
        if (!input) {
          return 'Password cannot be empty';
        }
        return true;
      },
    },
  ];

  return inquirer.prompt(questions);
};

const validateUserInfo = () => {
  const userFilePath = path.resolve(process.cwd(), '.env.local');
  let hasValidUserInfo = false;
  if (fs.existsSync(userFilePath)) {
    const readlines = fs.readFileSync(userFilePath, 'utf8').split('\n');
    let hasUsername = false;
    let hasPassword = false;
    for (const line of readlines) {
      const [key, value] = line.split('=');
      if (key === USERNAME && value) {
        hasUsername = true;
      } else if (key === PASSWORD && value) {
        hasPassword = true;
      }
    }
    hasValidUserInfo = hasUsername && hasPassword;
  }
  return hasValidUserInfo;
};

const formatEnvValue = (value) => {
  const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\$/g, '\\$');

  return `'${escaped}'`;
};

const main = async () => {
  const hasValidUserInfo = validateUserInfo();
  if (!hasValidUserInfo) {
    console.log(
      'There is no valid user information. Please set your user information. This operation will reset your .env.local file.'
    );
    const { username, password } = await setUserInfo();
    const hashedPassword = hashPassword(password);
    const userFilePath = path.resolve(process.cwd(), '.env.local');
    fs.writeFileSync(userFilePath, `${USERNAME}=${username}\n`);
    fs.appendFileSync(userFilePath, `${PASSWORD}=${formatEnvValue(hashedPassword)}\n`);
    console.log('🎉 User information has been set successfully!');
  }
};

main();
