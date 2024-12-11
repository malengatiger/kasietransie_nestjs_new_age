import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { CommuterCashPaymentSchema } from "src/data/models/CommuterCashPayment";
import {
  CommuterProviderPayment,
  CommuterProviderPaymentSchema,
} from "src/data/models/CommuterProviderPayment";
import {
  RankFeeCashCheckIn,
  RankFeeCashCheckInSchema,
} from "src/data/models/RankFeeCashCheckIn";
import { RankFeeProviderPaymentSchema } from "src/data/models/RankFeeProviderPayment";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CommuterCashCheckIn,
  CommuterCashCheckInSchema,
} from "src/data/models/CommuterCashCheckIn";
import { RankFeeCashPaymentSchema } from "src/data/models/RankFeeCashPayment";
import { MessagingService } from "../fcm/fcm.service";
import { AssociationTokenSchema } from "src/data/models/AssociationToken";
import { KasieErrorSchema } from "src/data/models/kasie.error";
import { PaymentProviderSchema } from "src/data/models/PaymentProvider";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "CommuterCashPayment", schema: CommuterCashPaymentSchema },
      {
        name: "CommuterProviderPayment",
        schema: CommuterProviderPaymentSchema,
      },
      { name: "CommuterCashCheckIn", schema: CommuterCashCheckInSchema },

      { name: "RankFeeCashPayment", schema: RankFeeCashPaymentSchema },
      { name: "RankFeeProviderPayment", schema: RankFeeProviderPaymentSchema },
      { name: "RankFeeCashCheckIn", schema: RankFeeCashCheckInSchema },

      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "KasieError", schema: KasieErrorSchema },

      { name: "PaymentProvider", schema: PaymentProviderSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, KasieErrorHandler, MessagingService],
})
export class PaymentModule {}
