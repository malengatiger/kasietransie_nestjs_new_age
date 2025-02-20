import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Errback } from "express";
import mongoose, { UpdateResult } from "mongoose";
import { CommuterCashCheckIn } from "src/data/models/CommuterCashCheckIn";
import { CommuterCashPayment } from "src/data/models/CommuterCashPayment";
import { CommuterProviderPayment } from "src/data/models/CommuterProviderPayment";
import { PaymentProvider } from "src/data/models/PaymentProvider";
import { RankFeeCashCheckIn } from "src/data/models/RankFeeCashCheckIn";
import { RankFeeCashPayment } from "src/data/models/RankFeeCashPayment";
import { RankFeeProviderPayment } from "src/data/models/RankFeeProviderPayment";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { MessagingService } from "../fcm/fcm.service";
const mm = "🔷🔷🔷🔷 PaymentService 🔷 ";

@Injectable()
export class PaymentService {
  constructor(
    private readonly errorHandler: KasieErrorHandler,
    private readonly messagingService: MessagingService,


    @InjectModel(CommuterCashPayment.name)
    private commuterCashPaymentModel: mongoose.Model<CommuterCashPayment>,
    @InjectModel(CommuterProviderPayment.name)
    private commuterProviderPaymentModel: mongoose.Model<CommuterProviderPayment>,
    @InjectModel(CommuterCashCheckIn.name)
    private commuterCashCheckInModel: mongoose.Model<CommuterCashCheckIn>,

    @InjectModel(RankFeeCashPayment.name)
    private rankFeeCashPayment: mongoose.Model<RankFeeCashPayment>,
    @InjectModel(RankFeeProviderPayment.name)
    private rankFeeProviderPayment: mongoose.Model<RankFeeProviderPayment>,
    @InjectModel(RankFeeCashCheckIn.name)
    private rankFeeCashCheckIn: mongoose.Model<RankFeeCashCheckIn>,
    
    @InjectModel(PaymentProvider.name)
    private paymentProvider: mongoose.Model<PaymentProvider>
  ) {}

  public async addPaymentProvider(
    payment: PaymentProvider
  ): Promise<PaymentProvider> {
    try {
      
      const res = await this.paymentProvider.create(payment);
      Logger.debug(`${mm} paymentProvider added to Atlas`);
      return res;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        'ADMIN',
        'ADMIN'
      );
      throw new HttpException(
        `addPaymentProvider failed: ${JSON.stringify(e)}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async updatePaymentProvider(
    payment: PaymentProvider
  ): Promise<UpdateResult> {
    try {
      const res = await this.paymentProvider.updateOne({paymentProviderId: payment.paymentProviderId}, payment);
      Logger.debug(`${mm} paymentProvider updated on Atlas`);
      return res;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        'ADMIN',
        'ADMIN'
      );
      throw new HttpException(
        `updatePaymentProvider failed: ${JSON.stringify(e)}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
 
  public async getPaymentProviders(
  ): Promise<PaymentProvider[]> {
    try {
      const res = await this.paymentProvider.find({});
      return res;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        'ADMIN',
        'ADMIN'
      );
      throw new HttpException(
        `getPaymentProviders failed: ${JSON.stringify(e)}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async addCommuterCashPayment(
    payment: CommuterCashPayment
  ): Promise<CommuterCashPayment> {
    try {
      const mDate= new Date(payment.created);
      payment.mDate = mDate;
      const res = await this.commuterCashPaymentModel.create(payment);
      Logger.debug(`${mm} CommuterCashPayment to Atlas`);
      this.messagingService.sendCommuterCashMessage(payment);
      return res;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        payment.associationId,
        payment.associationName
      );
      throw new HttpException(
        `addCommuterCashPayment failed: ${JSON.stringify(e)}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async addCommuterProviderPayment(
    payment: CommuterProviderPayment
  ): Promise<CommuterProviderPayment> {
    try {
      const mDate= new Date(payment.created);
      payment.mDate = mDate;
      const res = await this.commuterProviderPaymentModel.create(payment);
      Logger.debug(`${mm} CommuterProviderPayment added to Atlas`);
      return res;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        payment.associationId,
        payment.associationName
      );
      throw new HttpException(
        `addCommuterProviderPayment failed: ${JSON.stringify(e)}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async addCommuterCashCheckIn(
    cashCheckIn: CommuterCashCheckIn
  ): Promise<CommuterCashCheckIn> {
    try {
      const mDate= new Date(cashCheckIn.created);
      cashCheckIn.mDate = mDate;
      const res = await this.commuterCashCheckInModel.create(cashCheckIn);
      Logger.debug(`${mm} CommuterCashCheckInt added to Atlas`);
      this.messagingService.sendCommuterCashCheckInMessage(cashCheckIn);
      return res;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        cashCheckIn.associationId,
        cashCheckIn.associationName
      );
      throw new HttpException(
        `addCommuterCashCheckInt failed: ${JSON.stringify(e)}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  //

  public async addRankFeeCashPayment(
    payment: RankFeeCashPayment
  ): Promise<RankFeeCashPayment> {
    try {
      const mDate= new Date(payment.created);
      payment.mDate = mDate;
      const res = await this.rankFeeCashPayment.create(payment);
      Logger.debug(`${mm} RankFeeCashPayment to Atlas`);
      this.messagingService.sendRankFeeCashMessage(payment);
      return res;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        payment.associationId,
        payment.associationName
      );
      throw new HttpException(
        `addRankFeeCashPayment failed: ${JSON.stringify(e)}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async addRankFeeProviderPayment(
    payment: RankFeeProviderPayment
  ): Promise<RankFeeProviderPayment> {
    try {
      const mDate= new Date(payment.created);
      payment.mDate = mDate;
      const res = await this.rankFeeProviderPayment.create(payment);
      Logger.debug(`${mm} RankFeeProviderPayment added to Atlas`);
      return res;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        payment.associationId,
        payment.associationName
      );
      throw new HttpException(
        `addRankFeeProviderPayment failed: ${JSON.stringify(e)}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async addRankFeeCashCheckIn(
    cashCheckIn: RankFeeCashCheckIn
  ): Promise<RankFeeCashCheckIn> {
    try {
      const mDate= new Date(cashCheckIn.created);
      cashCheckIn.mDate = mDate;
      const res = await this.rankFeeCashCheckIn.create(cashCheckIn);
      Logger.debug(`${mm} RankFeeCashCheckIn added to Atlas`);
      this.messagingService.sendRankFeeCashCheckInMessage(cashCheckIn);
      return res;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        cashCheckIn.associationId,
        cashCheckIn.associationName
      );
      throw new HttpException(
        `addRankFeeCashCheckIn failed: ${JSON.stringify(e)}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
