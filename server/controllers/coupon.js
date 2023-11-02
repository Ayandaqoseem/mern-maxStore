import Coupon from "../models/coupon.js";


export const create = async(req, res) => {
                    try {
                          const { name, expiresAt, discount } = req.body;

                          if (!name || !expiresAt || !discount) {
                                        return res.json("Please fill in all fields");
                          }             
                          const coupon = await Coupon.create({
                                        name,
                                        expiresAt,
                                        discount,     
                          });
                                        res.json(coupon)    
                    } catch (error) {
                               console.log(error);
                               return res.status(400).json(error);         
                    }
}