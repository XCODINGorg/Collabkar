import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../../../');
const startupScript = path.join(repoRoot, 'AI', 'influencer_analytics', 'startup.py');
const pythonExecutable = process.env.AI_PYTHON_BIN || 'python';

function runPythonAi(command, payload = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(pythonExecutable, [startupScript, command], {
      cwd: repoRoot,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(stderr || stdout || `Python AI exited with code ${code}`));
        return;
      }

      try {
        resolve(JSON.parse(stdout || '{}'));
      } catch (error) {
        reject(new Error(`Invalid JSON from Python AI: ${stdout || stderr}`));
      }
    });

    child.stdin.write(JSON.stringify(payload ?? {}));
    child.stdin.end();
  });
}

export const pythonAiBridge = {
  health: () => runPythonAi('health'),
  price: (payload) => runPythonAi('price', payload),
  analyze: (payload) => runPythonAi('analyze', payload),
  match: (payload) => runPythonAi('match', payload),
  dashboard: () => runPythonAi('dashboard'),
  train: () => runPythonAi('train'),
};
