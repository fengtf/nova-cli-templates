<template>
  <el-popover
    v-model:visible="visible"
    :width="270"
    trigger="hover"
    placement="right"
    :show-arrow="false"
    popper-class="user-profile-popover"
  >
    <template #reference>
      <div class="user-info-trigger">
        <el-avatar :size="24" :src="images.avatars.default">
        </el-avatar>
        <span class="username" v-if="!isCollapse">{{ userInfo?.name }}</span>
      </div>
    </template>

    <div class="user-profile-content">
      <div class="user-avatar">
        <el-avatar :size="45" :src="images.avatars.default">
        </el-avatar>
      </div>

      <div class="username">{{ userInfo?.name }}</div>

      <div class="account-type">{{ userInfo?.role && getUserRoleText(userInfo.role) }}</div>

      <div class="logout-section">
        <el-button
          type="primary"
          class="logout-btn"
          @click="handleLogout"
          :loading="logoutLoading"
        >
          退出账号
        </el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useSidebarStore } from '@/stores/sidebar'
import { UserRole } from '@/types/user'
import images from '@/utils/images'

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const userStore = useUserStore()
const sidebarStore = useSidebarStore()
const logoutLoading = ref(false)

const userInfo = computed(() => userStore.userInfo)
const isCollapse = computed(() => sidebarStore.isCollapse)

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const getUserRoleText = (role: UserRole) => {
  const roleMap: Record<UserRole, string> = {
    [UserRole.ENTERPRISE]: '企业账号',
    [UserRole.PERSONAL]: '个人账号'
  }
  return roleMap[role] || '-'
}

const handleLogout = async () => {
  try {
    logoutLoading.value = true
    await userStore.logout()
    visible.value = false
  } catch (error) {
    console.error('退出登录失败:', error)
  } finally {
    logoutLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.user-info-trigger {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px 16px;

  .username {
    margin-left: 7px;
    font-size: 14px;
    color: #303133;
    flex: 1;
    font-weight: 500;
    margin-bottom: 0;
  }
}

.user-profile-content {
  padding: 8px;
  text-align: center;
}

.user-avatar {
  margin-bottom: 16px;

  :deep(.el-avatar) {
    border: none !important;
  }
}

.username {
  font-size: 16px;
  font-weight: 500;
  color: #242426;
  line-height: 1.4;
  margin-bottom: 6px;
}

.account-type {
  font-size: 10px;
  color: #757575;
  margin-bottom: 15px;
  line-height: 1.4;
}

.logout-section {
  .logout-btn {
    width: 100%;
    height: 36px;
  }
}
</style>

<style>
.user-profile-popover {
  border-radius: 4px !important;
  background: #fff !important;
  border: none !important;
  box-shadow: 0 3px 16px 0 rgba(44, 44, 79, 0.15) !important;
  margin-left: -12px;
  margin-top: -10px;
}

.user-profile-popover .el-popover__title {
  display: none !important;
}
</style>
