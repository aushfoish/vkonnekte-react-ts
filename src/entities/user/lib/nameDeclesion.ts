export const nameDeclension = (name: string) => {

    const nameLow = name.toLowerCase()
    const lastSign = nameLow[nameLow.length - 1]
    const toA = ["н", "р", "к", "р", "п", "д", "с", "л", "г", "в"]
    const istoA = toA.includes(lastSign)
    const toYa = ["й", "ь"]
    const isToYa = toYa.includes(lastSign)
    const toY = ["а"]
    const isToY = toY.includes(lastSign)
    const toI = ["я"]

    if (istoA && name != 'Павел' && name != "Пётр" && name != 'Лев') {
        return name + "а"
    } else if (isToYa) {
        return name.slice(0, -1) + 'я'
    } else if (name === 'Павел') {
        return 'Павла'
    } else if (name === 'Пётр' || name === 'Петра') {
        return "Петра"
    } else if (name === 'Лев') {
        return 'Льва'
    } else if (isToY) {
        return name.slice(0, -1) + 'ы'
    } else if (toI.includes(lastSign)) {
        return name.slice(0, -1) + "и"
    }
}