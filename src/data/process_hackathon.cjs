const fs = require('fs');

const path = 'd:\\CSE-STANDALONE\\src\\data\\SecData.json';
const inputPath = 'd:\\CSE-STANDALONE\\src\\data\\temp_hackathon_input.json';

try {
    const secData = JSON.parse(fs.readFileSync(path, 'utf8'));
    const inputData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

    if (!secData.hackathon) {
        secData.hackathon = [];
    }

    // Determine starting s.no..
    let currentSNo = 1;

    if (secData.hackathon.length > 0) {
        const last = secData.hackathon[secData.hackathon.length - 1];
        // s.no. might be string or number? existing data example showed 1 (number).
        // safely parse
        const lastSNo = parseInt(last['s.no.'] || 0);
        if (!isNaN(lastSNo)) {
            currentSNo = lastSNo + 1;
        }
    }

    const newEntries = [];

    const processEntry = (entry, year) => {
        // Create a new entry with explicit property order
        // s.no. MUST be first
        const newEntry = {
            "s.no.": currentSNo++,
            "student_name": entry.name || entry.student_name,
            "title": entry.title,
            "event_name": entry.event || entry.event_name,
            "venue": entry.venue,
            "date": entry.date,
            "year": year || "2021-2022",
        };

        // Add prize or participation field
        if (entry.prize) {
            newEntry.prize = entry.prize;
        }
        if (entry.participation) {
            newEntry.participation = entry.participation;
        }

        return newEntry;
    };

    inputData.forEach(block => {
        // If block doesn't specify academic_year, assume 2021-2022
        const blockYear = block.academic_year || "2021-2022";

        if (block.prize_winners) {
            block.prize_winners.forEach(item => {
                newEntries.push(processEntry(item, blockYear));
            });
        }

        if (block.student_participation) {
            block.student_participation.forEach(item => {
                newEntries.push(processEntry(item, blockYear));
            });
        }

        if (block.student_participation_next_20) {
            block.student_participation_next_20.forEach(item => {
                newEntries.push(processEntry(item, blockYear));
            });
        }
    });

    secData.hackathon.push(...newEntries);

    // Write back
    fs.writeFileSync(path, JSON.stringify(secData, null, 2));
    console.log(`Added ${newEntries.length} entries. New total: ${secData.hackathon.length}`);

} catch (err) {
    console.error(err);
}
