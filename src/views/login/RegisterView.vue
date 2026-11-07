<template>
  <div class="w-full">
    <div class="mb-6">
      <h3 class="text-lg font-medium text-neutral-800 tracking-wide">{{ $t("login.registerTitle") }}</h3>
      <p class="text-xs text-neutral-400 mt-1">{{ $t("login.registerSubtitle") }}</p>
    </div>

    <a-form ref="formRef" :model="formState" :rules="formRules" class="space-y-4" @finish="onFinish">
      <a-form-item class="mb-0" name="username">
        <a-input v-model:value="formState.username" :bordered="false" :placeholder="$t('login.usernamePlaceholder')"
                 class="minimal-underline-input" @change="handleUsernameInput">
          <template #prefix>
            <UserOutlined/>
          </template>
        </a-input>
      </a-form-item>

      <!-- 2. 昵称 (新增) -->
      <a-form-item class="mb-0" name="nickname">
        <!-- 昵称一般允许中文，所以去掉了正则拦截，加了 .trim 防止首尾空格 -->
        <a-input v-model:value.trim="formState.nickname" :bordered="false"
                 :maxlength="10"
                 :placeholder="$t('login.nicknamePlaceholder')" class="minimal-underline-input" show-count>
          <template #prefix>
            <IdcardOutlined/>
          </template>
        </a-input>
      </a-form-item>

      <!-- 3. 密码 -->
      <a-form-item class="mb-0" name="password">
        <a-input-password v-model:value="formState.password" :bordered="false"
                          :placeholder="$t('login.passwordPlaceholder')" class="minimal-underline-input"
                          @change="handlePasswordInput">
          <template #prefix>
            <LockOutlined/>
          </template>
        </a-input-password>
      </a-form-item>

      <!-- 4. 确认密码 (新增) -->
      <a-form-item class="mb-0" name="confirmPassword">
        <a-input-password v-model:value="formState.confirmPassword" :bordered="false"
                          :placeholder="$t('login.confirmPasswordPlaceholder')" class="minimal-underline-input"
                          @change="handleConfirmPasswordInput">
          <template #prefix>
            <LockOutlined/>
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item class="pt-6 mb-0">
        <a-button
            class="w-full h-10 rounded-lg bg-neutral-900 border-none hover:bg-neutral-800 active:bg-neutral-950 text-white font-light text-xs transition-all shadow-sm"
            html-type="submit" type="primary">
          {{ $t("login.signUp") }}
        </a-button>
      </a-form-item>
    </a-form>

    <div class="mt-6 flex items-center justify-center space-x-2 text-xs">
      <span class="text-neutral-400">{{ $t("login.hasAccount") }}</span>
      <router-link class="text-neutral-900 font-medium hover:underline" to="/auth/login">
        {{ $t("login.goToLogin") }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {UserOutlined, LockOutlined, IdcardOutlined} from '@ant-design/icons-vue'
import type {Rule} from 'ant-design-vue/es/form'
import {useAppLocale} from '@/hooks/useAppLocale'
import type {RegisterRequest} from "@/types/auth";

const {t, locale} = useAppLocale()
const formRef = ref()
const initData: RegisterRequest = {
  username: '',
  nickname: '',
  password: '',
  confirmPassword: ''
}
// 1. 扩充表单状态
const formState = reactive(initData)

// 2. 输入拦截逻辑 (确认密码和密码的规则保持一致)
const handleUsernameInput = (e: Event) => formState.username = (e.target as HTMLInputElement).value.replace(/[^a-zA-Z0-9]/g, '')
const handlePasswordInput = (e: Event) => formState.password = (e.target as HTMLInputElement).value.replace(/[\u4e00-\u9fa5\u3000-\u301f\uff00-\uffef\s]/g, '')
const handleConfirmPasswordInput = (e: Event) => formState.confirmPassword = (e.target as HTMLInputElement).value.replace(/[\u4e00-\u9fa5\u3000-\u301f\uff00-\uffef\s]/g, '')
// 3. 自定义校验：检查两次密码是否一致
const validateConfirmPassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject(t('login.confirmPasswordRequired'))
  } else if (value !== formState.password) {
    return Promise.reject(t('login.passwordNotMatch'))
  }
  return Promise.resolve()
}

// 4. 扩充校验规则
const formRules = computed<Record<string, Rule[]>>(() => ({
  username: [
    {required: true, message: t('login.usernameRequired'), trigger: 'blur'},
    {pattern: /^[a-zA-Z0-9]{6,16}$/, message: t('login.usernameFormatInvalid'), trigger: 'blur'}
  ],
  nickname: [
    {required: true, message: t('login.nicknameRequired'), trigger: 'blur'},
    {max: 10, message: t('login.nicknameFormatInvalid'), trigger: 'blur'}
  ],
  password: [
    {required: true, message: t('login.passwordRequired'), trigger: 'blur'},
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#%^&*()_+\-=.,])[a-zA-Z0-9~!@#%^&*()_+\-=.,]{8,20}$/,
      message: t('login.passwordFormatInvalid'),
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {required: true, validator: validateConfirmPassword, trigger: 'blur'}
  ]
}))

watch(locale, async () => {
  await nextTick()
  if (formRef.value) formRef.value.validateFields().catch(() => {
  })
})

const onFinish = (values: any) => console.log('Register Params:', values)
</script>

<style lang="scss" scoped>
.minimal-underline-input {
  :deep(.ant-input), :deep(.ant-input-password) {
    border: none !important;
    border-radius: 0 !important;
    border-bottom: 1px solid #e2e8f0 !important;
    background: transparent !important;
    box-shadow: none !important;
    padding-bottom: 6px !important;
    font-size: 14px;
    color: #171717;

    &::placeholder {
      color: #a3a3a3;
      font-weight: 300;
    }
  }

  :deep(.ant-input-affix-wrapper) {
    border: none !important;
    border-radius: 0 !important;
    border-bottom: 1px solid #e2e8f0 !important;
    background: transparent !important;
    box-shadow: none !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    padding-bottom: 6px !important;

    &:hover, &:focus, &.ant-input-affix-wrapper-focused {
      border-bottom-color: #171717 !important;
      box-shadow: none !important;
    }
  }

  &:hover :deep(.ant-input), &:focus-within :deep(.ant-input) {
    border-bottom-color: #171717 !important;
  }
}
</style>