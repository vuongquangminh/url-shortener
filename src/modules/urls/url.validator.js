import { z } from "zod";

export const createUrlSchema = z.object({
  url: z
    .string("Trường này phải là một chuỗi")
    .min(1, "Vui lòng nhập URL")
    .min(3, "Url quá ngắn")
    .max(200, "Url quá dài"),
  test: z
    .string("Trường này phải là một chuỗi")
    .min(1, "Vui lòng nhập URL")
    .min(3, "Url quá ngắn")
    .max(200, "Url quá dài"),
});
