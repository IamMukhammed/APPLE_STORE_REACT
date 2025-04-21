// ProductColors (o‘rniga ishlatiladi: ProductVolume)
export enum ProductColor {
    BLACK = "BLACK",
    WHITE = "WHITE",
    SILVER = "SILVER",
    GOLD = "GOLD",
    BLUE = "BLUE",
    RED = "RED",
    YELLOW = "YELLOW",
    PURPLE = "PURPLE",
    PINK = "PINK",
    GREEN = "GREEN",
    NATURAL_TITANIUM = "NATURAL TITANIUM",
    BLACK_TITANIUM = "BLACK TITANIUM",
    GOLD_TITANIUM = "GOLD TITANIUM",
    WHITE_TITANIUM = "WHITE TITANIUM",
    OTHER = "OTHER",
}
  
// ProductStorage (gigabaytlar uchun)
export enum ProductStorage {
    GB_64 = "64GB",
    GB_128 = "128GB",
    GB_256 = "256GB",
    GB_512 = "512GB",
    GB_1024 = "1024GB",
    GB_2048 = "2048GB",
    OTHER = "OTHER",
}
  
// ProductStatus – mahsulot holati
export enum ProductStatus {
    AVAILABLE = "AVAILABLE",       
    OUT_OF_STOCK = "OUT_OF_STOCK",
    DISCONTINUED = "DISCONTINUED",
}
  
// ProductCategory – eski ProductCollection o‘rniga
export enum ProductCategory {
    // ALL = "ALL",
    SMARTPHONE = "SMARTPHONE",
    LAPTOP = "LAPTOP",
    TABLET = "TABLET",
    ACCESSORY = "ACCESSORY",
    WATCH = "WATCH",
    VISION = "VISION",
}

// ProductColor, ProductStorage, ProductCategory,