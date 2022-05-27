const categoryController = require('../../controllers/category.controller')
const httpMocks = require('node-mocks-http')
const Category = require('../../models/index').Category

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("categoryController post category by admin", () => {
    it("post category should return 201", async() => {
        Category.create.mockResolvedValue({ type: "type"})
        await categoryController.postCategory(req, res)
        expect(res.statusCode).toBe(201)
    })
    it("post category should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Category.create.mockResolvedValue(rejected)
        await categoryController.postCategory(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe("categoryController getAllCategory", () => {
    it("getAllCategory should return 200", async() => {
        Category.findAll.mockResolvedValue({ category: "category" })
        await categoryController.getAllCategory(req, res)
        expect(res.statusCode).toBe(200)
    })
    it("getAllCategory should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Category.findAll.mockResolvedValue(rejected)
        await categoryController.getAllCategory(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe("categoryController updateCategory", () => {
    it("updateCategory should return 200 ", async() => {
        Category.update.mockResolvedValue({ category: "category" });
        await categoryController.updateCategory(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("updateCategory should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Category.update.mockResolvedValue(rejected)
        await categoryController.updateCategory(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe("categoryController deleteCategory", () => {
    it("deleteCategory should return 200", async() => {
        const dataCategory = {
            category: "category"
        }
        Category.destroy.mockResolvedValue(dataCategory)
        await categoryController.deleteCategory(req, res)
        expect(res.statusCode).toBe(200)
    })
    it("deleteCategory should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" })
        Category.destroy.mockResolvedValue(rejected)
        await categoryController.deleteCategory(req, res)
        expect(res.statusCode).toBe(503)
    })
})
