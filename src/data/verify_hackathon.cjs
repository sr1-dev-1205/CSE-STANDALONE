const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:\\CSE-STANDALONE\\src\\data\\SecData.json', 'utf8'));

const byYear = {};
data.hackathon.forEach(e => {
    byYear[e.year] = (byYear[e.year] || 0) + 1;
});

console.log('=== Hackathon Data Summary ===\n');
console.log('Entries by year (in display order):');
Object.keys(byYear).sort().reverse().forEach(y => {
    console.log(`  ${y}: ${byYear[y]} entries`);
});

console.log(`\nTotal: ${data.hackathon.length} entries`);

console.log('\n=== First 5 entries (should be 2024-2025) ===');
data.hackathon.slice(0, 5).forEach((e, i) => {
    console.log(`${i + 1}. S.No: ${e['s.no.']}, Year: ${e.year}, Student: ${e.student_name}`);
});

console.log('\n=== Last 5 entries (should be 2021-2022) ===');
data.hackathon.slice(-5).forEach((e, i) => {
    console.log(`${i + 1}. S.No: ${e['s.no.']}, Year: ${e.year}, Student: ${e.student_name}`);
});

console.log('\n=== Column Order Check ===');
console.log('Columns:', Object.keys(data.hackathon[0]).join(', '));
