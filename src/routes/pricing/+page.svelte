<script lang="ts">
	import type { PageData } from "./$types";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Tabs from "$lib/components/ui/tabs";
	import { goto } from "$app/navigation";
	export let data: PageData;

	$: ({ prices, interval, isEligibleForTrial } = data);
</script>

<div class="py-20">
	<!-- Pricing Page Header -->
	<div class="mx-auto mb-10 max-w-2xl text-center">
		<h1 class="mb-2 text-base font-semibold text-sky-500 dark:text-sky-400">Pricing</h1>
		<p class="mb-6 text-5xl font-bold">Choose what works for you</p>
		<p class="text-lg">
			Contactly offers flexible pricing plans to cater to the unique needs of your business. Choose
			from our range of affordable options and get started today
		</p>
	</div>
	<div class="flex justify-center">
		<Tabs.Root value={interval}>
			<Tabs.List>
				<Tabs.Trigger
					value="month"
					on:click={() => goto("/pricing", { replaceState: true, noScroll: true })}
					>Monthly</Tabs.Trigger>
				<Tabs.Trigger
					value="year"
					on:click={() => goto("/pricing?interval=year", { replaceState: true, noScroll: true })}>
					Yearly
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</div>
	<!-- Pricing Card Grid -->
	<div
		class="isolate mx-auto mt-10 grid max-w-6xl grid-cols-1 justify-items-center gap-8 lg:grid-cols-3">
		{#each prices as price, _i (price.id)}
			<!-- Pricing Card -->
			<Card.Root class="w-full">
				<Card.Header class="Header">
					<h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
						{price.product.name}
					</h5>
					<div class="flex items-baseline text-gray-900 dark:text-white">
						<span class="text-3xl font-semibold">$</span>
						<span class="text-5xl font-extrabold tracking-tight">{price.unit_amount}</span>
						<span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400"
							>/{price.unit_amount > 0 ? interval : "forever"}</span>
					</div>
				</Card.Header>
				<Card.Content>
					<ul class="my-7 space-y-6">
						{#each price.product.features as feature}
							<li class="flex space-x-2">
								<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
									>{feature}</span>
							</li>
						{/each}
					</ul>
				</Card.Content>
				<Card.Footer>
					<Button
						variant="default"
						class="mx-auto"
						href={price.product.name === "Free"
							? "/contacts"
							: `/api/stripe/checkout?id=${price.id}`}>
						{isEligibleForTrial ? "Start trial" : "Upgrade now"}
						<!-- {price.product.call_to_action} -->
					</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
