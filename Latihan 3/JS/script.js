const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

username.addEventListener("keyup", () => {
    const usernameValue = username.value;
    if (usernameValue.length < 5 || usernameValue.length > 20 || !/^[a-zA-Z0-9]+$/.test(usernameValue)) {
        usernameError.textContent = "Username harus 5-20 karakter dan alfanumerik.";
    } else {
        usernameError.textContent = "";
    }
});

email.addEventListener("change", () => {
    const emailValue = email.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        emailError.textContent = "Format email tidak valid.";
    } else {
        emailError.textContent = "";
    }
});

password.addEventListener("keyup", () => {
    const passwordValue = password.value;
    if (passwordValue.length < 8 || !/[0-9]/.test(passwordValue) || !/[a-zA-Z]/.test(passwordValue)) {
        passwordError.textContent = "Password minimal 8 karakter, harus mengandung angka dan huruf.";
    } else {
        passwordError.textContent = "";
    }
});

confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = "Password tidak cocok.";
    } else {
        confirmPasswordError.textContent = "";
    }
});

document.getElementById("registrationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    if (usernameError.textContent || username.value === "") {
        isValid = false;
        usernameError.textContent = "Username tidak boleh kosong atau salah.";
    }

    if (emailError.textContent || email.value === "") {
        isValid = false;
        emailError.textContent = "Email tidak boleh kosong atau salah.";
    }

    if (passwordError.textContent || password.value === "") {
        isValid = false;
        passwordError.textContent = "Password tidak boleh kosong atau salah.";
    }

    if (confirmPasswordError.textContent || confirmPassword.value === "") {
        isValid = false;
        confirmPasswordError.textContent = "Konfirmasi password tidak boleh kosong atau salah.";
    }

    if (isValid) {
        alert("Pendaftaran berhasil!");
        document.getElementById("registrationForm").reset();
    }
});
