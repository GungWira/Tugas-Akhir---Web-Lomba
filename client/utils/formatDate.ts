export function formatDate(date : Date | null){
    if(!date) return

    const newDate = new Date(date)
    const formatedDate = newDate.toLocaleDateString("id-ID", {
        day:"numeric",
        month : "long"
    })
    return formatedDate
}