import fs from 'fs';
import path from 'path';

let currentLogPath = null;

export function initLog(testName = 'run') {
  const logsDir = path.join(process.cwd(), 'test-results', 'logs');
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
  const safeName = String(testName || 'run').replace(/[^a-z0-9._-]/gi, '_').toLowerCase();
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const pid = process.pid;
  const rand = Math.floor(Math.random() * 10000);
  currentLogPath = path.join(logsDir, `${ts}-${safeName}-${pid}-${rand}.log`);
  try {
    fs.appendFileSync(currentLogPath, `=== Log start: ${new Date().toISOString()} ===\n`);
  } catch (e) {
    // swallow
  }
  console.log(`Logging to file: ${currentLogPath}`);
}

export function log(action, message = '') {
  const ts = new Date().toISOString();
  const msg = message ? ` - ${message}` : '';
  const line = `${ts} | ${action}${msg}`;
  // Console output for immediate feedback
  console.log(line);
  // Append to file when initialized
  if (currentLogPath) {
    try {
      fs.appendFileSync(currentLogPath, line + '\n');
    } catch (e) {
      console.error('Failed to write to log file', e);
    }
  }
}

export function closeLog() {
  if (!currentLogPath) return;
  try {
    fs.appendFileSync(currentLogPath, `=== Log end: ${new Date().toISOString()} ===\n`);
  } catch (e) {
    // ignore
  }
  currentLogPath = null;
}
