import { deepSignal } from "@deepsignal/preact";
export const appState = {
  themeColor: deepSignal({ color: "light" }),
  changethemeColor() {
    if (this.themeColor.color.value === "light") {
      this.themeColor.color.value = "dark";
    } else {
      this.themeColor.color.value = "light";
    }
  },
};

// const completed = computed(() => {
//   return todos.value.filter((todo) => todo.completed).length;
// });
