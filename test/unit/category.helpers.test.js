const categoryHelpers = require('../../helpers/category.helpers')
const httpMocks = require('node-mocks-http')
const Category = require('../../models/index').Category

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("Category Helpers Find Id Category", () => {
    it("findIdCategory should return 400", async() => {
        Category.findOne.mockResolvedValue(null)
        await categoryHelpers.findIdCategory(req, res)
        expect(res.statusCode).toBe(400)
    })
})