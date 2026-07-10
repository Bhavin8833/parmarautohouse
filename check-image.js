import fs from 'fs';

try {
  const buffer = fs.readFileSync('src/assets/swaraj_724_xm.jpg');
  console.log('File size:', buffer.length);
  console.log('First 10 bytes:', Array.from(buffer.slice(0, 10)).map(x => x.toString(16).padStart(2, '0')).join(' '));
} catch (e) {
  console.error(e);
}
