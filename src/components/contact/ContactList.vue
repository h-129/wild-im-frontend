<template>
  <div id="contact-list-container">
    <!-- 工具区域 -->
    <div class="toolbar">
      <div class="search-box">
        <a-input placeholder="搜索"/>
      </div>
      <a-tooltip title="添加好友 / 创建群聊">
        <button class="add-btn" type="button">
          <PlusOutlined/>
        </button>
      </a-tooltip>
    </div>

    <!-- 主体滚动区域：上下包含【联系人】和【群组】两个折叠面板 -->
    <div class="contact-main">
      <!-- 1. 联系人折叠面板 -->
      <div :class="{ 'is-expanded': contactAct }" class="contact-section">
        <div class="section-header" @click="contactAct = !contactAct">
          <div class="section-title-group">
            <span class="arrow-icon">
              <RightOutlined/>
            </span>
            <span class="section-title">联系人</span>
          </div>
          <span class="section-count">{{ mockContactList.length }}</span>
        </div>

        <div v-if="contactAct" class="contact-groups">
          <div
              v-for="[letter, contacts] in contactGroups"
              :key="letter"
              class="contact-group"
          >
            <div class="group-letter">{{ letter }}</div>
            <div class="group-list">
              <div
                  v-for="contact in contacts"
                  :key="contact.id"
                  class="contact-item"
              >
                <div class="contact-avatar">
                  <img :src="contact.contactAvatar || avatarUrl" alt="头像"/>
                </div>
                <div class="contact-name">
                  {{ contact.contactNickname || contact.contactRemark }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 群组折叠面板（完全复用相同结构与样式） -->
      <div :class="{ 'is-expanded': groupAct }" class="contact-section">
        <div class="section-header" @click="groupAct = !groupAct">
          <div class="section-title-group">
            <span class="arrow-icon">
              <RightOutlined/>
            </span>
            <span class="section-title">群组</span>
          </div>
          <span class="section-count">{{ mockGroupList.length }}</span>
        </div>

        <div v-if="groupAct" class="contact-groups">
          <div
              v-for="[letter, groups] in groupChatGroups"
              :key="letter"
              class="contact-group"
          >
            <div class="group-letter">{{ letter }}</div>
            <div class="group-list">
              <div
                  v-for="group in groups"
                  :key="group.id"
                  class="contact-item"
              >
                <div class="contact-avatar">
                  <img :src="group.groupAvatar || avatarUrl" alt="群头像"/>
                </div>
                <div class="contact-name">
                  {{ group.groupName }}
                  <span class="member-count">({{ group.memberCount }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import userDefaultAvatar from "@/assets/avatar/user-default.jpg"
import {PlusOutlined, RightOutlined} from "@ant-design/icons-vue";
import {pinyin} from "pinyin-pro";
import groupDefaultAvatar from '@/assets/avatar/group-default.jpg'
//标记箭头激活状态
const contactAct = ref<boolean>(false);
const groupAct = ref<boolean>(false);

interface contactItemType {
  id: number,
  contactUserId: number,
  contactNickname: string,
  contactRemark: string,
  contactAvatar: string,
}

interface GroupItemType {
  id: number;
  groupName: string;
  groupAvatar: string;
  memberCount: number;
}

//模拟联系人列表数据
const mockContactList = [
  {
    id: 1,
    contactUserId: 1,
    contactNickname: "萌萌",
    contactRemark: "小可爱",
    contactAvatar: userDefaultAvatar,
  }, {
    id: 2,
    contactUserId: 2,
    contactNickname: "小米",
    contactRemark: "可爱多",
    contactAvatar: userDefaultAvatar,
  }, {
    id: 3,
    contactUserId: 3,
    contactNickname: "乐乐",
    contactRemark: "乐乐",
    contactAvatar: userDefaultAvatar,
  }, {
    id: 4,
    contactUserId: 4,
    contactNickname: "诗诗",
    contactRemark: "诗诗",
    contactAvatar: userDefaultAvatar,
  },
  {
    id: 5,
    contactUserId: 5,
    contactNickname: "萌宝",
    contactRemark: "小可爱",
    contactAvatar: userDefaultAvatar,
  }
]
const mockGroupList = [
  {id: 101, groupName: "前端技术交流群", groupAvatar: groupDefaultAvatar, memberCount: 42},
  {id: 102, groupName: "Java 后端架构讨论", groupAvatar: groupDefaultAvatar, memberCount: 128},
  {id: 103, groupName: "周末开黑小分队", groupAvatar: groupDefaultAvatar, memberCount: 5},
];
//对联系人列表进行拼音排序
const getContact = (): [string, contactItemType[]][] => {
  const groupMap = new Map<string, contactItemType[]>();
  mockContactList.forEach((item: contactItemType) => {
    //如果有昵称就获取昵称，没有就使用备注
    const name = item.contactNickname || item.contactRemark;
    //进行拼音转换
    const tmp = pinyin(name, {type: 'array', toneType: 'none'})
    //取出tmp数组中的第一个元素并且只需要大写首字母
    const firstLetter = tmp[0].charAt(0).toUpperCase();
    //如果不存在就创建一个新的数组然后存储进去,此时对应的key的value一定有一个数组存在
    if (!groupMap.has(firstLetter)) {
      groupMap.set(firstLetter, []);
    }
    //数组一定存在，直接存储进去
    groupMap.get(firstLetter)!.push(item);
  })
  //对groupMap按照key为小写字母升序来进行排序
  let contactGroupMap = new Map(
      [...groupMap.entries()].sort(([key1], [key2]) => {
        return key1.localeCompare(key2)
      })
  );
  // 将 Map 转换为 [key, value] 二维数组：[['L', [...]], ['M', [...]], ...]
  return Array.from(contactGroupMap.entries());
}
/**
 * 通用拼音首字母分组与升序排序工具函数
 * @param list 原始数据列表
 * @param getName 提取用于排序的名称字段
 */
const groupByPinyin = <T>(
    list: T[] | undefined | null,
    getName: (item: T) => string
): [string, T[]][] => {
  const safeList = Array.isArray(list) ? list : [];
  const groupMap = new Map<string, T[]>();

  safeList.forEach((item) => {
    const name = getName(item)?.trim() || "#";
    const tmp = pinyin(name, {type: "array", toneType: "none"});
    const firstChar = tmp[0]?.charAt(0).toUpperCase() || "#";
    const firstLetter = /^[A-Z]$/.test(firstChar) ? firstChar : "#";

    if (!groupMap.has(firstLetter)) {
      groupMap.set(firstLetter, []);
    }
    groupMap.get(firstLetter)!.push(item);
  });

  return [...groupMap.entries()].sort(([key1], [key2]) => {
    if (key1 === "#") return 1;
    if (key2 === "#") return -1;
    return key1.localeCompare(key2);
  });
};
// 联系人分组结果
const contactGroups = computed(() =>
    groupByPinyin(mockContactList, (item) => item.contactRemark || item.contactNickname)
);

// 群组分组结果
const groupChatGroups = computed(() =>
    groupByPinyin(mockGroupList, (item) => item.groupName)
);
console.log("排序后的name", getContact());
</script>
<style lang="scss" scoped>
#contact-list-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;

  .toolbar {
    display: flex;
    width: 100%;
    flex-shrink: 0;
    align-items: center;
    box-sizing: border-box;
    padding: 16px;
    gap: 12px;

    .search-box {
      flex: 1;

      :deep(.ant-input) {
        width: 100%;
      }
    }

    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      height: 32px;
      width: 32px;
      padding: 4px;
      background-color: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover,
      &:focus {
        border-color: #4096ff;
      }
    }
  }

  .contact-main {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 12px;
    box-sizing: border-box;

    .contact-section {
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        padding: 4px 0;

        .section-title-group {
          display: flex;
          align-items: center;
          gap: 4px;

          .arrow-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease;
          }
        }
      }

      &.is-expanded {
        .section-header .arrow-icon {
          transform: rotate(90deg);
        }
      }

      .contact-groups {
        margin-top: 8px;

        .contact-group {
          .group-letter {
            font-weight: bold;
            font-size: 16px;
            color: #8c8c8c;
            padding: 6px 4px 2px;
          }

          .group-list {
            .contact-item {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 6px 8px;
              border-radius: 6px;
              cursor: pointer;

              &:hover {
                background-color: rgba(0, 0, 0, 0.04);
              }

              .contact-avatar {
                width: 36px;
                height: 36px;
                flex-shrink: 0;
                border-radius: 50%;
                overflow: hidden;

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  display: block;
                }
              }

              .contact-name {
                font-size: 14px;
                color: #333;
              }
            }
          }
        }
      }
    }
  }
}
</style>