import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

process.on('uncaughtException', error => {
  // errorlogger.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // logger.info(`Database is connected successfully`);
    console.log('Database is connected successfully');

    server = app.listen(config.port, () => {
      // logger.info(`Application  listening on port ${config.port}`);
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    // errorlogger.error('Failed to connect database', err);
    console.error('Failed to connect database', err);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        // errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();
process.on('SIGTERM', () => {
  //   logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
