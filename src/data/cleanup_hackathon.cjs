const fs = require('fs');
const path = 'd:\\CSE-STANDALONE\\src\\data\\SecData.json';

try {
    const secData = JSON.parse(fs.readFileSync(path, 'utf8'));

    if (secData.hackathon && secData.hackathon.length > 3) {
        // Remove first 3 entries (indices 0, 1, 2)
        secData.hackathon.splice(0, 3);

        // Re-index s.no.
        secData.hackathon.forEach((item, index) => {
            item['s.no.'] = index + 1;
        });

        fs.writeFileSync(path, JSON.stringify(secData, null, 2));
        console.log(`Removed 3 entries and re-indexed. Total entries: ${secData.hackathon.length}`);
    } else {
        console.log('Not enough entries to remove or hackathon data missing.');
    }

} catch (err) {
    console.error(err);
}
