export default {
    common: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        save: 'Save',
        loading: 'Loading...',
    },
    login: {
        title: 'Welcome back',
        subtitle: 'Please enter your credentials to continue',
        usernamePlaceholder: 'Username',
        passwordPlaceholder: 'Password',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        welcomeBack: 'Hello, {name}',
        registerTitle: 'Create Account',
        registerSubtitle: 'Please fill in the details to register',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        noAccount: "Don't have an account?",
        goToRegister: 'Sign up',
        hasAccount: 'Already have an account?',
        goToLogin: 'Sign in',
        // —— 基础必填校验提示 ——
        usernameRequired: 'Please enter your username',
        passwordRequired: 'Please enter your password',
        nicknamePlaceholder: 'Please enter your nickname',
        nicknameRequired: 'Nickname is required',
        confirmPasswordPlaceholder: 'Please confirm your password',
        confirmPasswordRequired: 'Please confirm your password',
        passwordNotMatch: 'The two passwords do not match!',

        // —— 新增的严格格式校验提示 ——
        usernameFormatInvalid: 'Username must be 6-16 alphanumeric characters',
        nicknameFormatInvalid: 'Nickname cannot exceed 10 characters',
        passwordFormatInvalid: 'Password must be 8-20 characters, including letters, numbers, and special characters',
    },
} as const