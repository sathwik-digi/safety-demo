import { z } from "zod";

export const editRoleFormSchema = z.object({
    firstName: z.string().min(2, { message: "First Name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last Name must be at least 2 characters." }),
    idNumber: z.string().regex(/[0-9]+/, { message: "must be at least 1 digit." }),
    phoneNumber: z.string().min(10, { message: "Enter a valid number." }),
    emailId: z.string().email({ message: "Invalid email address." }),
    sudAdminRole: z.string().min(2, { message: "Sub admin must be at least 2 characters." }),
});