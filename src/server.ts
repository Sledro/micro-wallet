import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import { AddressController } from '@/controllers/address.controller';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([IndexController, AddressController]);
app.listen();
