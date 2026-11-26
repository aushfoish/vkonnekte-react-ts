import { format } from "date-fns"
import { ru } from "date-fns/locale"

export const formatDate = (isoString: string) => {
    if (!isoString) return "--/--/--"
    return format(new Date(isoString), 'd MMMM yyyy, HH:mm', {locale: ru})
}