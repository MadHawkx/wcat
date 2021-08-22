#!/usr/bin/env node

const fs = require('fs');

let flags = [];
let fileNames = [];
let secondaryArgs=[];
let hasWriteOnly = false;

const arguments = process.argv.slice(2);

for(let args of arguments){
    if(args=="-w"){
        hasWriteOnly=true;
    }
    else if(args[0]==="-"){
        flags.push(args);
    }else if(args[0]=="$"){
        secondaryArgs.push(args.slice(1));
    }
    else{
        fileNames.push(args);
    }

}


if(flags.length == 0  &&  fileNames.length != 0){

    for(let files of fileNames){
        console.log(fs.readFileSync(files, "utf-8"));
    }

}

else{

    for(let flag of flags){

        if(flag==="-a"){

            if(fs.existsSync(process.argv[3])){
                const data = fs.readFileSync(process.argv[3],'utf8');
                console.log(data);
            }
            else{
                console.log(process.argv[3]+" doesn't exist.")
            }

        }
//Output concat of 2 files
else if(flag=="-con"){

    if(fs.existsSync(process.argv[3]) && fs.existsSync(process.argv[4]) ){
        const data1 = fs.readFileSync(process.argv[3],'utf8');
        const data2 = fs.readFileSync(process.argv[4],'utf8');
        console.log(data1,data2);
    }
    else{
        if(fs.existsSync(process.argv[3]))
        {
            console.log(process.argv[4]+" doesn't exist.")
        }
        else{
            console.log(process.argv[3]+" doesn't exist.")
        }
    }
}
//Read data from one file and write to another
else if(flag=="-aw"){

    if(fs.existsSync(process.argv[3])){

        const data = fs.readFileSync(process.argv[3],'utf8');
        let dataFromB="";
        if(fs.existsSync(process.argv[4]))
        {
            dataFromB=fs.readFileSync(process.argv[3],'utf8');
        }
        fs.writeFileSync(process.argv[4],data+" "+dataFromB);
    }
}

//remove spaces
else if(flag=="-rs"){

    let nospacedata = "";

    for(const temp_data of fileNames){

        const file_data = fs.readFileSync(temp_data,'utf8');

        const file_data_space = file_data.split(" ").join("")


        nospacedata+=file_data_space;
    }

    console.log(nospacedata);

}

//remove lines
else if(flag=="-rn"){
    let nospacedata = "";

    for(const temp_data of fileNames){

        const file_data = fs.readFileSync(temp_data,'utf8');

        const file_data_space = file_data.split("\r\n").join(" ")


        nospacedata=file_data_space;
        if(hasWriteOnly==true){
            fs.writeFileSync(temp_data,nospacedata);
        }
        else{
            console.log(nospacedata);
        }
    }

}

//remove special chars
else if(flag=="-rsc"){



 for(const temp_data of fileNames){

    let fileData = fs.readFileSync(temp_data,"utf8");

    for(let secargs of secondaryArgs){
        fileData=fileData.split(secargs).join("");

    }
    if(hasWriteOnly==true){
        fs.writeFileSync(temp_data,fileData);
    }
    else{
        console.log(fileData);
    }
}

}

else if(flag=="-s"){
    for(const temp_data of fileNames){

       let fileData = fs.readFileSync(temp_data,"utf8");

       let data=addSequence(fileData);
       console.log(data);
   }

}
else if(flag=="-sn"){
    for(const temp_data of fileNames){
        let fileData = fs.readFileSync(temp_data,"utf8");
        let data=addSequenceTnel(fileData);
        console.log(data);
    }
}
else if(flag=="-rel"){
    for(const temp_data of fileNames){
        let fileData = fs.readFileSync(temp_data,"utf8");
        let ans=removeExtraLine(fileData);
        for(let i=0;i<ans.length;i++){
            console.log(ans[i]);
        }
    }

}
}
}


function addSequence(content){
    let contentArr=content.split("\n");
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=(i+1)+" "+contentArr[i];
    }
    return contentArr;
}

function addSequenceTnel(content){
    let contentArr=content.split("\n");
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i]=count+" "+contentArr[i];
            count++;
        }
    }
    return contentArr;
}

function removeExtraLine(fileData){
    let contentArr=fileData.split("\n");
    let data=[];
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }

    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }
    }
    return data;
}
