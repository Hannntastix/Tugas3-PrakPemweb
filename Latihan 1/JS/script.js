// Konstanta untuk bobot penilaian dan batas kelulusan
const ASSIGNMENT_WEIGHT = 0.3;
const MIDEXAM_WEIGHT = 0.3;
const FINALEXAM_WEIGHT = 0.4;
const PASSING_SCORE = 60;

function calculateGrade() {
    // Mengambil nilai input
    const assignment = parseFloat(document.getElementById("assignment").value);
    const midExam = parseFloat(document.getElementById("midExam").value);
    const finalExam = parseFloat(document.getElementById("finalExam").value);
    const resultDiv = document.getElementById("result");

    // Validasi input
    if (isNaN(assignment) || isNaN(midExam) || isNaN(finalExam) ||
        assignment < 0 || assignment > 100 ||
        midExam < 0 || midExam > 100 ||
        finalExam < 0 || finalExam > 100) {
        resultDiv.textContent = "Masukkan nilai yang valid (0-100) untuk semua komponen.";
        resultDiv.className = "result fail";
        return;
    }

    // Menghitung nilai rata-rata tertimbang
    let weightedAverage = (assignment * ASSIGNMENT_WEIGHT) +
        (midExam * MIDEXAM_WEIGHT) +
        (finalExam * FINALEXAM_WEIGHT);
    let grade;

    // Menentukan nilai huruf
    if (weightedAverage >= 90) {
        grade = "A";
    } else if (weightedAverage >= 80) {
        grade = "B";
    } else if (weightedAverage >= 70) {
        grade = "C";
    } else if (weightedAverage >= 60) {
        grade = "D";
    } else {
        grade = "E";
    }

    // Menentukan status kelulusan
    const status = weightedAverage >= PASSING_SCORE ? "Lulus" : "Gagal";
    const statusClass = weightedAverage >= PASSING_SCORE ? "success" : "fail";

    // Menampilkan hasil
    resultDiv.innerHTML = `
        <p>Nilai Tugas (30%): ${(assignment * ASSIGNMENT_WEIGHT).toFixed(2)}</p>
        <p>Nilai UTS (30%): ${(midExam * MIDEXAM_WEIGHT).toFixed(2)}</p>
        <p>Nilai UAS (40%): ${(finalExam * FINALEXAM_WEIGHT).toFixed(2)}</p>
        <p>Rata-Rata Tertimbang: ${weightedAverage.toFixed(2)}</p>
        <p>Nilai Huruf: ${grade}</p>
        <p class="${statusClass}">Status: ${status}</p>
    `;
    resultDiv.className = `result ${statusClass}`;
}
