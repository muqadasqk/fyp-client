import * as z from "zod";

const createProposalSchema = z.object({
    memberOne: z
        .string()
        .optional()
        .or(z.literal("")),

    memberTwo: z
        .string()
        .optional()
        .or(z.literal("")),

    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(255, { message: "Title must not exceed 50 characters" }),

    abstract: z
        .string()
        .refine(
            (val) => {
                const wordCount = val.trim().split(/\s+/).length;
                return wordCount >= 200 && wordCount <= 350;
            },
            {
                message: "Abstract must be between 200 and 350 words",
            }
        ),

    type: z
        .string()
        .refine((val) =>
            ["new", "modifiedOrExtension", "researchBased"].includes(val),
            {
                message: "Type must be either 'New', 'Modified Or Extension', or 'Research Based'",
            }
        ),

    category: z
        .string()
        .min(3, { message: "Category must be at least 3 characters long" })
        .max(50, { message: "Category must not exceed 50 characters" }),
});

const StatusHandleSchema = z.object({
    supervisor: z
        .string()
        .optional()
        .or(z.literal("")),

    pid: z
        .string()
        .refine(
            (val) => /^[A-Za-z]{2}-\d{3}$/.test(val),
            {
                message: "The proposal ID must be in the format 'XX-123'",
            }
        ),

    statusCode: z
        .string()
        .refine((val) =>
            ["20001", "20002", "20003"].includes(val),
            {
                message: "Set status one of the 'Accept', Accept with conditions', or 'Reject'",
            }
        ),

    remarks: z
        .string()
        .refine(
            (val) => {
                const wordCount = val.trim().split(/\s+/).length;
                return wordCount >= 5 && wordCount <= 350;
            },
            {
                message: "Abstract must be between 5 and 350 words",
            }
        ),
});

export { createProposalSchema, StatusHandleSchema }