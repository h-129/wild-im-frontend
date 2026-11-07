<template>
  <div id="login_container" class="flex items-center justify-center p-4">
    <!-- 主卡片容器：模仿 macOS 窗口风格，响应式自适应手机端 -->
    <div class="login_card w-full max-w-[920px] flex flex-col overflow-hidden">

      <!-- macOS 窗口标题栏 -->
      <div
          class="h-10 bg-white/40 backdrop-blur-md border-b border-white/40 flex items-center justify-between px-4 select-none">
        <!-- 左侧：红黄绿三色圆点 -->
        <div class="flex items-center space-x-2">
          <span class="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-sm inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-sm inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-sm inline-block"></span>
        </div>

        <!-- 中间：窗口居中标题 -->
        <div class="text-xs text-neutral-400 font-mono tracking-wider truncate px-2">
          Workspace — {{ isRegister ? $t("login.signUp") : $t("login.signIn") }}
        </div>

        <!-- 右侧：中英文切换滑块 -->
        <div class="flex items-center">
          <div :class="{ 'is-en': locale === 'en-US' }" class="lang-switch" @click="handleToggleLang">
            <div class="lang-switch__thumb"></div>
            <span class="lang-text zh">中文</span>
            <span class="lang-text en">EN</span>
          </div>
        </div>
      </div>

      <!-- 下方主体内容区（移动端上下堆叠，桌面端左右两栏） -->
      <div class="flex flex-col md:flex-row flex-1">

        <!-- 左侧：极简排版 Banner（手机端隐藏，中大屏显示） -->
        <div
            class="login_card__banner hidden md:flex flex-1 flex-col justify-between p-12 relative select-none overflow-hidden">
          <div
              class="absolute -top-12 -left-12 w-48 h-48 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>
          <div
              class="absolute -bottom-12 -right-12 w-48 h-48 bg-sky-200/20 rounded-full blur-3xl pointer-events-none"></div>

          <!-- 顶部小标 + 呼吸灯效果 -->
          <div class="flex items-center space-x-2">
            <!-- 呼吸灯核心组件 -->
            <span class="breathing-dot"></span>
            <span class="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">v3.0 RELEASE</span>
          </div>

          <!-- 核心文字艺术 -->
          <div>
            <h2 class="login_card__title text-3xl font-light text-neutral-800 tracking-tight mb-2">
              {{ $t("login.title") }}
            </h2>
            <p class="text-xs text-neutral-400 leading-relaxed font-light">
              {{ $t("login.subtitle") }}
            </p>
          </div>

          <!-- 底部小状态 -->
          <div class="text-[10px] text-neutral-400/80 font-mono">
            © 2026 WIL-IM. ALL RIGHTS RESERVED.
          </div>
        </div>

        <!-- 右侧：克制的表单交互区 -->
        <div
            class="login_card__main flex-1 flex flex-col justify-center px-6 py-8 md:px-14 bg-white/40 backdrop-blur-xl">
          <div class="mb-6">
            <h3 class="text-lg font-medium text-neutral-800 tracking-wide">
              {{ isRegister ? $t("login.registerTitle") : $t("login.title") }}
            </h3>
            <p class="text-xs text-neutral-400 mt-1">
              {{ isRegister ? $t("login.registerSubtitle") : $t("login.subtitle") }}
            </p>
          </div>

          <!-- Ant Design Vue 表单 -->
          <a-form ref="formRef" :model="formState" :rules="formRules" class="space-y-4" @finish="onFinish">

            <!-- 用户名（输入时直接过滤非英文、数字、下划线） -->
            <a-form-item class="mb-0" name="username">
              <a-input
                  v-model:value="formState.username"
                  :bordered="false"
                  :placeholder="$t('login.usernamePlaceholder')"
                  class="minimal-underline-input"
                  @change="handleUsernameInput"
              >
                <template #prefix>
                  <UserOutlined/>
                </template>
              </a-input>
            </a-form-item>

            <!-- 密码（输入时直接过滤中文和空格） -->
            <a-form-item class="mb-0" name="password">
              <a-input-password
                  v-model:value="formState.password"
                  :bordered="false"
                  :placeholder="$t('login.passwordPlaceholder')"
                  class="minimal-underline-input"
                  @change="handlePasswordInput"
              >
                <template #prefix>
                  <LockOutlined/>
                </template>
              </a-input-password>
            </a-form-item>

            <!-- 辅助操作栏：自动登录 / 忘记密码 -->
            <div v-if="!isRegister" class="flex items-center justify-between text-xs text-neutral-500 pt-1">
              <a-checkbox v-model:checked="formState.remember" class="text-xs">{{ $t("login.rememberMe") }}</a-checkbox>
              <a class="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer" @click="handleForgot">
                {{ $t("login.forgotPassword") }}
              </a>
            </div>

            <!-- 提交按钮（登录 / 注册） -->
            <a-form-item class="pt-2 mb-0">
              <a-button
                  class="w-full h-10 rounded-lg bg-neutral-900 border-none hover:bg-neutral-800 active:bg-neutral-950 font-light tracking-widest text-xs transition-all shadow-sm"
                  html-type="submit"
                  type="primary"
              >
                {{ isRegister ? $t("login.signUp") : $t("login.signIn") }}
              </a-button>
            </a-form-item>
          </a-form>

          <!-- 底部切换登录/注册状态布局 -->
          <div class="mt-6 flex items-center justify-center space-x-2 text-xs">
            <template v-if="!isRegister">
              <span class="text-neutral-400">{{ $t("login.noAccount") }}</span>
              <a class="text-neutral-900 font-medium hover:underline cursor-pointer" @click="isRegister = true">
                {{ $t("login.goToRegister") }}
              </a>
            </template>
            <template v-else>
              <span class="text-neutral-400">{{ $t("login.hasAccount") }}</span>
              <a class="text-neutral-900 font-medium hover:underline cursor-pointer" @click="isRegister = false">
                {{ $t("login.goToLogin") }}
              </a>
            </template>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, computed, watch, nextTick} from 'vue'
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue'
import type {Rule} from 'ant-design-vue/es/form'
import {useAppLocale} from "@/hooks/useAppLocale";


