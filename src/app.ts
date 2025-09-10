import express from 'express';
import swaggerUi from 'swagger-ui-express';
import userRouter from './routes/user.route';
import otpRouter from './routes/otp.route';
import authRouter from './routes/auth.route';
import bookRouter from './routes/book.route';
import categoryRouter from './routes/category.route';
import borrowRouter from './routes/borrow.route';
import { swaggerPaths, userSchemas, categorySchemas, userSwagger, borrowRecordSchemas } from './swagger/swagger';

const app = express();
app.use(express.json());

// Swagger setup
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Library API',
        version: '1.0.0',
        description: 'API for managing library',
    },
    tags: [
        { name: 'User', description: 'Quản lý người dùng' },
        { name: 'Books', description: 'Quản lý sách' },
        { name: 'Categories', description: 'Quản lý danh mục' },
        { name: 'Borrows', description: 'Quản lý mượn trả sách' }
    ],
    paths: { ...swaggerPaths, ...userSwagger },
    components: {
        schemas: { ...userSchemas, ...categorySchemas, ...borrowRecordSchemas },
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [{ BearerAuth: [] }]
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Member routes
app.use('/users', userRouter);
app.use(otpRouter);
app.use(authRouter);
app.use('/books', bookRouter);
app.use('/categories', categoryRouter);
app.use('/borrows', borrowRouter);

// Root
app.get('/', (req, res) => {
    res.send('Library API is running');
});

export default app; 