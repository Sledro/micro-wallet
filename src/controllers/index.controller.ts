import { Controller, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class IndexController {
  @OpenAPI({ 
    summary: 'Returns "OK" httpStatus 200 if server is online.', 
    description: 'Health endpoint - Returns "OK" httpStatus 200 if server is online.', 
  })
  @Get('/')
  index() {
    return 'OK';
  }
}