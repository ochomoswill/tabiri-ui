let fileSize = (bytes)=>{
    const sizes = ["KB","MB","GB","TB"];
    let counter = 0;
    let int_bytes = parseInt(bytes);

    while ((int_bytes/1000) > 1000){
        int_bytes = int_bytes/1000;
        counter++;
    }

    int_bytes = Math.round(int_bytes/1000 * 100)/100;
    return `${int_bytes} ${sizes[counter]}`;
};

export default {fileSize};