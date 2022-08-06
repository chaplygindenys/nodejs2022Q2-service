import 'dotenv/config';
import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { existsSync, statSync } from 'fs';
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
  log(message: unknown, context?: unknown): void {
    if (+process.env.LOGGER_LEVEL >= 1) {
      if (!context) {
        super.log(message);
        if (typeof message === 'string') {
          this.writeLogToFile(`LOG: ${message}`);
        }
      } else {
        super.log(message, context);
        if (typeof message === 'string') {
          this.writeLogToFile(`LOG: ${message} ${context}`);
        }
      }
    }
  }

  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(message: unknown, context?: unknown): void {
    if (+process.env.LOGGER_LEVEL >= 2) {
      if (!context) {
        super.error(message);
        if (typeof message === 'string') {
          this.writeLogToFile(`ERROR: ${message}`);
        }
      } else {
        super.error(message, context);
        if (typeof message === 'string') {
          this.writeLogToFile(`ERROR: ${message} ${context}`);
        }
      }
    }
  }

  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: any[]): void;
  warn(message: unknown, context?: unknown): void {
    if (+process.env.LOGGER_LEVEL >= 3) {
      if (!context) {
        super.warn(message);
        if (typeof message === 'string') {
          this.writeLogToFile(`WARN: ${message}`);
        }
      } else {
        super.warn(message, context);
        if (typeof message === 'string') {
          this.writeLogToFile(`WARN: ${message} ${context}`);
        }
      }
    }
  }

  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: any[]): void;
  debug(message: unknown, context?: unknown): void {
    if (+process.env.LOGGER_LEVEL >= 4) {
      if (!context) {
        super.debug(message);
        if (typeof message === 'string') {
          this.writeLogToFile(`DEBAG: ${message}`);
        }
      } else {
        super.debug(message, context);
        if (typeof message === 'string') {
          this.writeLogToFile(`DEBAG: ${message} ${context}`);
        }
      }
    }
  }

  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: any[]): void;
  verbose(message: unknown, context?: unknown): void {
    if (+process.env.LOGGER_LEVEL >= 5) {
      if (!context) {
        super.verbose(message);
        if (typeof message === 'string') {
          this.writeLogToFile(`VERBOSE: ${message}`);
        }
      } else {
        super.verbose(message, context);
        if (typeof message === 'string') {
          this.writeLogToFile(`VERBOSE: ${message} ${context}`);
        }
      }
    }
  }

  async writeLogToFile(newLog: string): Promise<void> {
    try {
      const log = `${Date.now()} ${newLog}${EOL}`;
      const pathToLogFolder = `${cwd()}${sep}logges`;
      const loggerDb = await this.prisma.logger.findFirst();

      if (!loggerDb) {
        const newFileName = `${Date.now()}.log`;
        const filePath = `${pathToLogFolder}${sep}${newFileName}`;

        appendFile(filePath, log, 'utf8');

        await this.prisma.logger.create({
          data: { name: newFileName },
        });
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
      this.error(error.message);
    }
  }
}
