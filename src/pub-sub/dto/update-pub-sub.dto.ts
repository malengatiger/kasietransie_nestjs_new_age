import { PartialType } from '@nestjs/swagger';
import { CreatePubSubDto } from './create-pub-sub.dto';

export class UpdatePubSubDto extends PartialType(CreatePubSubDto) {}
