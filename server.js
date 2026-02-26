const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const connectToMongoDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

connectToMongoDB();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const customerRoutes = require('./routes/customers');
app.use('/api/customers', customerRoutes);

const vendorRoutes = require('./routes/vendor');
app.use('/api/vendors', vendorRoutes);

const typeRoutes = require('./routes/core/type');
app.use('/api/types', typeRoutes);

const equipmentRoutes = require('./routes/equipment');
app.use('/api/equipments', equipmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`),
    console.log(`Swagger docs → http://localhost:${PORT}/api/docs`);
});



