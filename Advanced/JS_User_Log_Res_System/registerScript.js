const nameEl = document.querySelector("#name");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const subjectEl = document.querySelector("#subject");
const msgEl = document.querySelector("#msg");
// const butn = document.querySelector("#sendbtn");
const form = document.querySelector('#signup');
//const resBt = document.querySelector("#resbtn");

const inputEl = [nameEl, emailEl, passwordEl, confirmPasswordEl, 
                  subjectEl, msgEl];


form.addEventListener("reset", () => {
    console.log('In resetForm()');
    for (elem of inputEl) {
        const formField = elem.parentElement;
        formField.classList.remove('success');
        formField.classList.remove('error');
        const error = formField.querySelector('small');
        error.textContent = '';
    }
});

const checkName = ( () => {
    let valid = false;
    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, 'Name cannot be blank.');
    }
    else {
        showSuccess(nameEl);
        valid = true;
    }

    return valid;
});

const checkSubject = ( () => {
    let valid = false;
    const subject = subjectEl.value.trim();

    if (!isRequired(subject)) {
        showError(subjectEl, 'Subject cannot be blank.');
    }
    else {
        showSuccess(subjectEl);
        valid = true;
    }

    return valid;
});

const checkMessage = ( () => {
    let valid = false;
    const msg = msgEl.value.trim();

    if (!isRequired(msg)) {
        showError(msgEl, 'Message cannot be blank.');
    }
    else {
        showSuccess(msgEl);
        valid = true;
    }

    return valid;
});


const checkEmail = ( () => {
    let valid = false;
    const email = emailEl.value.trim();

    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    }
    else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.');
    }
    else {
        showSuccess(emailEl);
        valid = true;
    }

    return valid;
});


const checkPassword = ( () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    }
    else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (!@#$%^&*)');
    }
    else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
});


const checkConfirmPassword = ( () => {
    let valid = false;
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again.');
    } 
    else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'Confirm password does not match.');
    } 
    else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
});

// check email validity using regex
const isEmailValid = ( (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
});


// check password strength with regex
/*
^	                The password starts
(?=.*[a-z])	        The password must contain at least one lowercase character
(?=.*[A-Z])	        The password must contain at least one uppercase character
(?=.*[0-9])	        The pasword must contain at least one number
(?=.*[!@#$%^&*])	The password must contain at least one special character.
(?=.{8,})	        The password must be eight characters or longer
*/

const isPasswordSecure = ( (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
});

// returns false if the input argument is empty
const isRequired = ( (value) => {
    return value === '' ? false : true;
});

// returns false if the length argument is not between the min and max argument:
const isBetweenLen = ( (length, min, max) => {
    return (length < min || length > max) ? false : true;
});

// highlights the border of the input field and displays 
// an error message if the input field is invalid:

const showError = (input, message) => {
    // get the form-field element's parent which is the div element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element's parent which is the div element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', (e) => {

    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword(),
        isSubjectValid = checkSubject(),
        isMessageValid = checkMessage();

    let isFormValid = isNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isSubjectValid &&
        isMessageValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'sendEmail.php', true);
        // xhr.open('GET', 'sendEmail.php', true);
        // xhr.responseType = 'json'; // not to be used since JSON is ultimately string text data
        xhr.responseType = 'text';
        const data = {
               name: nameEl.value.trim(),
               email: emailEl.value.trim(),
               subject: subjectEl.value.trim(),
               msg: msgEl.value.trim()
        };

        
        console.log("Client:\n")
        console.log(data);
    

        xhr.onreadystatechange = function() { 
            if (this.readyState == 4 && this.status == 200) { 
                let myObj = JSON.parse(this.responseText); 

                // if (myObj["status"] == "success")
                // Sweet Alert popup message added on valid registration.
                    swal("Welcome Aboard!", "You have registered successfully! ", "success");
                // else
                    // swal("Oops!", "Mail server error. ", "error");

                /*
                let ff = butn.parentElement;
                let err = ff.querySelector('small');
                err.textContent = "Response: " + myObj;
                */

                console.log("Server:\n");
                console.log(myObj);
            }
        };
        
        xhr.send(JSON.stringify(data));
        // xhr.send(); // for GET
    }
    else {
        // Sweet Alert popup message added on invalid registration.
        swal("Oops!", "Invalid registration details. Please try again.", "error");
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
        case 'subject':
            checkSubject();
            break;
        case 'msg':
            checkMessage();
            break;
        }
}));