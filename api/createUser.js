import axios from "axios"

const createUser = async (req, res) => {
    const { userId, email } = req.body
    axios
        .post(`https://api.chatengine.io/projects/people/`, 
            { username: email, secret: userId },
            { headers: { "Private-Key": process.env.chat_engine_private_key } }
        ).then((response) => {
            res.json({
                body: response.body,
                error: null
            })
        }).catch(err => {
            res.json({
                body: null,
                error: `There was an error creating a new user.`,
                error2: err
            })
        })
}

export default createUser