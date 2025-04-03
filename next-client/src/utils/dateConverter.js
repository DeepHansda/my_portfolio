export const dateConverter = (d) => {
    var strArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const fDate = new Date(d);
    if(fDate.getDate()){
        return `${fDate.getDate()} ${strArray[fDate.getMonth()]} ${fDate.getFullYear()}`;
    }
    return `${strArray[fDate.getMonth()]} ${fDate.getFullYear()}`;
  };