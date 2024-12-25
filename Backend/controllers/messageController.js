export const sendMessage = async (req,res) => {
    const id = req.params.id;
    const message = req.body.message
    console.log('message sent',id,message)
}