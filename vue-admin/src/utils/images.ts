/**
 * 统一图片资源管理器
 * 提供统一的入口和出口，分类管理所有图片资源
 * 
 * 使用示例:
 * import images from '@/utils/images'
 * 
 * // 使用头像
 * <img :src="images.avatars.default" alt="头像">
 * 
 * // 使用logo
 * <img :src="images.logos.main" alt="Logo">
 * 
 * // 使用内容图标
 * <img :src="images.content.tongyi" alt="通义">
 * <img :src="images.content.doubao" alt="豆包">
 * 
 * // 使用功能图标
 * <img :src="images.icons.qrcode" alt="二维码">
 */

// 头像
import avatar from '@/assets/images/avatars/avatar.png'

// logo
import logo from '@/assets/images/logo.png'

// 内容图标
import iconAliyun from '@/assets/images/content/icon-aliyun@3x.png'
import iconBaidu from '@/assets/images/content/icon-baidu@3x.png'
import iconIcloud from '@/assets/images/content/icon-icloud@3x.png'
import iconHunyuan from '@/assets/images/content/icon-hunyuan@3x.png'
import iconTongyi from '@/assets/images/content/icon-tongyi@3x.png'
import iconDoubao from '@/assets/images/content/icon-doubao@3x.png'
import iconMicrosoft from '@/assets/images/content/icon-microsoft@3x.png'

// 功能图标
import iconQrcode from '@/assets/images/icon/icon-qrcode@3x.png'
import iconQrcodeDisabled from '@/assets/images/icon/icon-qrcode-disabled@3x.png'
import iconUpload from '@/assets/images/icon/icon-upload@3x.png'
import iconUploadImage from '@/assets/images/icon/icon-upload-image@3x.png'
import iconDelete from '@/assets/images/icon/icon-delete@3x.png'
import iconImage from '@/assets/images/icon/icon-image@3x.png'
import iconSync from "@/assets/images/icon/icon-sync@3x.png";
import iconSyncSuccess from "@/assets/images/icon/icon-sync-success@3x.png";
import iconSyncing from "@/assets/images/icon/icon-syncing@3x.png";
import iconSyncFailed from "@/assets/images/icon/icon-sync-failed@3x.png";

// 其他
// import placeholder from "@/assets/images/others/placeholder.png";
import phoneFrame from "@/assets/images/others/phone-iframe.png";

// 背景
import bgSidebar from "@/assets/images/bg/sidebar.png"
import bgError from "@/assets/images/bg/error.png"
import bgBar from "@/assets/images/bg/bar.png"

export default {
  avatars: {
    default: avatar,
  },
  logos: {
    main: logo,
  },
  content: {
    ali: iconAliyun,
    baidu: iconBaidu,
    icloud: iconIcloud,
    hunyuan: iconHunyuan,
    tongyi: iconTongyi,
    doubao: iconDoubao,
    microsoft: iconMicrosoft,
  },
  icons: {
    qrcode: iconQrcode,
    qrcodeDisabled: iconQrcodeDisabled,
    upload: iconUpload,
    uploadImage: iconUploadImage,
    delete: iconDelete,
    image: iconImage,
    sync: iconSync,
    syncSuccess: iconSyncSuccess,
    syncing: iconSyncing,
    syncFailed: iconSyncFailed,
  },
  others: {
    phoneFrame,
  },
  bg: {
    sidebar: bgSidebar,
    error: bgError,
    bar: bgBar
  }
}