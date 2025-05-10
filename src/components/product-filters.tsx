import { Input } from "./ui/input";

type Props = {
    filterId: string
    setFilterId: (value: string) => void
    filterName: string
    setFilterName: (value: string) => void
}

const ProductFilters = ({ filterId, setFilterId, filterName, setFilterName }: Props) => {
    return (
        <>
            {/* Filters */}
            < div className="flex items-center gap-2 flex-1" >
                <Input
                    placeholder="ID do pedido"
                    value={filterId}
                    onChange={(e) => setFilterId(e.target.value)}
                    className="max-w-[160px]"
                />
                <Input
                    placeholder="Nome do produto"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    className="max-w-[200px]"
                />
            </div >
        </>
    );
}

export default ProductFilters;