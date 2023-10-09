import { z } from "zod";
import type { PageServerLoad } from "./$types";
import { stripe } from "$lib/server/stripe";
import { freePrice, lookupKeys } from "$lib/config";
import { priceListSchema } from "$lib/schemas";

const intervalSchema = z.enum(["month", "year"]).catch("month");

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();

	const interval = intervalSchema.parse(event.url.searchParams.get("interval"));

	const stripePrices = await stripe.prices.list({
		expand: ["data.product"],
		recurring: { interval },
		lookup_keys: [...lookupKeys]
	});

	const prices = priceListSchema
		.parse(stripePrices.data)
		.sort((a, b) => a.unit_amount - b.unit_amount);

	let isEligibleForTrial = true;
	if (session) {
		const { data, error } = await event.locals.supabase
			.from("billing_customers")
			.select("id")
			.eq("user_id", session.user.id)
			.single();

		isEligibleForTrial = !data;
	}

	return {
		prices: [freePrice, ...prices],
		interval,
		isEligibleForTrial
	};
};
