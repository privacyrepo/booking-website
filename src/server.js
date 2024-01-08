require('./loaders/env.loader')();
const express = require('express');
const connectDB = require('./loaders/mongoose.loader');

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pricingRoutes = require('./routes/pricing.routes');
app.use('/api/pricing', pricingRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/user', userRoutes);

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
