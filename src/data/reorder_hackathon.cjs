const fs = require('fs');
const path = 'd:\\CSE-STANDALONE\\src\\data\\SecData.json';

try {
    const secData = JSON.parse(fs.readFileSync(path, 'utf8'));

    if (secData.hackathon && secData.hackathon.length > 0) {
        // Reorder each entry to ensure s.no. is first
        secData.hackathon = secData.hackathon.map(entry => {
            const reordered = {
                "s.no.": entry["s.no."],
                "student_name": entry.student_name,
                "title": entry.title,
                "event_name": entry.event_name,
                "venue": entry.venue,
                "date": entry.date,
                "year": entry.year,
            };

            // Add prize or participation if exists
            if (entry.prize) {
                reordered.prize = entry.prize;
            }
            if (entry.participation) {
                reordered.participation = entry.participation;
            }

            return reordered;
        });

        fs.writeFileSync(path, JSON.stringify(secData, null, 2));
        console.log(`Reordered ${secData.hackathon.length} hackathon entries with s.no. as first column`);
    } else {
        console.log('No hackathon data found.');
    }

} catch (err) {
    console.error(err);
}
