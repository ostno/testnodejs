import { FormatTableService } from './format-table.service';

describe('formatTable', () => {

    let service:  FormatTableService;

    beforeEach(()=> {
        service = new FormatTableService;
    })

    describe('getHead', () => {
        test('should return an array containing column headers', () => {
            expect(service.getHead())
                .toEqual(['Rank', 'Coin', 'Name', 'Price (USD)', 'Change 1H (%)', 'Change 24H (%)', 'Change 7D (%)', 'Market Cap (USD)', 'Volume 24H (USD)'])
        })
    })

})