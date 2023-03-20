<script lang="ts">
	import { signerAddress } from "ethers-svelte";
  import type { Conversation, Message } from "@xmtp/xmtp-js";
  import { xmtpClient } from "$lib/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { clickOutside, timeFromNow } from "$lib/utils.js";
  import type { PageData } from "./$types";

  // TODO find a way to cache conversations from different wallets
  // import { conversations } from "$lib/stores"
  export let data: PageData;

  let messages: Message[] = [];
  let conversation: Conversation;

  let peerAddress: string;
  let newMessage: string;

  onMount(async () => {
    if (!$xmtpClient) {
      goto("/");
    }

    let conversations = await $xmtpClient.conversations.list();
    conversation = conversations.find(
        (conversation: Conversation) =>
          conversation.createdAt.getTime().toString() == data.timestamp
      );
    if (!conversation) {
      goto("/inbox");
    }

    peerAddress = conversation.peerAddress;
    messages = await conversation.messages();
  });

  async function sendMessage(): Promise<void> {
    console.log("sending message")
    if (!$xmtpClient) return;
    // TODO figure out why adding a conversationId crashes this
    let message = await conversation.send(newMessage);
    newMessage = "";
    messages = [...messages, message];
  }
</script>

<body
  class="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10"
>
  <!-- Component Start -->
  <div
    class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden"
  >
    <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
      {#each messages as {content, senderAddress, sent}}
        {#if senderAddress == $signerAddress}
        <div class="flex w-full mt-2 space-x-3 max-w-xs">
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
            <p class="text-center mt-2">Me</p>
          </div>
          <div>
            <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
              <p class="text-sm">
                {content}
              </p>
            </div>
            <span class="text-xs text-gray-500 leading-none">{timeFromNow(sent)}</span>
          </div>
        </div>
        {:else}
        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
              <p class="text-sm">
              {content}
              </p>
            </div>
            <span class="text-xs text-gray-500 leading-none">{timeFromNow(sent)}</span>
          </div>
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
        </div>
        {/if}
      {/each}
    </div>

    <div class="bg-gray-300 p-4">
      <form on:submit|preventDefault={sendMessage}>
        <input
          class="flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          placeholder="Type your message…"
          bind:value={newMessage}
        />
      </form>
    </div>
  </div>
  <!-- Component End  -->
</body>
