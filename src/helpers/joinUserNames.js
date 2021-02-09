
const joinUserNames = (people, currentUsername) => {
    return '@' +  people.map(p => p.person.username).filter(un => un !== currentUsername).join(", @")
}

export default joinUserNames