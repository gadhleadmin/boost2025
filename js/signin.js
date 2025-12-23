import { supabase } from './supabase.js';

const signinForm = document.querySelector('#signin-form');

if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const submitBtn = document.querySelector('#submit-btn');

        submitBtn.innerText = "Checking...";
        submitBtn.disabled = true;

        try {
            // 1. Marka hore soo gal (Sign In)
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (authError) throw authError;

            const user = authData.user;

            // 2. Ka soo aqri 'role' table-ka profiles
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profileError) throw profileError;

            // 3. Kala hagee (Redirecting)
            if (profile.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'user.html';
            }

        } catch (err) {
            alert("Error: " + err.message);
            console.error(err);
        } finally {
            submitBtn.innerText = "Sign In";
            submitBtn.disabled = false;
        }
    });
}