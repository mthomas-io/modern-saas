<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import type { CreateContactSchema } from "$lib/schemas";
	import { superForm } from "sveltekit-superforms/client";
	import type { SuperValidated } from "sveltekit-superforms";

	export let data: SuperValidated<CreateContactSchema>;
	export let open = false;

	const { form, errors, enhance } = superForm(data, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === "success") {
				open = false;
				return;
			}
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<form
			method="POST"
			action="?/createContact"
			class="flex flex-col space-y-6"
			use:enhance
			data-testid="create-contact-form">
			<h3 class="text-xl font-medium">Create a Contact</h3>
			{#if $errors._errors}
				<span class="block text-red-600 dark:text-red-500">{$errors._errors}</span>
			{/if}
			<label class="space-y-2" for="name">
				<span>Name</span>
				<input type="text" name="name" bind:value={$form.name} data-testid="name" />
				{#if $errors.name}
					<span class="block text-red-600 dark:text-red-500">{$errors.name}</span>
				{/if}
			</label>
			<label class="space-y-2" for="email">
				<span>Email</span>
				<input type="email" name="email" bind:value={$form.email} data-testid="email" />
				{#if $errors.email}
					<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
				{/if}
			</label>
			<label class="space-y-2" for="phone">
				<span>Phone</span>
				<input type="text" name="phone" bind:value={$form.phone} data-testid="phone" />
				{#if $errors.phone}
					<span class="block text-red-600 dark:text-red-500">{$errors.phone}</span>
				{/if}
			</label>
			<label class="space-y-2" for="company">
				<span>Company</span>
				<input type="text" name="company" bind:value={$form.company} data-testid="company" />
				{#if $errors.company}
					<span class="block text-red-600 dark:text-red-500">{$errors.company}</span>
				{/if}
			</label>
			<Button type="submit" class="w-full">Create Contact</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
