import { Body, Controller, Get, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { model, UpdateResult } from "mongoose";
import { CommuterCashPayment } from "src/data/models/CommuterCashPayment";
import { CommuterCashCheckIn } from "src/data/models/CommuterCashCheckIn";
import { CommuterProviderPayment } from "src/data/models/CommuterProviderPayment";
import { RankFeeCashPayment } from "src/data/models/RankFeeCashPayment";
import { RankFeeProviderPayment } from "src/data/models/RankFeeProviderPayment";
import { RankFeeCashCheckIn } from "src/data/models/RankFeeCashCheckIn";
import { PaymentProvider } from "src/data/models/PaymentProvider";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post("addPaymentProvider")
  async addPaymentProvider(
    @Body() provider: PaymentProvider
  ): Promise<PaymentProvider> {
    return this.paymentService.addPaymentProvider(provider);
  }
  @Post("updatePaymentProvider")
  async updatePaymentProvider(
    @Body() provider: PaymentProvider
  ): Promise<UpdateResult> {
    return this.paymentService.updatePaymentProvider(provider);
  }
  @Get("getPaymentProviders")
  async getPaymentProviders(
  ): Promise<PaymentProvider[]> {
    return this.paymentService.getPaymentProviders();
  }
  
  @Post("addCommuterCashPayment")
  async addCommuterCashPayment(
    @Body() payment: CommuterCashPayment
  ): Promise<CommuterCashPayment> {
    return this.paymentService.addCommuterCashPayment(payment);
  }
  @Post("addCommuterCashCheckIn")
  async addCommuterCashCheckInt(
    @Body() payment: CommuterCashCheckIn
  ): Promise<CommuterCashCheckIn> {
    return this.paymentService.addCommuterCashCheckIn(payment);
  }
  @Post("addCommuterProviderPayment")
  async addCommuterProviderPayment(
    @Body() payment: CommuterProviderPayment
  ): Promise<CommuterProviderPayment> {
    return this.paymentService.addCommuterProviderPayment(payment);
  }
  @Post("addRankFeeCashPayment")
  async addRankFeeCashPayment(
    @Body() payment: RankFeeCashPayment
  ): Promise<RankFeeCashPayment> {
    return this.paymentService.addRankFeeCashPayment(payment);
  }
  @Post("addRankFeeProviderPayment")
  async addRankFeeProviderPayment(
    @Body() payment: RankFeeProviderPayment
  ): Promise<RankFeeProviderPayment> {
    return this.paymentService.addRankFeeProviderPayment(payment);
  }
  @Post("addRankFeeCashCheckIn")
  async addCRankFeeCashCheckIn(
    @Body() payment: RankFeeCashCheckIn
  ): Promise<RankFeeCashCheckIn> {
    return this.paymentService.addRankFeeCashCheckIn(payment);
  }
}
