<template>
  <div id="login_container" class="flex items-center justify-center p-4">
    <div class="login_card w-full max-w-[920px] flex flex-col overflow-hidden">
      <!-- macOS 窗口标题栏 -->
      <div
          class="h-10 bg-white/40 backdrop-blur-md border-b border-white/40 flex items-center justify-between px-4 select-none">
        <div class="flex items-center space-x-2">
          <span class="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-sm inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-sm inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-sm inline-block"></span>
        </div>

        <!-- 窗口标题：根据路由动态改变 -->
        <div class="text-xs text-neutral-400 font-mono tracking-wider truncate px-2">
          Workspace — {{ isRegisterRoute ? $t("login.signUp") : $t("login.signIn") }}
        </div>

        <!-- 语言切换 -->
        <div class="flex items-center">
          <div :class="{ 'is-en': locale ===AppLocaleEnum.EN_US }" class="lang-switch" @click="handleToggleLang">
            <div class="lang-switch__thumb"></div>
            <span class="lang-text zh">中文</span>
            <span class="lang-text en">EN</span>
          </div>
        </div>
      </div>

      <!-- 主体内容区 -->
      <div class="flex flex-col md:flex-row flex-1">
        <!-- 左侧 Banner -->
        <div
            class="login_card__banner hidden md:flex flex-1 flex-col justify-between p-12 relative select-none overflow-hidden">
          <div
              class="absolute -top-12 -left-12 w-48 h-48 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>
          <div
              class="absolute -bottom-12 -right-12 w-48 h-48 bg-sky-200/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="flex items-center space-x-2">
            <span class="breathing-dot"></span>
            <span class="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">v3.0 RELEASE</span>
          </div>
          <div>
            <h2 class="login_card__title text-3xl font-light text-neutral-800 tracking-tight mb-2">{{
                $t("login.title")
              }}</h2>
            <p class="text-xs text-neutral-400 leading-relaxed font-light">{{ $t("login.subtitle") }}</p>
          </div>
          <div class="text-[10px] text-neutral-400/80 font-mono">© 2026 WIL-IM. ALL RIGHTS RESERVED.</div>
        </div>

        <!-- 右侧表单区：动态路由视图 -->
        <div
            class="login_card__main flex-1 flex flex-col justify-center px-6 py-8 md:px-14 bg-white/40 backdrop-blur-xl">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="fade">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import {useAppLocale} from '@/hooks/useAppLocale'
import {AppLocaleEnum} from "@/enums/appEnums";

const route = useRoute()
const {locale, switchLanguage} = useAppLocale()

const isRegisterRoute = computed(() => route.path.includes('/register'))

const handleToggleLang = () => {
  const targetLang = (locale.value as string) === AppLocaleEnum.ZH_CN
      ? AppLocaleEnum.EN_US
      : AppLocaleEnum.ZH_CN
  switchLanguage(targetLang)
}
</script>

<style lang="scss" scoped>
#login_container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f4f3 0%, #e8edf2 100%);
}

.login_card {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);

  &__banner {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.4) 0%, rgba(240, 244, 248, 0.2) 100%);
    border-right: 1px solid rgba(255, 255, 255, 0.4);
    min-height: 380px;
  }
}

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

  &.is-en .lang-switch__thumb {
    transform: translateX(34px);
  }

  &.is-en .en {
    color: #171717;
    font-weight: 500;
  }

  &.is-en .zh {
    color: #a3a3a3;
    font-weight: 400;
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

/* 路由切换过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>