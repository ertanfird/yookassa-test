<script setup>
    const config = useRuntimeConfig()


</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <div>
        {{ config.yookassaKey }}
    </div>
    <NuxtWelcome />
  </div>
</template>
