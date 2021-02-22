import { BackgroundModule } from './background.module';

describe('BackgroundModule', () => {
  let backgroundModule: BackgroundModule;

  beforeEach(() => {
    backgroundModule = new BackgroundModule();
  });

  it('should create an instance', () => {
    expect(backgroundModule).toBeTruthy();
  });
});
