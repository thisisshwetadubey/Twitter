class Logout{
    async process(req, res){
        try {
            res.cookie("jwt","",{
                httpOnly: false,
                expires: new Date(0) 
            })
            res.status(200).json({
                statusCode: 200,
                type: "Success",
                data: "Logout",
              });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Logout()