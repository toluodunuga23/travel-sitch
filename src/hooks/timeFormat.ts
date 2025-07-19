import { useEffect, useState } from "react";

export function getTimeFormat() {
  const [greeting, setGreeting] = useState<string>("");
  useEffect(() => {

    function handleString(minutes: number):string | number{
        if (minutes < 10){
        return "0"
        }
        else{
            return minutes
        }
    }
    let date = new Date();

    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();

    // Check whether AM or PM
    let newformat = hours >= 12 ? "PM" : "AM";

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = handleString(minutes);

    if (hours < 12 && newformat === "AM") {
      setGreeting("Good Morning");
    } else if (hours < 5 && newformat === "PM") {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return { greeting };
}
