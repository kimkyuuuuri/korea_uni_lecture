const grading = require('./grading');

score = 93

function student_grade(number) {
    if (number > 90) {
        return grading.a_grade;
    } else if (number > 80) {
        return grading.b_grade;
    } else {
        return grading.c_grade;
    }
}

console.log(student_grade(score));

module.exports = {student_grade, grading};