const transactionController = require('../../controllers/transaction.controller')
const httpMocks = require('node-mocks-http')
const Transaction = require('../../models/index').TransactionHistory

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("Transaction Controller Post Transaction", () => {
    it("should return 200 saldo tidak cukup", async() => {
        Transaction.findOne.mockResolvedValue({ user: "user" })

        Transaction.create.mockResolvedValue({ product: "product" })
        await transactionController.postTransaction(req, res)
        expect(res.statusCode).toBe(201)
    })
    // it("should return 400 saldo tidak cukup", async() => {
    //     Transaction.findOne.mockResolvedValue({ product: "product" })
    //     Transaction.findOne.mockResolvedValue({ user: "user" })
    //     await transactionController.postTransaction(req, res)
    //     expect(res.statusCode).toBe(400)
    // })
    // it("should return 200", async() => {
    //     Transaction.findOne.mockResolvedValue({ product: "product" })
    //     Transaction.findOne.mockResolvedValue({ user: "user" })
    //     Transaction.create.mockResolvedValue({ transaction: "transaction" })
    //     Transaction.findOne.mockResolvedValue({ category: "category" })
    //     await transactionController.postTransaction(req, res)
    //     expect(res.statusCode).toBe(200)
    // })
})

describe("Transaction Controller Get Transaction By User", () => {
    it("should return 200", async() => {
        Transaction.findAll.mockResolvedValue({ transaction: "transaction" })
        await transactionController.getTransactionsByUser(req, res)
        expect(res.statusCode).toBe(200)
    })
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Transaction.findAll.mockResolvedValue(rejected)
        await transactionController.getTransactionsByUser(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe("Transaction Controller Get All Transaction By Admin", () => {
    it("should return 200", async() => {
        Transaction.findAll.mockResolvedValue({ data: "data" })
        await transactionController.getTransactionsByAdmin(req, res)
        expect(res.statusCode).toBe(200)
    })
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Transaction.findAll.mockResolvedValue(rejected)
        await transactionController.getTransactionsByAdmin(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe("Transaction Controller Get Transaction Id By Admin", () => {
    it("should return 200", async() => {
        Transaction.findOne.mockResolvedValue({ data: "data" })
        await transactionController.getTransactionIdByAdmin(req, res)
        expect(res.statusCode).toBe(200)
    })
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Transaction.findOne.mockResolvedValue(rejected)
        await transactionController.getTransactionIdByAdmin(req, res)
        expect(res.statusCode).toBe(503)
    })
})
