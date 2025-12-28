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
        // 3. Hubi haddii Referral Code-ka uu jiro (Validation)
        const { data: referrer, error: refError } = await supabase
            .from('profiles')
            .select('id, referral_code')
            .eq('referral_code', referralInput)
             .limit(1);

        if (refError || !referrer) {
            showMessage("Invalid Referral Code! Waxaad u baahan tahay code sax ah si aad isugu diwaangeliso.", "error");
            submitBtn.innerText = "Sign Up Now";
            submitBtn.disabled = false;
            return; // Halkan ku jooji, ha u gudbin signUp
        }

        // 4. Haddii uu code-ku sax yahay, hadda samee Is-diwaangelinta Auth
        submitBtn.innerText = "Creating Account...";
        const { data, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone,
                    country: country,
                    referral_id: referralInput // Kan waxaa isticmaali doona Trigger-kaaga
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
});

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;
    messageBox.style.display = 'block';
}