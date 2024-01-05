import { h } from "vue";
import { ElNotification } from 'element-plus'

type toastP = {
  title?:string
  msg?: string
  msgColor?: string
  type?: 'success' | 'error'
  duration?: number
}

const toast = ({
  title,
  msg,
  msgColor,
  type = 'success',
  duration = 1000
}: toastP = {}) => {
  ElNotification({
    type,
    title,
    message:
      msg
        ? h(
          'span',
          msgColor
            ? { style: `color: ${msgColor}` }
            : null,
          msg
        )
        : msg,
    duration,
  })
}

export { toast }
