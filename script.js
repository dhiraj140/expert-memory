document.getElementById("check-result").addEventListener("click", () => {

    const standard = document.getElementById("standard").value.trim();
    const roll = document.getElementById("roll").value.trim();

    console.log("INPUT:", roll, standard);

    const csvUrl =
        "https://docs.google.com/spreadsheets/d/1Z3I8OzAkb627gxcg6BqCOHcr9X_d7YZeaGLXNK0UVjc/gviz/tq?tqx=out:csv";

    fetch(csvUrl)
        .then(res => res.text())
        .then(text => {

            console.log("RAW CSV:", text);

            const rows = text
                .trim()
                .split("\n")
                .map(r => r.replace(/"/g, "").trim());

            const headers = rows[0].split(",").map(h => h.trim());
            console.log("HEADERS:", headers);

            const index = (name) => headers.indexOf(name);

            const iRoll = index("roll_no");
            const iStd = index("standard");

            console.log("INDEX:", iRoll, iStd);

            let found = false;

            for (let i = 1; i < rows.length; i++) {
                const cols = rows[i].split(",").map(c => c.trim());

                console.log("ROW:", cols);

                if (
                    cols[iRoll] === roll &&
                    cols[iStd].toLowerCase() === standard.toLowerCase()
                ) {
                    found = true;
                    alert("MATCH FOUND ✅");
                    break;
                }
            }

            if (!found) {
                alert("NO MATCH FOUND ❌ — check console");
            }
        })
        .catch(err => console.error(err));
});
