<script lang="ts">
	import "../app.postcss";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import type { LayoutData } from "./$types";
	import { onMount } from "svelte";
	import { invalidate } from "$app/navigation";
	import { Toaster } from "svelte-french-toast";
	import DashBoardMainNav from "$lib/components/DashBoardMainNav.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { ChevronDown, ExternalLink } from "radix-icons-svelte";

	export let data: LayoutData;

	$: ({ session, supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Contactly</title>
</svelte:head>
<Toaster />
<div class="flex h-full flex-col">
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<img src="/images/logo.png" class="mr-3 h-6 sm:h-9" alt="Contactly Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				Contactly
			</span>
			<DashBoardMainNav class="mx-6" />
			<div class="ml-auto flex items-center space-x-4">
				{#if session}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button>
								Account
								<ChevronDown class="ml-2" />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Label>{session.user.email}</DropdownMenu.Label>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>
									<a href="/account/billing" class="flex w-full items-center justify-between">
										<span>Billing</span>
										<ExternalLink />
									</a>
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<a href="/account" class="w-full">Setings</a>
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>
									<form action="/logout" method="POST" class="w-full">
										<button type="submit" class="w-full text-left"> Sign out </button>
									</form>
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<div class="flex items-center gap-2">
						<Button href="/login" variant="ghost" size="sm">Login</Button>
						<Button href="/register" size="sm" color="alternative">Register</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class="w-full flex-grow px-2 sm:px-4">
		<div class="container mx-auto">
			<slot />
		</div>
	</div>
</div>
