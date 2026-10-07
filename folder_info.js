const fs=require('fs')
const path=require('path')

const args=process.argv[2]
const target = args ? path.resolve(args) : process.cwd();
try{
    if(!fs.statSync(target).isDirectory()) console.error(`error: could not read folder: ${args}`)
else{
    let dir=fs.readdirSync(target)
    let dircount=0, filescount=0
    for(let item of dir){

        let fullpath=path.join(target,item)
        let stat=fs.statSync(fullpath)
        if (stat.isDirectory()) dircount++;
        else if (stat.isFile()) filescount++;

}
    console.log(`Files ${filescount}`)
    console.log(`Folders ${dircount}`)

}

}catch(err){
    console.log(`Could not find folder ${args}`)
}
