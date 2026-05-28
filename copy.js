const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/blog.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split(/\r?\n/);

for (let i = 540; i <= 548; i++) {
  const line = lines[i];
  const idx = line.indexOf('│');
  const lastIdx = line.lastIndexOf('│');
  console.log(`Line ${i + 1}: length=${line.length}, first_pipe=${idx}, last_pipe=${lastIdx}, content="${line}"`);
}
