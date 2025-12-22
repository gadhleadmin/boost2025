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
// ... (Koodkii hore ee Login-ka iyo Hubinta Password-ka waa sidoodii)

try {
    // 1. HUBI KOODKA: (Sidaadii hore)
    const { data: referrer, error: refError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('referral_code', referralInput)
        .single();

    if (refError || !referrer) {
        showMessage("Referral code-kan ma jiro.", "error");
        return;
    }

    // 2. AUTH: Samee account-ka
    const { data, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (authError) throw authError;

    // 3. CUSBOONAYSIIN (UPDATE): Halkan ayaa isbedelku ku jiraa!
    if (data.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                full_name: fullName,
                phone: phone,
                country: country,
                referral_id: referrer.id // Kaydi ID-ga qofkii soo martiqaaday
            })
            .eq('id', data.user.id); // Kaliya cusboonaysii qofkan hadda dhashay

        if (profileError) throw profileError;

        showMessage(`You created an account successfully!`, "success");
        signupForm.reset();
    }

} catch (err) {
    showMessage("Ciladi waa: " + err.message, "error");
}
});

function showMessage(message, type) {
    messageBox.style.display = "block";
    messageBox.textContent = message;
    messageBox.style.color = type === "error" ? "red" : "green";
}