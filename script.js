document.getElementById('check-result').addEventListener('click', function () {

    const standard = document.getElementById('standard').value.trim();
    const roll = document.getElementById('roll').value.trim();

    if (!standard || !roll) {
        alert("Please select Standard and enter Roll Number");
        return;
    }

    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');

    const sheetUrl =
        "https://docs.google.com/spreadsheets/d/1Z3I8OzAkb627gxcg6BqCOHcr9X_d7YZeaGLXNK0UVjc/gviz/tq?tqx=out:csv";

    fetch(sheetUrl)
        .then(res => res.text())
        .then(csv => {

            const rows = csv.trim().split("\n");
            const headers = rows[0].split(",");

            const rollIndex = headers.indexOf("roll_no");
            const standardIndex = headers.indexOf("standard");
            const nameIndex = headers.indexOf("student_name");
            const marathiIndex = headers.indexOf("marathi");
            const hindiIndex = headers.indexOf("hindi");
            const englishIndex = headers.indexOf("english");
            const mathsIndex = headers.indexOf("maths");
            const scienceIndex = headers.indexOf("science");
            const totalIndex = headers.indexOf("total");
            const resultIndex = headers.indexOf("result");

            let found = false;

            for (let i = 1; i < rows.length; i++) {
                if (!rows[i]) continue; // skip empty line

                const cols = rows[i].split(",");

                if (cols[rollIndex] === roll && cols[standardIndex] === standard) {
                    found = true;

                    document.getElementById("result-table").innerHTML = `
                        <tr><th>Name</th><td>${cols[nameIndex]}</td></tr>
                        <tr><th>Marathi</th><td>${cols[marathiIndex]}</td></tr>
                        <tr><th>Hindi</th><td>${cols[hindiIndex]}</td></tr>
                        <tr><th>English</th><td>${cols[englishIndex]}</td></tr>
                        <tr><th>Maths</th><td>${cols[mathsIndex]}</td></tr>
                        <tr><th>Science</th><td>${cols[scienceIndex]}</td></tr>
                        <tr><th>Total</th><td>${cols[totalIndex]}</td></tr>
                        <tr>
                            <th>Result</th>
                            <td class="${cols[resultIndex] === 'Pass' ? 'pass' : 'fail'}">
                                ${cols[resultIndex]}
                            </td>
                        </tr>
                    `;

                    document.getElementById("result-container").classList.remove("hidden");
                    break;
                }
            }

            if (!found) {
                document.getElementById("error-message").classList.remove("hidden");
            }
        })
        .catch(err => {
            alert("Error loading result");
            console.error(err);
        });
});

document.getElementById('print-result').addEventListener('click', () => {
    window.print();
});
