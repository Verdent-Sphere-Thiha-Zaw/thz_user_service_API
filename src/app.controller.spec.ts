import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckService } from '@nestjs/terminus';
import { MongooseHealthIndicator } from '@nestjs/terminus'; // If you are using Mongoose health checks

describe('AppController', () => {
  let appController: AppController;

  const mockHealthCheckService = {
    check: jest.fn().mockResolvedValue({ status: 'ok' }), // Mock implementation of the health check
  };

  const mockAppService = {
    getHealth: jest.fn().mockResolvedValue({ status: 'ok' }), // Mock implementation for getHealth
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: AppService, useValue: mockAppService }, // Use the mock AppService
        { provide: HealthCheckService, useValue: mockHealthCheckService }, // Use the mock HealthCheckService
        MongooseHealthIndicator, // If needed, otherwise remove
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!'); // Ensure this matches your actual implementation
    });
  });
});
