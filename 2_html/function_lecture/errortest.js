setInterval(()=>{
    console.log('시작');
    try{
        throw new Error('erorrrr!');
        //강제로 에러 발생
    }
    catch(err){
        console.error(err);
    }
},3000);


