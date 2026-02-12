# Hackathon Data Processing Guide

## Current Status
✅ **Column order fixed**: S.NO is now the first column in the hackathon table
✅ **Date column width improved**: Dates now display properly with adequate space
✅ **2021-2022 data**: Already processed and added (126 entries)

## Next Steps: Adding Data for 22-23, 23-24, and 24-25

### Step 1: Convert Word Documents to JSON

You have three Word documents in `D:\CSE-STANDALONE\public\hackthon\`:
- 22-23.docx
- 23-24.docx
- 24-25.docx

**Option A: Manual Conversion**
1. Open each Word document
2. Copy the data to a text editor
3. Format it as JSON following the structure below
4. Save as `hackathon_22-23.json`, `hackathon_23-24.json`, `hackathon_24-25.json` in `D:\CSE-STANDALONE\src\data\`

**Option B: Use an Online Converter**
1. Upload the Word documents to a Word-to-JSON converter
2. Or copy the table data to Excel, then export as CSV, then convert CSV to JSON

### Step 2: JSON Format Required

Each JSON file should follow this structure (same as `temp_hackathon_input.json`):

```json
[
    {
        "academic_year": "2022-2023",
        "prize_winners": [
            {
                "name": "Student Name",
                "title": "Paper Presentation",
                "event": "Event Name",
                "venue": "College Name, City",
                "date": "DD-MM-YYYY to DD-MM-YYYY",
                "prize": "First Prize"
            }
        ],
        "student_participation": [
            {
                "name": "Student Name",
                "title": "Workshop",
                "event": "Event Name",
                "venue": "College Name, City",
                "date": "DD-MM-YYYY",
                "participation": "Participation"
            }
        ]
    }
]
```

### Step 3: Run the Processing Script

Once you have created the JSON files, run:

```bash
node d:\CSE-STANDALONE\src\data\rebuild_hackathon_all_years.cjs
```

This script will:
1. Load all hackathon data from all years
2. Sort them in descending order: 2024-2025, 2023-2024, 2022-2023, 2021-2022
3. Renumber all s.no. sequentially
4. Ensure proper column order (s.no. first)
5. Update SecData.json

### Step 4: Verify the Results

After running the script, refresh your browser to see the updated hackathon data displayed in the correct year order.

## File Locations

- **Word Documents**: `D:\CSE-STANDALONE\public\hackthon\`
- **JSON Input Files** (to be created): `D:\CSE-STANDALONE\src\data\`
  - hackathon_22-23.json
  - hackathon_23-24.json
  - hackathon_24-25.json
- **Processing Script**: `D:\CSE-STANDALONE\src\data\rebuild_hackathon_all_years.cjs`
- **Output**: `D:\CSE-STANDALONE\src\data\SecData.json`

## Need Help?

If you need assistance converting the Word documents to JSON format, you can:
1. Share the content of the Word documents
2. Use a tool like https://products.aspose.app/words/conversion/word-to-json
3. Or I can help you create a script to parse the data if you provide a sample of the structure
