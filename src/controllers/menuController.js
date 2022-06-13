const menuModel = require('../models/menuModel')
const validator = require('../validators/validator')





const registerMenu = async function (req, res) {
    try {
        let requestBody = req.body

        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide menu Detaills" })
        }
        //----Extract body-----
        let { itemId,itemsName,url,urlParameters,Icon,root,haveIcon,sequenceNumber,active } = requestBody

        //-------Validation Starts-----------

        if (!validator.isValid(itemId)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide itemId" });
        }
        if (!validator.isValid(itemsName)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide itemsName" });
        }

        if (!validator.isValid(url)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide URL" });
        }

      
        // if (!validator.isValid(urlParameters)) {
        //     return res.status(400).send({ status: false, message: "Invalid request parameter, please provide urlParameters" });
        // }
       

        // if (!validator.isValid(Icon)) {
        //     return res.status(400).send({ status: false, message: "icon is required" });
        // }
        if (!validator.isValid(haveIcon)) {
            return res.status(400).send({ status: false, message: "haveIcon is required" });
        }
        if (!validator.isValid(root)) {
            return res.status(400).send({ status: false, message: "root is required" });
        }
        if (!validator.isValid(sequenceNumber)) {
            return res.status(400).send({ status: false, message: "sequenceNumber is required" });
        }
        if (!validator.isValid(active)) {
            return res.status(400).send({ status: false, message: "Active is required" });
        }

     
        //------------Validation Ends----------

      

        const updatedBody = {  itemId,itemsName,url,urlParameters,Icon,root,haveIcon,sequenceNumber,active }

        let user = await menuModel.create(updatedBody)

        res.status(201).send({ status: true, message: 'Menu created successfully', data: user })

    } catch (error) {

        res.status(500).send({ status: false, msg: error.message })
    }
}

const getAllMenu = async function (req, res) {
    try {

        let menu = await menuModel.find();
        // console.log(menu)
        let arr=[]
        for(let i=0;i<menu.length;i++){
            if(menu[i].root==0){
                let obj={
                    itemId:menu[i].itemId,
                    itemName:menu[i].itemsName,
                    url:menu[i].url,
                    root:menu[i].root
                }
                let child= await menuModel.find({root:menu[i].itemId})
                // if(child.length>0){
                //     for(let j=0;j<child.length;j++){
                //         console.log("--------------------------------")
                //         child[j].itemId="hello"
                //         // console.log(child[j].itemId)
                //     }
                // }
                // console.log(child)
                obj.child=child
                // obj.subChild="Hello"
                // if(obj.child.length>0){

                //     // for(let j=0;j<obj.child.length;j++){

                //     //     console.log("-------------------")
                //     //     // obj.child[j].subChild="HEllo"
                //     //     console.log(obj.child[j])
                //     // }
                // }

                // console.log(obj)
                arr.push(obj)
            }
        }
        // for(let i=0;i<Menu.length;i++){
        //     console.log(Menu[i])
        //   let data =  await menuModel.find();
        //   console.lo
        //   if(data!==null){
        //       return  Menu.push(data);
              
        //   }
        // }
        res.status(200).send({ status: true, message: "Menu list", data: arr})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: error.message });
    }
}
module.exports = {registerMenu,getAllMenu}