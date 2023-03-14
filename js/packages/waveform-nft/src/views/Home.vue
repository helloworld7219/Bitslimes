<template>
  <div class="container mx-auto">
    <section
      class="flex flex-col items-center mt-12"
    >
      <div class="w-full">
        <a-alert
          class="text-center text-base sm:text-xl"
          message="This app is currently running on a Testnet. We'll announce when it goes live on the Mainnet"
          type="info"
          closable
          banner
        />

        <h1
          class="mt-14 dark:text-primary-light uppercase"
        >
          Hey, solanaut!
          <br>
          <br>
          Wanna create your NFT wave?
        </h1>
        <p
          class="mt-4 text-2xl font-semibold leading-none text-gray-400"
        >
          You are in the right place
        </p>
        <div class="my-14">
          <div
            class="neon-button text-3xl lg:text-5xl md:text-5xl"
            @click="$router.push('input')"
          >
            Here we go!
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
