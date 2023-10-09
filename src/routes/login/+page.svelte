<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form);
</script>

<div class="py-20">
	<div class="flex w-full flex-col items-center">
		<Card.Root class="mx-auto mt-6 w-full max-w-xl">
			<Card.Header>
				<Card.Title>Login to your account</Card.Title>
			</Card.Header>
			<Card.Content>
				<!-- Login Form -->
				<form method="POST" class="flex flex-col space-y-6" use:enhance data-testid="login-form">
					<label class="space-y-2" for="email">
						<span>Email</span>
						<input type="email" name="email" bind:value={$form.email} data-testid="email" />
						{#if $errors.email}
							<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
						{/if}
					</label>
					<label class="space-y-2" for="password">
						<span>Password</span>
						<input
							type="password"
							name="password"
							bind:value={$form.password}
							data-testid="password" />
						{#if $errors.password}
							<span class="block text-red-600 dark:text-red-500">{$errors.password}</span>
						{/if}
					</label>
					<Button type="submit" class="w-full">Login</Button>
					<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
						Don't have an account? <Button class="p-0" variant="link" href="/register"
							>Sign up</Button>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
