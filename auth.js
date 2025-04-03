document.addEventListener('DOMContentLoaded', function() {
    //Signup
    if (document.getElementById("signupform")) {
        
        const emailerror = document.getElementById("emailerror");
        const pswderror = document.getElementById("pswderror");
        const nameerror = document.getElementById("nameerror");
        const phoneerror = document.getElementById("phoneerror");
        const stateerror = document.getElementById("stateerror");
        const signUpForm = document.getElementById("signupform");
        const passwordInput = document.getElementById("password");

        //password
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                if (pswderror) pswderror.textContent = "";
                const bar = document.querySelector(".sbar");
                if (bar) bar.className = "sbar";
                
                if (password.length > 0) { 
                    validatepswd(password); 
                }
            });
        }

        
        if (signUpForm) {
            signUpForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                
                const email = document.getElementById("email")?.value;
                const password = document.getElementById("password")?.value;
                const fullname = document.getElementById("fullname")?.value.trim();
                const phone = document.getElementById("phone")?.value.trim();
                const state = document.getElementById("state")?.value;
                
                
                if (emailerror) emailerror.textContent = "";
                if (phoneerror) phoneerror.textContent = "";
                if (nameerror) nameerror.textContent = "";
                if (stateerror) stateerror.textContent = "";
                const bar = document.querySelector(".sbar");
                if (bar) bar.className = "sbar";

                
                const ismailvalid = validatemail(email);
                const ispswdvalid = validatepswd(password);
                const isNameValid = validatename(fullname);
                const isPhoneValid = validatephone(phone);
                const isStateValid = validatestate(state);
                
                if(isNameValid && isPhoneValid && isStateValid && ismailvalid && ispswdvalid) {
                    //user object
                    const user = {
                        name: fullname,
                        email: email,
                        password: password, 
                        phone: phone,
                        state: state
                    };
                    
                    
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    window.location.href = "login.html";
                }
            });
        }

        
        function validatestate(state) {
            if(!state) {
                if (stateerror) stateerror.textContent = "Please select a state";
                return false;
            }
            return true;
        }

        function validatephone(phone) {
            const phoneRegex = /^[0-9]{10}$/;
            if(!phoneRegex.test(phone)) {
                if (phoneerror) phoneerror.textContent = "Enter a valid 10-digit phone number";
                return false;
            }
            return true;
        }

        function validatemail(email) {
            var mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(email.match(mailformat)){
                return true;
            }
            else {
                if (emailerror) emailerror.textContent = "Enter Valid Email ID";
                return false;
            }
        }

        function validatename(name) {
            const nameRegex = /^[A-Za-z\s]+$/; 
            if(!nameRegex.test(name)) {
                if (nameerror) nameerror.textContent = "No numbers or special characters allowed";
                return false;
            }
            return true;
        }

        function validatepswd(password) {
            let strength = 0;
            const bar = document.querySelector(".sbar");
            
           
            const hasLower = /[a-z]/.test(password);
            const hasUpper = /[A-Z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecial = /[^A-Za-z0-9]/.test(password);
            const isLongEnough = password.length >= 8;
        
            
            if (isLongEnough) strength++;
            if (hasLower) strength++;
            if (hasUpper) strength++;
            if (hasNumber) strength++;
            if (hasSpecial) strength++;
        
            if (bar && pswderror) {
                bar.className = "sbar"; 
                
                if (!isLongEnough) {
                    bar.classList.add("weak");
                    pswderror.textContent = "Password must be at least 8 characters";
                }
                else if (!(hasLower && hasUpper && hasNumber && hasSpecial)) {
                    bar.classList.add("medium");
                    pswderror.textContent = "Medium - Needs lowercase, uppercase, number, and special char";
                }
                else {
                    bar.classList.add("strong");
                    pswderror.textContent = "Strong password!";
                }
            }
            
            return isLongEnough && hasLower && hasUpper && hasNumber && hasSpecial;
        }
    }

    //login
    if (document.getElementById("loginForm")) {
        const loginForm = document.getElementById("loginForm");
        const emailerror = document.getElementById("emailerror") || document.getElementById("loginEmailError");
        const pswderror = document.getElementById("pswderror") || document.getElementById("loginPasswordError");

        if (loginForm) {
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const email = document.getElementById("loginEmail")?.value;
                const password = document.getElementById("loginPassword")?.value;

                if (emailerror) emailerror.textContent = "";
                if (pswderror) pswderror.textContent = "";
                
                
                const storedUser = JSON.parse(localStorage.getItem("currentUser"));
                
                if (!storedUser) {
                    if (emailerror) emailerror.textContent = "No account found. Please sign up first.";
                    return;
                }
                
                if (email !== storedUser.email) {
                    if (emailerror) emailerror.textContent = "Email not registered";
                    return;
                }
                
                if (password !== storedUser.password) {
                    if (pswderror) pswderror.textContent = "Incorrect password";
                    return;
                }
                
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "home.html";
            });
        }
    }
});
