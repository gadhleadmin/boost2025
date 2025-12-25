import { supabase } from './supabase.js';

// Hubi in halkan uu ku qoran yahay ID-ga saxda ah ee Form-ka signin-ka
const signinForm = document.querySelector('#signin-form'); 

if (signinForm) {
    console.log("Login form found!"); // Tijaabo

    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Sign-in button clicked!");

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const submitBtn = document.querySelector('.btn-submit'); 

        if (submitBtn) {
            submitBtn.innerText = "Checking...";
            submitBtn.disabled = true;
        }

        try {
            // 1. Samee Login
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (authError) throw authError;

            console.log("Auth success, fetching profile...");

            // 2. Ka soo aqri 'role'
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', authData.user.id)
                .single();

            if (profileError) throw profileError;

            // 3. Jihaynta
            if (profile.role === 'admin') {
                window.location.href = './admin.html';
            } else {
                window.location.href = './user-dashboard.html';
            }

        } catch (err) {
            alert("Error: " + err.message);
            console.error("Login Error:", err);
        } finally {
            if (submitBtn) {
                submitBtn.innerText = "Sign In Now";
                submitBtn.disabled = false;
            }
        }
    });
} else {
    console.error("Error: Form-ka 'signin-form' lama helin! Hubi ID-ga HTML-ka.");
}