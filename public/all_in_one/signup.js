import { supabase } from './supabase.js';

const signupForm = document.getElementById('signup-form');
const messageBox = document.getElementById('message-box');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Soo qabashada xogta Form-ka
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const referralId = document.getElementById('referral-code').value;

    // Isbaaro: Hubi password-ka
    if (password !== confirmPassword) {
        showMessage("Passwords do not match!", "error");
        return;
    }

    // 1. Is-diwaangelinta Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: fullName, // Xogtan Trigger-ka ayaa akhrisanaya
                phone: phone,
                country: country
            }
        }
    });

    if (error) {
        showMessage(error.message, "error");
    } else {
        showMessage("Success! Check your email for verification.", "success");
        // Halkan waxaad u diri kartaa User-ka Dashboard-ka ama login page
    }
});

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;
    messageBox.style.display = 'block';
}