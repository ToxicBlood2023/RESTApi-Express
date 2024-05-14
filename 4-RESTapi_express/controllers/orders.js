import { validateOder, partialValidateUpdateOrder } from '../schema_validation.js'
import { OrderModel } from '../models/mysql/orders.js'


export class OrdersController {

    static async getAll (req, res) {
        const result = await OrderModel.getAll()
        if(result.length === 0 ) return res.json({ message: "Error de controlador al intentar recuperar todas las facturas"})
        return res.json(result)
    }
    
    static async getById (req, res) {
        const { id } = req.params 
        const result = await OrderModel.getById({ id : id })
        if(!result) return res.json({ message: "Error de controlador al intentar recuperar la factura por ID"})
        return res.json(result)
    }

    static async createOrder (req, res) {
        const result = validateOder(req.body)
        if (result.error) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        const newOrder = await OrderModel.createOrder({input: result.data})
        if (!newOrder) return res.json({message: "Error de controlador al intentar crear la factura"})
    
        return res.status(200).json({ message: "Solicitud exitosa" })
    }

    static async updateOrder (req, res) {
        const result = partialValidateUpdateOrder(req.body)
        if (result.error) return res.status(400).json({error: JSON.parse(result.error.message)})
        const { orderId, userId } = req.params
        const updateOrder = await OrderModel.updateOrder({ orderId, userId ,input: result.data})
        if (!updateOrder) return res.json({message: "Error de controlador al intentar actualizar la factura "})
        return res.status(200).json(updateOrder)
    }


}