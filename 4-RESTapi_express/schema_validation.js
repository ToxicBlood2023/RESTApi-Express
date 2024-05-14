import z from 'zod'



// esquema de validaciones con "zod"
const productSchema = z.object({

    marca: z.string({
        invalid_type_error: 'Product brand must be a string',
        required_error: 'Product brand is required'
    }),
    detalles: z.string({
        invalid_type_error: 'Details must be a string',
        required_error: 'Details is required'
    }),
    precio: z.number().min(0).max(10000),
    precioOriginal: z.number().min(0).max(10000),
    categoria: z.string({
        invalid_type_error: 'Category must be a string',
        required_error: 'Category is required'
    }),
    imagenUrl: z.string({
        invalid_type_error: 'ImagenURL must be a string',
        required_error: 'ImagenURL is required'
    }),
    descripcion: z.string({
        invalid_type_error: 'Description must be a string',
        required_error: 'Description is required'
    }),
    stock: z.number().int()

})

// funcion para validar la creacion de un producto POST 
export function validateProduct (object) {
    return productSchema.safeParse(object)
}


 export function validatePartialProduct (object) {
    return productSchema.partial().safeParse(object)
}



// validacion para el createOrder
const schemaByIf = z.object({

    usuario: z.array(z.string()).nonempty().min(1),
    tarjeta_numero: z.number().int().positive(),
    tarjeta_cod: z.number().int().positive(),
    email: z.string().email(),
    direccion: z.string(),
    productos: z.array(z.string()).nonempty().min(1)
})


export function validateOder (object) {
    return schemaByIf.safeParse(object)
}


// Updaye Schema
const schemaUpdate = z.object({

    nombre: z.string().min(5).max(15),
    apellido: z.string().min(5).max(20),
    dni: z.number().int().positive().min(100000).max(99999999999),
    productos: z.array(z.string()).nonempty().min(1),
    total: z.number().int().positive().min(1)
    
})

 // Partial validate Update
export function partialValidateUpdateOrder (object){
    return schemaUpdate.partial().safeParse(object)
}

export const firstCharLower = (str) => {
    return str[0].toLowerCase() + str.slice(1)
}