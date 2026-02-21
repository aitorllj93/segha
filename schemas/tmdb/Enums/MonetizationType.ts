import z from "zod"

const FlatRate = z.literal('flatrate');
const Free = z.literal('free');
const Ads = z.literal('ads');
const Rent = z.literal('rent');
const Buy = z.literal('buy');

export const MonetizationType = z.enum({
  FlatRate: FlatRate.value,
  Free: Free.value,
  Ads: Ads.value,
  Rent: Rent.value,
  Buy: Buy.value
})
