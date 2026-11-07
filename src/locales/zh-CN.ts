export default {
    common: {
        confirm: '确定',
        cancel: '取消',
        save: '保存',
        loading: '加载中...',
    },
    login: {
        title: '欢迎回来',
        subtitle: '请输入您的账户凭证以继续',
        usernamePlaceholder: '用户名',
        passwordPlaceholder: '密码',
        signIn: '登 录',
        signUp: '注 册',
        welcomeBack: '你好，{name}',
        registerTitle: '创建账户',
        registerSubtitle: '请填写信息以完成注册',
        rememberMe: '自动登录',
        forgotPassword: '忘记密码？',
        noAccount: '还没有账户？',
        goToRegister: '立即注册',
        hasAccount: '已有账户？',
        goToLogin: '去登录',
        // —— 基础必填校验提示 ——
        usernameRequired: '请输入用户名',
        passwordRequired: '请输入密码',
        nicknamePlaceholder: '请输入昵称',
        nicknameRequired: '昵称不能为空',
        confirmPasswordPlaceholder: '请再次输入密码确认',
        confirmPasswordRequired: '请确认密码',
        passwordNotMatch: '两次输入的密码不一致！',

        // —— 新增的严格格式校验提示 (替换了旧的零碎规则) ——
        usernameFormatInvalid: '账号必须为 6-16 位的数字或字母组合',
        nicknameFormatInvalid: '昵称长度不能超过 10 个字符',
        passwordFormatInvalid: '密码需 8-20 位，且必须包含数字、字母及特殊字符',
    },
} as const