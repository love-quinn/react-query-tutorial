import { Input } from "./ui/input";
import { type Product } from "@/data/product";

type Props = {
    data?: Product[]
}

const ProductFilters = ({ data }: Props) => {
    return (
        <div className="flex items-center gap-2 flex-1">
                <Input
                    placeholder="ID do pedido"
                    className="max-w-[160px]"
                />
                <Input
                    placeholder="Nome do produto"
                    className="max-w-[200px]"
                />
        </div>
    );
}

export default ProductFilters;