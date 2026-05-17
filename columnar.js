function runColumnar(text, key, decrypt) {
    let t = text.toUpperCase().replace(/[^А-ЯЁ]/g, "");
    let k = key.toUpperCase().replace(/[^А-ЯЁ]/g, "");
    if (!k || !t) return "Ошибка входных данных";

    let cols = k.length;
    let rows = Math.ceil(t.length / cols);

    // Веса букв для сортировки
    let weights = k.split('').map((c, i) => ({ char: c, pos: i, val: ALPHABET.indexOf(c) }));
    weights.sort((a, b) => a.val - b.val || a.pos - b.pos);
    let order = weights.map(w => w.pos);

    if (!decrypt) {
        let res = "";
        for (let c of order) {
            for (let r = 0; r < rows; r++) {
                let idx = r * cols + c;
                if (idx < t.length) res += t[idx];
            }
        }
        return res;
    } else {
        let grid = Array.from({ length: rows }, () => Array(cols).fill(null));
        let curr = 0;
        let rem = t.length % cols;

        for (let c of order) {
            let h = (rem === 0 || c < rem) ? rows : rows - 1;
            for (let r = 0; r < h; r++) {
                grid[r][c] = t[curr++];
            }
        }

        let res = "";
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c]) res += grid[r][c];
            }
        }
        return res;
    }
}