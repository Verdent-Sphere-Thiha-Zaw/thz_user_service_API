import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckService } from '@nestjs/terminus';
import { MongooseHealthIndicator } from '@nestjs/terminus';

describe('AppController', () => {
  let appController: AppController;
  let app: TestingModule; // Store the TestingModule instance

  const mockHealthCheckService = {
    check: jest.fn().mockResolvedValue({ status: 'ok' }),
  };

  const mockAppService = {
    getHealth: jest.fn().mockResolvedValue({ status: 'ok' }), // Mock implementation for getHealth
  };

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: AppService, useValue: mockAppService }, // Use the mock AppService
        { provide: HealthCheckService, useValue: mockHealthCheckService }, // Use the mock HealthCheckService
        MongooseHealthIndicator, // If needed, otherwise remove
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(async () => {
    await app.close(); // Ensure the app is closed after each test
  });

  describe('health check', () => {
    it('should return health check status', async () => {
      const result = await appController.getHello(); // Await the result of getHello
      expect(result).toEqual({ status: 'ok' }); // Check the expected result
    });
  });
});
