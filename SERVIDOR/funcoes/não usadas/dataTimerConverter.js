export const getTodayDateBR = ()=>{
    const newDate = new Date();
    return newDate.toISOString("pt-BR").slice(0, 10);
}
export const getActualTime = ()=>{
    const newDate = new Date();

}


/*
    Função para converter um timer que esteja em segundos retornando o formato "hh:mm:ss" ou "mm:ss" ou "ss"
*/
// export const timeStampCalculation = (_totalSecond)=>{
//     let duration = _totalSecond;
//     let h = parseInt(duration / 3600) < 10 ? "0" + String(parseInt(duration / 3600)) : parseInt(duration / 3600);
//     let m = parseInt((duration - (h * 3600)) / 60) < 10 ? "0" + String(parseInt((duration - (h * 3600)) / 60)) : parseInt((duration - (h * 3600)) / 60);
//     let s = (duration - (h * 3600)) - (m * 60) < 10 ? "0" + String((duration - (h * 3600)) - (m * 60)) : (duration - (h * 3600)) - (m * 60);
//     let totalTime = h > 0 ? `${h}h ${m}min ${s}s` : m > 0 ? `${m}min ${s}s` : `${s} segundos`;
//     return totalTime;
// }