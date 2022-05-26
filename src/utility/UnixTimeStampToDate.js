export default function unixTimeStampToDate(unixTimeStamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unixTimeStamp);
    // Hours part from the timestamp
    let dateString = date.toString().substring(0, 15);
    //short time part from the timestamp
    date = new Date(dateString);
    let finalDateSting = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    return finalDateSting;
}