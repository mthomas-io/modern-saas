<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import type { ProfileSchema } from "$lib/schemas";
	import { Person } from "radix-icons-svelte";
	import { superForm } from "sveltekit-superforms/client";
	import type { SuperValidated } from "sveltekit-superforms";
	import toast from "svelte-french-toast";
	export let data: SuperValidated<ProfileSchema>;

	const { form, errors, enhance } = superForm(data, {
		onResult: ({ result }) => {
			switch (result.type) {
				case "success":
					toast.success("Name updated!");
					break;
				case "error":
					toast.error("Error updating your name.");
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
		<Person />
		<span class="ml-4">Personal Details</span>
	</div>
	<p class="mt-3 text-sm">Change the personal details associated with your account</p>
	<!-- Personal Details Form -->
	<form method="POST" action="?/updateProfile" use:enhance class="mt-8">
		<label for="full_name" class="space-y-2">
			<span>Name</span>
			<input type="text" name="full_name" bind:value={$form.full_name} />
			{#if $errors.full_name}
				<span class="block text-red-600 dark:text-red-500">{$errors.full_name}</span>
			{/if}
		</label>
		<Button type="submit" class="mt-4">Update Details</Button>
	</form>
</section>
