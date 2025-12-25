import { supabase } from './supabase.js';

const signinForm = document.querySelector('#signup-form'); // Hubi inuu yahay ID-ga saxda ah

if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        
        // Waxaan u beddelay 'btn-submit' maadaama uu ahaa class-ka HTML-kaaga ku jiray
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

            const user = authData.user;

            // 2. Ka soo aqri 'role' gudaha profiles
            // FIIRO GAAR AH: Hubi in RLS Policy-ka Profiles uu oggol yahay SELECT
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profileError) throw profileError;

            // 3. Jihaynta (Redirecting)
            console.log("User role is:", profile.role);
            
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
}