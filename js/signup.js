import { supabase } from './supabase.js';

const signupForm = document.querySelector('#signup-form');
const messageBox = document.querySelector('#message-box');

// Function lagu tuso fariimaha (Success/Error)
const showMessage = (msg, type) => {
    messageBox.innerText = msg;
    messageBox.className = `message ${type}`;
    messageBox.style.display = 'block';
};

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Helitaanka xogta form-ka
        const fullName = document.querySelector('#full-name').value;
        const email = document.querySelector('#email').value;
        const phone = document.querySelector('#phone').value;
        const country = document.querySelector('#country').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirm-password').value;
        const referredBy = document.querySelector('#referral-code').value; // Qofka soo fariyo

        // 2. Hubinta Password-ka
        if (password !== confirmPassword) {
            showMessage("Passwords do not match!", "error");
            return;
        }

        const submitBtn = document.querySelector('.btn-submit');
        submitBtn.innerText = "Processing...";
        submitBtn.disabled = true;

        try {
            // 3. Samee User-ka cusub (Supabase Auth)
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (authError) throw authError;

            if (authData.user) {
                // 4. Samee Referral Code isaga u gaar ah (Tusaale: user-ka magaciisa + tiro aan kala soocnayn)
                const myReferralCode = "BI-" + Math.floor(1000 + Math.random() * 9000);

                // 5. Ku dar xogta table-ka 'public.profiles'
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([{
                        id: authData.user.id,
                        full_name: fullName,
                        email: email,
                        phone: phone,
                        country: country,
                        referral_code: myReferralCode, // Code-ka isaga loo sameeyay
                        referral_id: referredBy,      // Code-kii qofkii soo fariyo (Haddii uu jiro)
                        role: 'user',                 // Default role
                        kyc_status: 'Not Verified'
                    }]);

                if (profileError) throw profileError;

                showMessage("Account created successfully! Please check your email for confirmation.", "success");
                signupForm.reset();
            }

        } catch (err) {
            showMessage(err.message, "error");
        } finally {
            submitBtn.innerText = "Sign Up Now";
            submitBtn.disabled = false;
        }
    });
}