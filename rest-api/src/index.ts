import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './utils/routes';
import { HandleErrors } from './utils/error';

const PORT = process.env.PORT ?? 3000;
const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get('/', (req, res) => res.redirect('/docs'));

app.use(express.static('public'));

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/OpenAPISpec.json',
    },
  })
);

RegisterRoutes(app);
HandleErrors(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
