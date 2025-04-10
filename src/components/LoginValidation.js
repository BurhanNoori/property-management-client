

const validateField = (value, pattern, emptyErrorMessage, invalidErrorMessage, fieldName) => {
    let error = {};
    if (value === "") {
        error[fieldName] = emptyErrorMessage;
    } else if (!pattern.test(value)) {
        error[fieldName] = invalidErrorMessage;
    }



    return error;
};

export const emailValidation = (values) => {
    const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return  validateField(values.email, email_pattern, "Email cannot be empty", "Please check the email entered", "email") ;
};

export const passwordValidation = (values) => {
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])[a-zA-Z0-9\W]{8,}$/;
    return validateField(values.password, password_pattern, "Password cannot be empty", "Password should have at least 1 special char, 1 small alphabet, 1 capital alphabet, 1 digit, and min length 8", "password") ;
};

export const dateOfBirthValidation = (values) => {
    const isValidDate = values.date && !isNaN((new Date(values.date)).getTime());
    return  {date : isValidDate ? "" : "Invalid date" };
};

export const mobileValidation = (values) => {
    const mobile_pattern = /^[6-9]\d{9}$/;
    return validateField(+values.mobile, mobile_pattern, "Mobile number cannot be empty", "Invalid mobile number", "mobile") ;
};

export const confirmPasswordValidation = (values) => {
    return {confirmPassword : values.password !== values.confirmPassword ? "Password Mismatch" : "" };
};

export const isEmpty = (obj) => {
    for (let key in obj) {
        if (obj[key] !== "") return false;
    }
    return true;
};
