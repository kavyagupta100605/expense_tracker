import {z} from "zod";

const expenseSchema = z.object({
    category: z.string()
        .min(1,"Category is required"),
    amount : z.coerce.number()
        .min(1,"Amount must be greater than 0")
});

export default expenseSchema;