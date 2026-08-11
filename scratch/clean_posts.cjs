const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'blogPosts.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const aug10Str = '10 Août 2026';
const aug10Idx = content.indexOf(aug10Str);

if (aug10Idx !== -1) {
  // Find `id:` before aug10Idx
  const idIdx = content.lastIndexOf('id:', aug10Idx);
  // Find `{` before idIdx
  const aug10Bracket = content.lastIndexOf('{', idIdx);
  
  // Post 1 date
  const post1DateIdx = content.indexOf('11 Août 2026');
  // Find first `id:` after post1DateIdx
  const post2IdIdx = content.indexOf('id:', post1DateIdx);
  const post2Bracket = content.lastIndexOf('{', post2IdIdx);

  console.log('post2Bracket:', post2Bracket);
  console.log('aug10Bracket:', aug10Bracket);

  if (post2Bracket !== -1 && aug10Bracket !== -1 && aug10Bracket > post2Bracket) {
    const newContent = content.slice(0, post2Bracket) + content.slice(aug10Bracket);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log('✅ CLEANED! Kept only 1 article for 11 Août 2026.');
  }
}
