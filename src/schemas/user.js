import * as z from "zod";

const createUserSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name must not exceed 50 characters" }),

    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(6, { message: "Email must be at least 6 characters long" })
        .max(255, { message: "Email must not exceed 255 characters" }),

    cnic: z
        .string()
        .length(13, { message: "CNIC No. must be exactly 13 digits" })
        .regex(/^\d{13}$/, { message: "NIC must contain only digits" }),

    phone: z
        .string()
        .regex(/^(3[0-3,7]\d{8})$/, { message: "Enter a valid Phone number (10-digits)" })
        .optional()
        .or(z.literal("")),

    rollNo: z
        .string()
        .regex(/^[0-9]{2}[a-zA-Z]{2}[0-9]{3}$/, { message: "Invalid Roll No. format (e.g., 21SW066)" })
        .optional()
        .or(z.literal("")),

    image: z
        .any()
        .optional()
        .refine(
            (file) =>
                !file || file.length === 0 || ["image/jpeg", "image/png", "image/jpg"].includes(file[0]?.type),
            { message: "Only JPG, JPEG, and PNG images are allowed" }
        )
        .refine(
            (file) =>
                !file || file.length === 0 || file[0]?.size <= 3 * 1024 * 1024,
            { message: "Image size must not exceed 3MB" }
        )
});

const updateProfileSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name must not exceed 50 characters" }),

    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(6, { message: "Email must be at least 6 characters long" })
        .max(255, { message: "Email must not exceed 255 characters" }),

    phone: z
        .string()
        .regex(/^(3[0-3,7]\d{8})$/, { message: "Enter a valid Phone number (10-digits)" })
        .optional()
        .or(z.literal("")),

});

const updateProfileImageschema = z.object({
    image: z
        .any()
        .refine((file) => file && file.length > 0, { message: "Image file is required" })
        .refine(
            (file) => file && file.length > 0 && ["image/jpeg", "image/png", "image/jpg"].includes(file[0].type),
            { message: "Only JPG, JPEG, and PNG images are allowed" }
        )
        .refine(
            (file) => file && file.length > 0 && file[0].size <= 3 * 1024 * 1024,
            { message: "Image size must not exceed 3MB" }
        ),
});

const updatePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, { message: "The current password is required" }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        }),
});

export { createUserSchema, updateProfileSchema, updateProfileImageschema, updatePasswordSchema };
