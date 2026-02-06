document.getElementById("check-result").addEventListener("click", () => {

    const standard = document.getElementById("standard").value.trim();
    const roll = document.getElementById("roll").value.trim();

    if (!standard || !roll) {
        alert("Please select Standard and enter Roll Number");
        return;
    }

    document.getElementById("result-container").classList.add("hidden");
    document.getElementById("error-message").classList.add("hidden");

    const csvUrl =
        "https://docs.google.com/spreadsheets/d/1Z3I8OzAkb627gxcg6BqCOHcr9X_d7YZeaGLXNK0UVjc/gviz/tq?tqx=out:csv";

    fetch(csvUrl)
        .then(res => res.text())
        .then(text => {

            const rows = text
                .trim()
                .split("\n")
                .map(r => r.replace(/"/g, "").trim());

            const headers = rows[0].split(",").map(h => h.trim());
            const idx = (name) => headers.indexOf(name);

            const i = {
                roll: idx("roll_no"),
                name: idx("student_name"),
                standard: idx("standard"),
                marathi: idx("marathi"),
                hindi: idx("hindi"),
                english: idx("english"),
                maths: idx("maths"),
                science: idx("science"),
                total: idx("total"),
                result: idx("result")
            };

            let foundRow = null;

            for (let r = 1; r < rows.length; r++) {
                const cols = rows[r].split(",").map(c => c.trim());

                if (
                    cols[i.roll] === roll &&
                    cols[i.standard].toLowerCase() === standard.toLowerCase()
                ) {
                    foundRow = cols;
                    break;
                }
            }

            if (!foundRow) {
                document.getElementById("error-message").classList.remove("hidden");
                return;
            }

            // ✅ DISPLAY RESULT
            document.getElementById("result-table").innerHTML = `
                <tr><th>Student Name</th><td>${foundRow[i.name]}</td></tr>
                <tr><th>Marathi</th><td>${foundRow[i.marathi]}</td></tr>
                <tr><th>Hindi</th><td>${foundRow[i.hindi]}</td></tr>
                <tr><th>English</th><td>${foundRow[i.english]}</td></tr>
                <tr><th>Maths</th><td>${foundRow[i.maths]}</td></tr>
                <tr><th>Science</th><td>${foundRow[i.science]}</td></tr>
                <tr><th>Total</th><td>${foundRow[i.total]}</td></tr>
                <tr>
                    <th>Result</th>
                    <td class="${foundRow[i.result] === 'Pass' ? 'pass' : 'fail'}">
                        ${foundRow[i.result]}
                    </td>
                </tr>
            `;

            document.getElementById("result-container").classList.remove("hidden");
        })
        .catch(err => {
            console.error(err);
            alert("Error loading result");
        });
});

document.getElementById("print-result").addEventListener("click", () => {
    window.print();
});
