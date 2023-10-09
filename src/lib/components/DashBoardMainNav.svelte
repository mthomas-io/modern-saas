<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };

	$: ({ session } = $page.data);

	const routes = [
		{
			name: "Home",
			path: "/"
		},
		{
			name: "Pricing",
			path: "/pricing"
		},
		{
			name: "Contacts",
			path: "/contacts",
			requireAuth: true
		}
	];
</script>

<nav class={cn("flex items-center space-x-4 lg:space-x-6", className)}>
	{#each routes as route}
		{#if !route.requireAuth || session}
			<a
				href={route.path}
				class="text-sm font-medium transition-colors hover:text-primary"
				class:text-muted-foreground={browser && route.path !== $page.url.pathname}>
				{route.name}
			</a>
		{/if}
	{/each}
</nav>
