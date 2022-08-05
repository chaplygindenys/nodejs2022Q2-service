import 'dotenv/config';
import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { existsSync, fstat, statSync } from 'fs';
import { appendFile } from 'fs/promises';
import { sep } from 'path';
import { cwd } from 'process';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { EOL } from 'os';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  constructor(private prisma: PrismaService) {
    super();
  }

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    if (+process.env.LOGGER_LEVEL >= 1) {
      console.log(message);
      if (typeof message === 'string') {
        this.writeLogToFile(`LOG: ${message}`);
      }
    }
  }

  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): void {
    if (+process.env.LOGGER_LEVEL >= 2) {
      console.error(message);
      if (typeof message === 'string') {
        this.writeLogToFile(`ERROR: ${message}`);
      }
    }
  }

  customLog() {
    this.log('Please feed the cat!');
  }

  async writeLogToFile(newLog: string): Promise<void> {
    try {
      const log = `${Date.now()} ${newLog}${EOL}`;
      const pathToLogFolder = `${cwd()}${sep}logges`;
      const loggerDb = await this.prisma.logger.findFirst();
      console.log(loggerDb);

      if (!loggerDb) {
        const newFileName = `${Date.now()}.log`;
        const filePath = `${pathToLogFolder}${sep}${newFileName}`;

        appendFile(filePath, log, 'utf8');

        const loger = await this.prisma.logger.create({
          data: { name: newFileName },
        });
        console.log(loger);
      } else {
        const filePath = `${pathToLogFolder}${sep}${loggerDb.name}`;
        if (existsSync(filePath)) {
          const fileSize = statSync(filePath).size;

          if (
            fileSize >=
            +process.env.LOGGER_FILE_SIZE * +process.env.LOGGER_SIZE_CEFFICIENT
          ) {
            const newFileName = `${Date.now()}.log`;
            const filePath = `${pathToLogFolder}${sep}${newFileName}`;

            appendFile(filePath, log, 'utf8');

            await this.prisma.logger.update({
              where: { id: loggerDb.id },
              data: { name: newFileName },
            });
          } else {
            const filePath = `${pathToLogFolder}${sep}${loggerDb.name}`;

            appendFile(filePath, log, 'utf8');
          }
        } else {
          appendFile(filePath, log, 'utf8');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
