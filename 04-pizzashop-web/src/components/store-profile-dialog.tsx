import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

export interface StoreProfileDialogProps {}

const storeProfileSchema = z.z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }
    // This function tries to update the cache, but it returns, in tbis case, the restaurant data before the update

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    /* Changing the HTTP State via the on success, so we are able to update the cache of a request that has already been
    made, from the success of a request made after it, we could use the onSuccess if we want to apply the changes after the
    successful update, but if we want to automatically change and rollback after it went wrong, we can use the onMutate */
    // onSuccess(_, { name, description }) {
    //   const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
    //     'managed-restaurant',
    //   ])

    //   if (cached) {
    //     queryClient.setQueryData<GetManagedRestaurantResponse>(
    //       ['managed-restaurant'],
    //       {
    //         ...cached,
    //         name,
    //         description,
    //       },
    //     )
    //   }
    // },

    /* This function triggers at the moment i click on the save button, not only when it succeeds */
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })

      return { previousCachedProfile: cached }
    },
    /*
      onError parameterspnpm
      1 err: Details about the error
      2 variables: the variables that we used at the time of the requisition
      3 context: Informations that we can share between the context of a query or of a mutation
      let's say that on this mutation i return "{test: 'ciao'} then on the context of the onError
      we could utilize the context.test, everything returned by it, we can use on the context

      So, by returning inside the onMutate, the previousCached restaurant, in case of any errors on the update, we can
      successfully rollback to the state before
    */
    onError(_, __, context) {
      if (context?.previousCachedProfile) {
        updateManagedRestaurantCache(context.previousCachedProfile)
      }
    },
  })

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Successfully updated profile')
    } catch {
      toast.error('There was an error updating the profile')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>Store Profile</DialogHeader>
      <DialogDescription>Update the informartions</DialogDescription>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="gap-4 space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input className="col-span-3" {...register('name')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Description
            </Label>
            <Textarea className="col-span-3" {...register('description')} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isSubmitting}>Cancel</Button>
          </DialogClose>
          <Button type="submit" variant={'success'} disabled={isSubmitting}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
