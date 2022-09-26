const IncompleteFieldsException = { message: 'Wprowadź wszystkie działania' };
const IncorrectOperationSignException = { message: 'Wprowadź poprawne wartości działań' };
const IncompleteNumbersException = { message: 'Wprowadź wszystkie liczby' };
const TooLowNumberException = { message: 'Wprowadź dodatnie cyfry' };

document.addEventListener('DOMContentLoaded', () => {
    const results = document.querySelectorAll('input.result');
    const signs = document.querySelectorAll('input.sign');
    const numbers = document.querySelectorAll('input.number');
    const signsToCompare = ['+', '-', 'x', '/'];
    const submit = document.querySelector('button.submit');

    submit.addEventListener('click', (event) => {
        event.preventDefault();
        try {
            signs.forEach(sign => {
                if (sign.value == '') {
                    throw IncompleteFieldsException;
                } else if (!signsToCompare.includes(sign.value)) {
                    throw IncorrectOperationSignException;
                }
            });
            numbers.forEach(number => {
                if (number.value == '') {
                    throw IncompleteNumbersException;
                } else if (parseInt(number.value) < 0) {
                    throw TooLowNumberException;
                }
            });
        } catch (e) {
            alert(e.message);
            return;
        }
        solve(results, signs, numbers);
    });
});

function solve(results, signs, numbers) {
    let final = true;
    results[0].value = -1;
    results[1].value = 0;
    results[3].value = 0;
    results[4].value = 0;
    while (final) {
        insertData(results);
        if (getSign(signs[1].value) === '*') {
            results[2].value = multiplication(results[0].value, results[1].value, getSign(signs[0].value), numbers[4].value);

        } else {
            firstRow = math.evaluate(results[0].value + getSign(signs[0].value) + results[1].value);
            results[2].value = insertDigitToLastCell(firstRow, numbers[4].value, getSign(signs[1].value));
        }
        if (parseInt(results[2].value) === -1 || parseInt(results[2].value) > 9) {
            continue;
        }
        if (getSign(signs[6].value === '*')) {
            results[5].value = multiplication(results[3].value, results[4].value, getSign(signs[5].value), numbers[6].value);
        } else {
            secondRow = math.evaluate(results[3].value + getSign(signs[5].value) + results[4].value);
            results[5].value = insertDigitToLastCell(secondRow, numbers[6].value, getSign(signs[6].value));
        }
        if (parseInt(results[5].value) === -1 || parseInt(results[5].value) > 9) {
            continue;
        }
        if (getSign(signs[7].value) === '*') {
            results[6].value = multiplication(results[0].value, results[3].value, getSign(signs[2].value), numbers[0].value);
        } else {
            firstColumn = math.evaluate(results[0].value + getSign(signs[2].value) + results[3].value);
            results[6].value = insertDigitToLastCell(firstColumn, numbers[0].value, getSign(signs[7].value));
        }
        if (parseInt(results[6].value) === -1 || parseInt(results[6].value) > 9) {
            continue;
        }
        if (getSign(signs[8].value) === '*') {
            results[7].value = multiplication(results[1].value, results[4].value, getSign(signs[3].value), numbers[1].value);
        } else {
            secondColumn = math.evaluate(results[1].value + getSign(signs[3].value) + results[4].value);
            results[7].value = insertDigitToLastCell(secondColumn, numbers[1].value, getSign(signs[8].value));
        }
        if (parseInt(results[7].value) === -1 || parseInt(results[7].value) > 9) {
            continue;
        }
        if (getSign(signs[9].value) === '*') {
            results[8].value = multiplication(results[2].value, results[5].value, getSign(signs[4].value), numbers[2].value);
        } else {
            thirdColumn = math.evaluate(results[2].value + getSign(signs[4].value) + results[5].value);
            results[8].value = insertDigitToLastCell(thirdColumn, numbers[2].value, getSign(signs[9].value));
        }
        if (parseInt(results[8].value) === -1 || parseInt(results[8].value) > 9) {
            continue;
        }
        final = checkBoard(results, numbers, signs);
    }
}

function insertData(results) {
    if (parseInt(results[0].value) === parseInt(9)) {
        results[0].value = parseInt(0);
        results[1].value = parseInt(results[1].value) + 1;
        return;
    }
    if (parseInt(results[1].value) === parseInt(9)) {
        results[1].value = parseInt(0);
        results[3].value = parseInt(results[3].value) + 1;
        return;
    }
    if (parseInt(results[3].value) === parseInt(9)) {
        results[3].value = parseInt(0);
        results[4].value = parseInt(results[4].value) + 1;
        return;
    }
    if (parseInt(results[4].value) === parseInt(9)) {
        if (parseInt(results[3].value) === parseInt(9)) {
            if (parseInt(results[1].value) === parseInt(9)) {
                if (parseInt(results[0].value) === parseInt(9)) {
                    return;
                }
            }
        }
    }

    results[0].value = parseInt(results[0].value) + 1;
}

function getSign(sign) {
    switch (sign) {
        case '+':
            return '+';
        case '-':
            return '-';
        case 'x':
            return '*';
        case '/':
            return '/';
    }
}

function insertDigitToLastCell(rowsum, number, sign) {
    switch (sign) {
        case '+':
            return number - rowsum > 0 ? number - rowsum : -1;
        case '-':
            return rowsum - number > 0 ? rowsum - number : -1;
        case '*':
            if (rowsum === 0) {
                return -1;
            }
            return Number.isInteger(number / rowsum) ? (number / rowsum) : -1;
    }
}

function checkBoard(results, numbers, signs) {

    firstRow = math.evaluate(results[0].value + getSign(signs[0].value) + results[1].value + getSign(signs[1].value) + results[2].value);
    if (!(firstRow === parseInt(numbers[3].value))) {
        return true;
    }
    secondRow = math.evaluate(results[3].value + getSign(signs[5].value) + results[4].value + getSign(signs[6].value) + results[5].value);
    if (!(secondRow === parseInt(numbers[5].value))) {
        return true;
    }
    thirdRow = math.evaluate(results[6].value + getSign(signs[10].value) + results[7].value + getSign(signs[11].value) + results[8].value);
    if (!(thirdRow === parseInt(numbers[7].value))) {
        return true;
    }
    firstColumn = math.evaluate(results[0].value + getSign(signs[2].value) + results[3].value + getSign(signs[7].value) + results[6].value);
    if (!(firstColumn === parseInt(numbers[0].value))) {
        return true;
    }
    secondColumn = math.evaluate(results[1].value + getSign(signs[3].value) + results[4].value + getSign(signs[8].value) + results[7].value);
    if (!(secondColumn === parseInt(numbers[1].value))) {
        return true;
    }
    thirdColumn = math.evaluate(results[2].value + getSign(signs[4].value) + results[5].value + getSign(signs[9].value) + results[8].value);
    if (!(thirdColumn === parseInt(numbers[2].value))) {
        return true;
    }
    return false;
}

function multiplication(number1, number2, sign1, result) {
    if (parseInt(number2) === 0) {
        return -1;
    }
    const part1 = result - number1;
    if (sign1 === '-') {
        number2 = number2 * (-1);
    }
    return part1 / number2 > 0 ? part1 / number2 : -1;
}