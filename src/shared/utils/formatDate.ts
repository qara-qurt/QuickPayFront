export const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString.replace(' ', 'T')).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
}
