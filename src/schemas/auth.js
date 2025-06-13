import * as z from "zod";

const signupSchema = z.object({
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

    role: z
        .string()
        .min(1, { message: "The Role field is required" })
        .refine((val) => ["supervisor", "student"].includes(val), {
            message: "Invalid Role selection",
        }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        }),

    // image: z
    //     .any()
    //     .refine((file) => file && file.length > 0, { message: "Image file is required" })
    //     .refine(
    //         (file) => file && file.length > 0 && ["image/jpeg", "image/png", "image/jpg"].includes(file[0].type),
    //         { message: "Only JPG, JPEG, and PNG images are allowed" }
    //     )
    //     .refine(
    //         (file) => file && file.length > 0 && file[0].size <= 3 * 1024 * 1024,
    //         { message: "Image size must not exceed 3MB" }
    //     ),

    image: z
        .any()
        .refine(
            (file) => {
                console.log(file,length);
                return Object.keys(file).length > 0;
            },
            { message: "Image file is required" })
        .refine(
            (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file[0].type),
            { message: "Only JPG, JPEG, and PNG images are allowed" }
        )
        .refine(
            (file) => file[0].size <= 3 * 1024 * 1024,
            { message: "Image size must not exceed 3MB" }
        ),
});

const confirmEmailSchema = z.object({
    otp: z
        .string()
        .min(6, { message: "The OTP field is required" })
        .max(6, { message: "The OTP must not exceed 6 digits" })
        .regex(/^\d{6}$/, { message: "OTP must be exactly 6 digits" })
});

const signinSchema = z.object({
    username: z
        .string().min(1, { message: "The Username field is required" }),
    password: z
        .string().min(1, { message: "The Password field is required" }),
});

const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
            }),
        confirmationPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmationPassword, {
        message: "Passwords do not match",
        path: ["confirmationPassword"],
    });


const verifyOtpSchema = z.object({
    otp: z
        .string()
        .min(6, { message: "The OTP field is required" })
        .max(6, { message: "The OTP must not exceed 6 digits" })
        .regex(/^\d{6}$/, { message: "OTP must be exactly 6 digits" })
});

const sendOtpSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid Email address" })
        .min(6, { message: "Email must be at least 6 characters long" }),
});

export { signupSchema, confirmEmailSchema, signinSchema, resetPasswordSchema, verifyOtpSchema, sendOtpSchema };
