

export class Product {
    constructor(
        public  id: Number,
        public  name: String,
        public  mrp: Number, //Integer max length: 9

        public  cpPerUnit: Number, //Decimal(12,4)
        public  unitsPerCarton: Number, //Integer max length: 9

        public  spPerCarton: Number, //Decimal(12,4)
        public  spPerUnit: Number, //Decimal(12, 4)

        public  gstTaxRate: Number, //Integer
        public  comment: String, 
        public  stocksInUnit: Number,
    ) {

    }
}