import { Controller } from '@nestjs/common';
import { AssociationService } from './association.service';

@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}
}
