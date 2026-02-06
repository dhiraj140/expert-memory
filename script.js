// script.js
// Beginner-friendly code with comments

// Add event listener to the check result button
document.getElementById('check-result').addEventListener('click', function() {
    const standard = document.getElementById('standard').value;
    const roll = document.getElementById('roll').value.trim();
    
    if (!standard || !roll) {
        alert('Please select Standard and enter Roll Number.');
        return;
    }
    
    // Hide previous results or errors
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');
    
    // WHERE TO PASTE GOOGLE SHEET URL:
    // Replace the URL below with your published Google Sheet CSV URL.
    // Example: 'const sheetCSV = "https://docs.google.com/spreadsheets/d/1Z3I8OzAkb627gxcg6BqCOHcr9X_d7YZeaGLXNK0UVjc/gviz/tq?tqx=out:csv";
'
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1Z3I8OzAkb627gxcg6BqCOHcr9X_d7YZeaGLXNK0UVjc/gviz/tq?tqx=out:csv';
    
    // Fetch the CSV data from Google Sheets
    fetch(sheetUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data from Google Sheets.');
            }
            return response.text();
        })
        .then(data => {
            // Parse the CSV data
            const lines = data.split('\n');
            const headers = lines[0].split(',').map(header => header.trim());
            
            // Find indices of columns
            const rollIndex = headers.indexOf('roll_no');
            const nameIndex = headers.indexOf('student_name');
            const standardIndex = headers.indexOf('standard');
            const marathiIndex = headers.indexOf('marathi');
            const hindiIndex = headers.indexOf('hindi');
            const englishIndex = headers.indexOf('english');
            const mathsIndex = headers.indexOf('maths');
            const scienceIndex = headers.indexOf('science');
            const totalIndex = headers.indexOf('total');
            const resultIndex = headers.indexOf('result');
            
            let found = false;
            let studentData = {};
            
            // Loop through each row starting from 1 (skip headers)
            for (let i = 1; i < lines.length; i++) {
                const row = lines[i].split(',').map(cell => cell.trim());
                if (row[standardIndex] === standard && row[rollIndex] === roll) {
                    found = true;
                    studentData = {
                        name: row[nameIndex],
                        marathi: row[marathiIndex],
                        hindi: row[hindiIndex],
                        english: row[englishIndex],
                        maths: row[mathsIndex],
                        science: row[scienceIndex],
                        total: row[totalIndex],
                        result: row[resultIndex]
                    };
                    break;
                }
            }
            
            if (found) {
                // Display the result table
                const table = document.getElementById('result-table');
                table.innerHTML = `
                    <tr><th>Student Name</th><td>${studentData.name}</td></tr>
                    <tr><th>Marathi</th><td>${studentData.marathi}</td></tr>
                    <tr><th>Hindi</th><td>${studentData.hindi}</td></tr>
                    <tr><th>English</th><td>${studentData.english}</td></tr>
                    <tr><th>Maths</th><td>${studentData.maths}</td></tr>
                    <tr><th>Science</th><td>${studentData.science}</td></tr>
                    <tr><th>Total</th><td>${studentData.total}</td></tr>
                    <tr><th>Result</th><td class="${studentData.result.toLowerCase() === 'pass' ? 'pass' : 'fail'}">${studentData.result}</td></tr>
                `;
                document.getElementById('result-container').classList.remove('hidden');
            } else {
                // Show error message
                document.getElementById('error-message').classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching the data. Please check the console for details.');
        });
});

// Add event listener for print button
document.getElementById('print-result').addEventListener('click', function() {
    window.print();
});
