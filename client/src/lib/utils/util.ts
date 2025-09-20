import { DateArg, format, formatDistanceToNow } from "date-fns";
import { z } from "zod";

export function formatDate(date: DateArg<Date>, dateFormat: string) {
    return format(date, dateFormat);
}

export function timeAgo(date: DateArg<Date>) {
    return formatDistanceToNow(date) + ' ago'
}

export const requiredString = (fieldName: string) => z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });