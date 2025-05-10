import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const createProductSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  price: z.coerce.number().min(0, "O preço deve ser um número positivo"),
})

type CreateProductSchema = z.infer<typeof createProductSchema>

export default function CreateProductDialog() {
  const { register, handleSubmit, reset } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  })


  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo produto</DialogTitle>
        <DialogDescription>Criar um novo produto no sistema</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(() => console.log("Produto criado"))} className="space-y-6">
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="name">Produto</Label>
          <Input id="name" className="col-span-3" {...register("name")} />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="price">Preço</Label>
          <Input id="price" type="number" className="col-span-3" {...register("price")} />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            Criar produto
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
