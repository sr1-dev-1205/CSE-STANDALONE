import { readFileSync, writeFileSync } from 'fs';

const path = 'd:\\CSE-STANDALONE\\src\\data\\SecData.json';
const inputPath = 'd:\\CSE-STANDALONE\\src\\data\\temp_hackathon_input.json';

try {
    const secData = JSON.parse(readFileSync(path, 'utf8'));
    const inputData = JSON.parse(readFileSync(inputPath, 'utf8'));

    if (!secData.hackathon) {
        secData.hackathon = [];
    }

    // Determine starting s.no.
    // Handle empty array case
    let currentSNo = 1;
    if (secData.hackathon.length > 0) {
        const last = secData.hackathon[secData.hackathon.length - 1];
        // s.no. might be string or number? existing data example showed 1 (number).
        // safely parse
        const lastSNo = parseInt(last['s.no.'] || 0);
        currentSNo = lastSNo + 1;
    }

    const newEntries = [];

    const processEntry = (entry, year) => {
        // Clone entry to avoid mutating original if needed (though we don't care about inputData anymore)
        const newEntry = { ...entry };

        // Set s.no.
        newEntry["s.no."] = currentSNo++;

        // Set year
        newEntry["year"] = year || "2021-2022";

        // Rename 'name' to 'student_name'
        if (newEntry.name) {
            newEntry.student_name = newEntry.name;
            delete newEntry.name;
        }

        // Rename 'title' and 'event' to maximize compatibility?
        // Exisitng data has 'event_name'.
        // User data has 'event' and 'title'.
        // I will rename 'event' -> 'event_name' and keep 'title' separate.
        if (newEntry.event) {
            newEntry.event_name = newEntry.event;
            delete newEntry.event;
        }

        // 'venue', 'date', 'prize', 'participation' can stay as is. ReusableTable will just verify keys.
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
    writeFileSync(path, JSON.stringify(secData, null, 2));
    console.log(`Added ${newEntries.length} entries. New total: ${secData.hackathon.length}`);

} catch (err) {
    console.error(err);
}
