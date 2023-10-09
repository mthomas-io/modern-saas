<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Table from "$lib/components/ui/table";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import type { PageData } from "./$types";
	import CreateContactModal from "./CreateContactModal.svelte";
	import DeleteContactModal from "./DeleteContactModal.svelte";
	import { hasReachedMaxContacts } from "$lib/helpers";
	import UpgradePlanModal from "$lib/components/UpgradePlanModal.svelte";
	import { DotsVertical } from "radix-icons-svelte";

	export let data: PageData;
	let createContactOpen = false;
	let deleteContactOpen = false;
	let contactToDelete: string;
	let upgradeModalOpen = false;

	function handleContactDelete(contact_id: string) {
		contactToDelete = contact_id;
		deleteContactOpen = true;
	}

	$: ({ contactsCount, tier } = data);
	$: reachedMaxContacts = hasReachedMaxContacts(tier, contactsCount);

	function handleContactCreate() {
		if (reachedMaxContacts) {
			upgradeModalOpen = true;
			return;
		}
		createContactOpen = true;
	}
</script>

<div class="py-20">
	<!-- Contacts Page Header -->
	<div class="flex w-full items-center justify-between pb-6">
		<h1 class="text-3xl">Contacts</h1>
		<Button size="sm" on:click={handleContactCreate}>New Contact</Button>
	</div>
	<!-- Contacts Table -->
	<Table.Root>
		<Table.Header>
			<Table.Head>Name</Table.Head>
			<Table.Head>Email</Table.Head>
			<Table.Head>Phone</Table.Head>
			<Table.Head>Company</Table.Head>
			<Table.Head />
		</Table.Header>
		<Table.Body>
			{#each data.contacts as contact, _i (contact.id)}
				<Table.Row>
					<Table.Cell>{contact.name ?? "--"}</Table.Cell>
					<Table.Cell>{contact.email ?? "--"}</Table.Cell>
					<Table.Cell>{contact.phone ?? "--"}</Table.Cell>
					<Table.Cell>{contact.company ?? "--"}</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Button size="icon" variant="ghost">
									<DotsVertical />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<DropdownMenu.Label>{contact.name}</DropdownMenu.Label>
									<DropdownMenu.Separator />
									<DropdownMenu.Item class="hover:cursor-pointer">
										<a href="/contacts/{contact.id}" class="w-full">Edit</a>
									</DropdownMenu.Item>
									<DropdownMenu.Item
										class="hover:cursor-pointer"
										on:click={() => handleContactDelete(contact.id)}>
										Delete
									</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
<CreateContactModal bind:open={createContactOpen} data={data.createContactForm} />
<DeleteContactModal
	bind:open={deleteContactOpen}
	contactId={contactToDelete}
	data={data.deleteContactForm} />

<UpgradePlanModal
	bind:open={upgradeModalOpen}
	{tier}
	message="You have reached the max contacts for your plan. Upgrade to add more contacts." />
