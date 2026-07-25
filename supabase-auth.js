// supabase-auth.js

// 1. Inject Supabase SDK dynamically if not loaded
if (typeof supabase === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.async = false;
    script.onload = initSupabaseAuth;
    document.head.appendChild(script);
} else {
    initSupabaseAuth();
}

let supabaseClient = null;
let isSignUpMode = false;

function initSupabaseAuth() {
    const supabaseUrl = 'https://uoypuxgewqfuytxndjgn.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVveXB1eGdld3FmdXl0eG5kamduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4Mjk4NDksImV4cCI6MjEwMDQwNTg0OX0.hhJHni3rLxgxNHB4d-FGBzSiGiKK7yZCScueecu1eI8';
    supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    // Dynamic Injection of Authentication Modal
    if (!document.getElementById('login-modal')) {
        const modalHtml = `
        <div id="login-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm hidden transition-all duration-300">
            <div class="bg-white border border-brand-navy/5 w-full max-w-sm rounded-[2rem] shadow-2xl p-8 relative text-brand-slate font-sans z-[60]">
                <button onclick="closeLoginModal()" class="absolute top-6 right-6 text-brand-slate hover:text-brand-navy p-1.5 rounded-lg hover:bg-brand-cream transition duration-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div class="text-center space-y-2 mb-6">
                    <h3 id="login-title" class="text-2xl font-serif font-bold tracking-tight text-brand-navy">Welcome Back</h3>
                    <p id="login-subtitle" class="text-brand-slate text-xs">Enter your details to sign in</p>
                </div>
                <form id="auth-form" onsubmit="handleAuthSubmit(event)" class="space-y-4">
                    <div id="signup-name-field" class="hidden">
                        <label class="block text-[10px] font-bold text-brand-slate uppercase tracking-wider mb-1">Your Name</label>
                        <input type="text" id="login-name" placeholder="e.g. Suvham" class="w-full bg-brand-cream/50 border border-brand-navy/10 rounded-xl px-4 py-2.5 text-brand-navy placeholder-brand-slate/40 text-xs focus:outline-none focus:ring-2 focus:ring-brand-terracotta/20 focus:border-brand-terracotta transition duration-200" />
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-brand-slate uppercase tracking-wider mb-1">Email Address</label>
                        <input type="email" id="login-email" required placeholder="e.g. suvham@gmail.com" class="w-full bg-brand-cream/50 border border-brand-navy/10 rounded-xl px-4 py-2.5 text-brand-navy placeholder-brand-slate/40 text-xs focus:outline-none focus:ring-2 focus:ring-brand-terracotta/20 focus:border-brand-terracotta transition duration-200" />
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-brand-slate uppercase tracking-wider mb-1">Password</label>
                        <input type="password" id="login-password" required placeholder="Minimum 6 characters" minlength="6" class="w-full bg-brand-cream/50 border border-brand-navy/10 rounded-xl px-4 py-2.5 text-brand-navy placeholder-brand-slate/40 text-xs focus:outline-none focus:ring-2 focus:ring-brand-terracotta/20 focus:border-brand-terracotta transition duration-200" />
                    </div>
                    
                    <button type="submit" id="auth-submit-btn" class="w-full bg-brand-terracotta hover:bg-brand-terracotta/90 text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-md shadow-brand-terracotta/10 text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 mt-2">
                        <span>Sign In</span>
                    </button>
                    
                    <p class="text-center text-[11px] text-brand-slate mt-2">
                        <span id="auth-toggle-text">Don't have an account?</span> 
                        <a href="javascript:void(0)" onclick="toggleAuthMode()" id="auth-toggle-btn" class="text-brand-terracotta hover:underline font-bold">Sign Up</a>
                    </p>
                </form>

                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-brand-navy/10"></div></div>
                    <div class="relative flex justify-center text-xs"><span class="bg-white px-2 text-brand-slate font-bold uppercase tracking-wider">Or</span></div>
                </div>

                <!-- Google OAuth Login -->
                <button onclick="handleGoogleLogin()" class="w-full bg-white hover:bg-brand-cream border border-brand-navy/10 text-brand-navy font-semibold py-2.5 rounded-xl transition duration-200 text-xs flex items-center justify-center gap-2 shadow-sm">
                    <svg class="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    setupHeaderButtons();

    // Listen to Auth State Changes
    supabaseClient.auth.onAuthStateChange((event, session) => {
        updateAuthUI(session);
    });

    // Check initial session
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
        updateAuthUI(session);
    });
}

function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    const title = document.getElementById('login-title');
    const subtitle = document.getElementById('login-subtitle');
    const nameField = document.getElementById('signup-name-field');
    const submitBtn = document.getElementById('auth-submit-btn');
    const toggleText = document.getElementById('auth-toggle-text');
    const toggleBtn = document.getElementById('auth-toggle-btn');
    const nameInput = document.getElementById('login-name');

    if (isSignUpMode) {
        title.textContent = "Create Account";
        subtitle.textContent = "Sign up to start saving your custom journeys";
        nameField.classList.remove('hidden');
        nameInput.setAttribute('required', 'true');
        submitBtn.textContent = "Sign Up";
        toggleText.textContent = "Already have an account?";
        toggleBtn.textContent = "Sign In";
    } else {
        title.textContent = "Welcome Back";
        subtitle.textContent = "Enter your details to sign in";
        nameField.classList.add('hidden');
        nameInput.removeAttribute('required');
        submitBtn.textContent = "Sign In";
        toggleText.textContent = "Don't have an account?";
        toggleBtn.textContent = "Sign Up";
    }
}

function openLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.add('hidden');
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const submitBtn = document.getElementById('auth-submit-btn');
    
    submitBtn.setAttribute('disabled', 'true');
    submitBtn.style.opacity = '0.7';

    try {
        if (isSignUpMode) {
            const name = document.getElementById('login-name').value.trim();
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: name
                    }
                }
            });
            if (error) throw error;
            alert('Registration completed! Please check your inbox for verification.');
        } else {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });
            if (error) throw error;
        }
        closeLoginModal();
    } catch (error) {
        alert('Authentication error: ' + error.message);
    } finally {
        submitBtn.removeAttribute('disabled');
        submitBtn.style.opacity = '1';
    }
}

async function handleGoogleLogin() {
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + window.location.pathname
            }
        });
        if (error) throw error;
    } catch (error) {
        alert('Google Sign-in error: ' + error.message);
    }
}

async function handleLogout() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
    }
}

function setupHeaderButtons() {
    const headerBtn = document.getElementById('header-login-btn');
    if (headerBtn) {
        const parent = headerBtn.parentElement;
        if (parent) {
            parent.setAttribute('onclick', 'openLoginModal()');
        }
    }
}

function updateAuthUI(session) {
    const headerBtn = document.getElementById('header-login-btn');
    const welcomeSpan = document.getElementById('ai-welcome-user');
    const avatarDiv = document.getElementById('ai-user-avatar');

    if (session && session.user) {
        const name = session.user.user_metadata.display_name || session.user.email.split('@')[0];
        
        if (headerBtn) {
            headerBtn.innerHTML = `<span class="text-brand-terracotta font-bold">Hello, ${name}</span> | <span onclick="handleLogout(); event.stopPropagation();" class="hover:text-brand-terracotta text-[10px] text-brand-slate font-normal ml-1">Logout</span>`;
            const parent = headerBtn.parentElement;
            if (parent) parent.removeAttribute('onclick');
        }
        if (welcomeSpan) {
            welcomeSpan.textContent = name;
        }
        if (avatarDiv) {
            avatarDiv.textContent = name.charAt(0).toUpperCase();
        }
    } else {
        if (headerBtn) {
            headerBtn.innerHTML = `Agent Login - Register`;
            const parent = headerBtn.parentElement;
            if (parent) parent.setAttribute('onclick', 'openLoginModal()');
        }
        if (welcomeSpan) {
            welcomeSpan.textContent = 'Guest';
        }
        if (avatarDiv) {
            avatarDiv.textContent = 'G';
        }
    }
}
