const productHelpers = require('../../helpers/product.helpers')
const httpMocks = require('node-mocks-http')
const Product = require('../../models/index').Product

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("Product Helpers Find Id Product", () => {
    it("should return 400 if product not found", async() => {
        Product.findOne.mockResolvedValue(null)
        await productHelpers.findIdProduct(req, res)
        expect(res.statusCode).toBe(400)

    })
    it("should return next", async() => {
        Product.findOne.mockResolvedValue({ product: "product" })
        await productHelpers.findIdProduct(req, res)
        expect(res.statusCode).toEqual(200);
    })
})

describe("Product Helpers Find Data Product", () => {
    it("should return 400 if product not found", async() => {
        Product.findOne.mockResolvedValue(null)
        await productHelpers.findDataProduct(req, res)
        expect(res.statusCode).toBe(400)

    })
    it("should return next", async() => {
        Product.findOne.mockResolvedValue({ product: "product" })
        await productHelpers.findDataProduct(req, res)
        expect(res.statusCode).toEqual(200);
    })
})

// describe("Product Helpers Check Product Stock", () => {
//     it("should return 400 if stock not ready", async() => {
//         const data = "data"
//         Product.findOne.mockResolvedValue(data)
//         await productHelpers.checkProductStock(req, res)
//         expect(res.statusCode).toBe(200)
//     })
//     it("should return 400 if stock not ready", async() => {
//         const isBigger = 2 > 1
//         Product.findOne.mockResolvedValue({isBigger}, true)
//         await productHelpers.checkProductStock(req, res)
//         expect(res.statusCode).toBe(400)

//     })
//     // it("should return next", async() => {
//     //     Product.findOne.mockResolvedValue({ product: "product" })
//     //     await productHelpers.checkProductStock(req, res)
//     //     expect(res.statusCode).toEqual(200);
//     // })
// })