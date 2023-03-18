<script lang="ts">
  window.global ||= window;
  import {
    defaultEvmStores,
    connected,
    signer,
  } from "ethers-svelte";
  import { goto } from "$app/navigation";
  import Web3Modal from "web3modal";
  import { xmtpClient } from "$lib/stores";
  import { Client } from "@xmtp/xmtp-js";
  // import { variables } from "$lib/variables";
  // import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
  // const WalletConnectProvider = window.WalletConnectProvider.default;
  // import WalletConnectProvider from "@walletconnect/web3-provider";

  export let loginText: string;
  export let styles: string;

  const disable = () => defaultEvmStores.disconnect();
  let web3Modal;
  const enable = async () => {
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

    signer.subscribe(async $signer => {
      if (!$signer) return
      // Create the client with your wallet. This will connect to the XMTP development network by default
      const xmtp = await Client.create($signer, { env: "production"});
      xmtpClient.set(xmtp);
    })
  };
  const login = async () => {
    goto("/inbox");
  };
  $: if ($connected && $xmtpClient) login();
</script>

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
