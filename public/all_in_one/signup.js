import { supabase } from './supabase.js';

const signupForm = document.getElementById('signup-form');
const messageBox = document.getElementById('message-box');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 1. Soo qabashada xogta Form-ka
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const referralInput = document.getElementById('referral-code').value.trim();

    // 2. Isbaarooyin (Basic Validations)
    if (password !== confirmPassword) {
        showMessage("Passwords do not match!", "error");
        return;
    }

    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.innerText = "Verifying Referral...";
    submitBtn.disabled = true;

    try {
        // 3. Hubi haddii Referral Code-ka uu dhab ahaan u jiro
        const { data: referrer, error: refError } = await supabase
            .from('profiles')
            .select('id, referral_code')
            .eq('referral_code', referralInput)
            .maybeSingle(); 

        if (refError) throw refError;

        // Isbaaro: Haddii code-ka la heli waayo
        if (!referrer) {
            showMessage("Invalid Referral Code! Waxaad u baahan tahay code sax ah si aad isugu diwaangeliso.", "error");
            return; 
        }

        // 4. Haddii uu code-ku sax yahay, samee Is-diwaangelinta
        submitBtn.innerText = "Creating Account...";
        const { data, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone,
                    country: country,
                    referral_id: referralInput 
                }
            }
        });

        if (authError) throw authError;

        showMessage("Success! Check your email for verification.", "success");
        signupForm.reset();

    } catch (err) {
        showMessage(err.message, "error");
    } finally {
        submitBtn.innerText = "Sign Up Now";
        submitBtn.disabled = false;
    }
}); // <--- Tani waxay ahayd midda kaa dhiman!

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;
    messageBox.style.display = 'block';
}