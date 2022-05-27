const userController = require('../../controllers/user.controller')
const httpMocks = require('node-mocks-http')
const bcrypt = require('bcrypt')
const User = require('../../models/index').User
const { generateToken } = require('../../middleware/authentication')

jest.mock("../../models")
jest.mock("../../middleware/authentication")

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    bcrypt.compareSync = jest.fn().mockImplementation(() => true);
})

describe("userController Register", () => {
    beforeAll(() => {
        bcrypt.hashSync = jest.fn();
        generateToken.mockReturnValue("get Token");
    });

    it("Register should return 400", async() => {
        const email = "email@gmail.com"
        User.findOne.mockResolvedValue({ rows: [email] });
        await userController.register(req, res);
        expect(res.statusCode).toBe(400);
    })
    it("Register should return 201", async() => {
        User.findOne.mockResolvedValue(null)
        User.create.mockResolvedValue({ full_name: "full_name" })
        await userController.register(req, res)
        expect(res.statusCode).toBe(201)
    })
    it("Register should return 403", async() => {
        const rejected = Promise.reject({ message: "FAILED TO REGISTER" });
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(rejected);
        await userController.register(req, res);
        expect(res.statusCode).toBe(403);
    });
    it("Register should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        User.findOne.mockResolvedValue(rejected);
        await userController.register(req, res);
        expect(res.statusCode).toBe(503);
    });
})

describe("userController Login", () => {
    beforeAll(() => {
        bcrypt.hashSync = jest.fn();
        generateToken.mockReturnValue("get Token");
    });

    it("Login should return 400 if email not found", async() => {
        User.findOne.mockResolvedValue(null);
        await userController.login(req, res);
        expect(res.statusCode).toBe(400);
    });
    it("Login should return 401 if password not match", async() => {
        const data = {
            email: "email",
            password: "wrongpassword",
        };
        User.findOne.mockResolvedValue(data);
        bcrypt.compareSync = jest.fn().mockImplementation(() => false);
        await userController.login(req, res);
        expect(res.statusCode).toBe(401);
    });
    it("Login should return 200", async() => {
        User.findOne.mockResolvedValue({ email: "email" })
        userController.login(req, res)
        expect(res.statusCode).toBe(200)
    })
    it("Login should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        User.findOne.mockResolvedValue(rejected);
        await userController.login(req, res);
        expect(res.statusCode).toBe(503);
    });
})

describe("userController userUpdate", () => {
    it("userUpdate should return 200", async() => {
        const data = {
            full_name: "full_name",
            email: "email"
        }
        User.update.mockResolvedValue(data);
        await userController.updateUser(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("userUpdate should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        User.update.mockResolvedValue(rejected);
        await userController.updateUser(req, res);
        expect(res.statusCode).toBe(503);
    });
})

describe("userController user top-up", () => {
    it("user top-up should return 200", async() => {
        const id = "id"
        User.findOne.mockResolvedValue({ rows: [id] })
        User.update.mockResolvedValue({ topUp: "top-up"})
        await userController.topUp(req, res)
        expect(res.statusCode).toBe(200)
    })
    it("user top-up should return 400", async() => {
        const rejected = Promise.reject({ message: "fail to update balance" });
        User.update.mockResolvedValue(rejected)
        await userController.topUp(req, res)
        expect(res.statusCode).toBe(400)
    })
    it("user top-up should return 503", async() => {
        const rejected = Promise.reject({ message: "fail to update balance" });
        User.findOne.mockResolvedValue(rejected)
        User.update.mockResolvedValue(rejected)
        await userController.topUp(req, res)
        expect(res.statusCode).toBe(503)
    })
})

describe("userController delete user", () => {
    it("delete user should return 200", async() => {
        User.destroy.mockResolvedValue({ user: "user" })
        await userController.deleteUser(req, res)
        expect(res.statusCode).toBe(200)
    })
    it("delete user should return 503", async() => {
        const rejected = Promise.reject({ message: "INTERNAL SERVER ERROR" });
        User.destroy.mockResolvedValue(rejected);
        await userController.deleteUser(req, res);
        expect(res.statusCode).toBe(503);
    });
})
