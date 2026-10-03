import { ref } from "vue";

export const confirmationMessage = ref("");
let resolveConfirmation: ((answer: boolean) => void) | undefined;
export function confirmAction(message: string) {
  if (resolveConfirmation) return Promise.resolve(false);
  confirmationMessage.value = message;
  return new Promise<boolean>(resolve => { resolveConfirmation = resolve; });
}
export function answerConfirmation(answer: boolean) {
  resolveConfirmation?.(answer);
  resolveConfirmation = undefined;
  confirmationMessage.value = "";
}
