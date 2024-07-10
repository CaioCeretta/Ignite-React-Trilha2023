import { api } from '@/lib/axios'

export async function deliveredOrder({ orderId }: { orderId: string }) {
  await api.patch(`/orders/${orderId}/deliver`)
}
