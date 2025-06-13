const firstLetter = (...words) => {
    return words
        .filter(word => typeof word === 'string' && word.length > 0)
        .map(word => {
            return word.split(' ')
                .map(part => part.charAt(0).toUpperCase())
                .join('');
        })
        .join('');
}

export default firstLetter;