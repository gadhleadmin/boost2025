import { supabase } from '../db/supabase.js';

const signinForm = document.querySelector('form');

signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Soo qaad xogta foomka
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // 1. Xaqiijinta isticmaalaha (Login)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        // 2. Haddii login-ku guulaysto
        if (data.user) {
            alert("Si guul leh ayaad u gashay!");
            // U gudbi bogga dashboard-ka
            window.location.href = '../sub-pages/user-dasbourd.html';
        }

    } catch (error) {
        console.error("Cilad login:", error.message);
        alert("Email ama Password-ka ayaa khaldan: " + error.message);
    }
});