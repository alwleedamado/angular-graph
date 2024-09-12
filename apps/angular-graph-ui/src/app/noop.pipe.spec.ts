import { NoopPipe } from './noop.pipe';

describe('NoopPipe', () => {
  it('create an instance', () => {
    const pipe = new NoopPipe();
    expect(pipe).toBeTruthy();
  });
});
