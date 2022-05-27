const productController = require('../../controllers/product.controller')
const httpMocks = require('node-mocks-http')
const Product = require('../../models/index').Product

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("Product Controller Post Product", () => {
    it("postProduct should return 400", async() => {
        Product.findOne.mockResolvedValue(null);
        await productController.postProduct(req, res);
        expect(res.statusCode).toBe(400);
    });
    it("postProduct should return 201", async() => {
        const data = "data"
        Product.findOne.mockResolvedValue(data)
        Product.create.mockResolvedValue(data)
        await productController.postProduct(req, res)
        expect(res.statusCode).toBe(201)
    })
    it("postProduct should return 403", async() => {
        const rejected = Promise.reject({ message: "FAILED TO POST PRODUCT" });
        Product.create.mockResolvedValue(rejected)
        await productController.postProduct(req, res)
        expect(res.statusCode).toBe(403)
    })
    it("postProduct should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Product.findOne.mockResolvedValue(rejected)
        Product.create.mockResolvedValue(rejected)
        await productController.postProduct(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe("Product Controller Get All Product", () => {
    it("getAllProduct should return 200", async() => {
        Product.findAll.mockResolvedValue({ data: "data" })
        await productController.getAllProduct(req, res)
        expect(res.statusCode).toBe(200)
    })
    it("getAllProduct should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Product.findAll.mockResolvedValue(rejected)
        await productController.getAllProduct(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe("Product Controller Update Product", () => {
    it("updateProduct should return 200", async() => {
        const data = "data"
        Product.update.mockResolvedValue(data);
        await productController.updateProduct(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("updateProduct should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Product.update.mockResolvedValue(rejected)
        await productController.updateProduct(req, res)
        expect(res.statusCode).toBe(503)
    });
})

describe("Product Controller Update Product Category Id", () => {
    it("updateProductCategoryId should return 400", async() => {
        Product.findOne.mockResolvedValue(null);
        await productController.updateCategoryId(req, res);
        expect(res.statusCode).toBe(400);
    });
    it("updateProductCategoryId should return 200", async() => {
        const data = "data"
        Product.findOne.mockResolvedValue({ rows: [data] });
        Product.update.mockResolvedValue({ data: "data" });        
        await productController.updateCategoryId(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("updateProductCategoryId should return 403", async() => {
        const rejected = Promise.reject({ message: "Fail" });
        Product.update.mockResolvedValue(rejected)
        await productController.updateCategoryId(req, res)
        expect(res.statusCode).toBe(403)
    });
    it("updateProductCategoryId should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Product.findOne.mockResolvedValue(rejected)
        Product.update.mockResolvedValue(rejected)
        await productController.updateCategoryId(req, res)
        expect(res.statusCode).toBe(503)
    });
})

describe("Product Controller Delete Product", () => {
    it("deleteProduct should return 200", async() => {
        Product.destroy.mockResolvedValue({ data: "data" })
        await productController.deleteProduct(req, res)
        expect(res.statusCode).toBe(200)
    })
    it("deleteProduct should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        Product.destroy.mockResolvedValue(rejected)
        await productController.deleteProduct(req, res)
        expect(res.statusCode).toBe(503)
    });
})
