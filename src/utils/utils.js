import { h } from "vue";
import { ElNotification } from 'element-plus'

const toast = ({
  title = null,
  msg = null,
  msgColor = null,
  type = 'success',
  duration = 1000
} = {}) => {
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
