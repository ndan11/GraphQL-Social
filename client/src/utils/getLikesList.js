export const getLikesList = (likes) => {
    let out
    if(likes.length == 0) return "No one"
    if(likes.length == 1) return likes[0].userName
    if(likes.length == 2) return `${likes[0].userName} and ${likes[1].userName}`
    if(likes.length <= 5){
        out = likes.slice(0,likes.length-2).reduce((ac,like) => ac+", "+like.userName,'').slice(1)
        out += " and " + likes[likes.length-1].userName
    }else{
        out = likes.slice(0,5).reduce((ac,like) => ac+", "+like.userName,'').slice(1)
        out += " and more "
    }
    return out
}
