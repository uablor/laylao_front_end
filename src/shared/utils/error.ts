import { AxiosError } from "axios";
import { message } from "ant-design-vue";


export function handleApiError(error: unknown, t?: (key: string) => string) {
  let errorMessage = "";

  if (error instanceof AxiosError && error.response) {
    const data = error.response.data as {
      message: string | string[] | Record<string, unknown>;
      statusCode?: number;
      error?: string;
    };

    if (Array.isArray(data.message)) {
      errorMessage = data.message.join(", ");
    } else if (typeof data.message === "object") {
      errorMessage = JSON.stringify(data.message);
    } else {
      errorMessage = data.message;
    }

    message.error(t ? t(errorMessage) : errorMessage);
  } else {
    console.error(error);
    message.error(t ? t("error.unknown") : "Unknown error");
  }

  throw error;
}
