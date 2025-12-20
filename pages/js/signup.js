import { supabase } from '../db/supabase.js';

const signupForm = document.getElementById('signup-form');
const messageBox = document.getElementById('message-box');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    messageBox.style.display = "none";
    messageBox.textContent = "";

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value; // Hubi inuu HTML-ka ku jiro ID-gan
    const country = document.getElementById('country').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const referralInput = document.getElementById('referral-code').value.trim();

    if (password !== confirmPassword) {
        showMessage("Passwords-ka isma laha!", "error");
        return;
    }

    try {
        // 1. HUBI KOODKA: Baadh qofka wax soo martiqaaday
        const { data: referrer, error: refError } = await supabase
            .from('profiles')
            .select('id, full_name')
            .eq('referral_code', referralInput)
            .single();

        if (refError || !referrer) {
            showMessage("Referral code-kan ma jiro. Fadlan hubi koodka qofka ku soo martiqaaday.", "error");
            return;
        }

        // 2. AUTH: Samee account-ka (Email & Password)
        const { data, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (authError) throw authError;

        // 3. PROFILE: System-ku halkan ayuu profile-ka ku abuurayaa
        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: data.user.id,
                        full_name: fullName,
                        phone: phone,
                        email: email,
                        country: country,
                        referral_id: referrer.id, // Kaydi ID-ga qofkii soo martiqaaday
                        // 'referral_code' looma baahna halkan haddii aad Trigger-ka SQL-ka isticmaalayso,
                        // laakiin haddii kale, halkan ka dhal koodka:
                        referral_code: Math.floor(10000 + Math.random() * 90000).toString()
                    }
                ]);

            if (profileError) throw profileError;

            showMessage(`Guul! Waxaa ku soo martiqaaday ${referrer.full_name}. Fadlan hubi email-kaaga.`, "success");
            signupForm.reset();
        }

    } catch (err) {
        showMessage("Ciladi waa: " + err.message, "error");
    }
});

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;
    messageBox.style.display = "block";
}