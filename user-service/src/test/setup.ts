import {server} from "../server";

jest.setTimeout(15000);

beforeAll(async () => {
    await server.createDb();
});