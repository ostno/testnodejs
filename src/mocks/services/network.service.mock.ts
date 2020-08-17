export class NetworkServiceMock {

    get(url: string): Promise<any> {
        return Promise.resolve({});
    }

}