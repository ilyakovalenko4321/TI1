function runAutokey(text, key, decrypt) {
    let t = text.toUpperCase().replace(/[^А-ЯЁ]/g, "");
    let k = key.toUpperCase().replace(/[^А-ЯЁ]/g, "");
    if (!k || !t) return "Ошибка входных данных";

    let res = "";
    let n = ALPHABET.length;
    let stream = k.split('');

    for (let i = 0; i < t.length; i++) {
        let mIdx = ALPHABET.indexOf(t[i]);
        let kIdx = ALPHABET.indexOf(stream[i]);

        if (!decrypt) {
            let cIdx = (mIdx + kIdx) % n;
            res += ALPHABET[cIdx];
            stream.push(t[i]); // В шифровании добавляем открытый текст в ключ
        } else {
            let pIdx = (mIdx - kIdx + n) % n;
            let pChar = ALPHABET[pIdx];
            res += pChar;
            stream.push(pChar); // В дешифровании добавляем расшифрованный текст
        }
    }
    return res;
}