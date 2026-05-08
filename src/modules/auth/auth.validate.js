import z from "zod";

export const createUserSchema = z.object({
    name: z
        .string("Trường này phải là một chuỗi")
        .min(1, "Vui lòng nhập tên")
        .min(3, "Tên quá ngắn")
        .max(100, "Tên quá dài"),
    email: z
        .string("Trường này phải là một chuỗi")
        .min(1, "Vui lòng nhập email")
        .email("Vui lòng nhập một địa chỉ email hợp lệ"),
    password: z
        .string("Trường này phải là một chuỗi")
        .min(1, "Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(100, "Mật khẩu quá dài"),
})

export const loginUserSchema = z.object({
    email: z
        .string("Trường này phải là một chuỗi")
        .min(1, "Vui lòng nhập email")
        .email("Vui lòng nhập một địa chỉ email hợp lệ"),
    password: z
        .string("Trường này phải là một chuỗi")
        .min(1, "Vui lòng nhập mật khẩu")
})