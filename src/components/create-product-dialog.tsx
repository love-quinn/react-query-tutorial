import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct, type Product } from "@/data/product"

const createProductSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  price: z.coerce.number().min(0, "O preço deve ser um número positivo"),
})

type CreateProductSchema = z.infer<typeof createProductSchema>

export default function CreateProductDialog() {
  const queryClient = useQueryClient()

  const { register, handleSubmit } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  })

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(['products']);
      
      queryClient.setQueryData(["products"], (data: Product[]) => {
        return [...data, {
          id: crypto.randomUUID(),
          name: variables.name,
          price: variables.price,
        }]
      })
    },
  })

  async function handleCreateProduct(data: CreateProductSchema) {
    try {
      await createProductFn({
        name: data.name,
        price: data.price,
      })

      // alert("Produto criado com sucesso");
    } catch (error) {
      alert("Erro ao criar produto");
      console.log(error);
    }
  }


  return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo produto</DialogTitle>
          <DialogDescription>Criar um novo produto no sistema</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-6">
          <div className="grid grid-cols-4 items-center text-right gap-3">
            <Label htmlFor="name">Produto</Label>
            <Input id="name" className="col-span-3" {...register("name")} />
          </div>

          <div className="grid grid-cols-4 items-center text-right gap-3">
            <Label htmlFor="price">Preço</Label>
            <Input id="price" type="number" className="col-span-3" {...register("price")} />
          </div>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="submit">Salvar</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
  )
}
