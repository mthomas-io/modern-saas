<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import type { EmailSchema } from "$lib/schemas";
	import { superForm } from "sveltekit-superforms/client";
	import type { SuperValidated } from "sveltekit-superforms";
	import { EnvelopeOpen } from "radix-icons-svelte";
	import toast from "svelte-french-toast";
	export let data: SuperValidated<EmailSchema>;

	const { form, errors, message, enhance } = superForm(data, {
		onResult: ({ result }) => {
			switch (result.type) {
				case "success":
					toast.success("Check your inbox to confirm your email change!");
					break;
				case "error":
					toast.error("Error updating your contact.");
					break;
				case "failure":
					toast.error("Validation error, check the details and try again.");
					break;
				default:
					return;
			}
			return;
		}
	});
</script>

<section class="px-6 pt-16">
	<div class="flex items-center font-semibold">
		<EnvelopeOpen />
		<span class="ml-4">Email Address</span>
	</div>
	<p class="mt-3 max-w-none text-sm">Change the email associated with your account</p>
	<!-- Email Address Form -->
	<form method="POST" action="?/updateEmail" use:enhance class="mt-8">
		<label for="email" class="space-y-2">
			<span>Email</span>
			<input type="email" name="email" bind:value={$form.email} />
			{#if $message}
				<span class="block text-green-600 dark:text-green-500">{$message}</span>
			{/if}
			{#if $errors.email}
				<span class="block text-red-600 dark:text-red-500">{$errors.email}</span>
			{/if}
		</label>
		<Button type="submit" class="mt-4">Update Email</Button>
	</form>
</section>
