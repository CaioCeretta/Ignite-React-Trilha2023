import { api } from '@/lib/axios'

export async function CancelOrder({ orderId }: { orderId: string }) {
  await api.patch(`/orders/${orderId}/cancel`)
}
