<template>
  <div class="w-full">
    <div class="mb-6">
      <h3 class="text-lg font-medium text-neutral-800 tracking-wide">{{ $t("login.title") }}</h3>
      <p class="text-xs text-neutral-400 mt-1">{{ $t("login.subtitle") }}</p>
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

      <a-form-item class="mb-0" name="password">
        <a-input-password v-model:value="formState.password" :bordered="false"
                          :placeholder="$t('login.passwordPlaceholder')" class="minimal-underline-input"
                          @change="handlePasswordInput">
          <template #prefix>
            <LockOutlined/>
          </template>
        </a-input-password>
      </a-form-item>

      <div class="flex items-center justify-between text-xs text-neutral-500 pt-1">
        <a-checkbox v-model:checked="formState.remember" class="text-xs">{{ $t("login.rememberMe") }}</a-checkbox>
        <a class="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
           @click="handleForgot">{{ $t("login.forgotPassword") }}</a>
      </div>

      <a-form-item class="pt-2 mb-0">
        <a-button
            class="w-full h-10 rounded-lg bg-neutral-900 border-none hover:bg-neutral-800 active:bg-neutral-950 text-white font-light text-xs transition-all shadow-sm"
            html-type="submit" type="primary">
          {{ $t("login.signIn") }}
        </a-button>
      </a-form-item>
    </a-form>

    <div class="mt-6 flex items-center justify-center space-x-2 text-xs">
      <span class="text-neutral-400">{{ $t("login.noAccount") }}</span>
      <router-link class="text-neutral-900 font-medium hover:underline" to="/auth/register">
        {{ $t("login.goToRegister") }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue'
import type {Rule} from 'ant-design-vue/es/form'
import {useAppLocale} from '@/hooks/useAppLocale'
import type {LoginRequest} from "@/types/auth";

const {t, locale} = useAppLocale()
const formRef = ref()

const initData: LoginRequest = {
  username: '',
  password: '',
}
const formState = reactive(initData)

const handleUsernameInput = (e: Event) => formState.username = (e.target as HTMLInputElement).value.replace(/[^a-zA-Z0-9_]/g, '')
const handlePasswordInput = (e: Event) => formState.password = (e.target as HTMLInputElement).value.replace(/[\u4e00-\u9fa5\u3000-\u301f\uff00-\uffef\s]/g, '')

const formRules = computed<Record<string, Rule[]>>(() => ({
  username: [{required: true, message: t('login.usernameRequired'), trigger: 'blur'}],
  password: [{required: true, message: t('login.passwordRequired'), trigger: 'blur'}]
}))

watch(locale, async () => {
  await nextTick()
  if (formRef.value) formRef.value.validateFields().catch(() => {
  })
})

const onFinish = (values: any) => console.log('Login Params:', values)
const handleForgot = () => console.log('Forgot pwd triggered')
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