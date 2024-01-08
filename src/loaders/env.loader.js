const dotenv = require('dotenv');

dotenv.config();

module.exports = () => {
  if (!process.env.PORT) {
    console.error('No port specified. Set PORT environment variable.');
    process.exit(1);
  }
};
