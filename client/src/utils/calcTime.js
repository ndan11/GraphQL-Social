import moment from 'moment'

export const calculateTime = (time) => {
   let out  = moment(time).fromNow()
   return out[0].toUpperCase() + out.slice(1)
}