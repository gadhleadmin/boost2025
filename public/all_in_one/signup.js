
import { supabase } from './supabase.js';

async function signUpUser(email, password, fullName) {
    // 1. Marka hore samee Auth User
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (authError) {
        console.error('Error saxiixa:', authError.message);
        return;
    }

    // 2. Marka uu Auth guuleysto, ku dar xogta table-ka Profiles
    if (authData.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([
                { 
                    id: authData.user.id, // Ka soo qaad ID-ga Auth
                    full_name: fullName, 
                    email: email,
                    phone: phone,
                    country: country,
                    referral_code: myReferralCode, // Code-ka isaga loo sameeyay
                    referral_id: referredBy,      // Code-kii qofkii soo fariyo (Haddii uu jiro)
                    role: 'user',                 // Default role
                    kyc_status: 'Not Verified'
                }
            ]);

        if (profileError) {
            console.error('Error profile-ka:', profileError.message);
        } else {
            console.log('Profile-ka waa la abuuray!');
        }
    }
}