<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import toast from "svelte-french-toast";
	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case "success":
					toast.success("Success! Confirm your email to login.");
					break;
				case "error":
					toast.error("Error creating your account!");
					break;
				case "failure":
					toast.error("Check your details and try again!");
					break;
				default:
					return;
			}
			return;
		}
	});
</script>

<div class="py-20">
	<div class="flex w-full flex-col items-center">
		<Card.Root class="mx-auto mt-6 w-full max-w-xl">
			<Card.Header>
				<Card.Title>Register for an account</Card.Title>
			</Card.Header>
			<Card.Content class="Content"
				><form
					method="POST"
					class="flex flex-col space-y-6"
					use:enhance
					data-testid="register-form">
					<label class="space-y-2" for="full_name">
						<span>Name</span>
						<input
							type="text"
							name="full_name"
							bind:value={$form.full_name}
							data-testid="full_name" />
						{#if $errors.full_name}
							<span class="block text-red-600 dark:text-red-500">{$errors.full_name}</span>
						{/if}
					</label>
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
					<label class="space-y-2" for="passwordConfirm">
						<span>Confirm Password</span>
						<input
							type="password"
							name="passwordConfirm"
							bind:value={$form.passwordConfirm}
							data-testid="passwordConfirm" />
						{#if $errors.passwordConfirm}
							<span class="block text-red-600 dark:text-red-500">{$errors.passwordConfirm}</span>
						{/if}
					</label>
					<Button type="submit" class="w-full">Register</Button>
					<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
						Already have an account? <Button class="p-0" variant="link" href="/login">Login</Button>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