const {t, locale, switchLanguage} = useAppLocale()
const formRef = ref()

// 点击滑块时调用你封装的切换语言方法
const handleToggleLang = () => {
  const targetLang = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  switchLanguage(targetLang)
}

// 核心监听：语言一旦发生变化，自动检索当前表单中报错的字段并用新语言文案静默重测
watch(locale, async () => {
  await nextTick()
  if (formRef.value) {
    const fieldsInError = Object.keys(formRef.value.fields || {}).filter(
        (fieldKey) => formRef.value.fields[fieldKey].validateState === 'error'
    )

    if (fieldsInError.length > 0) {
      await formRef.value.validateFields(fieldsInError).catch(() => {
      })
    }
  }
})

// 控制当前是“登录”还是“注册”状态
const isRegister = ref(false)

const formState = reactive({
  username: '',
  password: '',
  remember: false,
})

// 账号输入拦截：只允许输入英文、数字、下划线
const handleUsernameInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  formState.username = target.value.replace(/[^a-zA-Z0-9_]/g, '')
}

// 密码输入拦截：实时剔除中文、全角字符和空格
const handlePasswordInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  formState.password = target.value.replace(/[\u4e00-\u9fa5\u3000-\u301f\uff00-\uffef\s]/g, '')
}

// 基于 computed 的校验规则，支持中英文国际化实时响应
const formRules = computed<Record<string, Rule[]>>(() => ({
  username: [
    {required: true, message: t('login.usernameRequired'), trigger: 'blur'},
    {min: 4, max: 20, message: t('login.usernameLength'), trigger: 'blur'}
  ],
  password: [
    {required: true, message: t('login.passwordRequired'), trigger: 'blur'},
    {min: 6, max: 32, message: t('login.passwordLength'), trigger: 'blur'}
  ]
}))

const onFinish = (values: any) => {
  if (isRegister.value) {
    console.log('Register values:', values)
  } else {
    console.log('Login values:', values)
  }
}

// 忘记密码点击事件
const handleForgot = () => {
  console.log('Trigger forgot password')
}
</script>

<style lang="scss" scoped>
#login_container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f4f3 0%, #e8edf2 100%);

  .login_card {
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(0, 0, 0, 0.03);
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);

    &__banner {
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.4) 0%, rgba(240, 244, 248, 0.2) 100%);
      border-right: 1px solid rgba(255, 255, 255, 0.4);
      min-height: 380px;
    }
  }
}

// 苹果风格的语言切换胶囊滑块样式
.lang-switch {
  position: relative;
  width: 72px;
  height: 24px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  cursor: pointer;
  user-select: none;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.09);
  }

  &__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 34px;
    height: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.is-en {
    .lang-switch__thumb {
      transform: translateX(34px);
    }

    .en {
      color: #171717;
      font-weight: 500;
    }

    .zh {
      color: #a3a3a3;
      font-weight: 400;
    }
  }

  .zh {
    color: #171717;
    font-weight: 500;
  }

  .en {
    color: #a3a3a3;
    font-weight: 400;
  }

  .lang-text {
    position: relative;
    z-index: 1;
    font-size: 10px;
    font-family: monospace;
    transition: color 0.3s ease;
    width: 30px;
    text-align: center;
  }
}

// 呼吸灯（Breathing Light）动画效果
@keyframes breathing {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.breathing-dot {
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
  display: inline-block;
  animation: breathing 2s infinite ease-in-out;
}

// 极简下划线输入框
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

  &:hover :deep(.ant-input),
  &:focus-within :deep(.ant-input) {
    border-bottom-color: #171717 !important;
  }
}
</style>