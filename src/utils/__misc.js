let l = "reportId,actualFilePath,dateCreated,dateModified,fileName,filePath,fileSize,fileType,label,status,statusDate,statusDescription,userId".split(',');
let k = "Report Id,Actual File Path,Date Created,Date Modified,File Name,File Path,File Size,File Type,Label,Status,Status Date,Status Description,User Id".split(',');

let d = l.map((a,i)=>{
    return {
        title:k[i],
        dataIndex:a,
        key:a
    }
});