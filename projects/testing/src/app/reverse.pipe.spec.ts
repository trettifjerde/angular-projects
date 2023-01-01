import { ReversePipe } from './reverse.pipe';

describe('RevesePipe', () => {
    it('should reverse a string', () => {
        let reversePipe = new ReversePipe();
        expect(reversePipe.transform('meow-meow34')).toEqual('43woem-woem');
  });
});
