<script lang="ts">
  import {
    defaultEvmStores,
    connected,
  } from "ethers-svelte";
  import Web3Modal from "web3modal";
  // import { variables } from "$lib/variables";
  // import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
  // const WalletConnectProvider = window.WalletConnectProvider.default;
  // import WalletConnectProvider from "@walletconnect/web3-provider";

  export let loginText: string;
  export let styles: string;
  let loading = false;

  const disable = () => defaultEvmStores.disconnect();
  let web3Modal;
  const enable = async () => {
    loading = true;
    if (web3Modal) web3Modal.clearCachedProvider();
    web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        // walletconnect: {
        //   package: WalletConnectProvider,
        //   options: { infuraId: variables.infuraId },
        // },
        // coinbasewallet: {
        //   package: CoinbaseWalletSDK,
        //   options: {
        //     appName: "crypton",
        //     infuraId: "7b305244a8dc444f9cdd411c1a0b10cf"
        //   }
        // },
      },
      disableInjectedProvider: false,
    });
    const provider = await web3Modal.connect();
    defaultEvmStores.setProvider(provider);

  };
</script>

{#if loading}
  <p> Loading... </p>
{:else}
  {#if $connected}
    <button
      class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
      on:click={disable}>Logout</button
    >
  {:else}
    <button
      class={styles}
      on:click={enable}>{loginText}</button
    >
  {/if}
{/if}
