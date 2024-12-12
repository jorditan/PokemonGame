import { ref } from 'vue'

export const useRadioButton = () => {
  const clickedButtons = ref<HTMLElement[]>([])

  const addButton = (button: HTMLElement) => {
    clickedButtons.value.push(button)
  }

  return {
    clickedButtons,
    addButton,
  }
}
