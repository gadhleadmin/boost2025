import { supabase } from '../db/supabase.js';

const signinForm = document.querySelector('form');

signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Soo qaad xogta foomka
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // 1. Xaqiijinta isticmaalaha (Auth Login)
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (authError) throw authError;

        // 2. Haddii login-ku guulaysto, soo qaad xogta profile-ka (gaar ahaan Role-ka)
        if (authData.user) {
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', authData.user.id)
                .single();

            if (profileError) {
                console.error("Ma la helin profile-ka:", profileError.message);
                alert("Cilad ayaa ka dhacday helitaanka xogtaada.");
                return;
            }

            // 3. KALA SAARISTA (REDIRECT LOGIC)
            if (profile.role === 'admin') {
                // Haddii uu yahay Admin
                alert("Ku soo dhawaaw Admin Panel!");
                window.location.href = '../sub-pages/admin.html'; 
            } else {
                // Haddii uu yahay User caadi ah (ama role kasta oo kale)
                alert("Si guul leh ayaad u gashay!");
                window.location.href = '../sub-pages/user-dashbourd.html';
            }
        }

    } catch (error) {
        console.error("Cilad login:", error.message);
        alert("Email ama Password-ka ayaa khaldan.");
    }
});