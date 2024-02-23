export class TimeConvert{

    converTime(duration: number) {

        let minut:any,hour,second;
        var milliseconds = Math.floor((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
         hour = (hours < 10) ? "0" + hours : hours;
        minut = (minutes < 10) ? "0" + minutes : minutes;
        second = (seconds < 10) ? "0" + seconds : seconds;
       
        return  hour+"."+minut+"."+second;
      }
}