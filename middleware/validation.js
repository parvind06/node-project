const { body, validationResult } = require('express-validator');

module.exports = {
    validateUserInput: [
        body('firstName')
            .isLength({ min: 3, max: 30 }).withMessage('First name must be between 3 and 30 characters')
            .isAlpha('en-US', { ignore: ' ' }).withMessage('First name must contain only alphabetic characters'),

        body('lastName')
            .optional()
            .isLength({ max: 30 }).withMessage('Last name must be less than 30 characters')
            .isAlpha('en-US', { ignore: ' ' }).withMessage('Last name must contain only alphabetic characters'),

        body('username')
            .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
            .isAlphanumeric('en-US').withMessage('Username must be alphanumeric')
            .matches(/^[a-z_\.]+$/).withMessage('Invalid characters in username'),

        body('email')
            .isEmail().withMessage('Invalid email'),

        body('gender')
            .not().isEmpty().withMessage('Gender is required'),

        body('mobile')
            .matches(/^\d{6,16}$/).withMessage('Invalid mobile number'),

        body('password')
            .custom((value, { req }) => {
                if (value !== req.body.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                return true;
            })
            .isStrongPassword().withMessage('Invalid password'),

        // Handle the validation results
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // If there are validation errors, respond with an error message
                return res.status(400).json({ errors: errors.array() });
            }

            // If validation passes, continue to the next middleware
            next();
        }
    ]
};



module.exports = {
    validateUserInput: (req, res, next) => {
        const { firstName, lastName, username, email, gender, mobile, password, confirmPassword } = req.body;

        if (validationFunctions.isFieldEmpty(firstName)) {
            return res.status(400).json({ error: 'First name is required.' });
        }

        if (!validationFunctions.isValidFirstName(firstName)) {
            return res.status(400).json({ error: 'Invalid first name.' });
        }

        if (!validationFunctions.isValidLastName(lastName)) {
            return res.status(400).json({ error: 'Invalid last name.' });
        }

        if (validationFunctions.isFieldEmpty(username)) {
            return res.status(400).json({ error: 'Username is required.' });
        }

        if (!validationFunctions.isValidUsername(username)) {
            return res.status(400).json({ error: 'Invalid username.' });
        }

        if (validationFunctions.isFieldEmpty(email)) {
            return res.status(400).json({ error: 'Email is required.' });
        }

        if (!validationFunctions.isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email.' });
        }

        if (validationFunctions.isFieldEmpty(gender)) {
            return res.status(400).json({ error: 'Gender is required.' });
        }

        if (validationFunctions.isFieldEmpty(mobile)) {
            return res.status(400).json({ error: 'Mobile number is required.' });
        }

        if (!validationFunctions.isValidMobile(mobile)) {
            return res.status(400).json({ error: 'Invalid mobile number.' });
        }

        if (validationFunctions.isFieldEmpty(password)) {
            return res.status(400).json({ error: 'Password is required.' });
        }

        if (validationFunctions.isFieldEmpty(confirmPassword)) {
            return res.status(400).json({ error: 'Password confirmation is required.' });
        }

        if (!validationFunctions.isValidPassword(password, confirmPassword)) {
            return res.status(400).json({ error: 'Invalid password or password confirmation.' });
        }

        next();
    }
}
