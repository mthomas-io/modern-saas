<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import type { PasswordSchema } from "$lib/schemas";
	import { LockClosed } from "radix-icons-svelte";
	import { superForm } from "sveltekit-superforms/client";
	import type { SuperValidated } from "sveltekit-superforms";
	import toast from "svelte-french-toast";
	export let data: SuperValidated<PasswordSchema>;

	const { form, errors, enhance } = superForm(data, {
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case "success":
					toast.success("Password updated!");
					break;
				case "error":
					toast.error("Error updating your password.");
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
		<LockClosed />
		<span class="ml-4">Password</span>
	</div>
	<p class="mt-3 max-w-none text-sm">Change the password associated with your account</p>
	<!-- Change Password Form -->
	<form method="POST" action="?/updatePassword" use:enhance class="mt-8 flex flex-col space-y-4">
		<label for="password" class="space-y-2">
			<span>New Password</span>
			<input type="password" name="password" bind:value={$form.password} />
			{#if $errors.password}
				<span class="block text-red-600 dark:text-red-500">{$errors.password}</span>
			{/if}
		</label>
		<label for="passwordConfirm" class="space-y-2">
			<span>Confirm New Password</span>
			<input type="password" name="passwordConfirm" bind:value={$form.passwordConfirm} />
			{#if $errors.passwordConfirm}
				<span class="block text-red-600 dark:text-red-500">{$errors.passwordConfirm}</span>
			{/if}
		</label>
		<Button type="submit" class="mt-4 self-start">Change Password</Button>
	</form>
</section>
