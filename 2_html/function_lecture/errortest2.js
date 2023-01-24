let num = -1;

try {
    if (num < 0) {
        throw new Error("num < 0");
    }
} catch (err) {
    num = 10;
    console.error(err);
}

console.log('num: ' + num);

