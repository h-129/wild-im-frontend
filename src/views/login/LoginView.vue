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
            :loading="loading"
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
import {userLogin} from "@/api/user";
import {message} from "ant-design-vue";
import {useStorage} from "@vueuse/core";
import {CacheConstant} from "@/constants";
import {useUserStore} from "@/store";
import {useRouter} from "vue-router";

const router = useRouter();
const userStore = useUserStore()
const {t, locale} = useAppLocale()
const formRef = ref(null)
//定义登录按钮的状态防止重复提交
const loading = ref<boolean>(false)
const initData: LoginRequest = {
  username: 'admin1234',
  password: 'a12345678..',
  remember: false,
}
const formState = reactive({...initData})
//定义本地缓存
const loginCache = useStorage(CacheConstant.REMEMBER_LOGIN_CACHE_KEY, {
  username: '',
  password: '',
  remember: false
})
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
//模拟延时
const sleep = (time: number) => new Promise((resolve) => {
  setTimeout(resolve, time)
})
//触发登录提交
const onFinish = async (values: LoginRequest) => {
  loading.value = true
  try {
    console.log(values)
    // 如果是模拟测试，可以加上这一句感受 1.5 秒的 loading 效果：
    // await sleep(1500)
    const {data} = await userLogin({
      username: values.username,
      password: values.password,
    } as LoginRequest)
    //使用pinia存储后端传递过来的token
    userStore.setToken(data.accessToken)
    message.info("登录成功")
    // 前端独立处理记住我缓存
    router.push({
      path: '/'
    })
    if (formState.remember) {
      loginCache.value = {
        username: values.username,
        password: window.btoa(values.password), // btoa 简单混淆密文
        remember: true
      }
    } else {
      // 未勾选则清空缓存对象
      loginCache.value = {username: '', password: '', remember: false}
    }
    //进行页面跳转
  } catch (e) {
    message.error(e.message || "登录失败")
  } finally {
    loading.value = false
  }
}
const handleForgot = () => console.log('Forgot pwd triggered')
// 页面挂载时回填数据
onMounted(() => {
  if (loginCache.value.remember) {
    formState.username = loginCache.value.username
    // 用 atob 解码 Base64 还原为明文密码
    formState.password = window.atob(loginCache.value.password)
    formState.remember = true
  }
})
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
    color: #262626;

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