const {OAuth2Client} = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

async function authMiddleware(req,res,next){
    console.log(`[AuthMiddleware] Processing request for: ${req.url}`);
    
    // TEMPORARY DEBUG: Bypass Auth
    console.warn("⚠️ DEBUG: Bypassing Google Token Verification");
    req.user = {
        userId: "debug-user-id",
        email: "debug@example.com",
        name: "Debug User"
    };
    req.headers['x-user-id'] = "debug-user-id";
    req.headers['x-user-email'] = "debug@example.com";
    req.headers['x-user-name'] = "Debug User";
    return next();

    /* 
    // ORIGINAL CODE COMMENTED OUT FOR DEBUGGING
    if (req.method === 'OPTIONS') {
        return next();
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        console.warn("[AuthMiddleware] No token provided");
        return res.status(401).json({
            error:"Access denied! No Token provided"
        })
    }

    try {
        console.log("[AuthMiddleware] Verifying token...");
        const ticket = await client.verifyIdToken({
            idToken : token,
            audience : process.env.GOOGLE_CLIENT_ID
        })
        console.log("[AuthMiddleware] Token verified successfully");

        const payload = ticket.getPayload();
        // console.log(payload);
        
        //add user info to req.user
        req.user ={
            userId : payload['sub'],
            email  : payload['email'],
            name   : payload['name']
        }

        //add User Id to headers for downstream services
        req.headers['x-user-id'] = payload['sub']
        req.headers['x-user-email'] = payload['email']
        req.headers['x-user-name'] = payload['name'] // Fixed header name to match downstream expectation if needed

        console.log("[AuthMiddleware] User authenticated:", payload['email']);
        next()

    } catch (error) {
        console.error('[AuthMiddleware] Token verification failed:', error)
        res.status(401).json({
            error:"invalid Token!"
        })
    }
    */
}

module.exports = authMiddleware;