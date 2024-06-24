// Read input, convert string to float
function getInput(id) {
    return parseFloat(document.getElementById(id).value);
}

function addVectors() {
    let a1 = getInput('a1');
    let a2 = getInput('a2');
    let a3 = getInput('a3');

    let b1 = getInput('b1');
    let b2 = getInput('b2');
    let b3 = getInput('b3');

    let r1 = a1 + b1;
    let r2 = a2 + b2;
    let r3 = a3 + b3;

    document.getElementById('result').innerText = `R = (${r1}, ${r2}, ${r3})`;
}

function subtractVectors() {
    let a1 = getInput('a1');
    let a2 = getInput('a2');
    let a3 = getInput('a3');

    let b1 = getInput('b1');
    let b2 = getInput('b2');
    let b3 = getInput('b3');

    let r1 = a1 - b1;
    let r2 = a2 - b2;
    let r3 = a3 - b3;

    document.getElementById('result').innerText = `R = (${r1}, ${r2}, ${r3})`;
}

function scalerVectors() {
    let a1 = getInput('scaler_a1');
    let a2 = getInput('scaler_a2');
    let a3 = getInput('scaler_a3');

    let scaler = getInput('scaler');

    let r1 = a1 * scaler;
    let r2 = a2 * scaler;
    let r3 = a3 * scaler;

    document.getElementById('scaler_result').innerText = `R = (${r1}, ${r2}, ${r3})`;
}

function dotProduct() {
    let a1 = getInput('dotproduct_a1');
    let a2 = getInput('dotproduct_a2');
    let a3 = getInput('dotproduct_a3');

    let b1 = getInput('dotproduct_b1');
    let b2 = getInput('dotproduct_b2');
    let b3 = getInput('dotproduct_b3');

    let r1 = a1 * b1;
    let r2 = a2 * b2;
    let r3 = a3 * b3;

    rfinal = r1 + r2 + r3;

    document.getElementById('dotprod_result').innerText = `R = (${rfinal})`;
}