const fs = require('fs');

const secDataPath = 'd:\\CSE-STANDALONE\\src\\data\\SecData.json';

/**
 * This script adds hackathon data for multiple years and sorts them in descending order
 * Expected input format in separate JSON files:
 * - hackathon_22-23.json
 * - hackathon_23-24.json
 * - hackathon_24-25.json
 * 
 * Each file should contain an array of entries with the same structure as temp_hackathon_input.json
 */

try {
    const secData = JSON.parse(fs.readFileSync(secDataPath, 'utf8'));

    if (!secData.hackathon) {
        secData.hackathon = [];
    }

    // Clear existing hackathon data to rebuild with proper year ordering
    console.log(`Current hackathon entries: ${secData.hackathon.length}`);

    // Store existing data by year
    const dataByYear = {
        '2021-2022': [],
        '2022-2023': [],
        '2023-2024': [],
        '2024-2025': []
    };

    // Categorize existing data
    secData.hackathon.forEach(entry => {
        const year = entry.year || '2021-2022';
        if (dataByYear[year]) {
            dataByYear[year].push(entry);
        }
    });

    console.log('\nEntries by year:');
    Object.keys(dataByYear).forEach(year => {
        console.log(`  ${year}: ${dataByYear[year].length} entries`);
    });

    // Function to process and add new year data
    const processYearData = (inputFile, academicYear) => {
        try {
            const inputData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
            const entries = [];

            const processEntry = (entry) => {
                return {
                    "s.no.": 0, // Will be set later
                    "student_name": entry.name || entry.student_name,
                    "title": entry.title,
                    "event_name": entry.event || entry.event_name,
                    "venue": entry.venue,
                    "date": entry.date,
                    "year": academicYear,
                    ...(entry.prize && { prize: entry.prize }),
                    ...(entry.participation && { participation: entry.participation })
                };
            };

            inputData.forEach(block => {
                if (block.prize_winners) {
                    block.prize_winners.forEach(item => {
                        entries.push(processEntry(item));
                    });
                }

                if (block.student_participation) {
                    block.student_participation.forEach(item => {
                        entries.push(processEntry(item));
                    });
                }

                if (block.student_participation_next_20) {
                    block.student_participation_next_20.forEach(item => {
                        entries.push(processEntry(item));
                    });
                }
            });

            dataByYear[academicYear] = entries;
            console.log(`Loaded ${entries.length} entries for ${academicYear}`);
        } catch (err) {
            console.log(`No data file found for ${academicYear}: ${inputFile}`);
        }
    };

    // Try to load new year data if files exist
    processYearData('d:\\CSE-STANDALONE\\src\\data\\hackathon_24-25.json', '2024-2025');
    processYearData('d:\\CSE-STANDALONE\\src\\data\\hackathon_23-24.json', '2023-2024');
    processYearData('d:\\CSE-STANDALONE\\src\\data\\hackathon_22-23.json', '2022-2023');

    // Rebuild hackathon array in descending year order: 24-25, 23-24, 22-23, 21-22
    const sortedYears = ['2024-2025', '2023-2024', '2022-2023', '2021-2022'];
    const rebuiltData = [];
    let currentSNo = 1;

    sortedYears.forEach(year => {
        if (dataByYear[year] && dataByYear[year].length > 0) {
            dataByYear[year].forEach(entry => {
                entry["s.no."] = currentSNo++;
                rebuiltData.push(entry);
            });
        }
    });

    secData.hackathon = rebuiltData;

    // Write back
    fs.writeFileSync(secDataPath, JSON.stringify(secData, null, 2));

    console.log('\n=== Final Summary ===');
    console.log(`Total hackathon entries: ${secData.hackathon.length}`);
    console.log('\nEntries by year (in display order):');
    sortedYears.forEach(year => {
        const count = rebuiltData.filter(e => e.year === year).length;
        if (count > 0) {
            console.log(`  ${year}: ${count} entries`);
        }
    });

} catch (err) {
    console.error('Error:', err);
}
