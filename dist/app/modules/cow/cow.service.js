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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCowToDB = exports.updateCowToDB = exports.getAllCowToDB = exports.getSingleCowToDB = exports.createCowToDB = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_model_1 = require("../user/user.model");
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = require("./cow.model");
const createCowToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(payload.seller);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Can not find any seller with this id.');
    }
    const result = cow_model_1.Cow.create(payload);
    return result;
});
exports.createCowToDB = createCowToDB;
const getSingleCowToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById({ _id: id }).populate('seller');
    return result;
});
exports.getSingleCowToDB = getSingleCowToDB;
const getAllCowToDB = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const sortConditions = {};
    const { query, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["query", "minPrice", "maxPrice"]);
    const andConditions = [];
    //for partial match
    if (query) {
        andConditions.push({
            $or: cow_constant_1.cowsSearchableFields.map(field => ({
                [field]: {
                    $regex: query,
                    $options: 'i',
                },
            })),
        });
    }
    //For exest match
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    if (minPrice) {
        console.log(minPrice);
        andConditions.push({ price: { $gte: minPrice } });
    }
    if (maxPrice) {
        andConditions.push({ price: { $lte: maxPrice } });
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield cow_model_1.Cow.find(whereCondition)
        .populate('seller')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.getAllCowToDB = getAllCowToDB;
const updateCowToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cow_model_1.Cow.findById({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found');
    }
    const result = yield cow_model_1.Cow.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.updateCowToDB = updateCowToDB;
const deleteCowToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndDelete({ _id: id }).populate('seller');
    return result;
});
exports.deleteCowToDB = deleteCowToDB;
