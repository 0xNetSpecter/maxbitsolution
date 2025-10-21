<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
    <AppSidebar
      class="w-64 h-full border-r border-gray-200 dark:border-gray-700 flex-shrink-0 sticky top-0"
    />

    <main class="flex-1 overflow-y-auto p-6">
      <slot />
    </main>
  </div>
</template>
