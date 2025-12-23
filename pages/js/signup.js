import { supabase } from '../db/supabase.js';

const signupForm = document.getElementById('signup-form');
const messageBox = document.getElementById('message-box');

// Function lagu tuso fariimaha (Success/Error)
function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;
    messageBox.style.display = 'block';
    
    // In la qariyo 5 ilbiriqsi ka dib
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 5000);
}

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Soo qaad xogta foomka
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const referralInput = document.getElementById('referral-code').value.trim();

    // 2. Hubi Passwords-ka
    if (password !== confirmPassword) {
        showMessage("Passwords-ka isma laha!", "error");
        return;
    }

    if (password.length < 8) {
        showMessage("Password-ku waa inuu ka badnaadaa 8 xaraf", "error");
        return;
    }

    try {
        // 3. Diiwaangelinta (Auth SignUp)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (authError) throw authError;

        if (authData.user) {
            const userId = authData.user.id;
            let finalReferralId = null;

            // 4. Hubi haddii Referral Code la soo geliyay
            if (referralInput !== "") {
                const { data: referrer, error: refError } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('referral_code', referralInput)
                    .single();

                if (!refError && referrer) {
                    finalReferralId = referrer.id;
                } else {
                    console.warn("Referral code-kaas ma jiro.");
                }
            }

            // 5. Ku dar xogta miiska 'profiles'
            const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                    id: userId,
                    full_name: fullName,
                    email: email,
                    phone: phone,
                    country: country,
                    referral_id: finalReferralId
                });

            if (insertError) throw insertError;

            showMessage("Account successfully created! Please check your email for confirmation.", "success");
            signupForm.reset();
            
            // Sug 3 ilbiriqsi ka dibna u dir Sign In
            setTimeout(() => {
                window.location.href = './signin.html';
            }, 3000);
        }

    } catch (err) {
        console.error("Cilad dhacday:", err.message);
        showMessage("Ciladi waa: " + err.message, "error");
    }
});