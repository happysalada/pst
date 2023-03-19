<script lang="ts">
  import { connected, signerAddress } from 'ethers-svelte'
  import { goto } from "$app/navigation"
  import { xmtpClient } from "$lib/stores";
  import ConnectWalletModal from '$lib/ConnectWalletModal.svelte'
	import type { PageData } from './$types';
	import type { Conversation } from '@xmtp/xmtp-js'

	export let data: PageData;
	if ($connected && $signerAddress && $xmtpClient) {
		let conversation = $xmtpClient.conversations.list().find((conversation: Conversation) => conversation.createdAt.getTime().toString() == data.timestamp); 
		if (!conversation) {
			console.log("conversation not found for this user")
		} else {
			goto(`/conversation/${data.timestamp}`)
		}
	}
</script>
<div class="bg-white">
	<header class="absolute inset-x-0 top-0 z-50">
		<nav
			class="flex items-center justify-between p-6 lg:px-8"
			aria-label="Global"
		>
			<div class="flex lg:flex-1">
				<a href="#" class="-m-1.5 p-1.5">
					<span class="sr-only">Your Company</span>
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt=""
					/>
				</a>
			</div>
			<div class="flex lg:hidden">
				<button
					type="button"
					class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</div>
			<div class="hidden lg:flex lg:gap-x-12">
				<a href="#" class="text-sm font-semibold leading-6 text-gray-900"
					>About</a
				>
			</div>
			<div class="hidden lg:flex lg:flex-1 lg:justify-end">
				<a href="#" class="text-sm font-semibold leading-6 text-gray-900"
					>Log in <span aria-hidden="true">&rarr;</span></a
				>
			</div>
		</nav>
		<!-- Mobile menu, show/hide based on menu open state. -->
		<div class="lg:hidden" role="dialog" aria-modal="true">
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-50" />
			<div
				class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="flex items-center justify-between">
					<a href="#" class="-m-1.5 p-1.5">
						<span class="sr-only">Your Company</span>
						<img
							class="h-8 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt=""
						/>
					</a>
					<button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
						<span class="sr-only">Close menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-500/10">
						<div class="space-y-2 py-6">
							<a
								href="#"
								class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>About</a
							>
						</div>
						<div class="py-6">
			        <ConnectWalletModal loginText="Connect wallet" styles="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>

	<div class="relative isolate px-6 pt-14 lg:px-8">
		<div
			class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
		>
			<svg
				class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
				viewBox="0 0 1155 678"
			>
				<path
					fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
					fill-opacity=".3"
					d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
				/>
				<defs>
					<linearGradient
						id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
						x1="1155.49"
						x2="-78.208"
						y1=".177"
						y2="474.645"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#9089FC" />
						<stop offset="1" stop-color="#FF80B5" />
					</linearGradient>
				</defs>
			</svg>
		</div>
		<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
			<div class="text-center">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
					Chat with 0x224...
				</h1>

				<p class="mt-6 text-lg leading-8 text-gray-600">
					They have sent you an ephemeral message, connect your wallet to open a
					chat and respond
				</p>

				<div class="mt-10 flex items-center justify-center gap-x-6">
	        <ConnectWalletModal loginText="Log in" styles="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"/>
				</div>
			</div>
		</div>
		<div
			class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
		>
			<svg
				class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
				viewBox="0 0 1155 678"
			>
				<path
					fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
					fill-opacity=".3"
					d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
				/>
				<defs>
					<linearGradient
						id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
						x1="1155.49"
						x2="-78.208"
						y1=".177"
						y2="474.645"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#9089FC" />
						<stop offset="1" stop-color="#FF80B5" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	</div>
</div>

<section class="isolate overflow-hidden bg-white px-6 lg:px-8">
	<div class="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
		<div
			class="absolute top-0 left-1/2 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,theme(colors.indigo.100),white)] opacity-20 lg:left-36"
		/>
		<div
			class="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center"
		/>
		<figure class="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
			<div class="relative col-span-2 lg:col-start-1 lg:row-start-2">
				<svg
					viewBox="0 0 162 128"
					fill="none"
					aria-hidden="true"
					class="absolute -top-12 left-0 -z-10 h-32 stroke-gray-900/10"
				>
					<path
						id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
						d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
					/>
					<use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x="86" />
				</svg>
				<blockquote
					class="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9"
				>
					<p>
						Commodo amet fugiat excepteur sunt qui ea elit cupidatat ullamco
						consectetur ipsum elit consequat. Elit sunt proident ea nulla ad
						nulla dolore ad pariatur tempor non. Sint veniam minim et ea.
					</p>
				</blockquote>
			</div>
		</figure>
	</div>
</section>
