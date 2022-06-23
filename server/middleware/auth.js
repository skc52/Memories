import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    console.log("Helo");
    try{
       
        const token = req.headers.authorization.split(' ')[1];
        
      
        const isCustomToken = token.length < 500;//then it is our token
        //otherwise its google's token

        let decodedData;
        if (token && isCustomToken){
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        }
        else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;//sub is the google name for id that differentiates every other
            //google user
        }

        next();
    }catch(e){
        console.log(e);
    }
}

export default auth;