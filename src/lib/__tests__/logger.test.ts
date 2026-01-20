import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../logger';

describe('Logger Service', () => {
  const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  };

  beforeEach(() => {
    // Mock console methods
    console.log = vi.fn();
    console.info = vi.fn();
    console.warn = vi.fn();
    console.error = vi.fn();
    // Clear log queue
    logger.clearLogs();
  });

  afterEach(() => {
    // Restore console methods
    console.log = originalConsole.log;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
  });

  describe('debug', () => {
    it('should log debug messages in development mode', () => {
      logger.debug('Test debug message');
      // In test environment (DEV), console.log should be called
      expect(console.log).toHaveBeenCalled();
    });

    it('should add debug messages to log queue', () => {
      logger.debug('Test debug message', { data: 'test' });
      const logs = logger.getRecentLogs();
      expect(logs.length).toBe(1);
      expect(logs[0].level).toBe('debug');
      expect(logs[0].message).toBe('Test debug message');
      expect(logs[0].data).toEqual({ data: 'test' });
    });
  });

  describe('info', () => {
    it('should log info messages', () => {
      logger.info('Test info message');
      expect(console.info).toHaveBeenCalled();
    });

    it('should add info messages to log queue', () => {
      logger.info('Test info message');
      const logs = logger.getRecentLogs();
      expect(logs[0].level).toBe('info');
    });
  });

  describe('warn', () => {
    it('should log warning messages', () => {
      logger.warn('Test warning message');
      expect(console.warn).toHaveBeenCalled();
    });

    it('should add warn messages to log queue', () => {
      logger.warn('Test warning message', { extra: 'data' });
      const logs = logger.getRecentLogs();
      expect(logs[0].level).toBe('warn');
      expect(logs[0].data).toEqual({ extra: 'data' });
    });
  });

  describe('error', () => {
    it('should log error messages', () => {
      const error = new Error('Test error');
      logger.error('Test error message', error);
      expect(console.error).toHaveBeenCalled();
    });

    it('should add error messages to log queue', () => {
      const error = new Error('Test error');
      logger.error('Test error message', error);
      const logs = logger.getRecentLogs();
      expect(logs[0].level).toBe('error');
      expect(logs[0].data).toBe(error);
    });
  });

  describe('getRecentLogs', () => {
    it('should return specified number of logs', () => {
      logger.debug('Log 1');
      logger.debug('Log 2');
      logger.debug('Log 3');

      const logs = logger.getRecentLogs(2);
      expect(logs.length).toBe(2);
    });

    it('should return all logs if count exceeds queue size', () => {
      logger.debug('Log 1');
      logger.debug('Log 2');

      const logs = logger.getRecentLogs(10);
      expect(logs.length).toBe(2);
    });
  });

  describe('clearLogs', () => {
    it('should clear all logs from queue', () => {
      logger.debug('Log 1');
      logger.debug('Log 2');
      expect(logger.getRecentLogs().length).toBe(2);

      logger.clearLogs();
      expect(logger.getRecentLogs().length).toBe(0);
    });
  });

  describe('log queue limit', () => {
    it('should maintain max queue size of 100', () => {
      // Add 110 logs
      for (let i = 0; i < 110; i++) {
        logger.debug(`Log ${i}`);
      }

      const logs = logger.getRecentLogs(200);
      expect(logs.length).toBe(100);
      // First log should be Log 10 (first 10 were pushed out)
      expect(logs[0].message).toBe('Log 10');
    });
  });

  describe('timestamp', () => {
    it('should include timestamp in log entries', () => {
      const before = new Date();
      logger.debug('Test message');
      const after = new Date();

      const logs = logger.getRecentLogs();
      expect(logs[0].timestamp).toBeInstanceOf(Date);
      expect(logs[0].timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(logs[0].timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });
});
