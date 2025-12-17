import { supabase } from '../db/supabase.js';

const signupForm = document.getElementById('signup-form');
const messageBox = document.getElementById('message-box');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Nadiifi farriimihii hore
    messageBox.textContent = "";
    messageBox.className = "message";

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Hubi Password-ka
    if (password !== confirmPassword) {
        showMessage("Passwords-ka isma laha!", "error");
        return;
    }

    try {
        // 1. Isdiiwaangelinta (Auth)
        const { data, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (authError) throw authError;

        // 2. Ku darista shaxda Profiles
        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: data.user.id,
                        full_name: fullName,
                        email: email,
                        country: country
                    }
                ]);

            if (profileError) throw profileError;

            // Haddii wax walba guulaystaan
            showMessage("You are successfully registered! Fadlan hubi email-kaaga.", "success");
            signupForm.reset();
        }
    } catch (err) {
        // Haddii ay ciladi jirto
        showMessage("Ciladi waa: " + err.message, "error");
    }
});

// Shaqada soo bandhigista farriimaha
function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;
    messageBox.style.display = "block";
}