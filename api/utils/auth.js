//const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken";

const secret = 'mysecretsshhhhh';
const expiration = '2h';


const authMiddleware = ({ req }) => {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
	.split(' ')
	.pop()
	.trim();
    }
    
    // console.log("token", token)
    if (!token) {
      return req;
    }
    
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    }
    catch {
      console.log('Invalid token');
    }
    
    return req;
};

const signToken = ({ firstName, email, id }) => {
    const payload = { firstName, email, id };
    
    return jwt.sign(
      { data: payload },
      secret,
      { expiresIn: expiration }
    );
};

export { authMiddleware, signToken };
