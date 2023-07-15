"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrderToDB = exports.createOrderToDB = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const createOrderToDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow, buyer } = orderData;
    const cowData = yield cow_model_1.Cow.findById({ _id: cow });
    if (!cowData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found');
    }
    const buyerData = yield user_model_1.User.findById({ _id: buyer });
    if (!buyerData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Buyer not found');
    }
    if (buyerData.budget < cowData.price) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not enough money to buy this cow');
    }
    /*Transation rollback start*/
    let newOrderAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield cow_model_1.Cow.findByIdAndUpdate({ _id: cow }, { label: 'sold out' }, { session });
        const buyerNewBudget = buyerData.budget - cowData.price;
        yield user_model_1.User.findByIdAndUpdate({ _id: buyer }, { budget: buyerNewBudget }, { session });
        const seller = yield user_model_1.User.findById(cowData.seller.toString());
        if (!seller) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Seller not found');
        }
        const sellerNewIncome = seller.income + cowData.price;
        yield user_model_1.User.findByIdAndUpdate({ _id: cow }, { income: sellerNewIncome }, { session });
        const newOrder = yield order_model_1.Order.create([orderData], { session });
        if (!newOrder.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create order');
        }
        console.log(newOrder);
        newOrderAllData = newOrder[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    /*Transation rollback end*/
    if (newOrderAllData) {
        newOrderAllData = yield order_model_1.Order.findOne({
            _id: newOrderAllData._id,
        })
            .populate('cow')
            .populate('buyer');
    }
    return newOrderAllData;
});
exports.createOrderToDB = createOrderToDB;
const getAllOrderToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
exports.getAllOrderToDB = getAllOrderToDB;
