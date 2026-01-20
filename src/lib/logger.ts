/**
 * Service de logging centralisé
 * Remplace console.log/error/warn par un service configurable
 * Les logs de debug sont désactivés en production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: Date;
}

const isDev = import.meta.env.DEV;

// File d'attente pour les logs (utile pour envoi batch vers service externe)
const logQueue: LogEntry[] = [];
const MAX_QUEUE_SIZE = 100;

function addToQueue(entry: LogEntry): void {
  logQueue.push(entry);
  if (logQueue.length > MAX_QUEUE_SIZE) {
    logQueue.shift();
  }
}

function formatMessage(level: LogLevel, message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

/**
 * Logger centralisé pour l'application
 * - debug: uniquement en développement
 * - info: informations générales (désactivé en prod)
 * - warn: avertissements (visible en prod)
 * - error: erreurs (visible en prod)
 */
export const logger = {
  /**
   * Log de debug - uniquement visible en développement
   */
  debug(message: string, data?: unknown): void {
    if (isDev) {
      console.log(formatMessage('debug', message), data !== undefined ? data : '');
    }
    addToQueue({ level: 'debug', message, data, timestamp: new Date() });
  },

  /**
   * Log d'information - uniquement visible en développement
   */
  info(message: string, data?: unknown): void {
    if (isDev) {
      console.info(formatMessage('info', message), data !== undefined ? data : '');
    }
    addToQueue({ level: 'info', message, data, timestamp: new Date() });
  },

  /**
   * Log d'avertissement - visible en production
   */
  warn(message: string, data?: unknown): void {
    console.warn(formatMessage('warn', message), data !== undefined ? data : '');
    addToQueue({ level: 'warn', message, data, timestamp: new Date() });
  },

  /**
   * Log d'erreur - visible en production
   */
  error(message: string, error?: unknown): void {
    console.error(formatMessage('error', message), error !== undefined ? error : '');
    addToQueue({ level: 'error', message, data: error, timestamp: new Date() });

    // Ici on pourrait envoyer vers un service de monitoring (Sentry, etc.)
    // if (!isDev && typeof window !== 'undefined') {
    //   sendToErrorTracking(message, error);
    // }
  },

  /**
   * Récupère les derniers logs (utile pour debug)
   */
  getRecentLogs(count = 50): LogEntry[] {
    return logQueue.slice(-count);
  },

  /**
   * Vide la file d'attente des logs
   */
  clearLogs(): void {
    logQueue.length = 0;
  }
};

export default logger;
